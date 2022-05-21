import React, { useState, useEffect } from "react";
import useInterval from "@use-it/interval";

// ml5, p5
import ml5 from "ml5";
import { ReactP5Wrapper } from "react-p5-wrapper";

// components
// import sketch from "./sketch";
import ItemContainer from "./style";

// mui
import {
  Grid,
  Button,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  LinearProgress,
  Box,
} from "@mui/material";

const App = (props) => {
  const [skeletonEffect, setSkeletonEffect] = useState(true);
  const [rednoseEffect, setRednoseEffect] = useState(false);

  let poseLabel = null;
  let progress = 0;

  const todoPictures = [
    "/public/todo_motions/1.jpg",
    "/public/todo_motions/2.jpg",
    "/public/todo_motions/3.jpg",
  ];

  const todoLabels = ["A", "C", "D"];

  const sketch = (p5) => {
    let video;
    let poseNet;
    let pose;
    let skeleton;
    let brain;
    let counter;

    p5.setup = () => {
      p5.createCanvas(1500, 550);
      video = p5.createCapture(p5.VIDEO);
      video.size(750, 550);
      video.hide();

      poseNet = ml5.poseNet(video, modelLoaded);
      poseNet.on("pose", gotPoses);

      let options = {
        inputs: 34,
        outputs: 4,
        task: "classification",
        debug: true,
      };

      brain = ml5.neuralNetwork(options);

      const modelDetails = {
        model: "/public/stretch_model/model.json",
        metadata: "/public/stretch_model/model_meta.json",
        weights: "/public/stretch_model/model.weights.bin",
      };
      brain.load(modelDetails, brainLoaded);

      //   For loading bar
      counter = new Count(p5, 0, 100);
      counter.start();
    };

    const brainLoaded = () => {
      console.log("pose classification ready!");
      classifyPose();
    };

    const classifyPose = () => {
      if (pose) {
        let inputs = [];
        for (let i = 0; i < pose.keypoints.length; i++) {
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          inputs.push(x);
          inputs.push(y);
        }
        brain.classify(inputs, gotResult);
      } else {
        setTimeout(classifyPose, 1000);
      }
    };

    const gotResult = (err, results) => {
      if (results[0].confidence > 0.95) {
        poseLabel = results[0].label.toUpperCase();
        console.log(poseLabel);
      }
      classifyPose();
    };

    setInterval(() => {
      handlePostureAndPic();
    }, 1000);

    const handlePostureAndPic = () => {
      const currentPose = poseLabel;
      console.log(
        "todo:",
        todoLabels[0],
        "current pose:",
        currentPose,
        "progress: ",
        progress
      );
      if (currentPose === todoLabels[0]) {
        //current= A, todo=A, progress: 0
        //current= C, todo=A
        //current= A, todo=A, progress: 10
        //current= A, todo=A, progress: 90
        //current= A, todo=A, progress: 100
        //current= A, todo=B, progress: 0
        //current= B, todo=B, progress: 10
        if (progress < 100) {
          progress += 10;
          return;
        } else {
          todoLabels.shift();
          todoPictures.shift();
          progress = 0;
        }
      }
    };

    const gotPoses = (poses) => {
      if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
      }
    };

    const modelLoaded = () => {
      console.log("PoseNet Ready");
    };

    p5.draw = () => {
      p5.push();
      p5.background(255);
      p5.translate(750, 0);
      p5.scale(-1, 1);
      p5.image(video, 0, 0, 750, 550);

      // For Skeleton Effect
      if (pose && skeletonEffect) {
        for (let i = 0; i < skeleton.length; i++) {
          let a = skeleton[i][0];
          let b = skeleton[i][1];
          p5.strokeWeight(2);
          p5.stroke(0);
          p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
        for (let i = 0; i < pose.keypoints.length; i++) {
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          p5.fill(0);
          p5.stroke(255);
          p5.ellipse(x, y, 16, 16);
        }
      }
      p5.pop();

      // For Progress Bar
      let middle = p5.height / 2;
      let sVal = counter.s; //0
      let width = 650;
      let Progress = p5.map(sVal, 0, 100, 0, width);

      p5.fill(141, 242, 141);
      p5.textSize(32);
      p5.textFont("monospace");
      let txt = p5.text("Progress : " + sVal + "%", 800, middle - 20);

      p5.rect(800, middle, Progress, 20, 15);
      p5.stroke(141, 242, 141);
      p5.noFill();
      p5.rect(800, middle, width, 20, 15);

      if (p5.floor(p5.random(300)) == 100) {
        counter.reset();
      }

      //   p5.fill(255, 0, 255);
      //   p5.noStroke();
      //   p5.textSize(512);
      //   p5.textAlign(p5.CENTER, p5.CENTER);
      //   p5.text(poseLabel, p5.width / 2, p5.height / 2);
    };
  };

  class Count {
    constructor(p5, s, w) {
      this.p5 = p5;
      this.s = s;
      this.w = w;
      this.p = this.p5.createP("");
    }

    start() {
      if (!this.done) {
        setInterval(() => this.counter(), this.w); // counter, 100
      }
    }
    counter() {
      if (this.s < 100) {
        this.s++;
        this.p.html(this.s);
      }
    }
    reset() {
      this.s = 0;
    }
  }

  return (
    <>
      <div style={{ width: "100%", textAlign: "center", marginBottom: "2rem" }}>
        <Typography variant="logo">Motion Yoga</Typography>
      </div>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "95%",
          margin: "0 auto",
          border: "red 3px solid",
        }}
        spacing={1}
      >
        <Grid item xs={11} sx={{ width: "100%" }}>
          {/* <Sketch setup={setup} draw={draw} keyPressed={keyPressed}/> */}
          <ItemContainer>
            <ReactP5Wrapper sketch={sketch} />
          </ItemContainer>
          <Typography variant="fonts">Camera Effects</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onChange={() => {
                    if (!skeletonEffect) {
                      setSkeletonEffect(true);
                    } else {
                      setSkeletonEffect(false);
                    }
                  }}
                />
              }
              label="Skeleton"
            />
            <FormControlLabel
              control={
                <Switch
                  onChange={() => {
                    if (!rednoseEffect) {
                      setRednoseEffect(true);
                    } else {
                      setRednoseEffect(false);
                    }
                  }}
                />
              }
              label="Red Nose"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={1} sx={{ width: "100%" }}>
          <div>
            <ul>
              <li>STEP 1</li>
              <li>STEP 2</li>
              <li>STEP 3</li>
              <li>STEP 4</li>
              <li>STEP 5</li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default App;

{
  /* {currentPose === "A" ? (
              <img src="/public/pics/pos2.jpg" style={{ width: "100%" }} />
            ) : currentPose === "E" ? (
              <img src="/public/pics/posture.jpg" style={{ width: "100%" }} />
            ) : (
              <></>
            )} */
}

//   const [completeMark, setCompleteMark] = useState(false);
//   const [currentPose, setCurrentPose] = useState(null); // set every 3 seconds.
//   let poseLabel = null; //once 95% above accuracy found then label is placed. most recent classification.

//   const [progress, setProgress] = useState(0);

// useInterval(() => {
//   console.log("progress", progress);
//   setCurrentPose(poseLabel);

//   setCurrentPose((prevState) => {
//     if (prevState === null && poseLabel === todoMotionsLabels[0]) {
//       console.log("now", currentPose);
//       setCurrentPose(poseLabel);
//     }
//   });

//   setCurrentPose((prevState) => {
//     if (!prevState && prevState === poseLabel) {
//       setProgress((prevProgress) => {
//         if (prevProgress >= 100) {
//           //reset progress to 0;
//           // shift todo
//           todoMotionsLabels.shift();
//           todoMotions.shift();
//           // setCompleteMark(true);
//           return 0;
//         } else {
//           return prevProgress + 20;
//         }
//       });
//       console.log("now", currentPose);
//       return poseLabel;
//     }
//   });

//   setCurrentPose((prevState) => {
//     if (!prevState && prevState !== poseLabel) {
//       console.log("now", currentPose);
//       return poseLabel;
//     }
//   });
// }, 3000);

//   useInterval(() => {
//     setCurrentPose(poseLabel);
//     console.log("Now", currentPose);
//     setCurrentPose((prev) => {
//       if (prev === currentPose) {
//         setProgress((prev) => prev + 20);
//       }
//     });
//   }, 3000);

// <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ width: "100%" }}>
//   <div style={{ width: "100%", border: "solid 2px yellow" }}>
//     {<img src={todoPictures[0]} />}
//     <Box sx={{ width: "100%" }}>
//       <LinearProgressWithLabel value={progress} />
//       {/* <LinearProgress variant="determinate" value={progress} /> */}
//     </Box>
//   </div>
// </Grid>;

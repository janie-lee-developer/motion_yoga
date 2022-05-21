import React, { useState } from "react";

// ml5, p5
import ml5 from "ml5";
import { ReactP5Wrapper } from "react-p5-wrapper";

//p5 audio
import "./globals";
import "p5/lib/addons/p5.sound";
// import * as p5 from "p5";

// components
// import sketch from "./sketch";
import ItemContainer from "../../public/styles/style";

// mui
import {
  Grid,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const Start = (props) => {
  const [skeletonEffect, setSkeletonEffect] = useState(true);
  const [rednoseEffect, setRednoseEffect] = useState(false);

  let poseLabel = null;

  let todoPictures = [
    "/public/todo_motions/1.jpg",
    "/public/todo_motions/2.jpg",
    "/public/todo_motions/3.jpg",
  ];

  let todoLabels = ["A", "E", "D"];

  let finishedLabels = [];

  const sketch = (p5) => {
    let video;
    let img;
    let ring;
    let check;
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
      img = p5.loadImage(todoPictures[0]);
      ring = p5.loadSound("/public/ring_sound_effect/Correct-answer.mp3");
      check = p5.loadImage("/public/styles/check_lv.jpg");

      counter = new Count(p5, 0, 100, img, ring);

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

    setTimeout(() => {
      setInterval(() => {
        counter.handleClassify();
      }, 200);
    }, 500);

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
      p5.background(255);
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

      // For Red Nose Effect
      if (pose && rednoseEffect) {
        console.log("POSE FOR NOSE", pose);
        p5.fill(255, 0, 0);
        p5.ellipse(pose.nose.x, pose.nose.y, 30);
      }
      p5.pop();

      p5.image(counter.img, 751, 0, 750, 550);

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
    };
  };

  class Count {
    constructor(p5, s, w, img, ring) {
      this.p5 = p5;
      this.s = s;
      this.w = w;
      this.p = this.p5.createP("");
      this.img = img;
      this.ring = ring;
    }

    handleClassify() {
      const currentPose = poseLabel;
      console.log(
        "todo:",
        todoLabels[0],
        "current pose:",
        currentPose,
        "progress: ",
        this.s
      );
      if (currentPose === todoLabels[0]) {
        if (this.s < 100) {
          this.s += 2;
        } else {
          this.reset();
        }
      }
    }

    async reset() {
      this.ring.play();
      finishedLabels.push(todoLabels[0]);
      todoLabels.shift();
      todoPictures.shift();
      this.s = 0;
      this.img = this.p5.loadImage(todoPictures[0]);
    }
  }

  return (
    <div className="start-content">
      <div
        style={{
          width: "80%",
          margin: "1rem auto",
          textAlign: "center",
          paddingTop: "1rem",
        }}
      >
        <Typography variant="home" sx={{ fontSize: "3vw" }}>
          Follow the posture and remain until the bell rings.
        </Typography>
      </div>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: "95%",
          margin: "0 auto",
        }}
        spacing={1}
      >
        <Grid item xs={12} sx={{ width: "100%" }}>
          <ItemContainer>
            <ReactP5Wrapper sketch={sketch} />
          </ItemContainer>
        </Grid>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Typography variant="fonts">Camera Effects</Typography>
          <FormGroup>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item sx={6}>
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
              </Grid>
              <Grid item sx={6}>
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
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
};

export default Start;

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

// handlePostureAndPic() {
//   const currentPose = poseLabel;
//   console.log(
//     "todo:",
//     todoLabels[0],
//     "current pose:",
//     currentPose,
//     "progress: ",
//     progress
//   );
//   if (currentPose === todoLabels[0]) {
//     //current= A, todo=A, progress: 0
//     //current= C, todo=A
//     //current= A, todo=A, progress: 10
//     //current= A, todo=A, progress: 90
//     //current= A, todo=A, progress: 100
//     //current= A, todo=B, progress: 0
//     //current= B, todo=B, progress: 10
//     if (progress < 100) {
//       progress += 10;
//       return;
//     } else {
//       todoLabels.shift();
//       todoPictures.shift();
//       progress = 0;
//     }
//   }
// }

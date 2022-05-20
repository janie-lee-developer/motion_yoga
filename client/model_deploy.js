import React, { useState } from "react";
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
} from "@mui/material";

const App = (props) => {
  const [skeletonEffect, setSkeletonEffect] = useState(true);
  const [rednoseEffect, setRednoseEffect] = useState(false);
  const [currentPose, setCurrentPose] = useState(null);
  let poseLabel;

  useInterval(() => {
    setCurrentPose(poseLabel);
    console.log("Now", currentPose);
  }, 3000);

  const sketch = (p5) => {
    let video;
    let poseNet;
    let pose;
    let skeleton;
    let brain;

    p5.setup = () => {
      p5.createCanvas(640, 480);
      video = p5.createCapture(p5.VIDEO);
      video.size(640, 480);
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
        setTimeout(classifyPose, 100);
      }
    };

    const gotResult = (err, results) => {
      if (results[0].confidence > 0.75) {
        poseLabel = results[0].label.toUpperCase();
        console.log(poseLabel);
      }
      classifyPose();
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
      p5.translate(video.width, 0);
      p5.scale(-1, 1);
      p5.image(video, 0, 0, video.width, video.height);

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

      //   p5.fill(255, 0, 255);
      //   p5.noStroke();
      //   p5.textSize(512);
      //   p5.textAlign(p5.CENTER, p5.CENTER);
      //   p5.text(poseLabel, p5.width / 2, p5.height / 2);
    };

    // p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    //   if (props.rotation) {
    //     console.log("rotationis", props.rotation);
    //   }
    // };
  };

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
          width: "90%",
          margin: "0 auto",
          border: "red 3px solid",
        }}
        spacing={1}
      >
        <Grid item xs={12} sm={5} md={5} lg={5} xl={5} sx={{ width: "100%" }}>
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
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ width: "100%" }}>
          <div style={{ width: "100%", border: "solid 2px yellow" }}>
            {currentPose === "A" ? (
              <img src="/public/pics/pos2.jpg" style={{ width: "100%" }} />
            ) : currentPose === "E" ? (
              <img src="/public/pics/posture.jpg" style={{ width: "100%" }} />
            ) : (
              <></>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={1} md={1} lg={1} xl={1} sx={{ width: "100%" }}>
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
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ width: "100%" }}
        ></Grid>
      </Grid>
    </>
  );
};

export default App;

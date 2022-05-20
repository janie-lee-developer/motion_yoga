import React from "react";

// ml5, p5
import Sketch from "react-p5";
import ml5 from "ml5";
import { ReactP5Wrapper } from "react-p5-wrapper";
import styled from "styled-components";

// mui
import { Grid } from "@mui/material";

const ItemContainer = styled.article`
  canvas {
    width: 100% !important;
    /* min-height: 550px; */
    height: 300px !important;
    min-height: 300px !important;
  }
  @media only screen and (min-width: 600px) {
    canvas {
      min-height: 300px !important;
    }
  }
  @media only screen and (min-width: 600px) {
    canvas {
      min-height: 400px !important;
    }
  }
  @media only screen and (min-width: 1100px) {
    canvas {
      min-height: 450px !important;
    }
  }
  @media only screen and (min-width: 1300px) {
    canvas {
      min-height: 500px !important;
    }
  }
  @media only screen and (min-width: 1400px) {
    canvas {
      min-height: 550px !important;
    }
  }
  @media only screen and (min-width: 1550px) {
    canvas {
      min-height: 650px !important;
    }
  }
  @media only screen and (min-width: 1800px) {
    canvas {
      min-height: 750px !important;
    }
  }
`;
// style={{ width: "100%", maxHeight: "550px" }}
const App = (props) => {
  const sketch = (p5) => {
    let video;
    let poseNet;
    let pose;
    let skeleton;
    let brain;
    let poseLabel = "";
    let state = "waiting";
    let targetLabel;

    p5.setup = () => {
      p5.createCanvas(1500, 1350);
      video = p5.createCapture(p5.VIDEO);
      video.size(1500, 1350);
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
      }
      // console.log(results);
      // console.log(results[0].label);
      classifyPose();
    };

    const finished = () => {
      console.log("model trained");
      brain.save();
      classifyPose();
    };

    const gotPoses = (poses) => {
      // console.log(poses);
      if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;

        if (state == "collecting") {
          console.log("adding data");
          let inputs = [];
          for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;

            inputs.push(x);
            inputs.push(y);
          }
          // pressed key
          let target = [targetLabel];
          brain.addData(inputs, target);
        }
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

      if (pose) {
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

      p5.fill(255, 0, 255);
      p5.noStroke();
      p5.textSize(512);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(poseLabel, p5.width / 2, p5.height / 2);
    };
  };

  return (
    <>
      <h1>Sign lang translate App</h1>

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
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ width: "100%" }}>
          {/* <Sketch setup={setup} draw={draw} keyPressed={keyPressed}/> */}
          <ItemContainer>
            <ReactP5Wrapper sketch={sketch} />
          </ItemContainer>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} sx={{ width: "100%" }}>
          <div style={{ width: "100%", border: "solid 2px yellow" }}>
            {/* <img src="/public/pics/posture.jpg" style={{ width: "100%" }} /> */}
            <img src="/public/pics/pos2.jpg" style={{ width: "100%" }} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default App;

import React from "react";
import Sketch from "react-p5";
import ml5 from "ml5";

const DataCollection = (props) => {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let brain;
  let poseLabel = "";
  let state = "waiting";
  let targetLabel;

  const keyPressed = (p5) => {
    if (p5.key == "T") {
      brain.normalizeData();
      brain.train({ epochs: 50 }, finished);
    }
    if (p5.key == "S") {
      brain.saveData();
    } else {
      targetLabel = p5.key;
      console.log(targetLabel);
      setTimeout(() => {
        console.log("collecting");
        state = "collecting";
        setTimeout(() => {
          console.log("not collecting");
          state = "waiting";
        }, 10000);
      }, 10000);
    }
  };

  const setup = (p5) => {
    p5.createCanvas(750, 550);
    video = p5.createCapture(p5.VIDEO);
    video.size(750, 550);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

    let options = {
      inputs: 34,
      outputs: 6,
      task: "classification",
      debug: true,
    };

    brain = ml5.neuralNetwork(options);
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
    if (results[0].confidence > 0.95) {
      poseLabel = results[0].label.toUpperCase();
    }
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

  const draw = (p5) => {
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

    // p5.fill(255, 0, 255);
    // p5.noStroke();
    // p5.textSize(512);
    // p5.textAlign(p5.CENTER, p5.CENTER);
    // p5.text(poseLabel, p5.width / 2, p5.height / 2);
  };

  return (
    <>
      <h1>Build your own Motion Data App</h1>
      <div>Welcome</div>
      <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
    </>
  );
};

export default DataCollection;

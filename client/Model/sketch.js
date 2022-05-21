import ml5 from "ml5";

const sketch = (p5) => {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let brain;
  let poseLabel = "";
  let effect = "";

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

    if (pose && effect) {
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
  };

  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation) {
      console.log("rotationis", props.rotation);
    }
  };
};

export default sketch;

import React from 'react';
import Sketch from 'react-p5';
import ml5 from 'ml5';

const App = (props) => {
    let brain;

    const setup = (p5) => {
        p5.createCanvas(640, 480);
       
        let options = {
            inputs: 34,
            outputs: 6,
            task: 'classification',
            debug: true
        }

        brain = ml5.neuralNetwork(options);
        brain.loadData('/public/stretch.json', dataReady);
    }

    const dataReady = () => {
        brain.normalizeData();
        brain.train({ epochs: 100}, finished);
    }

    const finished = () => {
        console.log('model trained');
        brain.save();
    }

    return (
        <>
            <h1>Sign lang translate App</h1>
            <Sketch setup={setup} />
            <div>Welcome</div>
        </>
    );
}

export default App;
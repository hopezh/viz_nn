import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";

// import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import Card from "./Card.js";

// init vars for elements in a scene
let camera, scene, rendererCSS, rendererWebGL;
let controls, controls2;

// init list of objects
const objects = [];

// run main functions to init and animate the scene
init();
animate();

function init() {
    // [+] camera
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100000
    );
    camera.position.set(1000, 1000, 2500);

    // [+] scene
    scene = new THREE.Scene();

    // [+] grid helper
    const grid_size = 2000;
    const grid_div = 20;
    const grid_colorCenLine = "rgb(100, 100, 100)";
    const grid_colorGrid = "rgb(50, 50, 50)";
    const gridHelper = new THREE.GridHelper(
        grid_size,
        grid_div,
        grid_colorCenLine,
        grid_colorGrid
    );
    gridHelper.position.set(0, 0, 0);
    scene.add(gridHelper);

    // [+] axis helper
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    //////////////////////////////////////////////
    // TEST create card objects from Card class
    //
    //////////////////////////////////////////////
    // prettier-ignore
    for (let i = 0; i < 20; i += 1) {
        // [-] create card object

        const card = new Card(i, "card " + String(i), "96px", "96px"); 
        // [-] assign a random value to card
        card.value = Math.round(Math.random() * 1000) / 100;

        // [-] create card base div
        card.createBaseDiv();

        // [-] create a child div num for card
        card.createNumDiv();

        // [-] convert card to a css3DObject
        card.createCSS3DObj();

        // [-] add card css3DObject to scene
        card.addToScene(scene);

        // [.] change css obj position
        card.setCSSObjPosition(i * 100, 0, 0);
        // or, use:
        // card.css3DObj.position.set(i * 100, 0, 0);
        // or, use:
        // "card.css3DObj.position.x = Math.random() * 4000 - 2000;"

        // [.] change card base div style
        card.baseDiv.style.width           = card.width;
        card.baseDiv.style.height          = card.height;
        card.baseDiv.style.backgroundColor = 
            "rgba(" +
            Math.random() * 255 +
            "," +
            Math.random() * 255 +
            "," +
            Math.random() * 255 +
            "," +
            0.7 + // random alpha -> (Math.random() * 0.5 + 0.5)
            ")";
    }

    // [+] renderer

    rendererCSS = new CSS3DRenderer();
    rendererCSS.setSize(window.innerWidth, window.innerHeight);
    rendererCSS.domElement.style.position = "absolute";
    rendererCSS.domElement.style.top = "0px";
    document.getElementById("container").appendChild(rendererCSS.domElement);

    rendererWebGL = new THREE.WebGLRenderer({ antialias: true });
    rendererWebGL.setPixelRatio(window.devicePixelRatio);
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendererWebGL.domElement);

    // [+] controls
    const controls = new OrbitControls(camera, rendererCSS.domElement);

    // [+] window event listener
    window.addEventListener("resize", onWindowResize, false);
}

// [+] onWindowResize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendererCSS.setSize(window.innerWidth, window.innerHeight);
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
    // render();
}

// [+] animate
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    // controls.update();
    render();
}

// [+] render
function render() {
    rendererCSS.render(scene, camera);
    rendererWebGL.render(scene, camera);
}

// TEST tensorflow.js
// import * as tf from "@tensorflow/tfjs";

// // Define a model for linear regression.
// const model = tf.sequential();
// model.add(
//     tf.layers.dense({
//         units: 1,
//         inputShape: [1],
//     })
// );

// model.compile({
//     loss: "meanSquaredError",
//     optimizer: "sgd",
// });

// // Generate some synthetic data for training.
// const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
// const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// // Train the model using the data.
// // prettier-ignore
// model.fit(
//     xs,
//     ys,
//     { epochs: 10 }
// ).then(() => {
//     // Use the model to do inference on a data point the model hasn't seen before:
//     model.predict(tf.tensor2d([5], [1, 1])).print();
//     // Open the browser devtools to see the output
// });

// TEST conver TF tensor to JS array
// const tensor_arr = tf
//     .tensor([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 2])
//     .arraySync();
// // cosnt val = tensor.dataSync();
// // const arr = tensor.arraySync();
// // console.log(val);
// console.log("tensor_array \t\t:", tensor_arr);
// console.log("tensor_array[0] \t:", tensor_arr[0]);
// console.log("tensor_array[1] \t:", tensor_arr[1]);
// console.log("tensor_array[0][2] \t:", tensor_arr[0][2]);
// console.log("tensor_array[0][2][1] \t:", tensor_arr[0][2][1]);

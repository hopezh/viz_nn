import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import * as tf from "@tensorflow/tfjs";

import Card from "./Card.js";

// init vars for elements in a scene
let camera, scene, rendererCSS3D, rendererWebGL;
let controlsCSS, controlsWebGL;
let stats;
let gui;

// run main functions to init and animate the scene
init();
animate();

function init() {
    // [+] scene
    scene = new THREE.Scene();

    // [+] camera
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100000
    );
    camera.position.set(500, 1000, 2500);

    // [+] lights

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

    // card size param
    // let cardWidth = 90;
    // let cardHeight = 90;

    //////////////////////////////////////////////
    // TEST create tensor
    //////////////////////////////////////////////

    const a = tf.randomNormal([2, 3, 2]);
    // console.log("tensor a   \t:", a);
    // console.log("shape of a \t:", a.shape);
    // console.log("dim of a   \t:", a.shape.length);
    // console.log("size of a  \t:", a.size);
    // console.log("dtype of a \t:", a.dtype);
    // a.print();

    // a.array().then((array) => console.log("a.array() :\n", array));
    // a.data().then((data) => console.log("a.data() :\n", data));
    // console.log("a.arraySync() :\n", a.arraySync());
    // console.log("a.dataSync() :\n", a.dataSync());

    // const b = new Array(2, 2);
    // console.log("b : ", b);

    //////////////////////////////////////////////
    // TEST create card objects from Card class
    //
    //////////////////////////////////////////////

    const Cards = [];
    const cardInitWidth = 96;
    const cardInitHeight = 96;

    for (let i = 0; i < a.size; i += 1) {
        // [-] create card object
        const card = new Card(
            i,
            "card " + String(i),
            String(cardInitWidth) + "px",
            String(cardInitHeight) + "px"
        );

        // [-] assign a random value to card
        // card.value = Math.round(Math.random() * 1000) / 100;
        card.value = a.dataSync()[i];
        // a.data().then((data) => {
        //     card.value = data[i];
        // }); // synchronous method
        // console.log(card.value);

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
        card.baseDiv.style.width = card.width;
        card.baseDiv.style.height = card.height;
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

        Cards.push(card);
    }

    // console.log("Cards \t:", Cards);

    // for (const card of Cards) {
    //     // console.log(card);
    //     card.setWidth(10);
    // }

    // [+] renderers
    // [-] css3D renderer
    rendererCSS3D = new CSS3DRenderer();
    rendererCSS3D.setSize(window.innerWidth, window.innerHeight);
    rendererCSS3D.domElement.style.position = "absolute";
    rendererCSS3D.domElement.style.top = "0px";
    document.getElementById("container").appendChild(rendererCSS3D.domElement);
    // [-] webgl renderer
    rendererWebGL = new THREE.WebGLRenderer({ antialias: true });
    rendererWebGL.setPixelRatio(window.devicePixelRatio);
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendererWebGL.domElement);

    // [+] controls
    const controlsCSS = new OrbitControls(camera, rendererCSS3D.domElement);

    // [+] stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    // [+] GUI
    // [-] gui params
    const guiParams = {
        cardWidth: cardInitWidth,
        cardHeight: cardInitHeight,
    };

    // [-] create gui
    gui = new GUI({ width: 300 });
    // [-] add gui items and onChange func
    gui.add(guiParams, "cardWidth", 10, 100, 1).onChange(function (value) {
        Cards.forEach(function (item, index) {
            // console.log(item);
            item.setWidth(value);
        });
    });

    gui.add(guiParams, "cardHeight", 10, 100, 1).onChange(function (value) {
        Cards.forEach(function (item, index) {
            // console.log(item);
            item.setHeight(value);
        });
    });

    // [+] window event listener
    window.addEventListener("resize", onWindowResize, false);
}

// [+] onWindowResize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendererCSS3D.setSize(window.innerWidth, window.innerHeight);
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
    // render();
}

// [+] animate
function animate() {
    requestAnimationFrame(animate);
    // TWEEN.update();
    render();
    stats.update();
}

// [+] render
function render() {
    rendererCSS3D.render(scene, camera);
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

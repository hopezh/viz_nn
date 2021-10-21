// [#] import modules
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";

import * as tf from "@tensorflow/tfjs";

import Util from "./Util.js";

import Card from "./Card.js";
import { tensor } from "@tensorflow/tfjs-core";

// [#] init vars
let camera, scene, rendererCSS3D, rendererWebGL;
let controlsCSS, controlsWebGL;
let stats;
let gui;
let cardWidth = 96; 
let cardHeight = 96; 
let cardSpacingH = 8;
let cardSpacingV = 8; 
const Cards = [];
const targets = {
    table: [],
    sphere: [],
    helix: [],
    grid: [],
    column: [],
    row: [],
    random: [],
};
let duration = 2000;

// [#] run main functions
init();
animate();

// [#] init
function init() {
    // [+] scene
    scene = new THREE.Scene();
    // scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    // scene.fog = new THREE.Fog(scene.background, 1, 5000);

    // [+] camera
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100000
    );
    camera.position.set(1000, 2000, 3000);

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
    axesHelper.position.set(-1000, -0, -1000);
    scene.add(axesHelper);

    //////////////////////////////////////////////
    // [T] create tensor
    //////////////////////////////////////////////

    const tensor = tf.randomNormal([3, 4, 5]);
    // console.log("tensor a   \t:", a);
    // console.log('type of a \t:', typeof(a));
    console.log("shape of tensor \t:", tensor.shape);
    // console.log("dim of a   \t:", a.shape.length);
    console.log("size of tensor \t:", tensor.size);
    // console.log("dtype of a \t:", a.dtype);
    // a.print();

    // a.array().then((array) => console.log("a.array() :\n", array));
    // a.data().then((data) => console.log("a.data() :\n", data));
    // console.log("a.arraySync() :\n", a.arraySync());
    // console.log("a.dataSync() :\n", a.dataSync());

    //////////////////////////////////////////////
    // [T] create card objects from Card class
    //////////////////////////////////////////////

    const cardInitWidth = 96;
    const cardInitHeight = 96;

    // [+] create Cards
    for (let i = 0; i < tensor.size; i += 1) {
        // [-] create card object
        const card = new Card(i, "card " + String(i));

        // [-] assign a random value to card
        // card.value = Math.round(Math.random() * 1000) / 100;
        card.value = tensor.dataSync()[i];
        // a.data().then((data) => {
        //     card.value = data[i];
        // }); // synchronous method
        // console.log(card.value);

        // [-] create card base div
        card.createBaseDiv();

        // [-] create a child div num for card
        card.createNumDiv();

        // [-] creat a css3DObject for card
        card.createCSS3DObj();

        // [-] add card css3DObject to scene
        card.addToScene(scene);

        // [.] change card position
        // place cards in a row
        // card.setPosition(i * 100, 0, 0);
        // or, use:
        // card.css3DObj.position.set(i * 100, 0, 0);
        // or, use:
        // "card.css3DObj.position.x = Math.random() * 4000 - 2000;"

        // [.] change card style
        card.baseDiv.style.width = String(cardInitWidth) + "px";
        card.baseDiv.style.height = String(cardInitHeight) + "px";
        card.baseDiv.style.backgroundColor =
            "rgba(" +
            Math.random() * 255 +
            "," +
            Math.random() * 255 +
            "," +
            Math.random() * 255 +
            "," +
            0.8 + // random alpha -> (Math.random() * 0.5 + 0.5)
            ")";

        Cards.push(card);
    }

    // [+] reshpae Cards array
    // const CardsReshaped = Util.reshapeArr(Cards, tensor.shape);
    // console.log('shape of CardsReshaped :', Util.getShape(CardsReshaped));

    // const shift = 0;
    // for (let i = 0; i < tensor.shape[0]; i++) {
    //     for (let j = 0; j < tensor.shape[1]; j++) {
    //         for (let k = 0; k < tensor.shape[2]; k++) {
    //             CardsReshaped[i][j][k].setPosition(
    //                 k * 100 + i * shift,
    //                 j * 100 + i * shift,
    //                 -i * 300
    //             );
    //         }
    //     }
    // }

    // [+] layouts
    // [-] grid

    for (let i = 0; i < tensor.shape[0]; i++) {
        for (let j = 0; j < tensor.shape[1]; j++) {
            for (let k = 0; k < tensor.shape[2]; k++) {
                const anchor = new THREE.Object3D();

                anchor.position.x = k * 100;
                anchor.position.y = -j * 100;
                anchor.position.z = -i * 300;

                targets.grid.push(anchor);
            }
        }
    }

    // [-] row
    for (let i = 0; i < tensor.size; i++) {
        const anchor = new THREE.Object3D();

        anchor.position.set(i * 100, 0, 0);

        targets.row.push(anchor);
    }

    // [-] column
    for (let i = 0; i < tensor.size; i++) {
        const anchor = new THREE.Object3D();

        anchor.position.set(0, -i * 100, 0);

        targets.column.push(anchor);
    }

    // [+] button behavior
    // [-] grid button
    const buttonGrid = document.getElementById("grid");
    buttonGrid.addEventListener(
        "click",
        function () {
            transform(targets.grid, duration);
        },
        false
    );

    // [-] row button`
    const buttonRow = document.getElementById("row");
    buttonRow.addEventListener(
        "click",
        function () {
            transform(targets.row, duration);
        },
        false
    );

    // [-] column button`
    const buttonColumn = document.getElementById("column");
    buttonColumn.addEventListener(
        "click",
        function () {
            transform(targets.column, 3000);
        },
        false
    );

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
    // rendererWebGL.shadowMap.enabled = true;

    // [+] controls
    const controlsCSS = new OrbitControls(camera, rendererCSS3D.domElement);

    // [+] stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    // [+] GUI
    // [-] gui params
    // prettier-ignore
    const guiParams = {
        _cardWidth   : cardWidth,
        _cardHeight  : cardHeight,
        _cardSpacingH: cardSpacingH,
        _cardSpacingV: cardSpacingV,
    };

    // [-] create gui
    gui = new GUI({ width: 300 });
    const cardFolder = gui.addFolder("Card");
    cardFolder.open();

    // [-] add gui items and onChange func
    cardFolder
        .add(guiParams, "_cardWidth", 10, 100, 1)
        .onChange(function (value) {
            cardWidth = value; 
            Cards.forEach(function (item, index) {
                // console.log(item);
                item.setWidth(cardWidth);
            });
        });

    cardFolder
        .add(guiParams, "_cardHeight", 10, 100, 1)
        .onChange(function (value) {
            cardHeight = value;
            Cards.forEach(function (item, index) {
                // console.log(item);
                item.setHeight(cardHeight);
            });
        });

    cardFolder
        .add(guiParams, "_cardSpacingH", 0, 100, 1)
        .onChange(function (value) {
            cardSpacingH = value;
        });

    // [+] window event listener
    window.addEventListener("resize", onWindowResize, false);
}

// [#] transform
function transform(targets, duration) {
    TWEEN.removeAll();

    for (let i = 0; i < Cards.length; i++) {
        const object = Cards[i].css3DObj;

        const target = targets[i];

        new TWEEN.Tween(object.position)
            .to(
                {
                    x: target.position.x,
                    y: target.position.y,
                    z: target.position.z,
                },
                (i / 100) * duration + duration
            )
            .easing(TWEEN.Easing.Linear.None)
            .start();

        new TWEEN.Tween(object.rotation)
            .to(
                {
                    x: target.rotation.x,
                    y: target.rotation.y,
                    z: target.rotation.z,
                },
                (i / 100) * duration + duration
            )
            .easing(TWEEN.Easing.Linear.None)
            .start();
    }

    new TWEEN.Tween(this)
        .to({}, duration * 5)
        .onUpdate(render)
        .start();
}

// [#] onWindowResize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendererCSS3D.setSize(window.innerWidth, window.innerHeight);
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
}

// [#] animate
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    render();
    stats.update();
}

// [#] render
function render() {
    rendererCSS3D.render(scene, camera);
    rendererWebGL.render(scene, camera);
}

//////////////////////////////////////////////
// [T] tensorflow.js
//////////////////////////////////////////////

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

//////////////////////////////////////////////
// [T] conver TF tensor to JS array
//////////////////////////////////////////////
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

// const A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// const shape = [4, 3];
// console.log(JSON.stringify(Util.reshapeArr2(A, [6])));
// console.log(JSON.stringify(Util.reshapeArr2(A, shape.slice(0, -1))));
// console.log(JSON.stringify(Util.reshapeArr(A, shape)));

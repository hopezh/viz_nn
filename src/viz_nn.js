// [#] import modules
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import * as tf from "@tensorflow/tfjs";

import Card from "./Card.js";

// [#] init vars for elements in a scene
let camera, scene, rendererCSS3D, rendererWebGL;
let controlsCSS, controlsWebGL;
let stats;
let gui;

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
    camera.position.set(500, 1000, 2500);

    // [+] lights
    // [-] hemisphere light
    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    // hemiLight.color.setHSL(0.6, 1, 0.6);
    // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    // hemiLight.position.set(0, 0, 0);
    // scene.add(hemiLight);

    // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    // scene.add(hemiLightHelper);

    // [-] directional light
    // const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    // dirLight.color.setHSL(0.1, 1, 0.95);
    // dirLight.position.set(-20, 10, 10);
    // dirLight.position.multiplyScalar(30);
    // scene.add(dirLight);

    // dirLight.castShadow = true;

    // dirLight.shadow.mapSize.width = 2048;
    // dirLight.shadow.mapSize.height = 2048;

    // const d = 200;

    // dirLight.shadow.camera.left = -d;
    // dirLight.shadow.camera.right = d;
    // dirLight.shadow.camera.top = d;
    // dirLight.shadow.camera.bottom = -d;

    // dirLight.shadow.camera.far = 5000;
    // dirLight.shadow.bias = -0.0001;

    // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    // scene.add(dirLightHelper);

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

    // [+] plane helper
    // const plane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 3 );
    // const helper = new THREE.PlaneHelper( plane, 1000, 0xffff00 );
    // scene.add( helper );

    // [+] box
    // let geometry = new THREE.BoxGeometry(100, 100, 100);
    // let material = new THREE.MeshPhongMaterial({
    //     color: 0xff0000,
    //     shininess: 150,
    //     specular: 0x222222,
    // });
    // let cube = new THREE.Mesh(geometry, material);
    // cube.position.set(-200, 100, 200);
    // cube.castShadow = true;
    // cube.receiveShadow = true;
    // scene.add(cube);

    // [+] ground
    // const groundGeo = new THREE.PlaneGeometry(2000, 2000);
    // const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // groundMat.color.setHSL(0.095, 1, 0.75);

    // const ground = new THREE.Mesh(groundGeo, groundMat);
    // ground.position.y = -10;
    // ground.rotation.x = -Math.PI / 2;
    // ground.receiveShadow = true;
    // scene.add(ground);

    // [+] skydome
    // const vertexShader = document.getElementById("vertexShader").textContent;
    // const fragmentShader =
    //     document.getElementById("fragmentShader").textContent;
    // const uniforms = {
    //     topColor: { value: new THREE.Color(0x0077ff) },
    //     bottomColor: { value: new THREE.Color(0xffffff) },
    //     offset: { value: 33 },
    //     exponent: { value: 0.6 },
    // };
    // uniforms["topColor"].value.copy(hemiLight.color);

    // scene.fog.color.copy(uniforms["bottomColor"].value);

    // const skyGeo = new THREE.SphereGeometry(4000, 32, 15);
    // const skyMat = new THREE.ShaderMaterial({
    //     uniforms: uniforms,
    //     vertexShader: vertexShader,
    //     fragmentShader: fragmentShader,
    //     side: THREE.BackSide,
    // });

    // const sky = new THREE.Mesh(skyGeo, skyMat);
    // scene.add(sky);

    //////////////////////////////////////////////
    // TEST create tensor
    //////////////////////////////////////////////

    const a = tf.randomNormal([2, 3, 2]);
    // console.log("tensor a   \t:", a);
    // console.log('type of a \t:', typeof(a));
    // console.log("shape of a \t:", a.shape);
    // console.log("dim of a   \t:", a.shape.length);
    // console.log("size of a  \t:", a.size);
    // console.log("dtype of a \t:", a.dtype);
    // a.print();

    // a.array().then((array) => console.log("a.array() :\n", array));
    // a.data().then((data) => console.log("a.data() :\n", data));
    // console.log("a.arraySync() :\n", a.arraySync());
    // console.log("a.dataSync() :\n", a.dataSync());

    //////////////////////////////////////////////
    // TEST create card objects from Card class
    //////////////////////////////////////////////

    const Cards = [];
    const cardInitWidth = 96;
    const cardInitHeight = 96;

    for (let i = 0; i < a.size; i += 1) {
        // [-] create card object
        const card = new Card(i, "card " + String(i));

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

        // [.] change card position
        card.setPosition(i * 100, 0, 0);
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
    // rendererWebGL.shadowMap.enabled = true;

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
    render();
    stats.update();
}

// [#] render
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

// [#] import modules
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { Vector3 } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import * as tf from "@tensorflow/tfjs";
// import { tensor } from "@tensorflow/tfjs-core";

import Util from "./src/Util.js";

import Stack from "./src/Stack.js";

// ============================================================
// [#] init vars
let scene;
let cameraPerspective;
let rendererWebGL;
let controlsWebGL;
let stats;
let gui;

let mesh;
const amount = 10;
const count = Math.pow(amount, 3);
const color = new THREE.Color();

// ============================================================
// [#] main functions
init();
animate();

// ============================================================
// [#] init
function init() {
    // [+] scene
    scene = new THREE.Scene();

    // [+] camera
    // [-] perspective camera
    cameraPerspective = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100000
    );
    cameraPerspective.position.set(10, 20, 30);

    // [+] light
    // [-] direction light
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(10, 10, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);
    // [.] dir light helper
    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 1);
    scene.add(dirLightHelper); 

    // [.] shadow properties
    dirLight.shadow.mapSize.width = 512; // default
    dirLight.shadow.mapSize.height = 512; // default
    dirLight.shadow.camera.near = 0.5; // default
    dirLight.shadow.camera.far = 500; // default

    // [-] ambient light
    const ambLight = new THREE.AmbientLight(0x555555, 0.5);
    scene.add(ambLight);

    // [+] helper
    // [-] grid helper
    const grid_size = 20;
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

    // [-] axis helper
    const axesHelper = new THREE.AxesHelper(2);
    axesHelper.position.set(-10, 0, -10);
    scene.add(axesHelper);

    // [-] plane helper
    // const planeOrigin = new THREE.Vector3(0, 1, 0);
    // const plane = new THREE.Plane(planeOrigin);
    // const planeHelper = new THREE.PlaneHelper(plane, 20, 0x0000ff);
    // scene.add(planeHelper);

    // [+] renderers
    // [-] webgl renderer
    rendererWebGL = new THREE.WebGLRenderer({ antialias: true });
    rendererWebGL.setPixelRatio(window.devicePixelRatio);
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(rendererWebGL.domElement);
    rendererWebGL.shadowMap.enabled = true;
    rendererWebGL.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // [+] controls
    const controlsCSS = new OrbitControls(
        cameraPerspective,
        rendererWebGL.domElement
    );

    // const dirLightControl = new TransformControls(cameraPerspective, rendererWebGL.domElement);
    // dirLightControl.attach(dirLight);
    // scene.add(dirLightControl);
    

    // [+] stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    // [+] window event listener
    window.addEventListener("resize", onWindowResize, false);

    // [+] geometry
    //Create a sphere that cast shadows (but does not receive them)
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
        // flatShading: true,
        shadowSide: THREE.DoubleSide,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = true; //default
    scene.add(sphere);

    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    planeGeometry.rotateX(-Math.PI / 2);
    planeGeometry.translate(0, -5, 0);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    planeMaterial.side = THREE.DoubleSide;
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add(plane);

    // [+] create rounded rect shape
    // [-] create rounded rect
    const roundedRectShape1 = new THREE.Shape();

    Util.roundedRect(roundedRectShape1, 0, 0, 0.7, 0.7, 0.2);

    // [-] addShape
    // const roundedRectMesh1 = Util.addShape(
    //     roundedRectShape1,
    //     0xffff00,
    //     0,
    //     0,
    //     0,
    //     -Math.PI / 2,
    //     0,
    //     0,
    //     1
    // );
    // const roundedRectMesh2 = Util.addShape(roundedRectShape2, 0x00ff00, 100, 0, 0, 0, 0, 0, 1);

    // [-] create instancedMesh base
    const material = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide,
        flatShading: true,
        // shadowSide: THREE.DoubleSide,
        opacity: 0.6,
        transparent: true,
    });
    // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // mesh = new THREE.InstancedMesh(roundedRectMesh1, material, count);
    const geometry = new THREE.ShapeGeometry(roundedRectShape1);
    mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    let i = 0;
    const offset = (amount - 1) / 2;

    const matrix = new THREE.Matrix4();

    for (let x = 0; x < amount; x++) {
        for (let y = 0; y < amount; y++) {
            for (let z = 0; z < amount; z++) {
                matrix.setPosition(offset - x, offset - y, offset - z);

                mesh.setMatrixAt(i, matrix);
                mesh.setColorAt(i, color);

                i++;
            }
        }
    }

    scene.add(mesh);
}

// ============================================================
// [#] onWindowResize
function onWindowResize() {
    cameraPerspective.aspect = window.innerWidth / window.innerHeight;
    cameraPerspective.updateProjectionMatrix();
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
}

// ============================================================
// [#] animate
function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

// ============================================================
// [#] render
function render() {
    // rendererCSS3D.render(scene, camera);
    rendererWebGL.render(scene, cameraPerspective);
}

// ============================================================
// [T] Test
// create a random tensor
// const tensor = tf.randomNormal([3, 4, 5]);
// tensor.print();

// console.log(tensor.constructor.name == "Tensor");

// const s2 = new Stack(42, tensor);

// const s2_tensor = s2.tensor;
// console.log("s2, tensor : ", s2_tensor);
// console.log("s2, tensor, shape : ", s2_tensor.shape);

// const s2_arr = s2.getArr();
// console.log("s2, arr : ", s2_arr);

// const s2_tensorReshaped = s2_tensor.reshape([12, 5]);

// s2.tensor = s2_tensorReshaped;
// console.log(s2.tensor.shape);

import * as THREE from "three";

import { Vector3 } from "three";

import * as tf from "@tensorflow/tfjs";
// import { tensor } from "@tensorflow/tfjs-core";

import Util from "./src/Util.js";

import Stack from "./src/Stack.js";

// ----------------------------------------------------------------

// create a random tensor
const tensor = tf.randomNormal([3, 4, 5]);
tensor.print();

// console.log(tensor.constructor.name == "Tensor");

const s2 = new Stack(42, tensor);

// const s2_tensor = s2.tensor;
// console.log("s2, tensor : ", s2_tensor);
// console.log("s2, tensor, shape : ", s2_tensor.shape);

// const s2_arr = s2.getArr();
// console.log("s2, arr : ", s2_arr);

// const s2_tensorReshaped = s2_tensor.reshape([12, 5]);

// s2.tensor = s2_tensorReshaped;
// console.log(s2.tensor.shape);

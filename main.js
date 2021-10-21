import { Vector3 } from "three";

import * as tf from "@tensorflow/tfjs";
// import { tensor } from "@tensorflow/tfjs-core";

import Util from "./src/Util.js";

import Stack from "./src/Stack.js";

// ----------------------------------------------------------------

const tensor = tf.randomNormal([3, 4, 5]);
tensor.print();

const arrFromTensor = Util.tensor3DToArr3D(tensor);
console.log("arrFromTensor \t: ", arrFromTensor);

let stackId = 100;
let stackArr = arrFromTensor;
let stackShape = tensor.shape;
let stackOrigin = new Vector3(1000, 0, 0);

const stack_01 = new Stack(stackId, stackArr, stackShape, stackOrigin);
console.log("stack_01 init \t: ", stack_01);

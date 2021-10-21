// [+] import modules
import * as THREE from "three";
import { Vector3 } from "three";

import * as tf from "@tensorflow/tfjs";
import { tensor } from "@tensorflow/tfjs-core";

import Card from "./Card.js";

import Util from "./Util.js";

export default class Stack {
    // [+] constructor
    constructor(_idx, _arr, _origin) {
        this.idx = _idx;
        this.arr = _arr;
        this.origin = _origin;
    }
}

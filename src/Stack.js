// [+] import modules
import { Tensor } from "@tensorflow/tfjs-core";
import * as THREE from "three";
import { Vector3 } from "three";

// import * as tf from "@tensorflow/tfjs";
// import { tensor } from "@tensorflow/tfjs-core";

import Card from "./Card.js";

import Util from "./Util.js";

export default class Stack {
    // [+] constructor
    /**
     * represents a stack
     * @constructor 
     * @param {number}  _idx        index of the stack
     * @param {Tensor}  _tensor     a TensorFlow Tensor
     * @param {Vector3} _origin     original position
     * @param {Card}    _cards      cards in the stack   
     */
    // prettier-ignore
    constructor(_idx, _tensor, _origin, _cards) {
        this.idx    = _idx;
        this.tensor = _tensor;
        this.origin = _origin;
        this.cards  = _cards;
    }

    getArr() {
        this.arr = this.tensor.arraySync();
        return this.arr;
    }

    createCards() {}

    setCardPosition() {}

    // [+] add stack to scene
    addToScene(scene) {
        scene.add(this.cards);
    }
}
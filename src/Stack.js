// [+] import modules
import * as THREE from "three";
import { Vector3 } from "three";

// import * as tf from "@tensorflow/tfjs";
// import { tensor } from "@tensorflow/tfjs-core";

import Card from "./Card.js";

import Util from "./Util.js";

export default class Stack {
    // [+] constructor
    // prettier-ignore
    constructor(_idx, _arr, _shape, _origin, _cards) {
        this.idx    = _idx;
        this.arr    = _arr;
        this.shape  = _shape;
        this.origin = _origin;
        this.cards  = _cards;
    }

    createCards() {}

    setCardPosition() {}

    // [+] add stack to scene
    addToScene(scene) {
        scene.add(this.cards);
    }
}

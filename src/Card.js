// [+] import modules
import * as THREE from "three";

import { Vector3 } from "three";

import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default class Card {
    // [+] constructor
    constructor(_idx, _name, _value) {
        this.idx = _idx;
        this.name = _name;
        this.value = _value;
    }

    // [+] create a base div
    createBaseDiv() {
        this.baseDiv = document.createElement("div");
        this.baseDiv.className = "cardBase";
    }

    // [+] create a child div for number
    createNumDiv() {
        this.numDiv = document.createElement("div");
        this.numDiv.className = "cardNum";
        this.numDiv.textContent = this.value;
        this.baseDiv.appendChild(this.numDiv);
    }

    // [+] create CSS3DObject
    createCSS3DObj() {
        this.css3DObj = new CSS3DObject(this.baseDiv);
    }

    // [+] set position of CSS3DObject
    setPosition(x, y, z) {
        this.css3DObj.position.set(x, y, z);
    }

    // [+] add card css3dobj to scene
    addToScene(scene) {
        scene.add(this.css3DObj);
    }

    // [+] set base div width
    setWidth(width) {
        this.baseDiv.style.width = String(width) + "px";
    }

    // [+] set base div height
    setHeight(height) {
        this.baseDiv.style.height = String(height) + "px";
    }
}

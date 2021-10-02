import * as THREE from "three";
import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default class Card {
    // [+] constructor
    constructor(_name, _width, _height, _posx, _posy, _posz, _value) {
        this.name = _name;

        this.width = _width;
        this.height = _height;

        this.posx = _posx;
        this.posy = _posy;
        this.posz = _posz;

        this.value = _value;
    }

    // [+] create a base div
    createBase() {
        this.base = document.createElement("div");
        this.base.className = "cardBase";
        this.base.style.backgroundColor = "rgba(0, 127, 127, O.5)";
    }

    // [+] create a child div for number
    createNumber() {
        this.number = document.createElement("div");
        this.number.className = "cardNumber";
        this.number.textContent = this.value;
        this.base.appendChild(this.number);
    }

    // [+] create CSS3DObject
    createCSS3DObj() {
        this.css3DObj = new CSS3DObject(this.base);
        this.css3DObj.position.x = 0;
        this.css3DObj.position.y = 0;
        this.css3DObj.position.z = 0;
    }

    // [+] add card css3dobj to scene
    addToScene(scene) {
        scene.add(this.css3DObj);
    }
}

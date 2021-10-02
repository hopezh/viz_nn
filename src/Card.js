import * as THREE from "three";
import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default class Card {
    // [+] constructor
    constructor(name, width, height, posx, posy, posz, value) {
        this.name = name;

        this.width = width;
        this.height = height;

        this.posx = posx;
        this.posy = posy;
        this.posz = posz;

        this.value = value;
    }

    // [+] create a base div
    createBase() {
        this.base = document.createElement("div");
        this.base.className = "cardBase";
        this.base.style.backgroundColor =
            "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";
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
        this.css3DObj            = new CSS3DObject(this.base);
        this.css3DObj.position.x = 0;
        this.css3DObj.position.y = 0;
        this.css3DObj.position.z = 0;
    }

    // [+] add card css3dobj to scene
    addToScene(scene) {
        scene.add(this.css3DObj);
    }

    // createAndAddCSS3DObj(){
    //     this.cssObj = new CSS3DObject( this.card );
    //     this.cssObj.position.x = Math.random() * 4000 - 2000;
    //     this.cssObj.position.y = Math.random() * 4000 - 2000;
    //     this.cssObj.position.z = Math.random() * 4000 - 2000;

    //     scene.add(this.cssObj);
    // }
}

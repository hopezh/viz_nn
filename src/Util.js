import * as tf from "@tensorflow/tfjs";

export default class Util {
    // [+] reshape array (opt 1)
    static reshapeArr(_arr, shape) {
        let arr = _arr;
        // [ref] https://stackoverflow.com/a/69584753/3776170
        let elemIndex = 0;

        if (!shape || !arr) return [];

        function _nest(dimIndex) {
            let result = [];

            if (dimIndex === shape.length - 1) {
                result = result.concat(
                    arr.slice(elemIndex, elemIndex + shape[dimIndex])
                );
                elemIndex += shape[dimIndex];
            } else {
                for (let i = 0; i < shape[dimIndex]; i++) {
                    result.push(_nest(dimIndex + 1));
                }
            }

            return result;
        }
        return _nest(0);
    }

    // [+] reshape array (opt 2)
    // [-] the reshape function
    // note that the input "shape" doesn't include the last dimension
    // ...i.e. [2, 3], or [3], should be used,
    // ...instead of [2, 3, 2], or [3, 4], for a flattened array of 12 elements
    // prettier-ignore
    static reshapeArr2(arr, shape) { 
        if (shape.length < 1) 
            return arr;
        else
            return this.cut(arr, arr.length / shape[0])
            .map(
                (r) => this.reshapeArr2(r, shape.slice(1))
            );
    }

    // [-] the cut function
    // [ref] https://stackoverflow.com/a/69588900/3776170
    // prettier-ignore
    static cut(arr, n) {
        if (n >= arr.length) 
            return [arr];
        else 
            return [arr.slice(0, n), 
                    ...this.cut(arr.slice(n), n)
            ];
    }

    // [+] get array shape
    // [ref] https://stackoverflow.com/a/10253903/3776170
    static getShape(a) {
        var shape = [];
        for (;;) {
            shape.push(a.length);
            if (Array.isArray(a[0])) {
                a = a[0];
            } else {
                break;
            }
        }
        return shape;
    }

    // [+] get array size
    // [ref] https://stackoverflow.com/a/67578497/3776170
    static getSize(a) {
        var size = a.join(",").split(",").length;
        return size;
    }

    // [T] create 2D array from flat array
    // [ref] https://stackoverflow.com/questions/20257889/unflatten-arrays-into-groups-of-fours
    static arrayUnflatten(_flattenedArray, _numRows) {
        const len = _flattenedArray.length;

        const unflattenedArray = [];

        while (_flattenedArray.length > 0)
            unflattenedArray.push(_flattenedArray.splice(0, _numRows));

        return unflattenedArray;
    }

    static tensor3DToArr3D(_tensor3D) {
        const arr1D = [];

        for (let i = 0; i < _tensor3D.size; i++) {
            const item = _tensor3D.dataSync()[i];
            arr1D.push(item);
        }

        const tensor3DShape = _tensor3D.shape;
        // console.log(tensor3DShape);

        const arr3D = this.reshapeArr(arr1D, tensor3DShape);

        return arr3D;
    }

    /**
     * create rounded rectangle
     * @param {Shape} shape     a THREE.Shape object
     * @param {Number} x        x position
     * @param {Number} y        y position
     * @param {Number} width    rectangle width
     * @param {Number} height   rectangle height
     * @param {Number} radius   corner radius
     */
    static roundedRect(shape, x, y, width, height, radius) {
        shape.moveTo(x, y + radius);
        shape.lineTo(x, y + height - radius);
        shape.quadraticCurveTo(x, y + height, x + radius, y + height);
        shape.lineTo(x + width - radius, y + height);
        shape.quadraticCurveTo(
            x + width,
            y + height,
            x + width,
            y + height - radius
        );
        shape.lineTo(x + width, y + radius);
        shape.quadraticCurveTo(x + width, y, x + width - radius, y);
        shape.lineTo(x + radius, y);
        shape.quadraticCurveTo(x, y, x, y + radius);
    }
}

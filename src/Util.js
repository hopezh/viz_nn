export default class Util {
    /**
     * reshape an array by the shape provided
     * @param   {Array} arr input array (1D)
     * @param   {Array} shape shape of target array
     * @returns {Array} a new array in the shape specified
     */
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
}

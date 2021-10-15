export default class Util {
    /**
     * reshape an array by the shape provided
     * @param   {Array} arr input array (1D)
     * @param   {Array} shape shape of target array
     * @returns {Array} a new array in the shape specified
     */
    static reshapeArr(arr, shape) {
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

    // [ref] https://stackoverflow.com/a/67578497/3776170
    static getSize(a) {
        var size = a.join(",").split(",").length;
        return size;
    }

    // [ref] https://stackoverflow.com/questions/20257889/unflatten-arrays-into-groups-of-fours
    static arrayUnflatten(_flattenedArray, _numRows) {
        const len = _flattenedArray.length;

        const unflattenedArray = [];

        while (_flattenedArray.length > 0)
            unflattenedArray.push(_flattenedArray.splice(0, _numRows));

        return unflattenedArray;
    }
}

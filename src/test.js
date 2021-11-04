const myVec = tf.tensor1d([-1.2, 0, 1.9, 78]);
myVec.print();

console.log("myVec shape \t:", myVec.shape);
console.log("myVec rank  \t:", myVec.rank);
console.log("myVec data()       \t:", myVec.data());
console.log("myVec data() await \t:", await myVec.data());
console.log();

const myMatrix = tf.tensor2d([
    [1, 2, 3],
    [4, 6, 7],
]);
myMatrix.print();

console.log("myMatrix shape \t:", myMatrix.shape);
console.log("myMatrix rank  \t:", myMatrix.rank);
console.log("myMatrix data()       \t:", myMatrix.data());
console.log("myMatrix data() await \t:", await myMatrix.data());
console.log("myMatrix dataSync()   \t:", myMatrix.dataSync());

const myTensor = tf.tensor3d([
    [
        [1, 2, 3],
        [4, 5, 6],
    ],
    [
        [7, 8, 9],
        [10, 11, 12],
    ],
]);
myTensor.print();

console.log("myTensor \t:", myTensor.shape);
console.log("myTensor data() await \t:", await myTensor.data());
console.log("myTensor array() await \t:", await myTensor.array());
console.log(
    "myTensor array() await stringify \t:",
    JSON.stringify(await myTensor.array())
);

const r3Tensor = tf.tensor([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 2]);
r3Tensor.print(); 
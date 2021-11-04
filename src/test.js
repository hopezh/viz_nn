const myVec = tf.tensor1d([-1.2, 0, 1.9, 78]);
const myVec2 = tf.tensor1d([-1.2, 0, 1.9, 78]);

console.log("myVec shape \t:", myVec.shape);
console.log("myVec rank  \t:", myVec.rank);
console.log("myVec data()       \t:", myVec.data());
console.log("myVec data() await \t:", await myVec.data());
console.log("myVec dataSync()   \t:", myVec.dataSync());

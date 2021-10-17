// [+] lights
// [-] hemisphere light
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
// hemiLight.color.setHSL(0.6, 1, 0.6);
// hemiLight.groundColor.setHSL(0.095, 1, 0.75);
// hemiLight.position.set(0, 0, 0);
// scene.add(hemiLight);

// const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
// scene.add(hemiLightHelper);

// [-] directional light
// const dirLight = new THREE.DirectionalLight(0xffffff, 2);
// dirLight.color.setHSL(0.1, 1, 0.95);
// dirLight.position.set(-20, 10, 10);
// dirLight.position.multiplyScalar(30);
// scene.add(dirLight);

// dirLight.castShadow = true;

// dirLight.shadow.mapSize.width = 2048;
// dirLight.shadow.mapSize.height = 2048;

// const d = 200;

// dirLight.shadow.camera.left = -d;
// dirLight.shadow.camera.right = d;
// dirLight.shadow.camera.top = d;
// dirLight.shadow.camera.bottom = -d;

// dirLight.shadow.camera.far = 5000;
// dirLight.shadow.bias = -0.0001;

// const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
// scene.add(dirLightHelper);

// [+] plane helper
// const plane = new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 3 );
// const helper = new THREE.PlaneHelper( plane, 1000, 0xffff00 );
// scene.add( helper );

// [+] box
// let geometry = new THREE.BoxGeometry(100, 100, 100);
// let material = new THREE.MeshPhongMaterial({
//     color: 0xff0000,
//     shininess: 150,
//     specular: 0x222222,
// });
// let cube = new THREE.Mesh(geometry, material);
// cube.position.set(-200, 100, 200);
// cube.castShadow = true;
// cube.receiveShadow = true;
// scene.add(cube);

// [+] ground
// const groundGeo = new THREE.PlaneGeometry(2000, 2000);
// const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
// groundMat.color.setHSL(0.095, 1, 0.75);

// const ground = new THREE.Mesh(groundGeo, groundMat);
// ground.position.y = -10;
// ground.rotation.x = -Math.PI / 2;
// ground.receiveShadow = true;
// scene.add(ground);

// [+] skydome
// const vertexShader = document.getElementById("vertexShader").textContent;
// const fragmentShader =
//     document.getElementById("fragmentShader").textContent;
// const uniforms = {
//     topColor: { value: new THREE.Color(0x0077ff) },
//     bottomColor: { value: new THREE.Color(0xffffff) },
//     offset: { value: 33 },
//     exponent: { value: 0.6 },
// };
// uniforms["topColor"].value.copy(hemiLight.color);

// scene.fog.color.copy(uniforms["bottomColor"].value);

// const skyGeo = new THREE.SphereGeometry(4000, 32, 15);
// const skyMat = new THREE.ShaderMaterial({
//     uniforms: uniforms,
//     vertexShader: vertexShader,
//     fragmentShader: fragmentShader,
//     side: THREE.BackSide,
// });

// const sky = new THREE.Mesh(skyGeo, skyMat);
// scene.add(sky);

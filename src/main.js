import * as THREE from 'three';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/loaders/GLTFLoader.js';

// Create a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(1000, 500);
const container = document.getElementById('scene-container');
container.insertBefore(renderer.domElement, container.firstChild);

// Scene handling
scene.background = null; 
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White light with intensity of 1
scene.add(ambientLight);

// Load the GLB model
const loader = new GLTFLoader();
let model;
let rotationAngle = -Math.PI; // Initial rotation angle
let rotationSpeed = 0.01; // Speed of rotation
let rotationDirection = 1; // 1 for clockwise, -1 for counter-clockwise
const maxRotationAngle = Math.PI; // 90 degrees in radians

loader.load('./src/assets/MacBook_Air_13_.glb', function (gltf) {
    model = gltf.scene; 
    model.scale.set(0.65, 0.65, 0.65);
    model.position.set(-1.5, -1, -3.5);
    model.rotation.y = 0

    // Set the color of the materials
    model.traverse((child) => {
        if (child.isMesh) {
            child.material.emissive.set(0x000000);
            child.material.color.set(0x47EEDC);
            child.material.metalness = 0.7; // Set metalness
            child.material.roughness = 0.1; // Set roughness
        }
    });
    scene.add(model);
}, undefined, function (error) {
    console.error('An error occurred while loading the GLB model:', error);
});

// Set camera position
camera.position.set(1, 1, 0); 
camera.lookAt(0, -1, -4);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    if (model) {
        rotationAngle += rotationSpeed * rotationDirection;
        model.rotation.y = rotationAngle;

        // Check if the rotation angle has reached the maximum threshold
        if (rotationAngle >= (-Math.PI + maxRotationAngle)) {
            rotationDirection = -1; // Change direction to rotate back
        } else if (rotationAngle <= -Math.PI) {
            rotationDirection = 1; // Change direction to rotate forward
        }
    }
    renderer.render(scene, camera);
}
animate();

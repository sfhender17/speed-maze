import * as THREE from 'three';

let scene, camera, renderer, player, pet;
let coins = 0;
let petXP = 0;
let level = 1;

document.getElementById('start-game').onclick = () => {
  document.getElementById('main-menu').style.display = 'none';
  init();
  animate();
};

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game-canvas') });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  player = new THREE.Mesh(geometry, material);
  scene.add(player);

  // Dog pet with glow
  const petGeo = new THREE.SphereGeometry(0.3, 16, 16);
  const petMat = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00 });
  pet = new THREE.Mesh(petGeo, petMat);
  pet.position.set(1, 0, 0);
  scene.add(pet);

  updateUI();
}

function updateUI() {
  document.getElementById('coins-display').textContent = coins;
  document.getElementById('level-display').textContent = level;
  document.getElementById('pet-display').textContent = 'Dog';
  document.getElementById('pet-xp-bar').value = petXP;
}

function animate() {
  requestAnimationFrame(animate);
  player.rotation.y += 0.01;
  pet.position.x = player.position.x + Math.sin(Date.now() * 0.005) * 1.5;
  pet.position.z = player.position.z + 1;

  // Simulate XP gain
  petXP += 0.1;
  if (petXP > 100) petXP = 100;
  updateUI();

  renderer.render(scene, camera);
}


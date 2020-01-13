import * as THREE from 'three';
import {
  DEBUG,
  CAMERA_Z,
  GRID_HEIGHT,
  GRID_WIDTH
} from './defaults';
import { Grid } from './grid';
import { Audio } from './audio';

function fov () {
  const ratio = window.innerWidth / window.innerHeight;
  const fovHeight = 2 * Math.atan(GRID_HEIGHT / (2 * CAMERA_Z)) * (180 / Math.PI);
  const fovWidth = 2 * Math.atan((GRID_WIDTH / ratio) / (2 * CAMERA_Z)) * (180 / Math.PI);
  const fov = fovHeight > fovWidth ? fovHeight : fovWidth;
  return fov + 5;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov(), window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

if (DEBUG) {
  const gridHelper = new THREE.AxesHelper(3);
  scene.add(gridHelper);
}

const audio = new Audio({
  url: 'https://raw.githubusercontent.com/DavidLazic/audio-visualizer/gh-pages/audio/Galimatias%20%26%20Joppe%20-%20Mintaka.mp4',
  camera
});

const grid = new Grid({
  scene,
  camera,
  renderer,
  audio
});

grid.center();
document.body.appendChild(renderer.domElement);

grid.animate()();
import * as THREE from 'three';
import {
  PRISM_SIDE,
  PRISM_HEIGHT,
  PRISM_DEPTH,
  PRISM_SPEED,
  PRISM_GUTTER,
  PRISM_STEP_X,
  PRISM_STEP_Y
} from './defaults';

const PRISM_MATERIALS = [
  new THREE.MeshBasicMaterial({ color: '#fff' }),
  new THREE.MeshBasicMaterial({ color: '#ff3029' }),
  new THREE.MeshBasicMaterial({ color: '#ffcb01' }),
  new THREE.MeshBasicMaterial({ color: '#007aff' })
];

const PRISM_SHAPE = (() => {
  const shape = new THREE.Shape();
  shape
    .moveTo(0, 0)
    .lineTo(PRISM_SIDE / 2, PRISM_HEIGHT)
    .lineTo(PRISM_SIDE, 0);

  return shape;
})();

const PRISM_GEOMETRY = (() => {
  const geo = new THREE.ExtrudeGeometry(PRISM_SHAPE, {
    depth: PRISM_DEPTH,
    bevelEnabled: false
  });

  geo.translate(-(PRISM_SIDE / 2), -(PRISM_HEIGHT / 3), 0);

  return geo;
})();

const PRISM_MESH = (() => {
  const materialMap = {
    2: 1,
    3: 1,
    4: 2,
    5: 2,
    6: 3,
    7: 3
  };

  const mesh = new THREE.Mesh(PRISM_GEOMETRY, PRISM_MATERIALS);

  mesh.rotation.x = -(Math.PI / 2);

  mesh.geometry.faces.map((face, i) => {
    if (materialMap[i]) {
      face.materialIndex = materialMap[i];
    }

    return face;
  });

  return mesh;
})();

export class Prism {

  static toState = val => {
    const vector = (val % 360 + 360) % 360;
    // console.log('VAL', val, vector);

    switch (true) {
      case (vector >= 120 && vector < 240):
        return 1;
      case (vector >= 240 && vector < 360):
        return 2;
      default:
        return 0;
    }
  }

  constructor ({ x, y }) {
    this.mesh = PRISM_MESH.clone();
    this.step = PRISM_SPEED + x / PRISM_STEP_X + y / PRISM_STEP_Y;
    this.state = {
      next: 1
    };

    if (x) {
      this.mesh.position.x = x * PRISM_SIDE + PRISM_GUTTER * x;
    }
  
    if (y) {
      this.mesh.position.y = y * PRISM_DEPTH + PRISM_GUTTER * y;
    }
  }

  next = (active, frame) => {
    const mod = frame % 3;
    const state = active
      ? mod === 0 ? 1 : mod
      : 0;

    this.state.next = state;
    return state;
  }

  animate = () => {
    const angle = THREE.Math.radToDeg(this.mesh.rotation.z + this.step);
    const current = Prism.toState(angle);
    const done = current === this.state.next;

    this.mesh.rotation.z = done ? this.mesh.rotation.z : this.mesh.rotation.z + this.step;

    return done;
  }
}
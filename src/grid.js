import * as THREE from 'three';
import { Prism } from './prism';

import {
  CAMERA_Z,
  GRID_COLUMNS,
  GRID_ROWS,
  GRID_ROW_HEIGHT
} from './defaults';

export class Grid {

  constructor ({
    scene = null,
    camera = null,
    renderer = null,
    audio = null
  }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.audio = audio;
    this.group = new THREE.Group();

    this.init();
  }

  init () {
    const matrix = [ ...new Array(GRID_COLUMNS) ].map((col, cIndex) =>
      [ ...new Array(GRID_ROWS) ].map((row, rIndex) => {
        const prism = new Prism({
          x: cIndex,
          y: rIndex
        });

        this.group.add(prism.mesh);
        return prism;
      })
    );

    this.scene.add(this.group);
    this.matrix = matrix;
  }

  computeCenter = () => {
    const center = new THREE.Vector3();
    const count = this.group.children.length;

    this.group.children.forEach(child =>
      center.add(child.position)
    );
    
    center.divideScalar(count);
    return center;
  }

  center = () => {
    const { x, y } = this.computeCenter();

    this.camera.position.z = CAMERA_Z;
    this.camera.position.x = x;
    this.camera.position.y = y;
  }

  next = frame => () => {
    const data = this.audio.data();
    const values = [ ...data.slice(0, GRID_COLUMNS) ];

    const map = values.map((val, i) => {
      const height = Math.ceil((val / GRID_ROW_HEIGHT));

      return this.matrix[i].map((item, j) =>
        item.next(j <= height, frame)
      );
    });
  }

  animate = (frame = 0) => () => {
    const animation = this.matrix.map(col =>
      col.map(item => item.animate())
    );

    if (!animation.flat().every(done => !!done)) {
      requestAnimationFrame(this.animate(frame));
    } else {
      setTimeout(() => {
        this.next(frame + 1)();
        requestAnimationFrame(this.animate(frame + 1));
      }, 1000);
    }
  
    this.renderer.render(this.scene, this.camera);
  }
}
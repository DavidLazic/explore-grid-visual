import * as THREE from 'three';
import {
  AUDIO_LOOP,
  AUDIO_VOLUME,
  AUDIO_AUTOPLAY,
  AUDIO_FFT_SIZE
} from './defaults';

export class Audio {

  constructor ({
    url = '',
    camera = null
  } = {}) {
    this.url = url;
    this.camera = camera;

    this.init();
  }

  init () {
    this
      .genListener()
      .genSound()
      .genLoader()
      .genAnalyser()

    return this;
  }

  genListener = () => {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    return this;
  }

  genSound = () => {
    this.sound = new THREE.Audio(this.listener);
    return this;
  }

  genLoader = () => {
    this.loader = new THREE.AudioLoader();

    this.loader.load(this.url, buffer => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(AUDIO_LOOP);
      this.sound.setVolume(AUDIO_VOLUME);

      if (AUDIO_AUTOPLAY) {
        this.sound.play();
      }
    });

    return this;
  }

  genAnalyser = () => {
    this.analyser = new THREE.AudioAnalyser(this.sound, AUDIO_FFT_SIZE);
    return this;
  }

  play = () => this.sound.play()

  data = () => this.analyser.getFrequencyData()
}
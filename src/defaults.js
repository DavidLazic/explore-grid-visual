export const DEBUG = false;

export const CAMERA_Z = 20;

export const PRISM_SIDE = 0.1;
export const PRISM_HEIGHT = PRISM_SIDE / 2 * Math.sqrt(3); 
export const PRISM_DEPTH = 0.3;
export const PRISM_SPEED = 0.05;
export const PRISM_GUTTER = 0.018;
export const PRISM_STEP_X = 1000;
export const PRISM_STEP_Y = 1000;

export const GRID_COLUMNS = 45;
export const GRID_ROWS = 25;
export const GRID_HEIGHT = GRID_ROWS * (PRISM_GUTTER + PRISM_DEPTH);
export const GRID_WIDTH = GRID_COLUMNS * (PRISM_GUTTER + PRISM_SIDE);
export const GRID_ROW_HEIGHT = 256 / GRID_ROWS;

export const AUDIO_LOOP = false;
export const AUDIO_VOLUME = 0.05;
export const AUDIO_AUTOPLAY = true;
export const AUDIO_FFT_SIZE = 2048;
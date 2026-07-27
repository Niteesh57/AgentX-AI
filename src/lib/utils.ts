// Shared utility helpers

/** Clamp a number between min and max */
export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

/** Map a value from one range to another */
export const mapRange = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);

/** Random float between min and max */
export const randBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/** Delay a promise by ms */
export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/** Convert lat/lng to approximate screen x/y fraction on a 2D globe projection */
export const latLngToPercent = (lat: number, lng: number): [number, number] => {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return [x, y];
};

// const fragmentShader = `
// varying vec2 vUv;

// vec3 colorA = u_colorA
// vec3 colorB = u_colorB

// void main() {
//   // "Normalizing" with an arbitrary value
//   // We'll see a cleaner technique later :)
//   vec2 normalizedPixel = gl_FragCoord.xy/2000.0;
//   vec3 color = mix(u_colorA, u_colorB, normalizedPixel.x);

//   gl_FragColor = vec4(color,1.0);
// }

// `;

// export default fragmentShader;

// const fragmentShader = `
// uniform vec3 u_colorA;
// uniform vec3 u_colorB;
// varying float vZ;

// void main() {
//   vec3 color = mix(u_colorA, u_colorB, vZ * 2.0 + 0.5);
//   gl_FragColor = vec4(color, 1.0);
// }

// `;

// export default fragmentShader;

const fragmentShader = `
uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying float vZ;


void main() {
  vec3 color = mix(u_colorA, u_colorB, vZ * 2.0 + 0.5); 
  gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;

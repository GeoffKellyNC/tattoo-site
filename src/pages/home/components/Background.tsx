import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled component for the canvas
const StyledCanvas = styled.canvas`
  width: 100%;
  height: auto;
  object-fit: contain;
    position: absolute;
    top: 0;
`;



const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const dpr = window.devicePixelRatio;
    let buffer;
    let program;
    let resolutionLocation;
    let timeLocation;
    let vertices = [];

    // Vertex shader source code
    const vertexSource = `#version 300 es
    in vec2 position;

    void main(void) {
        gl_Position = vec4(position, 0., 1.);
    }`;

    // Fragment shader source code
    const fragmentSource = `#version 300 es
    /*********
    * made by Matthias Hurrle (@atzedent)
    */
    
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    uniform vec2 resolution;
    uniform float time;
    
    #define T time
    #define S smoothstep
    
    out vec4 fragColor;
    
    float hash21(vec2 p) {
      p = fract(p * vec2(324.967, 509.314));
      p += dot(p, p + 75.09);
    
      return fract(p.x * p.y);
    }
    
    float flip(vec2 p) {
      float rand = hash21(p);
      return rand > .5 ? 1.: -1.;
    }
    
    mat2 rot(in float a) {
      float s = sin(a),
      c = cos(a);
    
      return mat2(c, -s, s, c);
    }
    
    float cLength(vec2 p, float k) {
      p = abs(p);
    
      return pow((pow(p.x, k)+pow(p.y, k)), 1./k);
    }
    
    float circle(vec2 p, vec2 c, float r, float w, float b, float s, float k) {
      float d = cLength(p - c * (p.x > -p.y ? s: -s), k);
    
      return S(b, -b, abs(d - r) - w);
    }
    
    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1., 2. / 3., 1. / 3., 3.);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6. - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, .0, 1.), c.y);
    }
    
    void main(void) {
      float t = T * .125;
      float f = .5 + .5 * sin(t);
      float zoom = 5.;
      float mn = min(resolution.x, resolution.y);
      float rhm = mn - mn * .9 * f;
      float px = zoom/rhm;
      vec2 uv = (
        gl_FragCoord.xy - .5 * resolution.xy
      ) / rhm;
    
      uv *= zoom;
      uv *= rot(T * .1);
    
      vec2 gv = fract(uv) - .5;
      vec2 id = floor(uv);
      vec2 oc = vec2(.5);
    
      gv.x *= flip(id);
    
      float sdf = circle(
        gv,
        oc,
        .5,
        .125,
        px + f * px * zoom,
        1.,
        (12. - 11. * S(.0, 1., .5+.5*cos(t)))
      );
    
      vec3 color = hsv2rgb(
        vec3(
          fract(2.-2.*f),
          1.,
          exp(log(sdf)) / (length(uv) * (1. - 1. * (f - .1)))
        )
      );
    
      fragColor = vec4(color, 1.0);
    }
    `

    // Resize function
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      gl.viewport(0, 0, width * dpr, height * dpr);
    };

    // Compile function
    const compile = (shader, source) => {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
    };

    // Setup function
    const setup = () => {
      const vs = gl.createShader(gl.VERTEX_SHADER);
      const fs = gl.createShader(gl.FRAGMENT_SHADER);

      program = gl.createProgram();

      compile(vs, vertexSource);
      compile(fs, fragmentSource);

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
      }

      vertices = [
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0
      ];

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      timeLocation = gl.getUniformLocation(program, "time");
      resolutionLocation = gl.getUniformLocation(program, 'resolution');
    };

    // Draw function
    const draw = (now) => {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      gl.uniform1f(timeLocation, now * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
    };

    // Animation loop
    const loop = (now) => {
      draw(now);
      requestAnimationFrame(loop);
    };

    // Initialize and start the animation loop
    setup();
    resize();
    loop(0);

    // Handle window resize
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <>
      <StyledCanvas ref={canvasRef} />
    </>
  );
};

export default Background;

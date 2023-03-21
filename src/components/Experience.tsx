import { Grid, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import React, { useMemo, useRef } from "react";
import vertexShader from "./shaders/vertexShader";
import { Color, Mesh } from "three";
import fragmentShader from "./shaders/fragmentShader";
import { useFrame } from "@react-three/fiber";

type Props = {};

const Experience = (props: Props) => {
  return (
    <>
      <Grid cellColor="white" args={[10, 10]} />
      <Flag />
    </>
  );
};

export default Experience;

const Flag = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>(null!);
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color("#FFE486") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1.5}
    >
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        // wireframe
      />
    </mesh>
  );
};

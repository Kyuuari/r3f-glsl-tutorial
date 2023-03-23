import { Grid, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import React, { useMemo, useRef } from "react";
import vertexShader from "./shaders/iso_vertexShaders";
import { Color, MathUtils, Mesh } from "three";
import fragmentShader from "./shaders/iso_fragmentShaders";
import { useFrame } from "@react-three/fiber";

type Props = {};

const Experience = (props: Props) => {
  return (
    <>
      <Grid cellColor="white" args={[10, 10]} />
      <Blob />
      {/* <Flag /> */}
    </>
  );
};

export default Experience;

const Blob = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>(null!);
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.5}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

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

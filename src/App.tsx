import { useState } from "react";
import "./App.css";
import Experience from "./components/Experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <Experience />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;

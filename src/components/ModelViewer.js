'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center } from '@react-three/drei';
import Image from "next/image";

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return (
    <Center>
      <group scale={[0.12, 0.12, 0.12]} position={[0, -1.1, 0]}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function ModelViewer({ modelPath = '/models/keyassembly03.glb' }) {
  const [modelHovered, setModelHovered] = useState(false);

  // Preload the model
  React.useEffect(() => {
    useGLTF.preload(modelPath);
  }, [modelPath]);

  return (
    <div className="w-full h-full relative"> {/* Full width/height container */}
      {/* Arrow - positioned absolutely */}
      <div className={`absolute bottom-6 z-10 translate-x-[-15px] transition-opacity ease-in-out ${modelHovered ? 'opacity-100 duration-300' : 'opacity-0 duration-300'}`}>
        <Image src="/about_image_arrow.svg"
          alt=""
          width={12}
          height={12} />
      </div>

      {/* Model viewer - full width/height */}
      <div
        className="w-full h-[500px] bg-gray-100 rounded-lg shadow-md"
        onMouseEnter={() => setModelHovered(true)}
        onMouseLeave={() => setModelHovered(false)}
      >
        <Canvas camera={{ position: [3.5, 3.5, 3.5], fov: 35 }}>
          {/* Key light - main illumination */}
          <directionalLight
            position={[5, 5, 2]}
            intensity={1.2}
            castShadow={false}
          />

          {/* Fill light - reduces shadows from key light */}
          <directionalLight
            position={[-3, 1, 4]}
            intensity={0.6}
            castShadow={false}
          />

          {/* Rim light - adds definition to edges */}
          <directionalLight
            position={[-5, 5, -2]}
            intensity={0.4}
            castShadow={false}
          />

          {/* Background light - illuminates back surfaces */}
          <directionalLight
            position={[0, 0, -5]}
            intensity={0.3}
            castShadow={false}
          />

          {/* Top light - illuminates top surfaces */}
          <directionalLight
            position={[0, 10, 0]}
            intensity={0.4}
            castShadow={false}
          />

          {/* Soft ambient fill */}
          <ambientLight intensity={0.3} />

          <Model modelPath={modelPath} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minDistance={2}
            maxDistance={10}
          />
        </Canvas>
      </div>
      <div>
        <p className={`pt-1 text-xl font-medium text-light-grey-text font-dm-sans transition-opacity ease-in-out ${modelHovered ? 'opacity-100 duration-300' : 'opacity-0 duration-300'}`}>
          rotate me!
        </p>
      </div>
    </div>
  );
}   
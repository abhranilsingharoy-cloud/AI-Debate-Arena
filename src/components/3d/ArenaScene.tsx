'use client'

import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Sphere, Box, Torus, Stars, Environment, MeshDistortMaterial, BakeShadows, Preload } from '@react-three/drei'
import * as THREE from 'three'

// Podium for each debater
function Podium({ position, color, speaking = false }: { position: [number, number, number], color: string, speaking?: boolean }) {
  const podiumRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const threeColor = new THREE.Color(color)

  useFrame((state) => {
    if (podiumRef.current) {
      podiumRef.current.rotation.y += 0.003
    }
    if (glowRef.current) {
      const t = state.clock.elapsedTime
      glowRef.current.scale.setScalar(speaking ? 1 + Math.sin(t * 3) * 0.08 : 1 + Math.sin(t * 0.8) * 0.02)
    }
  })

  return (
    <group position={position}>
      {/* Podium base */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.4, 16]} />
        <meshStandardMaterial color="#1E1E26" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Podium column */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
        <meshStandardMaterial color="#2A2A35" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Holographic orb */}
      <Float speed={speaking ? 4 : 1.5} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh ref={glowRef} position={[0, 1.2, 0]}>
          <icosahedronGeometry args={[0.45, 2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={speaking ? 1.5 : 0.6}
            metalness={0.3}
            roughness={0.1}
            wireframe={!speaking}
          />
        </mesh>

        {/* Inner solid core */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={speaking ? 3 : 1}
            metalness={0.5}
            roughness={0}
          />
        </mesh>
      </Float>

      {/* Point light from orb */}
      <pointLight
        position={[0, 1.2, 0]}
        color={color}
        intensity={speaking ? 3 : 0.8}
        distance={4}
      />
    </group>
  )
}

// Energy beam connecting the two podiums
function EnergyBeam() {
  const beamRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const particlePositions = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      positions[i * 3] = (t - 0.5) * 6 // x: spread across beam
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3 // y: slight scatter
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3 // z: slight scatter
    }
    return positions
  }, [])

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.5
      particlesRef.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <group position={[0, 0.9, 0]}>
      {/* Core beam */}
      <mesh ref={beamRef as any} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 6, 8]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={2}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Glow beam */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 6, 8]} />
        <meshStandardMaterial
          color="#FF9D5C"
          emissive="#FF6B35"
          emissiveIntensity={0.5}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Flowing particles */}
      <points ref={particlesRef as any}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particlePositions}
            count={200}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FFC857"
          size={0.04}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// Grid floor
function ArenaFloor({ isLight }: { isLight: boolean }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[20, 20, 30, 30]} />
        <meshStandardMaterial
          color={isLight ? '#E5DFD9' : '#0B0B0F'}
          wireframe
          transparent
          opacity={isLight ? 0.4 : 0.15}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.21, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color={isLight ? '#F5F1EC' : '#0D0D14'}
          metalness={isLight ? 0.2 : 0.8}
          roughness={isLight ? 0.8 : 0.3}
        />
      </mesh>
    </>
  )
}

// Mouse parallax camera
function CameraRig() {
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 0.3 + 1.5 - camera.position.y) * 0.03
    camera.lookAt(0, 0.5, 0)
  })
  return null
}

// Ambient floating particles
function AmbientSparkles() {
  const count = 150
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = Math.random() * 5 - 1
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [])
  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })
  return (
    <points ref={ref as any}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#FF6B35" size={0.025} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

interface ArenaSceneProps {
  agentAActive?: boolean
  agentBActive?: boolean
}

export default function ArenaScene({ agentAActive = false, agentBActive = false }: ArenaSceneProps) {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    // Check initial
    setIsLight(document.documentElement.classList.contains('light'))
    
    // Listen for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsLight(document.documentElement.classList.contains('light'))
        }
      })
    })
    
    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.5, 5.5], fov: 55 }}
      shadows
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ background: 'transparent' }}
    >
      <fog attach="fog" args={[isLight ? '#FFF8F2' : '#0B0B0F', 10, 20]} />

      <ambientLight intensity={isLight ? 0.6 : 0.15} />
      <directionalLight position={[5, 5, 5]} intensity={isLight ? 0.5 : 0.3} color="#FF9D5C" />
      <directionalLight position={[-5, 5, 5]} intensity={isLight ? 0.4 : 0.2} color="#2DD4BF" />

      <Suspense fallback={null}>
        <CameraRig />
        <ArenaFloor isLight={isLight} />
        <Podium position={[-2.8, 0, 0]} color="#FF6B35" speaking={agentAActive} />
        <Podium position={[2.8, 0, 0]} color="#2DD4BF" speaking={agentBActive} />
        <EnergyBeam />
        <AmbientSparkles />
        <Stars radius={30} depth={20} count={500} factor={2} saturation={0.5} fade speed={0.3} />
        <BakeShadows />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

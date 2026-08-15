import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function KineticCore({ mousePos }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Three.js Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Outer Wireframe Icosahedron
    const geometry = new THREE.IcosahedronGeometry(2.2, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const mesh = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(mesh);

    // Inner Concentric Octahedron Core
    const innerGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Glowing Point Light
    const light = new THREE.PointLight(0xd4ff00, 2, 100);
    light.position.set(0, 0, 5);
    scene.add(light);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Continuous 3D rotation
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.005;

      innerMesh.rotation.x -= 0.006;
      innerMesh.rotation.y -= 0.008;

      // Mouse tilt parallax response
      const targetRotX = mousePos.y * 0.8;
      const targetRotY = mousePos.x * 0.8;

      mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05;
      mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframeMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, [mousePos]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-2 flex items-center justify-center"
    />
  );
}

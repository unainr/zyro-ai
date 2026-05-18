// src/components/ui/component.tsx
"use client";

import {
  ArrowRight,
  Code2,
  Eye,
  ImageDown,
  PencilLine,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const texture = {
  matcap:
    "https://images.unsplash.com/photo-1626908013943-df94de54984c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2673&q=80",
  env: "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
};

interface Config {
  scene: { speed: number };
  object: { speed: number };
}

const config: Config = {
  scene: { speed: 0.2 },
  object: { speed: 0 },
};

class Control {
  controls: OrbitControls;
  constructor(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) {
    this.controls = new OrbitControls(camera, canvas);
    this.init();
  }
  init() {
    this.controls.target.set(0, 0, 0);
    this.controls.rotateSpeed = 0.9;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.02;
  }
  update() {
    this.controls.update();
  }
}

class LightBar {
  c_mes!: THREE.Mesh;

  constructor(scene: THREE.Scene, uid: number) {
    this.geometry(scene, uid);
  }

  geometry(scene: THREE.Scene, i: number) {
    const amp = 1;
    const c_mat = new THREE.MeshBasicMaterial();
    const c_geo = new THREE.CapsuleGeometry(0.02, 0.5 + Math.random(), 5, 16);
    this.c_mes = new THREE.Mesh(c_geo, c_mat);
    this.c_mes.position.y =
      -Math.random() * (amp / 2) + Math.random() * (amp / 2);
    this.c_mes.position.x = -Math.sin(i * 0.3) * Math.PI;
    this.c_mes.position.z = -Math.cos(i * 0.3) * Math.PI;
    scene.add(this.c_mes);
  }
}

const heroActions = [
  { icon: PencilLine, label: "Sketch" },
  { icon: ImageDown, label: "Export" },
  { icon: Code2, label: "Code" },
  { icon: Eye, label: "Preview" },
];

export const SpinningSphereBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlRef = useRef<Control | null>(null);
  const objectMeshRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number | null>(null);

  const initThree = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new THREE.Timer();
    clock.connect(document);

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000a0b);

    const camera = new THREE.PerspectiveCamera(35);
    cameraRef.current = camera;
    camera.position.set(0, -1.7, 5);

    const control = new Control(camera, canvas);
    controlRef.current = control;

    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.enabled = false;

    const h_light = new THREE.HemisphereLight(0xffffff, 0xaaaacc, 1);
    const p_light = new THREE.PointLight(0xffffff, 0.2);
    p_light.castShadow = true;
    p_light.position.set(1, 5, 1);
    scene.add(h_light, p_light);

    for (let i = 0; i <= 20; i++) new LightBar(scene, i);

    const o_geo = new RoundedBoxGeometry(1, 1, 1, 5, 0.05);
    const o_mat = new THREE.MeshMatcapMaterial({
      color: 0xffffff,
      matcap: new THREE.TextureLoader().load(texture.matcap),
      map: new THREE.TextureLoader().load(texture.env),
    });

    const o_mes = new THREE.Mesh(o_geo, o_mat);
    objectMeshRef.current = o_mes;
    scene.add(o_mes);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      clock.update();
      const elapsedTime = clock.getElapsed();
      if (sceneRef.current)
        sceneRef.current.rotation.y = elapsedTime * config.scene.speed;
      if (objectMeshRef.current) {
        objectMeshRef.current.rotation.y = -elapsedTime * config.object.speed;
        objectMeshRef.current.rotation.z = elapsedTime * config.object.speed;
        objectMeshRef.current.rotation.x = elapsedTime * config.object.speed;
        objectMeshRef.current.position.y =
          Math.sin(elapsedTime * config.object.speed) * 0.2;
      }
      if (cameraRef.current && sceneRef.current) {
        cameraRef.current.lookAt(sceneRef.current.position);
        cameraRef.current.updateMatrixWorld();
      }
      if (rendererRef.current && cameraRef.current && sceneRef.current)
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      if (controlRef.current) controlRef.current.update();
    };
    animate();

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
      if (sceneRef.current) sceneRef.current.clear();
    };
  }, []);

  useEffect(() => {
    initThree();
  }, [initThree]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ inset: 0, width: "100vw", height: "100dvh" }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "32px",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <Badge
          variant="secondary"
          className="m-0 border border-white/10 bg-white/8 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/55"
        >
          AI wireframes to production UI
        </Badge>

        <h1 className="m-0 text-[clamp(56px,9vw,116px)] font-semibold leading-none text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-blue-400 to-violet-400">
          Zyro
        </h1>

        <p className="m-0 max-w-2xl text-[clamp(15px,1.7vw,19px)] leading-8 text-white/68">
          Sketch a screen, upload a wireframe, or describe an idea. Zyro turns
          rough product thinking into React and Tailwind code with a live
          preview beside it.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
            marginTop: "4px",
            pointerEvents: "auto",
          }}
        >
          {heroActions.map(({ icon: Icon, label }) => (
            <span
              key={label}
              style={{
                fontSize: "12px",
                padding: "7px 14px",
                borderRadius: "999px",
                border: "0.5px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.72)",
                background: "rgba(255,255,255,0.04)",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <Icon aria-hidden="true" className="size-3.5 text-cyan-300" />
              {label}
            </span>
          ))}
        </div>

        <div
          className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ pointerEvents: "auto" }}
        >
          <Button
            variant="primary"
            size="lg"
            asChild
            className="h-12 px-6 text-sm shadow-[0_0_40px_rgba(34,211,238,0.18)]"
          >
            <Link href="/sign-in">
              Start creating
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="h-12 border-white/12 bg-white/5 px-6 text-sm text-white/78 hover:bg-white/10 hover:text-white"
          >
            <Link href="#how-it-works">See workflow</Link>
          </Button>
        </div>

        <div
          className="mt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/38"
          style={{ pointerEvents: "auto" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-cyan-300/80" />
            10 free generations
          </span>
          <span>No credit card</span>
          <span>React + Tailwind output</span>
        </div>
      </div>
    </>
  );
};

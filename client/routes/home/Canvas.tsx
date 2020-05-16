import { useRef, useEffect } from 'react';
import { css, keyframes } from '@emotion/css';
import { SUPPORTS_INTERSECTION_OBSERVER } from '~/services/supports';
import { contextOptions } from './contextOptions';
import debounce from 'lodash-es/debounce';
// import { WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshNormalMaterial, Group, Mesh } from 'three';
declare const THREE: any;

const cssFadeInCanvas = keyframes`
  to {
    opacity: 0.175;
  }
`;

const cssCanvas = css`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: ${cssFadeInCanvas} 2s ease 0.5s forwards;
`;

const HomeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshNormalMaterial, Group, Mesh } = THREE;

    const resizeCanvas = debounce(() => {
      const canvas = canvasRef.current;
      if (canvas !== null) {
        const winW = document.body.scrollWidth;
        const winH = window.innerHeight;
        camera.aspect = winW / winH;
        camera.updateProjectionMatrix();
        renderer.setSize(winW, winH, false);
      }
    }, 360);

    function animate() {
      rafId = requestAnimationFrame(animate);

      let time = Date.now() * 0.000015;
      let rx = time;
      let ry = time;

      group.rotation.x = rx;
      group.rotation.y = ry;
      renderer.render(scene, camera);
    }

    function stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function ioCheck(entries: Array<IntersectionObserverEntry>) {
      if (entries[0].intersectionRatio > 0) {
        if (rafId === null) {
          animate();
        }
      } else if (rafId !== null) {
        stop();
      }
    }

    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }

    let context =
      canvas.getContext('webgl', contextOptions) ||
      (canvas.getContext('experimental-webgl', contextOptions) as WebGLRenderingContext | null);

    if (context === null) {
      return;
    }

    const winW = document.body.scrollWidth;
    const winH = window.innerHeight;

    let io: IntersectionObserver | null = null;
    let rafId: number | null = null;

    let camera = new PerspectiveCamera(60, winW / winH, 100, 10000);
    camera.position.z = 1500;

    let geometry = new BoxGeometry(60, 60, 60);
    let material = new MeshNormalMaterial();

    let group = new Group();
    for (let i = 0; i < 300; i += 1) {
      let mesh = new Mesh(geometry, material);
      mesh.position.x = Math.random() * 2000 - 1000;
      mesh.position.y = Math.random() * 2000 - 1000;
      mesh.position.z = Math.random() * 2000 - 1000;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      group.add(mesh);
    }

    let scene = new Scene();
    scene.add(group);

    let renderer = new WebGLRenderer({ canvas, context });
    if (window.devicePixelRatio !== undefined) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    renderer.setSize(winW, winH, false);
    renderer.sortObjects = false;
    animate();

    if (SUPPORTS_INTERSECTION_OBSERVER) {
      io = new IntersectionObserver(ioCheck);
      io.observe(canvas);
    }

    window.addEventListener('resize', resizeCanvas);

    return () => {
      stop();
      window.removeEventListener('resize', resizeCanvas);

      if (io !== null) {
        io.disconnect();
        io = null;
      }

      if (scene !== undefined) {
        scene.remove(group);
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return <canvas className={cssCanvas} ref={canvasRef} />;
};

export default HomeCanvas;

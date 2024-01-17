<script setup>
import cell from "../assets/cell.png";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gridHeight, gridWidth,gridSizeX,gridSizeY } from "../utils/config.js";

import { drawGrid, drawBorder } from "../utils/draw";

// 创建场景、相机、渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建网格

const textureLoader = new THREE.TextureLoader();
textureLoader.load(cell, (texture) => {
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      const x = i * gridSizeX - (gridSizeX * gridWidth) / 2 + gridSizeX / 2;
      const y = j * gridSizeY - (gridSizeY * gridHeight) / 2 + gridSizeY / 2;
      // console.log(i, j, x, y);

      // 创建格子背景
      const grid = drawGrid(texture, x, y);
      scene.add(grid);

      // 创建边框
      const border = drawBorder( x, y)
      scene.add(border);
    }
  }

  // 设置相机位置
  camera.position.z =
    Math.max(gridSizeX * gridWidth, gridSizeY * gridHeight) * 0.5;
  // camera.position.x = -((gridSizeX * gridWidth) / 4);
  // camera.position.y = -((gridSizeY * gridHeight) / 4);


// 将整个网格旋转45度
// scene.rotation.z = Math.PI / 4;

  // 创建控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableRotate = false;

  // 创建动画
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update(); // 更新控制器
  }

  animate();
});
</script>

<template>
  <div></div>
</template>

<style scoped>
</style>

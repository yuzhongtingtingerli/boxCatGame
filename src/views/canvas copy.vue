<script setup>
import { arr } from "../utils/data";
import floor from "../assets/floor.png";
import cat from "../assets/cat.png";
import {
  drawRect,
  drawRhomb,
  computeSize,
  transitionLocation,
  getLocation,
} from "./canvas/canvas";
// 创建 Canvas 元素
const canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext("2d");

// canvas添加黑色边框
// canvas.style.border = '1px solid black';

document.querySelector("#app").appendChild(canvas);
const SizeW = 50; // 单个网格宽度
const SizeH = 50; // 单个网格高度
const minWidth = 40; // 横向网格个数
const minHeight = 40; // 纵向网格个数
const { wSize, hSize, _height } = computeSize(arr, minWidth, minHeight);
const groups = transitionLocation(arr, wSize, hSize);
let scale = 1.0; // 缩放比例
let minScale = 0.5; // 缩放比例
let maxScale = 3.0; // 缩放比例
let offsetX = 0; // 水平偏移量
let offsetY = 0; // 垂直偏移量
let bgImg = null;
let catImg = null;
function drawGrid() {
  const gridSizeW = SizeW * scale; // 单个网格宽度
  const gridSizeH = SizeH * scale; // 单个网格高度
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < wSize; i++) {
    for (let j = 0; j < hSize; j++) {
      const x = i * gridSizeW + offsetX; // 横向间隔为 gridSizeW
      const y = j * gridSizeH + offsetY; // 纵向间隔为 gridSizeH
      ctx.drawImage(bgImg, x, y, gridSizeW, gridSizeH);
      ctx.drawImage(bgImg, x + gridSizeW/2, y + gridSizeH/2, gridSizeW, gridSizeH);

      // 绘制矩形
      // drawRhomb(ctx, x, y, gridSizeW, gridSizeH);
    }
  }
  drawGroup(groups, gridSizeW, gridSizeH, offsetX, offsetY);
}
// 我再这里已经获取到每一个大兵团的中心位置了，默认第一个，用红色标记
function drawGroup(groups, w, h, offsetX, offsetY) {
  groups.forEach((el, i) => {
    const cx =  el.location.x;
    const cy = hSize -  el.location.y - (hSize - _height)/2;

    el.CurrentGroupInfo.forEach((group, index) => {
      if (index === 0) {
        const x = cx;
        const y = cy;
        getLocation(x, y, el.PersonNumber).forEach(({ x, y }) => {
          ctx.drawImage(catImg, x * w + offsetX, y * h + offsetY, w, h);
        });
      } else if (index % 2 !== 0) {
        // 奇数向左
        const x = cx - (Number(el.RectSize) + 1) * Math.ceil(index / 2);
        const y = cy + 1;
        getLocation(x, y, el.PersonNumber).forEach(({ x, y }) => {
          ctx.drawImage(catImg, x * w + offsetX, y * h + offsetY, w, h);
        });
      } else {
        // 偶数向右
        const x = cx + (Number(el.RectSize) + 1) * Math.ceil(index / 2);
        const y = cy + 1;
        getLocation(x, y, el.PersonNumber).forEach(({ x, y }) => {
          ctx.drawImage(catImg, x * w + offsetX, y * h + offsetY, w, h);
        });
      }
    });
  });
}
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    // 设置图片源
    image.src = src;
  });
}
Promise.all([loadImage(floor), loadImage(cat)]).then(([ floor, cat]) => {
    bgImg = floor;
    catImg = cat;
    drawGrid();
    handleDrag(drawGrid);
    handleWheel(drawGrid);
});

// 处理鼠标拖拽事件
function handleDrag(fn) {
  let isDragging = false; // 是否正在拖拽
  let lastMouseX = 0; // 上次鼠标的X坐标
  let lastMouseY = 0; // 上次鼠标的Y坐标

  canvas.addEventListener("mousedown", function (event) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  });

  canvas.addEventListener("mousemove", function (event) {
    if (isDragging) {
      var deltaX = event.clientX - lastMouseX;
      var deltaY = event.clientY - lastMouseY;
      offsetX += deltaX;
      offsetY += deltaY;

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      fn();
    }
  });

  canvas.addEventListener("mouseup", function (event) {
    isDragging = false;
  });

  canvas.addEventListener("mouseleave", function (event) {
    isDragging = false;
  });
  return { offsetX, offsetY };
}
function handleWheel(fn) {
  canvas.addEventListener("wheel", function (event) {
    let zoomSpeed = 0.1; // 缩放速度

    if (event.deltaY < 0) {
      // 向上滚动，放大画布
      scale += zoomSpeed;
    } else {
      // 向下滚动，缩小画布（最小缩放为0.5）
      scale = Math.max(scale - zoomSpeed, minScale);
    }
    scale = Math.min(scale, maxScale);
    fn();
    event.preventDefault(); // 阻止页面滚动
  });
}
</script>

<template></template>

<style scoped>
</style>

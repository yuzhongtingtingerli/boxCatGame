<script setup>
import { onMounted } from "vue";
import { arr } from "../utils/data";
import blackfloor from "../assets/blackfloor.png";
import floor from "../assets/new_floor.png";
import cat from "../assets/cat.png";
import catRed from "../assets/cat-red.png";
import dialogBox from "../assets/dialog_box.png";
import talkingCat from "../assets/walk_cat.gif";
import { computeSize, getLocation } from "../utils/canvas";
// 创建 Canvas 元素
// 获取浏览器窗口宽度
var windowWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// 获取浏览器窗口高度
var windowHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

// 输出宽度和高度
console.log("窗口宽度: " + windowWidth);
console.log("窗口高度: " + windowHeight);

const canvas = document.createElement("canvas");
canvas.width = windowWidth;
canvas.height = windowHeight;
const ctx = canvas.getContext("2d");

// canvas添加黑色边框
// canvas.style.border = '1px solid black';

document.querySelector("#app").appendChild(canvas);
const SizeW = 100; // 单个网格宽度
const SizeH = 60; // 单个网格高度
const minWidth = 35; // 横向网格个数
const minHeight = 35; // 纵向网格个数
const { wSize, hSize, groups } = computeSize(arr, minWidth, minHeight);
// console.log(wSize, hSize);
let scale = 1.5; // 缩放比例
let minScale = 1; // 缩放比例
let maxScale = 2.5; // 缩放比例
let offsetX = 0; // 水平偏移量
let offsetY = 0; // 垂直偏移量
let bgImg = null;
let catImg = null;
let catRedImg = null;
let floorImg = null;
let dialogBoxImg = null;
let talkingCatImg = null;
function drawGrid() {
  const gridSizeW = SizeW * scale; // 单个网格宽度
  const gridSizeH = SizeH * scale; // 单个网格高度
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < wSize; i++) {
    for (let j = 0; j < hSize; j++) {
      const x = i * gridSizeW + offsetX; // 横向间隔为 gridSizeW
      const y = j * gridSizeH + offsetY; // 纵向间隔为 gridSizeH
      ctx.drawImage(bgImg, x, y, gridSizeW, gridSizeH);
      ctx.drawImage(
        bgImg,
        x + gridSizeW / 2,
        y + gridSizeH / 2,
        gridSizeW,
        gridSizeH
      );
    }
  }
  drawGroup(groups, gridSizeW, gridSizeH);
}
// 我再这里已经获取到每一个大兵团的中心位置了，默认第一个，用红色标记
function drawGroup(groups, w, h) {
  groups.forEach((el) => {
    const catH = (catImg.height / (catImg.width / SizeW)) * scale;
    // talkingCatImg
    // ctx.drawImage(talkingCatImg, 0, 0, catImg.width, catImg.height);
    el.CurrentGroupInfo.forEach((group) => {
      const x = group.location.x;
      const y = group.location.y;
      getLocation(x, y, el.PersonNumber).forEach(({ x, y }, i) => {
        ctx.drawImage(floorImg, x * w + offsetX, y * h + offsetY, w, h * 1.1);
        const img = Number(group.UserLocation) === i + 1 ? catRedImg : catImg;
        ctx.drawImage(
          img,
          (x + 0.2) * w + offsetX,
          (y + 0.8) * h + offsetY - (catH - h) - h / 2,
          w * 0.68,
          catH * 0.68
        );
      });
      // 在指定位置绘制文字
      Promise.resolve().then(() => drawGroupInfo(x, y, w, h, group, catH));
    });
  });
}
function drawGroupInfo(x, y, w, h, group, catH) {
  const imgw = dialogBoxImg.width / 2;
  const imgh = dialogBoxImg.height / 2;
  const imgX = x * w + offsetX - (imgw - w) / 2;
  const imgY = y * h + offsetY - 2.4 * h; // 2.4块砖的高度
  ctx.drawImage(dialogBoxImg, imgX, imgY, imgw, imgh);
  ctx.font = "20px Arial"; // 设置字体大小和类型
  ctx.fillStyle = "#000000"; // 设置文字颜色
  ctx.fillText(`${group.GroupName} Group`, imgX + 28, imgY + 30); // 在指定位置绘制文字

  // ctx.strokeStyle = "black"; // 描边颜色
  // ctx.lineWidth = 3; // 描边宽度

  ctx.font = "14px Arial"; // 设置字体大小和类型
  ctx.fillText(`SVL: ${group.GroupSVL}`, imgX + 36, imgY + 56);
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
// dialogBox
Promise.all([
  loadImage(blackfloor),
  loadImage(floor),
  loadImage(cat),
  loadImage(catRed),
  loadImage(dialogBox),
  loadImage(talkingCat),
]).then(([blackfloor, floor, cat, catRed, dialogBox, talkingCat]) => {
  bgImg = blackfloor;
  floorImg = floor;
  catImg = cat;
  catRedImg = catRed;
  dialogBoxImg = dialogBox;
  talkingCatImg = talkingCat;
  drawGrid();
  handleDrag(drawGrid);
  handleWheel(drawGrid);
});

// onMounted(() => {
//   // 在组件挂载后开始动画
//   animate();
// });

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawGrid();
//   // 调用下一帧
//   requestAnimationFrame(animate);
// }

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
      //  offsetX = offsetX - (window.innerWidth - window.innerWidth * scale) / 2;
    } else {
      // 向下滚动，缩小画布（最小缩放为0.5）
      scale = Math.max(scale - zoomSpeed, minScale);
      // offsetX = offsetX + (window.innerWidth - window.innerWidth * scale) / 2;
    }
    scale = Math.min(scale, maxScale);

    // console.log(offsetX, offsetY);
    // console.log(
    //   "===============================",
    //   scale,
    //   offsetX,
    //   window.innerWidth,
    //   window.innerWidth * scale,
    //   window.innerWidth - window.innerWidth * scale,
    //   offsetX + (window.innerWidth - window.innerWidth * scale) / 2
    // );
    // console.log(
    //   "===============================",
    //   scale,
    //   offsetY,
    //   window.innerHeight,
    //   window.innerHeight * scale,
    //   window.innerHeight - window.innerHeight * scale,
    //   offsetY + (window.innerHeight * scale - window.innerHeight) / 2
    // );
    // console.log(lastMouseX, lastMouseY, 'lastMouseX, lastMouseY');
    // offsetX = (window.innerWidth - window.innerWidth * scale) / 2;
    // offsetY = (window.innerHeight - window.innerHeight * scale) / 2;
    fn();
    ctx.setTransform(1, 0, 0, 1, offsetX / scale, offsetY / scale);

    event.preventDefault(); // 阻止页面滚动
  });
}
</script>

<template></template>

<style scoped></style>

<template>
  <div class="canvas">
    <!-- {{ offsetX }} -->
    <!-- {{ offsetY }} -->
    <canvas ref="canvasRef"></canvas>
    <Sidebar />
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { arr } from "../../utils/data";
import blackfloor from "../../assets/blackfloor.png";
import floor from "../../assets/new_floor.png";
import cat from "../../assets/cat.png";
import catRed from "../../assets/cat-red.png";
import dialogBox from "../../assets/dialog_box.png";
import talkingCat from "../../assets/walk_cat.gif";
import { computeSize, getLocation, loadImage,drawRect } from "./canvas";
import { useMouse,  } from "./mouse";
import Sidebar from "./sidebar/index.vue";
const { canvasRef, scale, offsetX, offsetW, offsetY, offsetH } =
    useMouse();
let ctx;
const SizeW = 250; // 单个网格宽度
const SizeH = 150; // 单个网格高度
const minWidth = 35; // 横向网格个数
const minHeight = 35; // 纵向网格个数
const { wSize, hSize, groups } = computeSize(arr, minWidth, minHeight);

let bgImg = null;
let catImg = null;
let catRedImg = null;
let floorImg = null;
let dialogBoxImg = null;
let talkingCatImg = null;
function drawGrid() {
  const gridSizeW = SizeW * scale.value; // 单个网格宽度
  const gridSizeH = SizeH * scale.value; // 单个网格高度
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  for (let i = 0; i < wSize; i++) {
    for (let j = 0; j < hSize; j++) {
      const ox = offsetX.value * scale.value + offsetW.value;
      const oy = offsetY.value * scale.value + offsetH.value;
      const x = i * gridSizeW + ox; // 横向间隔为 gridSizeW
      const y = j * gridSizeH + oy; // 纵向间隔为 gridSizeH
      ctx.drawImage(bgImg, x, y, gridSizeW, gridSizeH);
      ctx.drawImage(
        bgImg,
        x + gridSizeW / 2,
        y + gridSizeH / 2,
        gridSizeW,
        gridSizeH
      );
      drawBoundary(j,hSize,i,wSize, x, y, gridSizeW, gridSizeH)
    }
  }
  drawGroup(groups, gridSizeW, gridSizeH);
  requestAnimationFrame(drawGrid)
}
function drawBoundary(j,hSize,i,wSize, x, y, gridSizeW, gridSizeH) {

    if (j === 0 ) {
        // 绘制三角形
        ctx.beginPath();
        ctx.moveTo(x + gridSizeW/2, y); // 左顶点
        ctx.lineTo(x + gridSizeW+ gridSizeW/2, y); // 右顶点
        ctx.lineTo(x + gridSizeW , y + gridSizeH/2); // 下顶点
        ctx.closePath();
        // 填充颜色
        ctx.fillStyle = '#000';
        ctx.fill();
      }
      if (j >= hSize-0.5 ) {
        // 绘制三角形
        ctx.beginPath();
        ctx.moveTo(x + gridSizeW/2, y + gridSizeH); // 左顶点
        ctx.lineTo(x + gridSizeW, y + gridSizeH+gridSizeH/2); // 右顶点
        ctx.lineTo(x  , y + gridSizeH+gridSizeH/2); // 下顶点
        ctx.closePath();
        // 填充颜色
        ctx.fillStyle = '#000';
        ctx.fill();
      }
      if (i === 0 ) {
        // 绘制三角形
        ctx.beginPath();
        ctx.moveTo(x, y+ gridSizeH/2); // 左顶点
        ctx.lineTo(x+ gridSizeW/2, y+ gridSizeH); // 右顶点
        ctx.lineTo(x , y + gridSizeH+ gridSizeH/2); // 下顶点
        ctx.closePath();
        // 填充颜色
        ctx.fillStyle = '#000';
        ctx.fill();
      }
      if (i >= wSize-0.5 ) {
        // 绘制三角形
        ctx.beginPath();
        ctx.moveTo(x+ gridSizeW, y+ gridSizeH/2); // 左顶点
        ctx.lineTo(x+ gridSizeW + gridSizeW/2, y); // 右顶点
        ctx.lineTo(x+ gridSizeW + gridSizeW/2 , y + gridSizeH); // 下顶点
        ctx.closePath();
        // 填充颜色
        ctx.fillStyle = '#000';
        ctx.fill();
      }
}
// 我再这里已经获取到每一个大兵团的中心位置了，默认第一个，用红色标记
function drawGroup(groups, w, h) {
  groups.forEach((el) => {
    const catH = (catImg.height / (catImg.width / SizeW)) * scale.value;
    const infoList = [];
    el.CurrentGroupInfo.forEach((group) => {
      const x = group.location.x;
      const y = group.location.y;
      const ox = offsetX.value * scale.value + offsetW.value;
      const oy = offsetY.value * scale.value + offsetH.value;
      getLocation(x, y, el.PersonNumber).forEach(({ x, y }, i) => {
        ctx.drawImage(floorImg, (x) * w + ox, (y-0.1) * h + oy, w, h * 1.1);
        const img = Number(group.UserLocation) === i + 1 ? catRedImg : catImg;
        ctx.drawImage(
          img,
          (x+0.2) * w + ox,
          (y+0.2) * h + oy - (catH - h) ,
          w * 0.68,
          catH * 0.68
        );
        // 绘制点
      });
      infoList.push({ x, y, w, h, group });
      // 在指定位置绘制文字
    });
    infoList
      .sort((a, b) => {
        if (a.y === b.y) {
          return a.x - b.x; // 如果 x 相等，按照 y 的大小进行排序
        } else {
          return a.y - b.y; // 否则，按照 x 的大小进行排序
        }
      })
      .forEach(({ x, y, w, h, group }) =>
        Promise.resolve().then(() => drawGroupInfo(x, y, w, h, group, catH))
      );
    // ;
  });
}
function drawGroupInfo(x, y, w, h, group, catH) {
  const ox = offsetX.value * scale.value + offsetW.value;
  const oy = offsetY.value * scale.value + offsetH.value;
  const imgw = dialogBoxImg.width / 2;
  const imgh = dialogBoxImg.height / 2;
  const imgX = x * w + ox - (imgw - w) / 2;
//   const distance = Math.min(2, 2.4 * scale.value)
  const imgY = y * h + oy - 2.5 * h; // 2.4块砖的高度
  ctx.drawImage(dialogBoxImg, imgX, imgY, imgw, imgh);
  ctx.font = "20px Arial"; // 设置字体大小和类型
  ctx.fillStyle = "#000000"; // 设置文字颜色
  const t1 = `${group.GroupName} Group`
  const text1Width = ctx.measureText(t1).width;
  const text1X = imgX + (imgw - text1Width) / 2;
  const text1Y = imgY + imgh / 3;
  ctx.fillText(t1, text1X, text1Y); // 在指定位置绘制文字

  ctx.font = "14px Arial"; // 设置字体大小和类型
  const t2 = `${group.GroupName} Group`
  const text2Width = ctx.measureText(t2).width;
  const text2X = imgX + (imgw - text2Width) / 2;
  const text2Y = imgY + imgh / 1.4;
  ctx.fillText(t2, text2X, text2Y);
}
onMounted(() => {
  Promise.all([
    loadImage(blackfloor),
    loadImage(floor),
    loadImage(cat),
    loadImage(catRed),
    loadImage(dialogBox),
    loadImage(talkingCat),
  ]).then(([blackfloor, floor, cat, catRed, dialogBox, talkingCat]) => {
    ctx = canvasRef.value.getContext("2d");
    bgImg = blackfloor;
    floorImg = floor;
    catImg = cat;
    catRedImg = catRed;
    dialogBoxImg = dialogBox;
    talkingCatImg = talkingCat;
    offsetX.value = -Math.floor( wSize/3)*SizeW
    offsetY.value = -Math.floor( hSize/3)*SizeH
    drawGrid()
  });
});
</script>

<style scoped>
</style>

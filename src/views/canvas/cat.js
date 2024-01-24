
import redCatWalk00 from "../../assets/red-cat/walk00.png";
import redCatWalk01 from "../../assets/red-cat/walk01.png";
import redCatWalk02 from "../../assets/red-cat/walk02.png";
import redCatWalk03 from "../../assets/red-cat/walk03.png";
import redCatWalk04 from "../../assets/red-cat/walk04.png";
import redCatWalk05 from "../../assets/red-cat/walk05.png";
import redCatWalk06 from "../../assets/red-cat/walk06.png";
import redCatWalk07 from "../../assets/red-cat/walk07.png";
import redCatWalk08 from "../../assets/red-cat/walk08.png";
import redCatWalk09 from "../../assets/red-cat/walk09.png";
import redCatWalk10 from "../../assets/red-cat/walk10.png";
import redCatWalk11 from "../../assets/red-cat/walk11.png";
import redCatWalk12 from "../../assets/red-cat/walk12.png";
import redCatWalk13 from "../../assets/red-cat/walk13.png";
import redCatWalk14 from "../../assets/red-cat/walk14.png";
import redCatWalk15 from "../../assets/red-cat/walk15.png";
import redCatWalk16 from "../../assets/red-cat/walk16.png";
import redCatWalk17 from "../../assets/red-cat/walk17.png";
import redCatWalk18 from "../../assets/red-cat/walk18.png";
import redCatWalk19 from "../../assets/red-cat/walk19.png";
import redCatWalk20 from "../../assets/red-cat/walk20.png";
import redCatWalk21 from "../../assets/red-cat/walk21.png";
import redCatWalk22 from "../../assets/red-cat/walk22.png";
import redCatWalk23 from "../../assets/red-cat/walk23.png";
import redCatWalk24 from "../../assets/red-cat/walk24.png";

import blackCatWalk00 from "../../assets/black-cat/walk00.png";
import blackCatWalk01 from "../../assets/black-cat/walk01.png";
import blackCatWalk02 from "../../assets/black-cat/walk02.png";
import blackCatWalk03 from "../../assets/black-cat/walk03.png";
import blackCatWalk04 from "../../assets/black-cat/walk04.png";
import blackCatWalk05 from "../../assets/black-cat/walk05.png";
import blackCatWalk06 from "../../assets/black-cat/walk06.png";
import blackCatWalk07 from "../../assets/black-cat/walk07.png";
import blackCatWalk08 from "../../assets/black-cat/walk08.png";
import blackCatWalk09 from "../../assets/black-cat/walk09.png";
import blackCatWalk10 from "../../assets/black-cat/walk10.png";
import blackCatWalk11 from "../../assets/black-cat/walk11.png";
import blackCatWalk12 from "../../assets/black-cat/walk12.png";
import blackCatWalk13 from "../../assets/black-cat/walk13.png";
import blackCatWalk14 from "../../assets/black-cat/walk14.png";
import blackCatWalk15 from "../../assets/black-cat/walk15.png";
import blackCatWalk16 from "../../assets/black-cat/walk16.png";
import blackCatWalk17 from "../../assets/black-cat/walk17.png";
import blackCatWalk18 from "../../assets/black-cat/walk18.png";
import blackCatWalk19 from "../../assets/black-cat/walk19.png";
import blackCatWalk20 from "../../assets/black-cat/walk20.png";
import blackCatWalk21 from "../../assets/black-cat/walk21.png";
import blackCatWalk22 from "../../assets/black-cat/walk22.png";
import blackCatWalk23 from "../../assets/black-cat/walk23.png";
import blackCatWalk24 from "../../assets/black-cat/walk24.png";

import { loadImage } from "./canvas";
import { onMounted } from "vue";

export function useCat() {
  let count = 0;
  let redCatWalks = [];
  let blackCatWalks = [];
  function getCat(isRedCat) {
    if (redCatWalks.length && blackCatWalks.length) {
      count++
      return isRedCat? redCatWalks[count % redCatWalks.length]: blackCatWalks[count% blackCatWalks.length];
    }
  }
  onMounted(async () => {
    redCatWalks = await Promise.all([
      loadImage(redCatWalk00),
      loadImage(redCatWalk01),
      loadImage(redCatWalk02),
      loadImage(redCatWalk03),
      loadImage(redCatWalk04),
      loadImage(redCatWalk05),
      loadImage(redCatWalk06),
      loadImage(redCatWalk07),
      loadImage(redCatWalk08),
      loadImage(redCatWalk09),
      loadImage(redCatWalk10),
      loadImage(redCatWalk11),
      loadImage(redCatWalk12),
      loadImage(redCatWalk13),
      loadImage(redCatWalk14),
      loadImage(redCatWalk15),
      loadImage(redCatWalk16),
      loadImage(redCatWalk17),
      loadImage(redCatWalk18),
      loadImage(redCatWalk19),
      loadImage(redCatWalk20),
      loadImage(redCatWalk21),
      loadImage(redCatWalk22),
      loadImage(redCatWalk23),
      loadImage(redCatWalk24),
    ])
    blackCatWalks = await Promise.all([
      loadImage(blackCatWalk00),
      loadImage(blackCatWalk01),
      loadImage(blackCatWalk02),
      loadImage(blackCatWalk03),
      loadImage(blackCatWalk04),
      loadImage(blackCatWalk05),
      loadImage(blackCatWalk06),
      loadImage(blackCatWalk07),
      loadImage(blackCatWalk08),
      loadImage(blackCatWalk09),
      loadImage(blackCatWalk10),
      loadImage(blackCatWalk11),
      loadImage(blackCatWalk12),
      loadImage(blackCatWalk13),
      loadImage(blackCatWalk14),
      loadImage(blackCatWalk15),
      loadImage(blackCatWalk16),
      loadImage(blackCatWalk17),
      loadImage(blackCatWalk18),
      loadImage(blackCatWalk19),
      loadImage(blackCatWalk20),
      loadImage(blackCatWalk21),
      loadImage(blackCatWalk22),
      loadImage(blackCatWalk23),
      loadImage(blackCatWalk24),
    ])
  })
  return { getCat }
}


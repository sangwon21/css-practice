function Character({ xPos }) {
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character");
  this.mainElem.innerHTML = `<div class="character-face-con character-head">
    <div class="character-face character-head-face face-front"></div>
    <div class="character-face character-head-face face-back"></div>
  </div>
  <div class="character-face-con character-torso">
    <div class="character-face character-torso-face face-front"></div>
    <div class="character-face character-torso-face face-back"></div>
  </div>
  <div class="character-face-con character-arm character-arm-right">
    <div class="character-face character-arm-face face-front"></div>
    <div class="character-face character-arm-face face-back"></div>
  </div>
  <div class="character-face-con character-arm character-arm-left">
    <div class="character-face character-arm-face face-front"></div>
    <div class="character-face character-arm-face face-back"></div>
  </div>
  <div class="character-face-con character-leg character-leg-right">
    <div class="character-face character-leg-face face-front"></div>
    <div class="character-face character-leg-face face-back"></div>
  </div>
  <div class="character-face-con character-leg character-leg-left">
    <div class="character-face character-leg-face face-front"></div>
    <div class="character-face character-leg-face face-back"></div>
  </div>
</div>`;
  document.querySelector(".stage").appendChild(this.mainElem);
  this.mainElem.style.left = `${xPos}%`;
  //scroll 상태 표시
  this.scrollState = false;
  // 바로 이전 스크롤 위치
  this.lastScrollTop = 0;
  // 스피드
  this.speed = 1;
  this.xPos = xPos;
  this.init();
}

Character.prototype = {
  constructor: Character,
  init: function () {
    window.addEventListener(
      "scroll",
      function () {
        clearTimeout(this.scrollState);

        if (!this.scrollState) {
          this.mainElem.classList.add("running");
        }

        this.scrollState = setTimeout(
          function () {
            this.scrollState = false;
            this.mainElem.classList.remove("running");
          }.bind(this),
          500
        );

        if (this.lastScrollTop > pageYOffset) {
          this.mainElem.setAttribute("data-direction", "backward");
        } else {
          this.mainElem.setAttribute("data-direction", "forward");
        }
        this.lastScrollTop = pageYOffset;
      }.bind(this)
    );

    window.addEventListener(
      "keydown",
      function (e) {
        if (e.keyCode === 37) {
          this.mainElem.setAttribute("data-direction", "left");
          this.mainElem.classList.add("running");
          this.xPos -= this.speed;
          this.mainElem.style.left = `${this.xPos}%`;
        } else if (e.keyCode === 39) {
          this.mainElem.setAttribute("data-direction", "right");
          this.mainElem.classList.add("running");
          this.xPos += this.speed;
          this.mainElem.style.left = `${this.xPos}%`;
        }
      }.bind(this)
    );

    window.addEventListener(
      "keyup",
      function (e) {
        this.mainElem.classList.remove("running");
      }.bind(this)
    );
  },
};

<template>
  <div class="mover-wrap">
    <div class="mover-wrap__main">
      <Header/>
      <Menu/>
      <div class="mover-text">
        <h1 class="mover-text__text">
          The <span>Aptos</span><br>
          centric bridge
        </h1>
        <a href="https://app.mov3r.xyz/" class="mover-link">
          <span class="mover-link__inner">
            <span class="mover-link__text">
              Use Mover
            </span>
            <span class="mover-link__icon">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12.5H19" stroke="#17171A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 6.5L19 12.5L13 18.5" stroke="#17171A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </span>
        </a>
      </div>
      <canvas id="stars" />
    </div>
    <div class="mover-wrap__side">
      <div class="mover-use">
        <a class="link link-reverce" href="https://app.mov3r.xyz/">Use Mover</a>
      </div>
      <div class="mover-logo">
        <img class="mover-logo__img" src="./assets/mover.png" alt="Mover">
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Menu from "./components/Menu.vue";

export default {
  name: "App",
  components: {
    Header,
    Menu
  },
  mounted: function () {
    //gradients
    document.getElementsByClassName("mover-wrap__side")[0].addEventListener('mousemove', (event) => {
      let targetElement = document.getElementsByClassName("mover-wrap__side")[0];
      let {offsetWidth: elWidth, offsetHeight: elHeight} = targetElement;
      let rect = targetElement.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;

      let mouseXpercentage = Math.round(x / elWidth * 100);
      let mouseYpercentage = Math.round(y / elHeight * 100);

      document.getElementsByClassName("mover-wrap__side")[0].style.background = 'radial-gradient(circle at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #08f2c0 30%, #05a3fa)';
    });
    //stars
    let field = document.getElementById("stars");
    let f = field.getContext("2d");

    let stars = {};
    let starIndex = 0;
    let numStars = 0;
    let acceleration = 0.1;
    let starsToDraw = (field.width * field.height) / 300;

    function Star() {
      this.X = field.width / 2;
      this.Y = field.height / 2;

      this.SX = Math.random() * 10 - 5;
      this.SY = Math.random() * 10 - 5;

      let start = 0;

      if (field.width > field.height)
        start = field.width;
      else
        start = field.height;

      this.X += this.SX * start / 10;
      this.Y += this.SY * start / 10;

      this.W = 1;
      this.H = 1;

      this.age = 0;

      starIndex++;
      stars[starIndex] = this;

      this.ID = starIndex;
      this.C = "#ffffff";
    }

    Star.prototype.Draw = function () {
      this.X += this.SX;
      this.Y += this.SY

      this.SX += this.SX / (50 / acceleration);
      this.SY += this.SY / (50 / acceleration);

      this.age++;

      if (this.age === Math.floor(50 / acceleration) | this.age === Math.floor(150 / acceleration) | this.age === Math.floor(300 / acceleration)) {
        this.W++;
        this.H++;
      }

      if (this.X + this.W < 0 | this.X > field.width |
          this.Y + this.H < 0 | this.Y > field.height) {
        delete stars[this.ID];
        numStars--;
      }

      f.fillStyle = this.C;
      f.fillRect(this.X, this.Y, this.W, this.H);
    }

    field.width = window.innerWidth;
    field.height = window.innerHeight;

    function draw() {
      if (field.width !== window.innerWidth)
        field.width = window.innerWidth;
      if (field.height !== window.innerHeight)
        field.height = window.innerHeight;

      f.fillStyle = "rgba(18, 18, 18, 0.9)";
      f.fillRect(0, 0, field.width, field.height);

      for (let i = numStars; i < starsToDraw; i++) {
        new Star();
        numStars++;
      }

      for (let star in stars) {
        stars[star].Draw();
      }
    }

    setInterval(draw, 20);
  }
}
</script>

<style lang="scss">
.mover-wrap {
  display: flex;
  justify-content: flex-start;

  &__main {
    width: 65%;
    position: relative;
  }

  &__side {
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 50;
    -webkit-transform: translate3d(0,0,0);
    background: #05a3fa;
    background:
        radial-gradient(
                circle at 0% 50%, #08f2c0 30%, #05a3fa
        );
  }
}

.mover-text {
  position: relative;
  z-index: 20;
  height: 100vh;
  min-height: 500px;
  margin: 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  &__text {
    font-style: normal;
    font-weight: 400;
    font-size: 80px;
    line-height: 110px;
    margin: 0 0 40px 0;

    span {
      color: #2fd9f1;
    }
  }
}

.mover-link {
  display: block;
  width: 222px;
  height: 60px;
  background: linear-gradient(90deg, #59FFEB 0%, #14C7FF 100%);
  border-radius: 10px;
  text-decoration: none;
  overflow: hidden;
  position: relative;

  &:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    border-radius: 10px;
    background: linear-gradient(90deg, #14C7FF 0%, #59FFEB 100%);
    opacity: 0;
    transition: 400ms linear opacity;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 222px;
    height: 60px;
    position: absolute;
    z-index: 20;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
  }

  &__text {
    color: #17171A;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    margin-right: 13px;
  }

  &__icon {
    height: 25px;
  }
}

.mover-use {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 59px;
  margin-right: 60px;
  display: flex;
  justify-content: flex-end;
  a{
    text-decoration: none;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
    color: #000000;
  }
}

.mover-logo {
  &__img {
    width: 110%;
    max-width: 600px;
    margin-left: -40%;
  }
}

#stars {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

@media screen and (max-width:1024px) {
  body {
    min-height: 590px;
  }

  .mover-wrap {
    min-height: 590px;
    flex-direction: column;

    &__main {
      width: 100%;
    }

    &__side {
      width: 100%;
      height: 28vh;
      min-height: 167px;
      align-items: flex-start;
    }
  }

  .mover-use {
    display: none;
  }

  .mover-header {
    padding: 40px 30px 0 30px;
  }

  .mover-nav__nav {
    display: none;
  }

  .mover-text {
    margin: 0 30px;
    text-align: center;
    height: 72vh;
    min-height: 432px;

    &__text {
      width: 100%;
      margin: 0;
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      line-height: 54px;
      text-align: center;
    }
  }

  .mover-logo__img {
    width: 280px;
    margin: -80px 0 0 0;
  }

  .mover-link {
    display: flex;
    justify-content: center;
    width: calc(100% - 36px);
    margin: 60px 18px 0 18px;
    height: 58px;
  }

  .mover-link__text {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    margin-right: 7px;
  }

  .mover-link__icon {
    width: 20px;
  }
}

.mover-hamburger {
  position: absolute;
  top: 35px;
  right: 30px;
  z-index: 155;
  -webkit-transform: translate3d(0,0,0);
}
</style>

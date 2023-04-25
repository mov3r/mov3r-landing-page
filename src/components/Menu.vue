<template>
  <div class="menu-mover">
    <button
        type="button"
        class="mover-hamburger"
        :class="[hamburgerModifierClass, { 'mover-hamburger--active': isActive, 'mover-hamburger--rounded': rounded}]"
        @click.prevent="toggle"
    >
      <span class="mover-hamburger-box" :style="buttonStyle">
        <span class="mover-hamburger-inner" :style="layerStyle">
          <span class="mover-hamburger-inner__before" :style="layerStyle" />
          <span class="mover-hamburger-inner__after" :style="layerStyle" />
        </span>
      </span>
    </button>
    <div class="menu-bg" :class="{ 'fs': isActive}"></div>
    <div class="menu-items" :class="{ 'fs': isActive}">
      <a href="https://discord.gg/moverxyz" target="_blank">
        <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.59867 35.3266H28.1833L27.0569 31.6516C27.2241 31.7983 36.7196 40 36.7196 40V4.125C36.6072 1.895 34.7018 0 32.3398 0L4.60693 0.005C2.24665 0.005 0.331299 1.90334 0.331299 4.13334V31.2C0.331299 33.5516 2.24334 35.3266 4.59867 35.3266ZM22.0452 9.47166L21.9908 9.49166L22.0105 9.47166H22.0452ZM9.42343 11.5867C12.4552 9.36334 15.2655 9.47 15.2655 9.47L15.4921 9.695C11.7821 10.5867 10.0999 12.2567 10.0999 12.2567C10.2719 12.22 17.763 7.865 26.8403 12.3667C26.8403 12.3667 25.1548 10.805 21.6731 9.805L21.9808 9.5C22.4621 9.50166 25.0092 9.59166 27.735 11.6C27.735 11.6 30.7851 16.85 30.7851 23.3C30.6842 23.1766 28.8928 26.0766 24.2832 26.1766C24.2832 26.1766 23.5025 25.2866 22.9468 24.51C25.6428 23.73 26.6518 22.17 26.6518 22.17C21.4035 25.5 16.8038 24.98 11.3007 22.73C11.2495 22.73 11.2263 22.7066 11.1999 22.68V22.67C11.1734 22.6449 11.1502 22.62 11.099 22.62H10.9997C10.6623 22.3966 10.4374 22.2866 10.4374 22.2866C10.4374 22.2866 11.4446 23.8466 14.0332 24.6266C13.3534 25.4082 12.6802 26.2966 12.6802 26.2966C8.07211 26.1866 6.39162 23.2866 6.39162 23.2866C6.39162 16.8266 9.42343 11.5867 9.42343 11.5867Z" fill="white"/>
          <path d="M22.3425 21.2851C23.5183 21.2851 24.476 20.2851 24.476 19.0519C24.476 17.8268 23.5234 16.8268 22.3425 16.8268V16.8319C21.1714 16.8319 20.2121 17.8285 20.2087 19.0619C20.2087 20.2851 21.1664 21.2851 22.3425 21.2851Z" fill="white"/>
          <path d="M14.7043 21.2851C15.8801 21.2851 16.8379 20.2851 16.8379 19.0519C16.8379 17.8268 15.8868 16.8268 14.7108 16.8268L14.7043 16.8319C13.5282 16.8319 12.5706 17.8285 12.5706 19.0619C12.5706 20.2851 13.5282 21.2851 14.7043 21.2851Z" fill="white"/>
        </svg>
      </a>
      <a href="https://twitter.com/moverxyz" target="_blank">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 7.40757C38.5125 8.04375 36.9275 8.46543 35.2749 8.67018C36.9749 7.68056 38.2725 6.12543 38.8825 4.251C37.2975 5.17237 35.5475 5.82319 33.6825 6.18637C32.1775 4.62394 30.0325 3.65625 27.6925 3.65625C23.1525 3.65625 19.4975 7.24913 19.4975 11.6537C19.4975 12.2874 19.5525 12.8968 19.6875 13.477C12.87 13.1528 6.83751 9.96694 2.785 5.11387C2.07749 6.31069 1.66251 7.68056 1.66251 9.15525C1.66251 11.9242 3.125 14.3788 5.305 15.7998C3.98749 15.7755 2.695 15.4025 1.6 14.8151C1.6 14.8395 1.6 14.8712 1.6 14.9028C1.6 18.7882 4.44249 22.0155 8.17 22.759C7.50249 22.9369 6.775 23.0222 6.02 23.0222C5.495 23.0222 4.965 22.993 4.46749 22.8857C5.53 26.052 8.545 28.3798 12.13 28.4554C9.34 30.5833 5.79749 31.8655 1.96251 31.8655C1.29 31.8655 0.645 31.8362 0 31.7557C3.63251 34.0397 7.93749 35.3437 12.58 35.3437C27.67 35.3437 35.92 23.1562 35.92 12.5921C35.92 12.2387 35.9075 11.8974 35.89 11.5586C37.5175 10.4325 38.8849 9.02607 40 7.40757Z" fill="white"/>
        </svg>
      </a>
      <a href="https://github.com/mov3r/" target="_blank">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_337)">
            <path d="M20 0.833328C8.95 0.833328 0 9.63333 0 20.4867C0 29.1716 5.73 36.5367 13.6751 39.1333C14.6751 39.3183 15.0416 38.71 15.0416 38.1884C15.0416 37.7217 15.0251 36.4851 15.0167 34.8467C9.45333 36.0317 8.28 32.21 8.28 32.21C7.37 29.9417 6.055 29.3349 6.055 29.3349C4.24333 28.1167 6.195 28.1417 6.195 28.1417C8.20333 28.2783 9.25833 30.1667 9.25833 30.1667C11.0417 33.1716 13.94 32.3033 15.0833 31.8016C15.2633 30.53 15.7784 29.6649 16.35 29.1733C11.9083 28.6816 7.24 26.9916 7.24 19.4617C7.24 17.3167 8.015 15.5633 9.29833 14.1883C9.07333 13.6916 8.39833 11.6933 9.47333 8.98666C9.47333 8.98666 11.1483 8.45999 14.9733 11.0017C16.5733 10.565 18.2733 10.3483 19.9733 10.3383C21.6733 10.3483 23.3733 10.565 24.9733 11.0017C28.7733 8.45999 30.4483 8.98666 30.4483 8.98666C31.5233 11.6933 30.8483 13.6916 30.6483 14.1883C31.9233 15.5633 32.6984 17.3167 32.6984 19.4617C32.6984 27.0117 28.0233 28.6733 23.5733 29.1567C24.2733 29.7467 24.9233 30.9517 24.9233 32.7933C24.9233 35.4233 24.8983 37.5367 24.8983 38.1751C24.8983 38.69 25.2484 39.3051 26.2733 39.1083C34.2749 36.5283 40 29.1583 40 20.4867C40 9.63333 31.0451 0.833328 20 0.833328Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_1_337">
              <rect width="40" height="40" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </a>
      <a href="https://medium.com/@moverxyz" target="_blank">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.2814 7.8C17.512 7.8 22.5624 13.0166 22.5624 19.4514C22.5624 25.886 17.5116 31.1022 11.2814 31.1022C5.05121 31.1022 0 25.886 0 19.4514C0 13.0166 5.05084 7.8 11.2814 7.8ZM29.2969 8.4825C32.4123 8.4825 34.9376 13.393 34.9376 19.4514H34.938C34.938 25.5082 32.4127 30.4201 29.2973 30.4201C26.1821 30.4201 23.6567 25.5082 23.6567 19.4514C23.6567 13.3946 26.1817 8.4825 29.2969 8.4825ZM38.0161 9.625C39.1115 9.625 40 14.0243 40 19.4514C40 24.8768 39.112 29.2777 38.0161 29.2777C36.9204 29.2777 36.0328 24.878 36.0328 19.4514C36.0328 14.0247 36.9208 9.625 38.0161 9.625Z" fill="white"/>
        </svg>
      </a>
      <a href="https://docs.mov3r.xyz/mover-gitbook/" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 731 512" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M411.148 6.38992L649.535 125.583C660.551 131.091 660.723 146.751 649.831 152.499L340.222 315.904C322.959 325.015 302.362 325.241 284.903 316.512L90.5121 219.316C66.8302 209.802 40.3508 227.178 40.3508 253.351C40.3508 274.394 52.2398 293.631 71.0611 303.042L265.953 400.487C277.85 388.374 294.415 380.86 312.736 380.86C330.533 380.86 346.673 387.95 358.487 399.459L601.233 271.344C600.568 267.598 600.221 263.742 600.221 259.805C600.221 223.592 629.578 194.236 665.791 194.236C702.004 194.236 731.361 223.592 731.361 259.805C731.361 296.019 702.004 325.375 665.791 325.375C648.084 325.375 632.016 318.357 620.218 306.95L377.337 435.137C377.974 438.806 378.306 442.579 378.306 446.43C378.306 482.643 348.949 512 312.736 512C276.523 512 247.166 482.643 247.166 446.43C247.166 443.081 247.417 439.79 247.902 436.575L50.187 337.719C19.4291 322.34 0 290.903 0 256.514V237.36C0 211.17 14.4951 187.131 37.6576 174.908L355.829 6.99775C373.092 -2.11324 393.689 -2.33956 411.148 6.38992ZM312.736 471.649C326.664 471.649 337.955 460.358 337.955 446.43C337.955 432.502 326.664 421.211 312.736 421.211C298.808 421.211 287.517 432.502 287.517 446.43C287.517 460.358 298.808 471.649 312.736 471.649ZM691.01 259.805C691.01 273.734 679.719 285.025 665.791 285.025C651.863 285.025 640.572 273.734 640.572 259.805C640.572 245.877 651.863 234.586 665.791 234.586C679.719 234.586 691.01 245.877 691.01 259.805Z" fill="white"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data () {
    return {
      isActive: false,
      buttonStyle: null
    }
  },
  props: {
    type: {
      type: String,
      default: 'emphatic'
    },
    active: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    activeColor: {
      type: String,
      default: null
    },
    reversed: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
      this.$emit('toggle', this.isActive)
    }
  },
  watch: {
    active (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.toggle()
      }
    }
  },
  computed: {
    layerStyle () {
      return {
        'background-color': this.isActive ? this.activeColor : this.color
      }
    },
    hamburgerModifierClass () {
      return `mover-hamburger--${this.type}`
    }
  },
  created () {
    this.isActive = this.active
    this.buttonStyle = {
      transform: 'scale(0.5)',
      width: '20px',
      height: '13px'
    }
  }
}
</script>

<style lang="scss">
.menu-mover {
  display: none;
  @media screen and (max-width:1024px) {
    display: block;
  }
}

.mover-hamburger {
  padding: 0;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent !important;
  border: 0;
  margin: 0;
  overflow: visible;
}
.mover-hamburger:hover,
.mover-hamburger:focus {
  outline: none;
}
.mover-hamburger::-moz-focus-inner {
  border: 0;
}
.mover-hamburger-box {
  width: 40px;
  height: 24px;
  display: block;
  position: relative;
  transform-origin: center left;
}
.mover-hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.mover-hamburger-inner,
.mover-hamburger-inner__before,
.mover-hamburger-inner__after {
  width: 40px;
  height: 4px;
  background-color: #FFFFFF;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.mover-hamburger.mover-hamburger--rounded {
  .mover-hamburger-inner,
  .mover-hamburger-inner__before,
  .mover-hamburger-inner__after {
    border-radius: 4px;
  }
}
.mover-hamburger-inner__before,
.mover-hamburger-inner__after {
  content: "";
  display: block;
}
.mover-hamburger-inner__before {
  top: -10px;
}
.mover-hamburger-inner__after {
  bottom: -10px;
}

.mover-hamburger.mover-hamburger--emphatic {
  overflow: hidden;
  padding: 15px;
}
.mover-hamburger--emphatic .mover-hamburger-inner {
  transition: background-color 0.125s 0.175s ease-in;
}
.mover-hamburger--emphatic .mover-hamburger-inner__before {
  left: 0;
  transition: transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
  top 0.05s 0.125s linear, left 0.125s 0.175s ease-in;
}
.mover-hamburger--emphatic .mover-hamburger-inner__after {
  top: 10px;
  right: 0;
  transition: transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
  top 0.05s 0.125s linear, right 0.125s 0.175s ease-in;
}
.mover-hamburger--emphatic.mover-hamburger--active .mover-hamburger-inner {
  transition-delay: 0s;
  transition-timing-function: ease-out;
  background-color: transparent !important;
}
.mover-hamburger--emphatic.mover-hamburger--active .mover-hamburger-inner__before {
  left: -80px;
  top: -80px;
  transform: translate3d(80px, 80px, 0) rotate(45deg);
  transition: left 0.125s ease-out, top 0.05s 0.125s linear,
  transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.mover-hamburger--emphatic.mover-hamburger--active .mover-hamburger-inner__after {
  right: -80px;
  top: -80px;
  transform: translate3d(-80px, 80px, 0) rotate(-45deg);
  transition: right 0.125s ease-out, top 0.05s 0.125s linear,
  transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.menu {
  position: fixed;
  width: 20px;
  height: 20px;
  font-size: 30px;
  text-align:center;
  border-radius: 100%;
  right:30px;
  top:30px;
  z-index: 100;
}
.menu-bg {
  @extend .menu;
  background: #121212;
  pointer-events: none;
  transition: .3s;
  right:55px;
  top:52px;
  transform:translate3d(50%,-50%,0);
  transform-origin: center center;
  &.fs{
    transform:translate3d(50%,-50%,0);
    width:500vw;
    height:500vw;
  }
}
.menu-items{
  position:absolute;
  font-weight: bold;
  font-size: 40px;
  letter-spacing:10px;
  color: white;
  width: 100%;
  height: 100vh;
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  opacity:0;
  transition: .4s;
  transform: translateY(-200%);
  pointer-events:none;
  z-index: 154;
  div {
    transition: 1s;
    opacity: 0;
    margin-top: 0px;
  }
  &.fs {
    transform: translateY(0);
    pointer-events:auto;
    opacity: 1;
    div{
      opacity: 1;
      margin-top: 75px;
    }
  }
}
</style>

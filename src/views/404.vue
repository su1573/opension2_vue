<template>
  <div class="http404-container">
    <svg viewBox="0 0 200 100">
      <!-- Symbol-->
      <symbol id="s-text">
        <text text-anchor="middle" x="50%" y="50%" dy=".35em">404</text>
      </symbol>
      <!-- Duplicate symbols-->
      <use class="text" xlink:href="#s-text" />
      <use class="text" xlink:href="#s-text" />
      <use class="text" xlink:href="#s-text" />
      <use class="text" xlink:href="#s-text" />
      <use class="text" xlink:href="#s-text" />
    </svg>
    <h3 class="bullshit__headline">{{ message }}</h3>
    <a href="" class="return-home">返回首页</a>
  </div>
</template>

<script>
export default {
  name: "Page404",
  computed: {
    message() {
      return "这个页面离家出走了";
    }
  }
};
</script>

<style lang="scss" scoped>
/* Main styles */
@import url(https://fonts.googleapis.com/css?family=Open+Sans:800);
.text {
  fill: none;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-dasharray: 70 330;
  stroke-dashoffset: 0;
  -webkit-animation: stroke 6s infinite linear;
  animation: stroke 6s infinite linear;
}
.text:nth-child(5n + 1) {
  stroke: #f2385a;
  -webkit-animation-delay: -1.2s;
  animation-delay: -1.2s;
}
.text:nth-child(5n + 2) {
  stroke: #f5a503;
  -webkit-animation-delay: -2.4s;
  animation-delay: -2.4s;
}
.text:nth-child(5n + 3) {
  stroke: #e9f1df;
  -webkit-animation-delay: -3.6s;
  animation-delay: -3.6s;
}
.text:nth-child(5n + 4) {
  stroke: #56d9cd;
  -webkit-animation-delay: -4.8s;
  animation-delay: -4.8s;
}
.text:nth-child(5n + 5) {
  stroke: #3aa1bf;
  -webkit-animation-delay: -6s;
  animation-delay: -6s;
}

@-webkit-keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
.http404-container {
  width: 100%;
  text-align: center;
  font: 5em/1 Open Sans, Impact;
  text-transform: uppercase;
  margin: 0;
}
svg {
  width: 40%;
}
h3 {
  color: #333;
  font-size: 24px;
  opacity: 0;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
}
.return-home {
  display: inline-block;
  width: 110px;
  height: 36px;
  background: #1482f0;
  border-radius: 100px;
  text-align: center;
  color: #ffffff;
  opacity: 0;
  font-size: 14px;
  line-height: 36px;
  cursor: pointer;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}
@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

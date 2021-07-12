<template>
  <div
    class="wrapper"
    v-show="show"
  >
    <div class="spinner">
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
      <div class="spinner-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$animation-duration: 1000ms;
$transiotion-color-1: #2af598;
$transiotion-color-2: #1edcb4;
$transiotion-color-3: #12c4d0;
$transiotion-color-4: #0cb7df;
$transiotion-color-5: #009efd;
$clr-spinner: $transiotion-color-1;
$size: 150px;
.wrapper {
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(125, 125, 125, 0.4);
}
.spinner {
  width: $size;
  height: $size;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  .spinner-item {
    height: 40%;
    background-color: $clr-spinner;

    width: calc(#{$size} / 13);
    animation: spinner5 #{$animation-duration} ease-in-out infinite;

    @keyframes spinner5 {
      25% {
        transform: scaleY(2);
      }

      50% {
        transform: scaleY(1);
      }
    }
    &:nth-child(1) {
      background-color: $transiotion-color-1;
    }

    &:nth-child(2) {
      background-color: $transiotion-color-2;
      animation-delay: calc(#{$animation-duration} / 10);
    }

    &:nth-child(3) {
      background-color: $transiotion-color-3;
      animation-delay: calc(#{$animation-duration} / 10 * 2);
    }

    &:nth-child(4) {
      background-color: $transiotion-color-4;
      animation-delay: calc(#{$animation-duration} / 10 * 3);
    }

    &:nth-child(5) {
      background-color: $transiotion-color-5;
      animation-delay: calc(#{$animation-duration} / 10 * 4);
    }
  }
}
</style>
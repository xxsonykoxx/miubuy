<template>
  <div class="homepage_max-width">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
* {
  box-sizing: border-box;
}
body {
  width: 100%;
  height: 100%;
}
.homepage_max-width {
  max-width: 1080px;
  margin: 0 auto;
}
</style>

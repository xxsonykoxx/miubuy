<template>
  <div class="body">
    <div class="home__container">
      <div class="logo_block">
        <img src="/image/logo.png" alt="" class="logo" />
        <h2 class="subtitle">
          ♫ 台日即時代購平台 ♪
        </h2>
      </div>
      <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
      <div class="map">
        <div class="JA_map">
          <router-link to="/Japan_area_select">
            <img src="/image/JAPAN_MAP/new_nekomap.png" alt="" class="ja_map" />
          </router-link>
          <h3 class="JA_online_status">
            <img src="/image/cat_hand_icon.png" alt="" class="icon" />now
            日本在線代購 : <span class="JA_now_num">{{J_count}}</span> 間
          </h3>
        </div>
        <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
        <div class="TW_map">
          <router-link to="/Taiwan_area_select">
            <img src="/image/TW_MAP/new_taiwan_map.png" alt="" class="tw_map" />
          </router-link>
          <h3 class="TW_online_status">
            <img src="/image/cat_hand_icon.png" alt="" class="icon" />now
            台灣在線代購 : <span class="TW_now_num">{{T_count}}</span> 間
          </h3>
        </div>
      </div>
    </div>
    <creatroom></creatroom>
  </div>
</template>

<script>
import creatroom from './Model/Creatroom.vue';

export default {
  data() {
    return {
      countries: '',
      J_count: '',
      T_count: '',
    };
  },
  components: {
    creatroom,
  },
  created() {
    const vm = this;
    const API = `${process.env.VUE_APP_APIPATH}api/Countries`;
    vm.axios.get(API)
      .then((res) => {
        vm.countries = res.data;
        vm.J_count = vm.countries[0].Count;
        vm.T_count = vm.countries[1].Count;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  beforeCreate() {
    document.body.className = 'home';
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
body.home {
  background-color: $colorHeader;
}
.home__container {
  background-color: $bgc;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 10px;
}
.logo_block {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.logo {
  width: 240px;
}
.subtitle {
  font-family: myfont, serif;
  font-size: 22px;
  margin-left: 200px;
  color: darken($colorBrown, 15%);
  font-weight: bold;
}
.map {
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
  justify-content: center;
}
/*==============★ 日本地図 ★==============*/
.ja_map,
.tw_map {
  max-width: 450px;
}
.JA_map {
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    transform: translateY(2px);
  }
}
.TW_map {
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    transform: translateY(2px);
  }
}
//・‥…━━━☆・‥…━━━☆・‥…━━━☆
.JA_online_status,
.TW_online_status {
  font-family: myfont, serif;
  font-size: 22px;
  font-weight: lighter;
  margin-left: 180px;
  color: $colorBrown;
}
.JA_now_num,
.TW_now_num {
  color: $colorHeader;
  font-weight: bold;
}
.icon {
  width: 20px;
  height: 20px;
}
</style>

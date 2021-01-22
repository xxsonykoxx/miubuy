<template>
  <div>
    <div class="home__container">
      <div class="logo_block">
        <router-link to="/">
          <img src="/image/logo.png" alt="" class="logo" />
        </router-link>
        <h2 class="subtitle">
          ♫ 台日即時代購平台 ♪
        </h2>
      </div>
      <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
      <div class="area_select_content">
        <div class="JA_map_select">
          <img
            src="/image/JAPAN_MAP/jap-map_border.png"
            alt=""
            class="ja_map_border"
          />
        </div>
        <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
        <div class="text_selector">
          <div class="text_selector-content">
            <h2 class="text_selector-title">
              <img
                src="/image/ribon_icon.png"
                alt=""
                class="ribon_icon"
              />地區選擇
              <img src="/image/ribon_icon.png" alt="" class="ribon_icon" />
            </h2>
            <div class="JA_selector-form">
              <div class="JA_prefectures">
                <label for="" class="prefectures"
                  ><img
                    src="/image/cat_icon.png"
                    alt=""
                    class="cat_icon"
                  />都道府縣</label
                >
                <select class="JA_form-prefectures"
                v-model="prefectureSelected" @change="getCity()">
                  <option value="" selected>==請選擇都道府縣==</option>
                  <option v-for="prefecture in prefectures" :key="prefecture.Id"
                  :value="prefecture.Id"
                  >{{prefecture.Name}}
                  </option>
                </select>
              </div>
              <div class="JA_city">
                <label for="" class="city"
                  ><img
                    src="/image/cat_icon.png"
                    alt=""
                    class="cat_icon"
                  />市、區</label
                >
                <select class="JA_form-city" v-model="citySelected" @change="getNowstatus()">
                <option value="" selected>==請選擇市區==</option>
                  <option v-for="city in citys" :key="city.Id"
                  :value="city.Id">{{city.Name}}</option>
                </select>
              </div>
            </div>
            <h2 class="text_selector-status">
              <img
                src="/image/ribon_icon.png"
                alt=""
                class="ribon_icon"
              />聊天室目前狀態
              <img src="/image/ribon_icon.png" alt="" class="ribon_icon" />
            </h2>
            <div class="now_status_group">
              <h3 class="now_status">
                <img
                  src="/image/cat_icon.png"
                  alt=""
                  class="cat_icon"
                />目前有&nbsp;<span class="now_status_num">{{ status }}</span
                >&nbsp;間代購聊天室
              </h3>
              <router-link to="/ChatroomList">
                <img src="/image/GO_btn.png" class="go_btn" alt=""
                @click="saveInfo"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="return_btn">
      <router-link to="/">
        <img src="/image/return_btn.png" class="return_cat" alt=""/>
      </router-link>
    </div>
    <creatroom></creatroom>
  </div>
</template>

<script>
import creatroom from './Model/Creatroom.vue';

export default {
  data() {
    return {
      prefectures: '',
      prefectureSelected: '',
      citys: '',
      citySelected: '',
      map: '',
      status: '( ^ω^ )',
    };
  },
  components: {
    creatroom,
  },
  created() {
    const vm = this;
    const APIprefectures = `${process.env.VUE_APP_APIPATH}api/Counties/1`;
    this.axios.get(APIprefectures)
      .then((res) => {
        vm.prefectures = res.data;
      });
  },
  methods: {
    getCity() {
      const vm = this;
      const APIcity = `${process.env.VUE_APP_APIPATH}api/Cities/${this.prefectureSelected}`;
      vm.axios.get(APIcity)
        .then((res) => {
          vm.citys = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveInfo() {
      const storage = sessionStorage;
      storage.setItem('prefecture', this.prefectureSelected);
      storage.setItem('city', this.citySelected);
      storage.setItem('Countries', '1');
    },
    getNowstatus() {
      const vm = this;
      vm.citys.forEach((i) => {
        if (i.Id === vm.citySelected) {
          vm.status = i.Count;
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
* {
  box-sizing: border-box;
}
@font-face {
  font-family: 'myfont';
  src: url('/font/清松手寫體3.ttf');
}
body {
  height: auto;
  background-color: $colorHeader;
}
select {
  overflow-y: auto;
}
.ja_area_max-width {
  max-width: 1080px;
  margin: 0 auto;
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
header {
  position: relative;
  padding: 5px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sell-btn {
    width: auto;
    height: auto;
    .cats-hand {
      width: 110px;
      position: absolute;
      top: 0;
      cursor: pointer;
      left: 3%;
      &:hover {
        transform: translateX(2px);
      }
    }
  }
  .navbar {
    display: flex;
    margin-right: 50px;
    li {
      margin-top: 5px;
      margin-left: 20px;
      // background-color: $color_brown;
      padding: 3px;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 5px;
      font-size: 14px;
      &:hover {
        background-color: $colorHvBrown;
      }
    }
    a {
      font-family: myfont, serif;
      font-size: 20px;
      text-decoration: none;
      color: #fff;
      font-weight: lighter;
    }
  }
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
//・‥…━━━☆・‥…━━━☆・‥…━━━☆ selector
.JA_map_select {
  max-width: 450px;
}
.ja_map_border {
  width: 100%;
}
.area_select_content {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.text_selector {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 550px;
  margin-right: 20px;
}
.text_selector-content {
  position: relative;
  width: 100%;
  border-radius: 8px;
  background-color: #fef9ea;
  padding-left: 35px;
  padding-top: 30px;
  padding-bottom: 30px;
}

//・‥…━━━☆・‥…━━━☆・‥…━━━☆

.icon {
  width: 20px;
  height: 20px;
}
footer {
  margin-top: 10px;
}
.copyright {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-family: myfont, serif;
  font-weight: lighter;
  color: #fff;
  font-size: 20px;
  span {
    font-size: 12px;
  }
}
//・‥…━━━☆・‥…━━━☆・‥…━━━☆ アイコン
.ribon_icon,
.cat_icon {
  width: 30px;
  margin-right: 8px;
  margin-left: 8px;
}
//・‥…━━━☆・‥…━━━☆・‥…━━━☆・‥…━━━☆
.text_selector-content {
  margin: 0 auto;
}
.text_selector-title {
  font-family: myfont, serif;
  font-size: 28px;
  display: flex;
  color: $colorBrown;
  margin-left: -10px;
}
label {
  font-family: myfont, serif;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: darken($colorHeader, 10%);
}
.JA_selector-form {
  margin-top: 18px;
  display: flex;
}
.JA_prefectures {
  width: 300px;
}
.JA_city {
  width: 200px;
}
.JA_form-prefectures,
.JA_form-city {
  width: 80%;
  margin-top: 10px;
  height: 40px;
  padding-left: 10px;
  border: 2px solid lighten($colorBrown, 20%);
  border-radius: 10px;
  font-size: 20px;
  font-family: myfont,japanese-font, serif;
  color: $colorBrown;
  &:focus {
    outline: none;
  }
}
option {
  font-family: myfont, serif;
}
.return_cat {
  width: 120px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
  cursor: pointer;
  &:hover {
    transform: translateX(1px);
  }
}
.text_selector-status {
  font-family: myfont, serif;
  font-size: 26px;
  display: flex;
  color: $colorBrown;
  margin-left: -10px;
  margin-top: 30px;
}
.now_status {
  font-family: myfont, serif;
  font-size: 26px;
  display: flex;
  color: darken($colorHeader, 10%);
  align-items: center;
  margin-top: 25px;
}
.now_status_num {
  color: rgb(171, 153, 132);
  margin-right: 3px;
  margin-left: 3px;
}
.now_status_group {
  display: flex;
}
.go_btn {
  width: 120px;
  position: absolute;
  right: 15px;
  bottom: -15px;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
  }
}
</style>

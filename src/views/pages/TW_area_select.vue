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
        <div class="TW_map_select">
          <img
            src="/image/TW_MAP/taiwan_map_border.png"
            alt=""
            class="tw_map_border"
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
            <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
            <div class="TW_selector-form">
              <div class="TW_prefectures">
                <label for="" class="prefectures"
                  ><img
                    src="/image/cat_icon.png"
                    alt=""
                    class="cat_icon"
                  />區域</label
                >
                <select class="TW_form-prefectures"
                v-model="prefectureSelected" @change="getCity()"
                >
                  <option value="" selected>☆°請選擇區域°☆</option>
                  <option v-for="prefecture in prefectures" :key="prefecture.Id"
                  :value="prefecture.Id"
                  >{{prefecture.Name}}
                  </option>
                </select>
              </div>
              <div class="TW_city">
                 <label for="" class="TW_city_label"
                  ><img
                    src="/image/cat_icon.png"
                    alt=""
                    class="cat_icon"
                  />城市</label
                >
                <select class="TW_form-city"
                v-model="citySelected"
                @change="getNowstatus()"
                >
                  <option value="" selected>☆°請選擇城市°☆</option>
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
            <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
            <div class="now_status_group">
              <h3 class="now_status">
                <img
                  src="/image/cat_icon.png"
                  alt=""
                  class="cat_icon"
                />目前有&nbsp;<span class="now_status_num"> {{status}}</span
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
        <img src="/image/return_btn.png" class="return_cat" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      prefectures: '',
      prefectureSelected: '',
      citys: '',
      citySelected: '',
      status: '( ^ω^ )',
    };
  },
  created() {
    const vm = this;
    const APIprefectures = `${process.env.VUE_APP_APIPATH}api/Counties/3`;
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
      storage.setItem('Countries', '3');
      if (this.prefectureSelected !== '' || this.citySelected !== '') {
        this.$router.push('/ChatroomList');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '請選擇地區 (´・ω・｀)',
          showConfirmButton: false,
          timer: 2000,
        });
      }
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
$color_brown: rgb(169, 148, 127);
$color_hv_brown: rgba(182, 159, 136, 0.899);
$color_cat-base: #fef9ea;
$color_header: #fcd676;
$color_underline: #ffd36dd4;
$bgc: #ffffff;

* {
  box-sizing: border-box;
}
@font-face {
  font-family: 'myfont';
  src: url('/font/清松手寫體3.ttf');
}
body {
  height: auto;
  background-color: $color_header;
}
.tw_area_max-width {
  max-width: 1080px;
  margin: 0 auto;
}
.home__container {
  background-color: $bgc;
  padding: 15px;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 10px;
}
header {
  position: relative;
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
      margin-left: 20px;
      // background-color: $color_brown;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 5px;
      font-size: 14px;
      &:hover {
        background-color: $color_hv_brown;
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
  color: darken($color_brown, 15%);
  font-weight: bold;
}
//・‥…━━━☆・‥…━━━☆・‥…━━━☆ selector
.TW_map_select {
  max-width: 450px;
}
.tw_map_border {
  width: 80%;
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
  background-color: $color_cat-base;
  padding-left: 35px;
  padding-top: 30px;
  padding-bottom: 30px;
}
/*==============★ 台灣地図 ★==============*/

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
  color: $color_brown;
  margin-left: -10px;
}
label {
  font-family: myfont, serif;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: darken($color_header, 10%);
}
.TW_selector-form {
  margin-top: 18px;
  display: flex;
}
.TW_prefectures,.TW_city {
  width: 250px;
}
.TW_form-prefectures,.TW_form-city {
  width: 80%;
  margin-top: 10px;
  height: 40px;
  padding-left: 10px;
  border: 2px solid lighten($color_brown, 20%);
  border-radius: 10px;
  font-size: 20px;
  font-family: myfont, serif;
  color: $color_brown;
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
  color: $color_brown;
  margin-left: -10px;
  margin-top: 40px;
}
.now_status {
  font-family: myfont, serif;
  font-size: 26px;
  display: flex;
  color: darken($color_header, 10%);
  align-items: center;
  margin-top: 20px;
}
.now_status_num {
  color: rgb(171, 153, 132);
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

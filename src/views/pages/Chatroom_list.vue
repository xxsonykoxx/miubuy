<template>
  <div>
    <div class="max_width">
      <div>
        <div class="select_group">
          <select class="select_country"
          v-model="prefectureSelected"
          >
            <option selected>{{prefectureName}}</option>
            <option v-for="prefecture in prefectures" :key="prefecture.Id"
                  :value="prefecture.Id"
                  >{{prefecture.Name}}
                  </option>
          </select>
          <select class="select_area"
          v-model="citySelected"
          >
            <option selected>{{cityName}}</option>
            <option v-for="city in citys" :key="city.Id"
                  :value="city.Id">{{city.Name}}</option>
          </select>
          <input type="button" value="GO★" class="re-select_btn" />
        </div>
      </div>
      <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
      <div class="chatroomlist_container">
        <!--☆======== LOGO ========= ☆-->

        <div class="room_logo_group">
          <h1 class="miubuy">
            <a href="/index.html">miubuy</a>
          </h1>
          <h2 class="room_subtitle">台日即時代購平台★</h2>
        </div>

        <!--☆======== 搜尋列 ========= ☆-->

        <div class="search-bar_group">
          <input
            type="text"
            class="search-bar"
            placeholder="にじさんじ、魔法使いの約束 ..."
          />
          <div class="search_btn">
            <i class="fas fa-search"></i>
          </div>
        </div>

        <!--☆======== tag區域 ========= ☆-->

        <div class="tag_group">
          <h3 class="tags_title">
            <img src="/image/cat_hand_icon.png" alt="" width="30px" />
            快速找房間 ( ^ω^ )
          </h3>
          <ul class="tags">
            <li class="tag tag-pink" v-for="tag in tags" :key="tag.Id">
              {{tag.Name}}
            </li>
          </ul>
        </div>

        <!--☆======== 給你各位地圖重選ㄉ機會 ========= ☆-->

        <div class="map_selector">
          <router-link to="/Japan_area_select"><div class="map_select_jp">
          </div></router-link>
          <router-link to="/Taiwan_area_select"><div class="map_select_tw"></div></router-link>
        </div>

        <!--☆======== 房間列表 ========= ☆-->

        <div class="chatroom_list_group">
          <h3 class="chatroom_status">
            <img
              src="/image/ribon_pink.png"
              alt=""
              class="ribon_pink"
            />&nbsp;目前房間數&nbsp;<span>220</span>&nbsp;
            <img src="/image/stars.png" alt="" class="room_star" />
          </h3>
          <ul class="chatroom_list">
            <li class="chatroom" v-for="room in rooms" :key="room.Id">
              <div class="room_cover"></div>
              <div class="user_group">
                <div class="profile_img"></div>
                <div class="user">
                  <h3 class="user_name">田中さん</h3>
                  <h3 class="user_account"><a href="#">@tanaka123</a></h3>
                </div>
              </div>
              <div class="room_info">
                <h3 class="roomName">
                    ☆ 房名：<span class="open_time">{{room.Name}}</span>
                </h3>
                <h3 class="room_open">
                  ☆ 開房時間：<span class="open_time">{{room.roomStart}}</span>
                </h3>
                <h3 class="room_close">
                  ☆ 截止時間：<span class="close_time">{{room.roomEnd}}</span
                  >
                  <!-- <span class="remain"
                    >剩<span class="remaining-time">20</span>分</span
                  > -->
                </h3>
                <div class="hr"></div>
                <h3 class="room_rule">
                  ☆ 賣家規約：
                  <p>
                  {{room.Rule}}
                  </p>
                </h3>
                <ul class="roomtag_group">
                  <li class="roomtag"><a href="#">#東京</a></li>
                  <li class="roomtag"><a href="#">#池袋</a></li>
                  <li class="roomtag"><a href="#">#ACG</a></li>
                  <li class="roomtag"><a href="#">#代抽</a></li>
                  <li class="roomtag"><a href="#">#偶像夢幻祭</a></li>
                </ul>
               <router-link to="/Chatroom/9"><div class="room-enter_btn"></div></router-link>
              </div>
            </li>
          </ul>
          <div class="pagination">
            <div class="pagination_img">
              <div class="page_num_group">
                <button class="prep">&nbsp;</button>
                <button class="page_1st">1</button>
                <button class="page_2nd">2</button>
                <button class="page_3rd">3</button>
                <button class="page_4th">4</button>
                <button class="next">&nbsp;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mouseSymbol"></div>
    </div>
     <creatroom></creatroom>
     <div class="return-chatroom_btn"
     :class="{'return-chatroom_display-none':display}">
       <img src="/image/return_chat.png" alt="" width="130px" @click="returnChatroom">
     </div>
  </div>
</template>

<script>
import $ from '../../../node_modules/jquery';
import creatroom from './Model/Creatroom.vue';

export default {
  data() {
    return {
      prefectures: '',
      prefectureName: '',
      prefectureSelected: '',
      citys: '',
      cityName: '',
      citySelected: '',
      tags: '',
      token: '',
      display: true,
      roomID: '',
      rooms: [],
    };
  },
  components: {
    creatroom,
  },
  beforeCreate() {
    document.body.className = 'chatroomlist_BGI';
  },
  methods: {
    returnChatroom() {
      if (this.roomID === this.saveID) {
        this.$router.push(`/Chatroom/${this.roomID}`);
      }
    },
  },
  created() {
    const vm = this;
    /* ☆…☆…☆…☆…☆…☆ 地図API ☆…☆…☆…☆…☆…☆ */
    const country = sessionStorage.getItem('Countries');
    const APIprefectures = `${process.env.VUE_APP_APIPATH}api/Counties/${country}`;
    const APIcity = `${process.env.VUE_APP_APIPATH}api/Cities/${this.prefectureSelected}`;
    if (country === '1') {
      vm.axios.get(APIprefectures)
        .then((res) => {
          vm.prefectures = res.data;
          vm.prefectureSelected = sessionStorage.getItem('prefecture');
          vm.prefectures.forEach((i) => {
            if (i.Id === vm.prefectureSelected) {
              vm.prefectureName = i.Name;
            }
          });
        });
      vm.axios.get(APIcity)
        .then((res) => {
          vm.citys = res.data;
          vm.citySelected = sessionStorage.getItem('city');
          vm.citys.forEach((i) => {
            if (i.id === vm.citySelected) {
              vm.cityName = i.Name;
            }
          });
        });
    }
    if (country === '2') {
      vm.axios.get(APIprefectures)
        .then((res) => {
          vm.prefectures = res.data;
          vm.prefectureSelected = sessionStorage.getItem('prefecture');
          vm.prefectures.forEach((i) => {
            if (i.Id === vm.prefectureSelected) {
              vm.prefectureName = i.Name;
            }
          });
        });
      vm.axios.get(APIcity)
        .then((res) => {
          vm.citys = res.data;
          vm.citySelected = sessionStorage.getItem('city');
          vm.citys.forEach((i) => {
            if (i.id === vm.citySelected) {
              vm.cityName = i.Name;
            }
          });
        });
    }
    /* ☆…☆…☆…☆…☆…☆ タグAPI ☆…☆…☆…☆…☆…☆ */
    const tagAPI = `${process.env.VUE_APP_APIPATH}api/Tags`;
    vm.axios.get(tagAPI)
      .then((res) => {
        vm.tags = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    /* ☆…☆…☆…☆…☆…☆ ROOM API ☆…☆…☆…☆…☆…☆ */
    const roomsAPI = `${process.env.VUE_APP_APIPATH}api/Rooms`;
    const roomsConfig = {
      method: 'get',
      url: roomsAPI,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    vm.axios(roomsConfig)
      .then((res) => {
        vm.rooms = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    /* ☆…☆…☆…☆…☆…☆ return BTN ☆…☆…☆…☆…☆…☆ */
  },
  mounted() {
    $(window).mousemove((evt) => {
      // 更新游標的位置
      $('.mouseSymbol')
        .css('left', `${evt.pageX}px`)
        .css('top', `${evt.pageY}px`);
    });
  },
  computed: {
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
@import '@/assets/scss/_chatroom_list.scss';
@mixin size($w, $h: $w) {
  width: $w;
  height: $h;
}
@mixin ab_center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
* {
  box-sizing: border-box;
  // border: 1px solid #000 !important;
}
</style>

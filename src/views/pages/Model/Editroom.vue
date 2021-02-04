<template>
  <div class="modale" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-header">
          <img src="/image/deco_cat-ribon.png" alt="" class="ribon001" />
        <h2 class="creatroom_title">
          <img src="/image/deco_cat.png" alt="" class="star001" />
          編輯房間
          <img src="/image/deco_cat.png" alt="" class="star001" />
        </h2>
      </div>
      <div class="modal-body">
        <div class="modal-body-l">
        <div class="room_name_group group-flex mb">
          <label for="">房名</label>
          <input type="text" v-model="roomdata.Name">
        </div>
        <div class="room_photo_group group-flex mb">
          <vue-core-image-upload
            class="room_photo-uploadBTN"
            :crop="false"
            :credentials="false"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            url="https://miubuy.rocket-coding.com/api/UpLoadFile" >
          </vue-core-image-upload>
          <label for="">招牌圖片</label>
          <img :src="roomdata.Picture" class="room_img">
        </div>
        <div class="room_location_group group-flex mb">
          <label for="">所在地區</label>
          <div>
            <select name=""
            class="select-country"
            v-model="roomdata.CountryId"
            @change="getcounty()"
            >
              <!-- <option value="" selected disabled>( ^ω^ )</option> -->
            <option v-for="country in getCountry"
            :key="country.Id"
            :value="country.Id">{{country.Name}}</option>
            </select>
            <div>
              <select name="" v-model="roomdata.CountyId"
              @change="getcity()"
              >
                <option v-for="county in getCounty"
              :key="county.Id"
              :value="county.Id">{{county.Name}}</option>
              </select>
              <select name="" v-model="roomdata.CityId">
              <option v-for="city in getCity"
              :key="city.Id"
              :value="city.Id">{{city.Name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="category_group group-flex mb">
          <label for="">代購種類</label>
          <select name="" id="">
            <option v-for="tag in getTags" :key="tag.Id">
             {{tag.Name}} </option>
          </select>
        </div>
        <div class="max_member group-flex mb">
          <label for="">最大人數</label>
          <select name="" v-model="roomdata.MaxUsers">
            <option value="1" selected>1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div class="access_review-limit group-flex mb">
          <label for="">最低評價要求</label>
          <select name="" id="">
            <option value="">0</option>
            <option value="">1</option>
            <option value="">2</option>
          </select>
        </div>
        <ul class="access_checkgroup">
          <li class="r18_request">
            <input type="checkbox" v-model="roomdata.R18"><span>是否接受R18委託代購</span>
          </li>
        </ul>
        </div>
        <div class="modal-body-r">
          <label for="" class="rule_title">房間規約</label>
          <textarea name="" id="" cols="30" rows="10" v-model="roomdata.Rule"></textarea>
        </div>
      </div>
      <div class="modal-footer group-flex">
        <button class="btn-close closemodale" aria-hidden="true" @click="closeModal">取消</button>
        <button class="btn-close closemodale" aria-hidden="true"
        @click="putRoomInfo">
        確定</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload';
import $ from '../../../../node_modules/jquery';

export default {
  data() {
    return {
      getCountry: '',
      getCounty: '',
      getCity: '',
      getTags: '',
      token: '',
    };
  },
  props: ['roomdata'],
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  created() {
    const vm = this;
    this.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ Country ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    const countryAPI = 'https://miubuy.rocket-coding.com/api/Countries';
    vm.axios.get(countryAPI)
      .then((res) => {
        vm.getCountry = res.data;
      });
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ Country ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    const countyAPI = 'https://miubuy.rocket-coding.com/api/Counties';
    vm.axios.get(countyAPI)
      .then((res) => {
        vm.getCounty = res.data;
      });
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ City ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    const cityAPI = 'https://miubuy.rocket-coding.com/api/Cities';
    vm.axios.get(cityAPI)
      .then((res) => {
        vm.getCity = res.data;
      });
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ Tags ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    const tagAPI = 'https://miubuy.rocket-coding.com/api/Tags';
    vm.axios.get(tagAPI)
      .then((res) => {
        vm.getTags = res.data;
      });
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ Tags ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
  },
  mounted() {
    $('.openmodale').click((e) => {
      e.preventDefault();
      $('.modale').addClass('opened');
    });
    $('.closemodale').click((e) => {
      e.preventDefault();
      $('.modale').removeClass('opened');
    });
  },
  methods: {
    closeModal() {
      $('.modale').removeClass('opened');
    },
    imageuploaded(res) {
      const img = res;
      this.roomdata.Picture = `https://miubuy.rocket-coding.com/Img/${img}`;
    },
    getcounty() {
      const vm = this;
      const countyAPI = `https://miubuy.rocket-coding.com/api/Counties/${vm.roomdata.CountryId}`;
      vm.axios.get(countyAPI)
        .then((res) => {
          vm.getCounty = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getcity() {
      const vm = this;
      const cityAPI = `https://miubuy.rocket-coding.com/api/Cities/${vm.roomdata.CountyId}`;
      vm.axios.get(cityAPI)
        .then((res) => {
          vm.getCity = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    putRoomInfo() {
      const vm = this;
      const putRoomAPI = `https://miubuy.rocket-coding.com/api/Rooms/${vm.roomdata.Id}`;
      const newroomDetail = vm.$qs.stringify({
        MaxUsers: vm.roomdata.MaxUsers,
        Name: vm.roomdata.Name,
        Picture: vm.roomdata.Picture,
        CountryId: Number(vm.roomdata.CountryId),
        CountyId: Number(vm.roomdata.CountyId),
        CityId: Number(vm.roomdata.CityId),
        TagId: Number(vm.roomdata.TagId),
        Rule: vm.roomdata.Rule,
        R18: vm.roomdata.R18,
        TagText: vm.roomdata.TagText,
      });
      const config = {
        method: 'put',
        url: putRoomAPI,
        headers: {
          Authorization: `Bearer ${vm.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: newroomDetail,
      };
      vm.axios(config)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
.group-flex {
  display: flex;
  align-items: center;
}
.creat {
  color: #fff;
}
.room_img {
  width: 200px;
  height: 100px;
  background-color: $colorHeader;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
     font-family: myfont,  japanese-font, serif;
     color: #fff;
     cursor: pointer;
     font-size: 18px;
  }
  &:hover {
    background-color: darken($colorHeader,5%);
  }
}
.modale:before {
  content: '';
  display: none;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
.opened:before {
  display: block;
}
.opened .modal-dialog {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  transform: translateX(-20%);
  top: 15%;
}
.modal-dialog {
  overflow:initial;
  background:$colorHeader;
  border: #4e4b4b solid 2px;
  border-radius: 8px;
  margin-left: -200px;
  position: fixed;
  left: 50%;
  top: -100%;
  z-index: 11;
  width: 680px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  -webkit-transform: translate(0, -500%);
  -ms-transform: translate(0, -500%);
  transform: translate(0, -500%);
  -webkit-transition: -webkit-transform 0.3s ease-out;
  -moz-transition: -moz-transform 0.3s ease-out;
  -o-transition: -o-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
}
.mb{
  margin-bottom: 14px;
}
.modal-body-l{
  margin-right: 25px;
}
.modal-body-r {
  margin-left: 25px;
  textarea {
    resize: none;
    white-space: pre-wrap;
    padding: 10px;
    font-family: myfont,  japanese-font, serif;
    color: $colorBrown;
    font-size: 18px;
     &:focus {
       outline: none;
     }
  }
  .rule_title {
    margin-bottom: 15px;
  }
}
.modal-body {
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 25px;
  height: 400px;
  overflow-y: auto;
  label {
    color: $colorBrown;
    margin-right: 15px;
    font-size: 20px;
  }
  input {
    height: 28px;
    border: none;
    border-bottom: 2px solid lighten($colorBrown,10%);
    font-size: 20px;
    padding-left: 8px;
    font-family: myfont, japanese-font,  serif;
    color: $colorBrown;
  }
  select{
    height: 28px;
    font-family: myfont,  japanese-font, serif;
    color: $colorBrown;
    border: none;
    margin-right: 8px;
    font-size: 18px;
     border-bottom: 2px solid lighten($colorBrown,10%);
  }
}
.r18_request {
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-size: 20px;
    font-family: myfont,  japanese-font, serif;
    color: $colorBrown;
  }
}
/* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */

.ribon001 {
  position: absolute;
  width: 90px;
  top: -40px;
  left: 0;
}
.creatroom_title {
  font-family: myfont,  japanese-font, serif;
  font-size: 24px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .star001 {
    margin-left: 8px;
    width: 30px;
  }
}
.modal-header {
  position: relative;
}
.modal-footer {
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    height: 38px;
    margin-left: 10px;
    width: 80px;
      font-family: myfont,  japanese-font, serif;
  font-size: 20px;
  color: #fff;
  background-color: $colorBrown;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
     background-color: lighten($colorBrown,10%);
  }
  }
}
</style>

<template>
  <div class="modale" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-header">
          <img src="/image/deco_cat-ribon.png" alt="" class="ribon001" />
        <h2 class="creatroom_title">
          <img src="/image/deco_cat.png" alt="" class="star001" />
          新增房間
          <img src="/image/deco_cat.png" alt="" class="star001" />
        </h2>
      </div>
      <div class="modal-body">
        <div class="modal-body-l">
        <div class="room_name_group group-flex mb">
          <label for="">房名</label>
          <input type="text" v-model=" roomInfo.Name" class="roomName">
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
         <img :src="roomInfo.Picture" class="room_img">
          <!-- <h3>上傳(jpg)</h3> -->
        </div>
        <div class="room_location_group group-flex mb">
          <label for="">所在地區</label>
          <div>
            <select name=""
            class="select-country"
            v-model="roomInfo.CountryId"
            @change="getcounty()"
            >
              <option value="" selected disabled>( ^ω^ )</option>
            <option v-for="country in getCountry"
            :key="country.Id"
            :value="country.Id">{{country.Name}}</option>
            </select>
            <div>
              <select name="" v-model="roomInfo.CountyId"
              @change="getcity()"
              >
                <option value="1" selected>不選 ☆彡</option>
                <option v-for="county in getCounty"
              :key="county.Id"
              :value="county.Id">{{county.Name}}</option>
              </select>
              <select name="" v-model="roomInfo.CityId">
              <option v-for="city in getCity"
              :key="city.Id"
              :value="city.Id">{{city.Name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="category_group group-flex mb">
          <label for="">代購種類</label>
          <select name="" v-model="roomInfo.TagId">
            <option value="" selected disabled>選擇Tag</option>
            <option v-for="tag in getTags"
            :key="tag.Id" :value="tag.Id">{{tag.Name}}</option>
          </select>
        </div>
        <div class="max_member group-flex mb">
          <label for="">最大人數</label>
          <select name="" v-model="roomInfo.MaxUsers">
            <option value="1" selected>1</option>
          </select>
        </div>
        <div class="access_review-limit group-flex mb">
          <label for="">最低評價要求</label>
          <select name="" id="">
            <option value="">0</option>
            <option value="">1</option>
          </select>
        </div>
        <ul class="access_checkgroup">
          <li class="r18_request">
            <input type="checkbox" v-model="roomInfo.R18"><span>是否接受R18委託代購</span>
          </li>
        </ul>
        </div>
        <div class="modal-body-r">
          <label for="" class="rule_title">房間規約</label>
          <textarea name="" id="" cols="30" rows="10" v-model="roomInfo.Rule"></textarea>
        </div>
      </div>
      <div class="modal-footer group-flex">
        <button class="btn-close closemodale" aria-hidden="true">取消</button>
        <button class="btn-close" aria-hidden="true" @click="creatRoom">
          <a class="creat">建立</a></button>
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
      roomInfo: {
        MaxUsers: '',
        Name: '',
        Picture: null,
        CountryId: '',
        CountyId: '',
        CityId: '',
        TagId: '',
        Rule: '',
        R18: false,
        TagText: '',
      },
      getCountry: '',
      getCounty: '',
      getCity: '',
      getTags: '',
      token: '',
      routerID: '',
    };
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  created() {
    this.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    const vm = this;
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    const countryAPI = 'https://miubuy.rocket-coding.com/api/Countries';
    vm.axios.get(countryAPI)
      .then((res) => {
        vm.getCountry = res.data;
      });
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    const tagAPI = 'https://miubuy.rocket-coding.com/api/Tags';
    vm.axios.get(tagAPI)
      .then((res) => {
        vm.getTags = res.data;
      });
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
    imageuploaded(res) {
      const img = res;
      this.roomInfo.Picture = `https://miubuy.rocket-coding.com/Img/${img}`;
    },
    getcounty() {
      const vm = this;
      const countyAPI = `https://miubuy.rocket-coding.com/api/Counties/${vm.roomInfo.CountryId}`;
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
      const cityAPI = `https://miubuy.rocket-coding.com/api/Cities/${vm.roomInfo.CountyId}`;
      vm.axios.get(cityAPI)
        .then((res) => {
          vm.getCity = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    creatRoom() {
      const vm = this;
      const roomsAPI = 'https://miubuy.rocket-coding.com/api/Rooms';
      const roomDetail = this.$qs.stringify({
        MaxUsers: Number(vm.roomInfo.MaxUsers),
        Name: vm.roomInfo.Name,
        Picture: vm.roomInfo.Picture,
        CountryId: Number(vm.roomInfo.CountryId),
        CountyId: Number(vm.roomInfo.CountyId),
        CityId: Number(vm.roomInfo.CityId),
        TagId: Number(vm.roomInfo.TagId),
        Rule: vm.roomInfo.Rule,
        R18: vm.roomInfo.R18,
        TagText: vm.roomInfo.TagText,
      });
      const config = {
        method: 'post',
        url: roomsAPI,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: roomDetail,
      };
      this.axios(config)
        .then((response) => {
          vm.routerID = response.data;
          vm.$router.push(`/Chatroom/${vm.routerID}`);
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
@import '@/assets/scss/_creatroom.scss';
</style>

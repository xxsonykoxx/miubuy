<template>
  <div class="mypage_content">
    <div class="deco_group">
      <div class="deco01">
        <img src="/image/deco_cat-ribon.png" alt="" class="deco_cat-ribon" />
      </div>
      <div class="deco02">
        <img src="/image/deco_cat.png" alt="" width="40px" />
      </div>
      <div class="deco03">
        <img src="/image/user_info.png" alt="" class="buyer_icon" />
      </div>
    </div>
    <div class="myinfo_content">
      <div class="myinfo_right-content">
        <form action="" class="myinfo_form">
          <div class="my-photo">
           <vue-core-image-upload
            class="uploadBTN"
            :crop="false"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            url="https://miubuy.rocket-coding.com/api/UpLoadFile" >
          </vue-core-image-upload>
            <img :src="myinfo.photo" class="myphoto">
            <h3>上傳(jpg)</h3>
          </div>
          <div class="my-password_group info-group">
            <label for="">修改密碼</label>
            <input type="password" autocomplete="new-password"
            v-model="myinfo.password" placeholder="要打密碼唷☆"/>
          </div>
          <div class="my-password_group2 info-group">
            <label for="">確認密碼</label>
            <input type="password" autocomplete="new-password" v-model="myinfo.repass"/>
          </div>
          <div class="myinfo_hr"></div>
          <div class="my-name_group info-group">
            <label for="">匿稱</label>
            <input type="text" v-model="myinfo.alias"/>
          </div>
          <div class="my-email_group info-group">
            <label for="">email</label>
            <input type="email" v-model="myinfo.email"/>
          </div>
          <div class="my-phone_group info-group">
            <label for="">手機</label>
            <input type="text" v-model="myinfo.phone"/>
          </div>
          <h3 class="form-submit" @click="patchInfo">送出</h3>
        </form>
      </div>
      <div class="myinfo_left-content">
        <img
          src="/image/line-style2.png"
          alt=""
          width="25px"
          class="line-style2"
        />
        <img
          src="/image/star-wing-icon.png"
          alt=""
          width="45px"
          class="star-wing-icon"
        />
        <h3 class="myreview_title">( °ω°) 我的評價 ♪</h3>
      </div>
    </div>
  </div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      myinfo: {
        password: '',
        repass: '',
        alias: '',
        email: '',
        phone: '',
        photo: null,
      },
      src: '',
      token: '',
      id: '',
      Account: '',
      uploadPhoto: null,
    };
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  mounted() {
    const vm = this;
    this.id = localStorage.getItem('ID');
    vm.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    const myAPI = `${process.env.VUE_APP_APIPATH}api/Users/${this.id}`;
    this.axios.defaults.headers.common.Authorization = `Bearer ${vm.token}`;
    this.axios.get(myAPI).then((res) => {
      console.log(res);
      const user = res.data;
      vm.Account = user.Account;
      vm.myinfo.alias = user.Nickname;
      vm.myinfo.email = user.Email;
      vm.myinfo.phone = user.Phone;
      vm.myinfo.photo = user.Picture;
    });
  },
  methods: {
    imageuploaded(res) {
      const img = res;
      this.myinfo.photo = `https://miubuy.rocket-coding.com/Img/${img}`;
    },
    patchInfo() {
      const vm = this;
      const userInfo = vm.$qs.stringify({
        Id: vm.id,
        Account: vm.Account,
        Password: vm.myinfo.password,
        Email: vm.myinfo.email,
        Nickname: vm.myinfo.alias,
        Phone: vm.myinfo.phone,
        Picture: vm.myinfo.photo,
      });
      const config = {
        method: 'put',
        url: `${process.env.VUE_APP_APIPATH}api/Users/${this.id}`,
        headers: {
          Authorization: `Bearer ${vm.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: userInfo,
      };
      vm.axios(config)
        .then((res) => {
          if (res.data === Number(vm.id)) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '個人資料更改成功★',
              showConfirmButton: false,
              timer: 2000,
            });
          }
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
* {
  box-sizing: border-box;
  // border: 1px solid #000 !important;
}
/*==============★ 本體★==============*/
.mypage_content {
  font-family: myfont, japanese-font, serif;
  color: darken($colorBrown, 10%);
  position: relative;
  background-color: $colorBrown;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid darken($colorBrown, 10%);
  margin: 20px;
  margin-top: 10px;
}
.myinfo_content {
  display: flex;
}
.uploadBTN {
  height: 100px;
  width: 100px;
  opacity: 0;
  position: absolute;
  top: 0;
  z-index: 10;
}
/*==============★ 裝飾★==============*/
.deco01 {
  position: absolute;
  top: -40px;
  left: -30px;
  z-index: 99;
}
.deco02 {
  position: absolute;
  bottom: -10px;
  right: -15px;
  z-index: 99;
}
.deco03 {
  position: absolute;
  top: -84px;
  left: 80px;
  z-index: 99;
}
.buyer_icon {
  width: 250px;
}
.deco_cat-ribon {
  width: 100px;
}
/*==============★ 右邊樣式 ★==============*/
.myinfo_right-content {
  padding: 20px;
  flex: 1;
}
.myinfo_form {
  margin-top: 5px;
  position: relative;
  label {
    font-size: 18px;
    color: #fff;
  }
}
.myinfo_hr {
  background-image: url(/image/heart-line.png);
  background-size: cover;
  height: 16px;
  width: 60%;
  margin-bottom: 16px;
  transform: translateY(-3px);
}
.info-group {
  display: flex;
  margin-bottom: 16px;
  input {
    margin-left: 10px;
    height: 28px;
    width: 40%;
    border: none;
    border-radius: 5px;
    padding-left: 7px;
    font-family: myfont, japanese-font, serif;
    font-size: 20px;
    color: $colorBrown;
  }
  input::placeholder {
    color: $colorBrown;
  }
}
.my-photo {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba($colorHeader, 0.6);
  border-radius: 100%;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  h3 {
    color: #fff;
  }
  &:hover {
    background-color: rgba($colorHeader, 1);
  }
  .myphoto {
    width: 100px;
    height: 100px;
    border: 1px solid $colorBrown;
    border-radius: 100%;
    position: absolute;
    z-index: 1;
  }
}
.form-submit {
  background-color: $colorCat;
  height: 32px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: absolute;
  right: 40px;
  bottom: -20px;
  cursor: pointer;
  &:hover {
    background-color: $colorHeader;
    color: #fff;
  }
}
/*==============★ 左邊樣式 ★==============*/
.myinfo_left-content {
  position: relative;
  background-color: $colorCat;
  flex: 1;
  border-radius: 8px;
  z-index: 2;
  padding: 10px;
}
.star-wing-icon {
  position: absolute;
  top: -12px;
  left: -20px;
}
.line-style2 {
  position: absolute;
  top: 40px;
  left: -35px;
}
.myreview_title {
  font-size: 24px;
  display: flex;
  justify-content: center;
  color: lighten($colorBrown, 2%);
  margin-top: 5px;
}
</style>

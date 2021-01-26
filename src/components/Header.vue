<template>
  <header class="all-header">
    <div class="sell-btn">
      <img src="/image/cats-handv2.png" alt="" class="cats-hand openmodale" />
    </div>
    <!-- <div class="miubuy_logo">
      <a href="index.html"></a>
    </div> -->
    <ul class="navbar">
      <li class="login"  v-if="isLogin">
        <router-link to="/Mypage/Myinfo" class="myname">
        <img :src="myinfo.photo" class="headerphoto">{{myinfo.alias}}</router-link>
      </li>
      <li class="login" v-if="isLogin" @click="logout">
        <router-link to="/">登出</router-link></li>
      <li class="logout" v-else><router-link to="/Login">登入</router-link></li>
      <li class="signup ismember" v-if="isMember"><router-link to="/Signup">註冊</router-link></li>
      <li class="signup notmember" v-else><router-link to="/Signup">註冊</router-link></li>
    </ul>
  </header>
</template>

<!--☆…☆…☆…☆…☆…☆…☆…☆…☆…☆ SCRIPT ☆…☆…☆…☆…☆…☆…☆…☆…☆…☆-->

<script>
import $ from '../../node_modules/jquery';

export default {
  data() {
    return {
      isLogin: '',
      isMember: '',
      id: '',
      token: '',
      myinfo: {
        password: '',
        repass: '',
        alias: '',
        email: '',
        phone: '',
        photo: null,
      },
    };
  },
  created() {
    const vm = this;
    const isLogin = localStorage.getItem('token') === 'ImLogin';
    if (isLogin === true) {
      vm.isLogin = true;
      vm.isMember = true;
    } else {
      vm.isLogin = false;
      vm.isMember = false;
    }
    vm.id = localStorage.getItem('ID');
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
  mounted() {
    $('.openmodale').click((e) => {
      console.log('123');
      e.preventDefault();
      $('.modale').addClass('opened');
    });
    $('.closemodale').click((e) => {
      e.preventDefault();
      $('.modale').removeClass('opened');
    });
  },
  methods: {
    logout() {
      window.location.reload();
      document.cookie = 'userToken=; expires=; path=/';
      localStorage.removeItem('token');
      localStorage.clear();
    },
  },
};
</script>

<!--☆…☆…☆…☆…☆…☆…☆…☆…☆…☆ SCSS ☆…☆…☆…☆…☆…☆…☆…☆…☆…☆-->

<style lang="scss">
@import '@/assets/scss/color.scss';
.all-header {
  position: relative;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
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
    align-items: center;
    li {
      margin-left: 20px;
      // background-color: $color_brown;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 5px;
      font-size: 14px;
      &:hover {
        background-color: darken($colorHeader,5%);
        height: 100%;
      }
    }
    a {
      font-family: myfont, japanese-font, serif !important;
      font-size: 20px;
      text-decoration: none;
      color: #fff;
      font-weight: lighter;
      display: flex;
      align-items: center;
    }
  }
}
.logout {
  padding: 9px;
}
.headerphoto {
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 100%;
  margin-right: 5px;
}
.ismember {
  display: none;
}
</style>

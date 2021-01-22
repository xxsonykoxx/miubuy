<template>
  <header>
    <div class="sell-btn">
      <img src="/image/cats-handv2.png" alt="" class="cats-hand openmodale" />
    </div>
    <!-- <div class="miubuy_logo">
      <a href="index.html"></a>
    </div> -->
    <ul class="navbar">
      <li class="login">
        <router-link to="/Mypage/Myinfo">我的頁面</router-link>
      </li>
      <li class="login" v-if="isLogin" @click="logout">
        <router-link to="/">登出</router-link></li>
      <li class="login" v-else><router-link to="/Login">登入</router-link></li>
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
      padding: 5px !important;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 5px;
      font-size: 14px;
      &:hover {
        // background-color: $color_hv_brown;
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
.ismember {
  display: none;
}
</style>

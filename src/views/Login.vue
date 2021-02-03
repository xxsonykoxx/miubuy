<template>
  <div class="container">
    <div>
      <div class="login_header">
        <img src="/image/signup_header.png" alt="" class="header_img" />
      </div>
    </div>
    <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
    <h1 class="miu_buy_title">
      <a href="/index.html"
        >Miubuy喵敗
        <img src="/image/logo_white.png" alt="miubuy" class="logo_white_img"
      /></a>
    </h1>
    <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
    <div class="login_form_content">
      <form action="" class="login_form">
        <h2 class="login_title">
          <img
            src="/image/signup_ribon2.png"
            alt=""
            class="icon_ribon_01"
          />會員登入
        </h2>
        <div class="form_account-and-pass">
          <div class="login--account_group">
            <label for="" class="login_acount">帳號</label>
            <input type="text" class="login--acount" v-model="user.Account" />
          </div>
          <div class="login--pass_group">
            <label for="" class="login_pass">密碼</label>
            <input
              type="password"
              class="login--password"
              v-model="user.Password"
              @keyup.enter="login"
            />
          </div>
        </div>
        <h3 class="remember-me">
          <input type="checkbox" />
          <span>記住我</span>
        </h3>
        <h5 class="login_btn" @click="login">
          <router-link to="">登入</router-link>
        </h5>
      </form>
      <div class="already_member">
        <h4>
          ☆還不是會員？ 快<router-link to="/Signup">註冊</router-link>吧 ( ^ω^ )
        </h4>
      </div>
    </div>
    <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
    <div class="login_deco">
      <div class="ribon1">
        <img src="/image/signup_ribon1.png" alt="" class="ribon_01" />
      </div>
      <div class="cats_illust">
        <img src="/image/signup_nekos.png" alt="" class="cats_illust_img" />
      </div>
      <div class="cats_illust2">
        <img src="/image/signup_cats.png" alt="" class="cats_illust_img2" />
      </div>
      <div class="stars">
        <img src="/image/star.png" alt="" class="star_img" />
      </div>
      <div class="stars2">
        <img src="/image/star.png" alt="" class="star_img2" />
      </div>
      <div class="stars3">
        <img src="/image/star.png" alt="" class="star_img3" />
      </div>
    </div>
    <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
    <footer>
      <h5 class="login_copyright"><span>© </span>baihu & sonyko</h5>
      <div class="login_footer">
        <img src="/image/signup_footer.png" alt="" class="footer_img" />
        <div class="cyo-ku">
          <img src="/image/signup_chooku.png" alt="" class="cyo-ku-img" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      user: {
        Account: '',
        Password: '',
      },
    };
  },
  created() {},
  methods: {
    login() {
      const API = 'https://miubuy.rocket-coding.com/api/Login';
      const user = this.$qs.stringify(this.user);
      const config = {
        method: 'post',
        url: API,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: user,
      };

      this.axios(config)
        .then((response) => {
          if (response.data !== false) {
            const userToken = response.data.token;
            document.cookie = `userToken=${userToken}; path=/`;
            localStorage.setItem('token', 'ImLogin');
            localStorage.setItem('ID', response.data.Id);
            this.$router.push('/');
          }
          if (response.data === false) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '帳號密碼錯誤 (´・ω・｀)',
              showConfirmButton: false,
              timer: 2500,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeCreate() {
    document.body.className = 'login';
  },
};
</script>

<style lang="scss">
//☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
* {
  box-sizing: border-box;
  transition: all 0.5s;
}
.container {
  max-width: 100%;
}
body.login {
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  max-width: 100%;
  height: auto;
  background-color: #4a604e;
}
//☆===========header & footer===========☆
.login_header,
.header_img {
  max-width: 100%;
}
.login_footer {
  position: fixed;
  max-width: 100%;
  bottom: -1px;
  left: 0;
}
.footer_img {
  max-width: 100%;
}
.login_copyright {
  position: fixed;
  left: 10px;
  bottom: 5px;
  z-index: 99;
  color: #fff;
  font-family: myfont, serif;
  span {
    font-size: 12px;
  }
}
//☆===========Decoration===========☆
.ribon1 {
  position: fixed;
  right: 20px;
  top: 70px;
  width: 80px;
  height: 80px;
  .ribon_01 {
    width: 100%;
  }
}
.cats_illust {
  width: 320px;
  position: absolute;
  bottom: 50px;
  left: 3%;
}
.cats_illust_img {
  width: 100%;
}
.cyo-ku {
  position: absolute;
  bottom: 0px;
  left: 250px;
  .cyo-ku-img {
    width: 350px;
  }
  z-index: 10;
}
.cats_illust2 {
  width: 280px;
  position: absolute;
  bottom: 20px;
  right: 2%;
  .cats_illust_img2 {
    width: 100%;
  }
  z-index: 1;
}
.stars {
  position: absolute;
  top: 40%;
  left: 25%;
  animation: star_anime 2.5s infinite;
}
.stars2 {
  position: absolute;
  top: 10%;
  right: 26%;
  animation: star_anime 3s infinite;
}
.stars3 {
  position: absolute;
  bottom: 20%;
  right: 10%;
}
.star_img3 {
  width: 12px;
  animation: star_anime 4s infinite;
  transform: rotate(25deg);
}
.star_img {
  width: 10px;
  transform: rotate(-25deg);
}
.star_img2 {
  width: 8px;
}
@keyframes star_anime {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
//☆===========h1 & Logo===========☆
.miu_buy_title {
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
  float: left;
}
.logo_white_img {
  left: 10px;
  width: 30%;
  position: absolute;
  top: 50px;
  &:hover {
    transform: translateY(-2px);
  }
}
//☆===========Form Content===========☆
.form_top_group {
  position: relative;
  display: flex;
}
.login_photo_group {
  height: 120px;
  width: 120px;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  margin-left: 60px;
  margin-top: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  p {
    color: #fff;
    font-size: 20px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.516);
  }
}
.login_form {
  position: relative;
}
.login_form_content {
  font-family: myfont, serif;
  font-weight: lighter;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  margin-left: 25px;
  margin-top: 50px;
  border-radius: 5px;
  h2 {
    font-size: 24px;
    color: #fff;
    font-weight: lighter;
    margin-bottom: 15px;
  }
  label {
    font-size: 20px;
    color: #fff;
    margin-right: 10px;
    margin-bottom: 3px;
  }
  input {
    font-family: myfont, serif;
    height: 30px;
    border: none;
    border-radius: 4px;
    padding-left: 10px;
    color: #ebffef;
    font-size: 20px;
    background-color: rgba(#fff, 0.3);
    letter-spacing: 2px;
    margin-bottom: 5px;
  }
}
.login_form_content {
  .login--acount,
  .login--password {
    width: 68%;
  }
}
.login_title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon_ribon_01 {
  width: 60px;
}
.login--account_group,
.login--pass_group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}
.email {
  width: 40%;
}
.birthday_group {
  color: #fff;
  input {
    width: 10%;
  }
}
input::placeholder {
  color: #fff;
  font-size: 16px;
}
//☆=========== terms ==========☆
.terms_group {
  margin-top: 30px;
  color: rgb(255, 255, 255);
  p {
    margin-top: 10px;
  }
  a {
    text-decoration: none;
    color: rgb(255, 255, 118);
    &:hover {
      color: rgb(153, 255, 223);
    }
  }
}
.remember-me {
  display: flex;
  align-items: center;
  margin-left: 25px;
}
.remember-me {
  span {
    color: #fff;
    font-size: 18px;
    margin-bottom: 2px;
  }
}
//☆=========== submit BTN ==========☆
.login_btn {
  a {
    margin-left: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    height: 30px;
    width: 70px;
    background-color: rgba(255, 255, 255, 0.447);
    border-radius: 5px;
    color: #fff;
    text-decoration: none;
    &:hover {
      background-color: rgba(255, 255, 255, 0.694);
    }
  }
  a {
    z-index: 100;
  }
}
//☆=========== ismember ==========☆
.already_login,
.already_member {
  margin-top: 45px;
  color: #fff;
  a {
    text-decoration: none;
    color: rgb(255, 252, 179);
    &:hover {
      color: rgb(153, 255, 223);
    }
  }
}
</style>

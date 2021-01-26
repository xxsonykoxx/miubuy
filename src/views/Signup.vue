<template>
  <div class="signup_container">
    <div>
      <div class="signup_header">
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
    <div class="sign_form_content">
      <form action="" class="sign_form">
        <h2 class="signup_title">
          <img
            src="/image/signup_ribon2.png"
            alt=""
            class="sign_icon01"
          />會員註冊
        </h2>
        <div class="form_top_group">
          <div class="form_account-and-pass">
            <div class="account_group">
              <label for="" class="sign_acount">帳號</label>
              <input type="text" class="acount" v-model="user_signup.Account" />
            </div>
            <div class="pass_group">
              <label for="" class="sign_pass">密碼</label>
              <input
                type="password"
                name="fieldName"
                class="password"
                v-model="user_signup.Password"
              />
            </div>
            <div class="confirm-pass_group">
              <label for="" class="sign_confirm-pass">確認密碼</label>
              <input
                type="password"
                class="confirm-password"
                v-model="user_signup.RePassword"
              />
            </div>
          </div>
          <div class="signup_photo_group">
            <p>
              上傳照片
            </p>
          </div>
        </div>
        <div class="hr"></div>
        <div class="name_group">
          <label for="sign_name"> 姓名</label>
          <input type="text" class="sign_name" v-model="user_signup.Name" />
          <label for="sign_alias"> 匿稱</label>
          <input type="text" class="sign_alias" v-model="user_signup.Alias" />
        </div>

        <div class="email_group">
          <label for="" class="sign_email">信箱</label>
          <input type="email" class="email"
          :rules="emailRules"
          required
          v-model="user_signup.Email" />
        </div>
        <div class="phone_group">
          <label for="" class="sign_phone">電話</label>
          <input type="text" class="phone" v-model="user_signup.Phone" />
        </div>
        <div class="birthday_group">
          <label for="" class="signup_bd">生日</label>
          <input
            type="text"
            class="bd_year"
            placeholder="年"
            v-model="user_signup.Birthday.Year"
          />/
          <input
            type="text"
            class="bd_mon"
            placeholder="月"
            v-model="user_signup.Birthday.Month"
          />
          /
          <input
            type="text"
            class="bd_day"
            placeholder="日"
            v-model="user_signup.Birthday.Day"
          />
        </div>
        <div class="terms_group">
          <label for="">利用規約</label>
          <p>☆請詳細閱讀 miubuy <a href="#">利用規約</a>後勾選同意 ( ^ω^ )</p>
          <h3 class="agree">
            <input type="checkbox" v-model="agree"/>
            <span>我同意</span>
          </h3>
        </div>
        <h5 class="signup_btn"><a  @click="signup">註冊</a></h5>
      </form>
      <div class="already_signup">
        <h4>
          ☆已經是會員惹？ 快<router-link to="/Login">登入</router-link>吧 ( ^ω^
          )
        </h4>
      </div>
    </div>
    <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
    <div class="signup_deco">
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
      <h5 class="sign_copyright"><span>© </span>baihu & sonyko</h5>
      <div class="signup_footer">
        <img src="/image/signup_footer.png" alt="" class="footer_img" />
        <div class="cyo-ku">
          <img src="/image/signup_chooku.png" alt="" class="cyo-ku-img" />
        </div>
      </div>
    </footer>
  </div>
</template>

<!--☆…☆…☆…☆…☆…☆…☆…☆…☆…☆ SCRIPT ☆…☆…☆…☆…☆…☆…☆…☆…☆…☆-->

<!-- 代辦事項： 表單驗證功能 -->
<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      user_signup: {
        Account: '',
        Password: '',
        RePassword: '',
        Email: '',
        Name: '',
        Alias: '',
        Phone: '',
        Photo: '',
        Birthday: {
          Year: '',
          Month: '',
          Day: '',
        },
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
      },
      agree: false,
    };
  },
  created() {
    document.body.className = 'signup';
  },
  methods: {
    signup() {
      const API = `${process.env.VUE_APP_APIPATH}api/Users`;
      const userSignUp = this.$qs.stringify({
        Account: this.user_signup.Account,
        Password: this.user_signup.Password,
        RePassword: this.user_signup.RePassword,
        Email: this.user_signup.Email,
        Name: this.user_signup.Name,
        Alias: this.user_signup.Alias,
        Phone: this.user_signup.Phone,
        Photo: this.user_signup.Photo,
        Birthday: `${this.user_signup.Birthday.Year}-${this.user_signup.Birthday.Month}-${this.user_signup.Birthday.Day}`,
      });

      const config = {
        method: 'post',
        url: API,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: userSignUp,
      };

      if (this.user_signup.Password !== this.user_signup.RePassword) {
        Swal.fire('(´・ω・｀)', '輸入兩次密碼不一致', 'error');
      } else if (
        this.user_signup.Account === ''
        || this.user_signup.Email === ''
        || this.Password === ''
      ) {
        Swal.fire('(´・ω・｀)', '表格有沒填到的地方oh', 'error');
      } else if (this.agree === false) {
        Swal.fire('請同意利用規約(´・ω・｀)');
      } else {
        this.axios(config)
          .then((response) => {
            console.log(response);
            console.log(userSignUp);
            this.$router.push('/');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<!--☆…☆…☆…☆…☆…☆…☆…☆…☆…☆ SCSS ☆…☆…☆…☆…☆…☆…☆…☆…☆…☆-->

<style lang="scss">
//☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
* {
  box-sizing: border-box;
  transition: all 0.5s;
  // border: 1px solid #ddd !important;
}
.signup_container {
  max-width: 100%;
}

body.signup {
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  max-width: 100%;
  height: auto;
  background-color: #4a604e;
}
//☆===========header & footer===========☆
// .signup_header {
//   position: fixed;
//   background-image: url(/image/signup_header.png);
//   background-size: cover;
//   height: 82px;
//   width: 100%;
//   top: -10px;
// }
.signup_header,
.header_img {
  max-width: 100%;
}
.signup_footer {
  position: fixed;
  max-width: 100%;
  bottom: -1px;
  left: 0;
}
.footer_img {
  max-width: 100%;
}
.sign_copyright {
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
.signup_photo_group {
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
.sign_form {
  position: relative;
}
.sign_form_content {
  font-family: myfont, serif;
  font-weight: lighter;
  position: absolute;
  padding: 20px;
  right: 40px;
  top: 10%;
  width: 60%;
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
  }
  .hr {
    height: 1px;
    width: 480px;
    background-color: rgba(#fff, 0.2);
    margin-bottom: 15px;
  }
  input {
    font-family: myfont, serif;
    height: 28px;
    border: none;
    border-radius: 4px;
    padding-left: 10px;
    color: #ebffef;
    font-size: 20px;
    background-color: rgba(#fff, 0.3);
    letter-spacing: 2px;
  }
}
.signup_title {
  display: flex;
  align-items: center;
}
.sign_icon01 {
  width: 60px;
}
.sign_name,
.sign_alias {
  width: 18%;
  margin-right: 15px;
}
.account_group,
.pass_group,
.confirm-pass_group,
.name_group,
.email_group,
.phone_group,
.alias_group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  label {
    margin-right: 10px;
  }
}
.email {
  width: 40%;
}
.birthday_group {
  display: flex;
  align-items: center;
  color: #fff;
  input {
    width: 10%;
  }
  label {
    margin-right: 10px;
  }
}
.bd_year {
  margin-right: 5px;
}
.bd_mon {
  margin-left: 5px;
  margin-right: 5px;
}
.bd_day {
  margin-left: 5px;
}
input::placeholder {
  color: #fff;
  font-size: 16px;
}
//☆=========== terms ==========☆
.terms_group {
  margin-top: 30px;
  margin-bottom: 10px;

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
.agree {
  display: flex;
  margin-top: 15px;
  align-items: center;
  input {
    z-index: 99;
  }
}
//☆=========== submit BTN ==========☆
.signup_btn,
.login_btn {
  a {
    margin-left: 250px;
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
.already_signup,
.already_member {
  margin-top: 25px;
  color: #fff;
  a {
    text-decoration: none;
    color: rgb(255, 252, 179);
    &:hover {
      color: rgb(153, 255, 223);
    }
  }
}
footer {
  position: absolute;
  bottom: 0;
}
.cyo-ku {
  position: absolute;
  bottom: 5px;
  left: 250px;
  .cyo-ku-img {
    width: 350px;
  }
  z-index: 10;
}
</style>

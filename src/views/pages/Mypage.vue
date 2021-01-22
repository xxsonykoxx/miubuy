<template>
  <div>
    <div class="mypage_max-width">
      <router-link to="/"><div class="miubuy_logo"></div></router-link>
      <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
      <div class="mypage_container">
        <!--☆=== 選單列 ===☆-->
        <div class="mypage_orderlist_switch">
          <router-link to="/Mypage/Seller"
            ><img src="/image/selling_list_btn.png" alt="" class="selling_list"
          /></router-link>
          <router-link to="/Mypage/Buyer"
            ><img src="/image/buying_list_btn.png" alt="" class="buying_list"
          /></router-link>
          <router-link to="/Mypage/Myinfo"
            ><img src="/image/user_edit_btn.png" alt="" class="user_editor"
          /></router-link>
        </div>
        <router-view></router-view>
        <!--☆=== 選單內容表 ===☆-->
      </div>

      <!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getInfo() {
    },
  },
  created() {
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
* {
  // border: 1px solid #000 !important;
}
a {
  text-decoration: none;
}
body {
  width: 100%;
  height: 100%;
  background-color: $colorHeader;
}
/*==============★ 身體總寬 ★==============*/
.mypage_max-width {
  max-width: 1080px;
  margin: 0 auto;
}
/*==============★ 頭 ★==============*/

.miubuy_logo {
  position: absolute;
  width: 150px;
  height: 50px;
  left: 42%;
  top: 3px;
  background-image: url(/image/logo.png);
  background-size: cover;
  transition: all 0.5s;
  a {
    display: flex;
    height: 100%;
  }
  &:hover {
    transform: rotate(5deg);
  }
}
/*==============★ 腳 ★==============*/
footer {
  position: relative;
}
.copyright {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: -50px;
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
/*==============★ 本體 ★==============*/
.mypage_container {
  background-color: $bgc;
  padding: 15px;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 10px;
}

/*==============★ 本體 選擇貓 ★==============*/
.mypage_orderlist_switch {
  display: flex;
  justify-content: flex-end;
}
.selling_list,
.buying_list,
.user_editor {
  transition: all 0.5s;
  width: 100px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    transform: rotate(10deg);
  }
}
</style>

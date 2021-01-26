<template>
   <div class="container" id="jslogin">
      <div class="row">
        <div class="col-sm-12">
          <div class="js-home-main text-center">
            <div class="js-home-title">SignalR-聊天室</div>
            <div class="js-home-user">
              <p>
                <label for="txtMail"
                  >昵称：<input type="text" v-model="txtNick"
                /></label>
              </p>
         <!--<p><label for="txtNick">密码：<input type="password" v-model="txtPwd" /></label></p>-->
            </div>
            <div class="js-home-introduction text-center">
              <a v-on:click="btnLogin()">立即体验</a>
            </div>
            <div class="js-home-subtitle">给你更清爽的全新体验</div>
            <div class="js-home-copyright">
              Copyright© 2018 wym All Rights Reserved.
            </div>
            <hr />
            <p class="text-primary">
              SignalR-聊天室
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { hubConnection } from 'signalr-no-jquery';

export default {
  data() {
    return {
      txtNick: 'hello world!',
      proxy: [],
    };
  },
  created() {
    this.initdata();
  },
  methods: {
    initdata() {
      const conn = hubConnection(
        'http://miubuy.rocket-coding.com/signalr',
      );
      const proxy = conn.createHubProxy('orderHub');
      this.proxy = proxy;
      console.log('開始接收訊息');
      this.proxy.on('newDetail', (uid) => {
        // 監視？
        console.log(`userId=${uid}`);
        if (uid !== '') {
          console.log('bbb');
        }
      });
      conn
        .start()
        .done(() => {
          console.log('連線成功');
        })
        .fail(() => {
          console.log('連線失敗');
        });
    },
    // 登陆
    btnLogin() {
      console.log('按鈕事件開始');
      if (this.txtNick !== '' && this.txtNick != null) {
        console.log('開始調用事件');
        this.proxy.invoke('NewDetail', this.txtNick);
        // invoke 執行方法
        console.log('事件完成');
      } else {
        alert('请输入您的昵称');
      }
    },
  },
};
</script>

<style>

</style>

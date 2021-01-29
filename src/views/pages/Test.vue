<template>
   <div class="container" id="jslogin">
      <div class="js-home-main text-center">
        <div class="js-home-title">SignalR-聊天室</div>
        <div class="js-home-user">
          <label for="txtMail"
            ><input type="text" v-model="text"
          /></label> <a v-on:click="btnLogin()">測試</a>
        </div>
        <h2>
          {{text2}}
        </h2>
      </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { hubConnection } from 'signalr-no-jquery';

export default {
  data() {
    return {
      text: 'miubuy',
      proxy: [],
      text2: '',
    };
  },
  created() {
    this.initdata();
  },
  methods: {
    initdata() {
      // 設定連線位址
      const hub = hubConnection(
        'https://miubuy.rocket-coding.com/signalr',
      );
      // 設定路由
      const proxy = hub.createHubProxy('orderHub');
      // 創建路由
      this.proxy = proxy;
      console.log('初始設定完成');
      this.proxy.on('testObject', (text) => console.log(text));
      hub
        .start(() => {
          console.log('連線中...');
        })
        .done(() => {
          console.log('連線成功');
        })
        .fail(() => {
          console.log('連線失敗');
        });
      this.proxy.invoke('TestObject', this.text);
    },
    // 登錄
    btnLogin() {
      if (this.text !== '' && this.text != null) {
        this.proxy.invoke('TestObject', this.text);
        // invoke 執行方法
      } else {
        alert('輸入文字');
      }
    },
  },
};
</script>

<style>

</style>

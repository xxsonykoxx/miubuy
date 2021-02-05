<template>
  <div class="body_container">
    <div class="chatroom_max-container">
        <img src="/image/ruturnBTN.png" alt="" class="return_btn"
        @click="buyerExitRoom">
      <div class="chatroom_rule-content">
        <div >
          <img src="/image/ribon002.png" alt="" class="deco_ribon002">
        </div>
        <ul class="rule-area">
         <li>
           <span class="roomtitle">
           {{roomInfo.Name}}</span>
         </li>
         <li> <span class="center"><img src="/image/catHead.png" alt="" width="26px">
          最大人數：<span class="text">1</span></span>
         </li>
         <li>
            <span class="center"><img src="/image/catHead.png" alt="" width="26px">
         開房時間：<span class="text">{{roomInfo.roomStart}}</span></span>
         </li>
         <li class="room-rule"> <span class="center">
           <img src="/image/catHead.png" alt="" width="26px">
          房規：</span><span class="rule_conten text">{{roomInfo.Rule}}</span>
         </li>
        </ul>
        <ul class="btn-area" v-if="myUserID === hostID">
          <li class="aaa" @click="openModal()">編輯</li>
          <li>廣告刊登</li>
          <li class="close_chatBTN" @click="closeRoom">關店</li>
        </ul>
        <div class="shopPicture"
        :style="{'background-image': `url(${roomInfo.Picture})`}"
        v-if="myUserID !== hostID">
        </div>
      </div>
      <div class="chatroom_content">
        <img src="/image/ribon002.png" alt="" class="deco_ribon002">
        <div class="order-area">
          <h2>
            <img src="/image/deco_cat.png" alt="" width="25px">
            訂單明細
            <img src="/image/star002.png" alt="" width="25px">
          </h2>
<!--新增商品 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ -->
          <div v-if="buyerInroom>=1">
            <div v-if="myUserID === hostID">
              <i class="fas fa-plus-circle" v-if="add" @click="changeInput"></i>
              <div class="addProduct" v-else>
                <input type="text" class="addtitle2" placeholder="商品名稱"
                v-model="addProduct.addTitle">
                <input type="number" class="addprice" placeholder="價格"
                v-model="addProduct.addPrice">
                <i class="fas fa-check" @click="NewDetail"></i>
              </div>
            </div>
          </div>
          <h3 class="waitText" v-if="buyerInroom<1">等待對方進入 ... (´・∀・｀)</h3>
  <!--買家畫面 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ -->
   <ul v-if="myUserID !== hostID">
     <li class="order text" v-for="item in Details" :key="item.Id">
              <h3>
              <span class="product-name">
              {{item.Name}}
              </span>
              </h3>
              <p>$ <span class="price"
              >{{item.Price}}</span>
              </p>
            </li>
   </ul>
   <!--賣家畫面 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ -->
         <ul class="orders" v-if="myUserID === hostID">
            <li class="order text" v-for="item in Details" :key="item.Id">
              <h3>
              <i class="fas fa-times"
              @click="removeItem(item)"></i>
              <span class="product-name">
              {{item.Name}}
              </span>
              </h3>
              <p>$ <span class="price">{{item.Price}}</span>
              </p>
            </li>
          </ul>
          <div class="line">
            <img src="/image/catline.png" alt="">
          </div>
          <h3 class="total">
            <p>
              ('∀') TOTAL ☆
            </p>
          <p class="moneyicon">$<span class="totalprice">{{total}}</span></p>
          </h3>
          <div class="decide">
            <div v-if="buyerChecked">
              <a class="decide_btn"
              v-if="Number(myUserID) === buyerID"
              @click="BuyerCheckorder"
              >確認訂單</a>
            </div>
            <div v-if="decidedStatus">
              <h3 class="decided-status"
              >...等待賣家成立訂單</h3>
            </div>
            <div v-if="sellerChecked">
              <a class="decide_btn"
              v-if="Number(hostID) === Number(myUserID)"
              @click="SellerCheckorder"
              :class="{decided:checkoutBTN}"
              >訂單成立</a>
            </div>
             <div v-if="checkoutBTN">
               <a class="decide_btn" @click="sendOrder" v-if="myUserID !== hostID">結帳</a>
             </div>
          </div>
        </div>
        <div class="chat-area">
          <div class="message_area">
<!--聊天室 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ -->
<!-- eslint-disable-next-line vue/require-v-for-key -->
            <div class="messages" id="scrollMSG">
              <template v-for="(msg, key) in chatHistory">
                <template v-if="msg.SenderId !== Number(myUserID)">
                  <div class="massage-user" :key="key">
                  <h3>
                    <div class="user-photo"
                    :style="{'background-image': `url(${profileIMG_buyer})`}"
                    ></div>
                    <span class="user-message">
                     {{msg.Message}}
                    </span> <span class="submit-time">{{msg.MsgTime}}</span>
                  </h3>
                </div>
                </template>
                <template v-if="msg.SenderId === Number(myUserID)">
                  <div class="massage-to-user" :key="key">
                    <h3>
                      <span class="submit-time">{{msg.MsgTime}}</span><span class="to-user-message">
                      {{msg.Message}}
                      </span>
                      <div class="to-user-photo"
                      :style="{'background-image': `url(${profileIMG})`}"></div>
                    </h3>
                </div>
                </template>
              </template>
            </div>
          </div>
          <div class="submit_area">
            <a class="update-photo">
              <i class="fas fa-images"></i>
            </a>
            <input type="text" class="text-area"
            v-model="chat.Message"
            @keypress.enter="sendMessage">
            <a class="submit_BTN" @click="sendMessage">
             <i class="far fa-comment-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
        <div class="loader" key="loader">
        <div id="loading" v-show="!loading">
          <div class="loading">
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
          </div>
        </div>
      </div>
      <editroom :roomdata="roomInfo"></editroom>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { hubConnection } from 'signalr-no-jquery';
import Swal from 'sweetalert2';
import editroom from './Model/Editroom.vue';
import $ from '../../../node_modules/jquery';

// const signalR = require('@aspnet/signalr');

export default {
  inject: ['reload'],
  data() {
    return {
      chat: {
        SenderId: '',
        RecipientId: '',
        RoomId: '',
        Message: '',
      },
      chatHistory: [],
      Details: [],
      add: true,
      addProduct: {
        Id: '',
        addTitle: '',
        addPrice: '',
      },
      buyer: '',
      getProduct: '',
      getTitle: '',
      getPrice: '',
      token: '',
      roomID: '',
      roomInfo: '',
      myUserID: '',
      hostID: '',
      loading: false,
      proxy: [],
      buyerList: '',
      msgRoomID: '',
      buyerID: '',
      sellerInroom: 0,
      buyerInroom: 0,
      buyerChecked: true,
      sellerChecked: false,
      checkoutBTN: false,
      getOrderID: '',
      profileIMG_buyer: '',
      profileIMG: '',
      decidedStatus: false,
      waitStatus: false,
    };
  },
  components: {
    editroom,
  },
  mounted() {
    $('.aaa').click((e) => {
      e.preventDefault();
      $('.modale').addClass('opened');
    });
    $('.closemodale').click((e) => {
      e.preventDefault();
      $('.modale').removeClass('opened');
    });
  },
  updated() {
    const ele = document.getElementById('scrollMSG');
    ele.scrollTop = ele.scrollHeight;
  },
  beforeCreate() {
    document.body.className = 'chatroom_BGI';
  },
  computed: {
    total() {
      let totalPrice = 0;
      this.Details.forEach((i) => {
        totalPrice += Number(i.Price);
      });
      return totalPrice;
    },
  },
  methods: {
    initData() {
      const vm = this;
      // 設定連線位址 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      const hub = hubConnection(
        'https://miubuy.rocket-coding.com/signalr',
      );
      // 設定路由 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      const proxy = hub.createHubProxy('miuHub');
      // 創建路由 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      this.proxy = proxy;
      // 接收進房資訊  ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      this.proxy.on('log', (log) => {
        console.log(log);
      });
      this.proxy.on('joinRoom', (userId, roomId) => {
        console.log('ID:', userId);
        if (Number(vm.hostID) === userId) {
          vm.sellerInroom += 1;
          console.log('出品者いらっしゃいました！');
        } else {
          console.log('購入者いらっしゃいました！');
          vm.buyerID = userId;
          vm.buyerInroom += 1;
          // 取得使用者 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
          this.proxy.invoke('GetRoomUsers', Number(vm.roomID));
          // 取得歷史訊息 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
          vm.proxy.invoke('MessageHistory', {
            SenderId: Number(userId),
            RecipientId: Number(vm.hostID),
            RoomId: Number(roomId),
          });
          // 取得暫存訂單 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
          vm.proxy.invoke('ReadDetail', userId, roomId);
        }
      });
      // 聊天歷史紀錄 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      this.proxy.on('messageHistory', (history) => {
        this.chatHistory = history;
      });
      // 聊天訊息接收 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      this.proxy.on('message', (message) => {
        vm.chatHistory.push(message);
      });
      // 收訂單  ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      this.proxy.on('detail', (details) => {
        vm.Details = details;
      });
      this.proxy.on('getRoomUsers', (res) => {
        if (Number(this.myUserID) === res.Id) {
          vm.profileIMG_buyer = res.SellerPicture;
          vm.profileIMG = res.Picture;
        }
        if (Number(this.myUserID) !== res.Id) {
          vm.profileIMG_buyer = res.Picture;
          vm.profileIMG = res.SellerPicture;
        }

        if (res.Status === '訂單確認') {
          vm.sellerChecked = true;
        }
        if (res.Status === '訂單送出') {
          vm.decidedStatus = false;
          vm.checkoutBTN = true;
          vm.getOrderID = res.OrderId;
        }
      });
      this.proxy.on('chked', () => {
        Swal.fire({
          title: '★買家已經去結帳囉( ^ω^ )★',
          text: '個人頁面可以查看訂單💕',
          icon: 'warning',
          showDenyButton: false,
          showCancelButton: false,
          reverseButtons: true,
          confirmButtonText: '卍 關 卍',
        }).then((res) => {
          if (res.isConfirmed) {
            const closeAPI = `https://miubuy.rocket-coding.com/api/Rooms/${this.roomID}`;
            const config = {
              method: 'delete',
              url: closeAPI,
              headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            };
            this.axios(config)
              .then((response) => {
                console.log(response);
                this.$router.push('Mypage/Seller');
              });
          }
        });
      });
      hub
        .start()
        .done(() => {
          console.log('繋がりました(´・ω・)！');
          // 加入房間 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
          this.proxy.invoke('JoinRoom', this.myUserID, Number(this.roomID));
        })
        .fail(() => {
          console.log('繋がりませんでした(´・ω・)');
        });
      // 開始監聽
    },
    openModal() {
      $('.modale').addClass('opened');
    },
    saveRoom() {
      localStorage.setItem('saveRoom', this.roomID);
    },
    changeInput() {
      this.add = !this.add;
    },
    removeItem(item) {
      // invoke ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      this.proxy.invoke('DelDetail', Number(item.Id));
    },
    sendMessage() {
    // 聊天訊息傳送 ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      if (Number(this.chat.SenderId) === Number(this.hostID)) {
        this.chat.RecipientId = Number(this.buyerID);
      } else {
        this.chat.RecipientId = Number(this.hostID);
      }
      this.proxy.invoke('SendGroup', this.chat);
      this.chat.Message = '';
    },
    NewDetail() {
      const addTitle = this.addProduct.addTitle.trim();
      const addPrice = this.addProduct.addPrice.trim();
      // const addId = Math.floor(Date.now());
      if (!addTitle || !addPrice) {
        return;
      }
      // this.addProduct.Id = addId;
      //  ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      this.Details.push({
        Name: addTitle,
        Price: Number(addPrice),
        // BuyerId: Number(this.buyerID),
        // RoomId: Number(this.roomInfo.Id),
      });
      this.proxy.invoke('NewDetail', this.Details, Number(this.buyerID), Number(this.roomID));
      // ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
      this.addProduct.addTitle = '';
      this.addProduct.addPrice = '';
      this.add = !this.add;
      // ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
    },
    BuyerCheckorder() {
      this.decidedStatus = true;
      this.buyerChecked = false;
      this.proxy.invoke('CheckOrder', this.roomID);
    },
    SellerCheckorder() {
      const API = 'https://miubuy.rocket-coding.com/api/Orders';
      const OrderDetails = this.$qs.stringify({
        BuyerId: this.buyerID,
        RoomId: Number(this.roomID),
      });
      const config = {
        method: 'post',
        url: API,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: OrderDetails,
      };
      this.axios(config)
        .then((response) => {
          this.proxy.invoke('ReCheckOrder', this.buyerID, this.roomID, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeRoom() {
      Swal.fire({
        title: '(´・ω・｀)你確定要關店嗎?',
        text: '關掉就... 會關掉了喔☆',
        icon: 'warning',
        showDenyButton: false,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'YES',
      }).then((res) => {
        if (res.isConfirmed) {
          const closeAPI = `https://miubuy.rocket-coding.com/api/Rooms/${this.roomID}`;
          const config = {
            method: 'delete',
            url: closeAPI,
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          };
          this.axios(config)
            .then((response) => {
              console.log(response);
              this.$router.push('/ChatroomList');
            });
        }
      });
    },
    sendOrder() {
      this.$router.push(`/Checkout/${this.getOrderID}`);
      this.proxy.invoke('Chked', Number(this.roomID));
    },
    buyerExitRoom() {
      if (this.myUserID !== this.hostID) {
        Swal.fire({
          title: '(´・ω・｀)你確定要離開嗎?',
          text: '點選確定將會退出聊天室☆',
          icon: 'warning',
          showDenyButton: false,
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonText: 'YES',
        }).then((res) => {
          if (res.isConfirmed) {
            const exitAPI = `https://miubuy.rocket-coding.com/api/RoomUsers/${this.roomID}`;
            const config = {
              method: 'delete',
              url: exitAPI,
              headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            };
            this.axios(config)
              .then((response) => {
                console.log(response);
                this.$router.push('/ChatroomList');
              });
          }
        });
      } else {
        this.$router.push('/ChatroomList');
      }
    },
    /* TEST ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    getOrder() {
      // const API = `https://miubuy.rocket-coding.com/api/Orders`;
      const aaa = this.$qs.stringify({});
      const config = {
        method: 'get',
        url: 'https://miubuy.rocket-coding.com/api/Orders',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: aaa,
      };
      this.axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    setTimeout(() => {
      this.loading = true;
    }, 4000);
    /* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    const vm = this;
    vm.myUserID = localStorage.getItem('ID');
    vm.roomID = vm.$route.params.Id;
    localStorage.setItem('roomID', vm.roomID);
    const roomAPI = `https://miubuy.rocket-coding.com/api/Rooms/${vm.roomID}`;
    vm.axios.get(roomAPI)
      .then((res) => {
        vm.roomInfo = res.data;
        vm.hostID = String(vm.roomInfo.Seller[0].Id);
        this.chat.RoomId = Number(this.roomID);
        this.chat.SenderId = Number(this.myUserID);
        this.initData();
      });
  },
};
</script>

<style lang="scss">
@import '~@sweetalert2/themes/bootstrap-4/bootstrap-4.scss';
@import '@/assets/scss/color.scss';
@import '@/assets/scss/_chatroom.scss';
@import '@/assets/scss/_creatroom.scss';

//☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
.chatroom_BGI{
  // background-color: $colorHeader;
 background-image: url(/image/chat-bgc.png);
 background-size: cover;
}
.swal2-title {
  font-family: myfont, japanese-font, serif;
  font-size: 24px;
}
 .swal2-content {
    font-family: myfont, japanese-font, serif;
  font-size: 22px;
 }
.swal2-styled.swal2-confirm{
  font-family: myfont, japanese-font, serif;
   padding: 8px;
   font-size: 20px;
}
.swal2-styled.swal2-cancel{
  font-family: myfont, japanese-font, serif;
  padding: 8px;
  background-color: rgb(228, 157, 157);
  font-size: 20px;
}
.waitText {
  justify-content: center;
}
::-webkit-scrollbar {display:none}

.decided-status {
  margin-right: 10px;
  color: lighten($colorBrown, 20%);
}
</style>

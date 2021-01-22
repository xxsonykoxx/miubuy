<template>
  <div class="chatroom_max-container">
      <router-link to="/ChatroomList">
      <img src="/image/ruturnBTN.png" alt="" class="return_btn" @click="saveRoom"></router-link>
    <div class="chatroom_rule-content">
      <div >
        <img src="/image/ribon002.png" alt="" class="deco_ribon002">
      </div>
      <ul class="rule-area">
       <li>
         <span class="center"><img src="/image/catHead.png" alt="" width="20px">
         房名：<span class="text">{{roomInfo.Name}}</span></span>
       </li>
       <li> <span class="center"><img src="/image/catHead.png" alt="" width="20px">
        目前人數：<span class="text">1</span></span>
       </li>
       <li>
          <span class="center"><img src="/image/catHead.png" alt="" width="20px">
       開房時間：<span class="text">{{roomInfo.RoomStart}}</span></span>
       </li>
       <li class="room-rule"> <span class="center">
         <img src="/image/catHead.png" alt="" width="20px">
        房規：</span><span class="rule_conten text">{{roomInfo.Rule}}</span>
       </li>
      </ul>
      <ul class="btn-area">
        <li class="openmodale">編輯</li>
        <li>廣告刊登</li>
        <li class="close_chatBTN" @click="closeRoom">關店</li>
      </ul>
    </div>
    <div class="chatroom_content">
      <img src="/image/ribon002.png" alt="" class="deco_ribon002">
      <ul class="change_user">
        <li class="user01"></li>
        <li class="user02"></li>
      </ul>
      <div class="order-area">
        <h2>
          <img src="/image/deco_cat.png" alt="" width="25px">
          訂單明細
          <img src="/image/star002.png" alt="" width="25px">
        </h2>
        <i class="fas fa-plus-circle" v-if="add" @click="changeInput"></i>
        <div class="addProduct" v-else>
          <input type="text" class="addtitle" placeholder="商品名稱"
          v-model="addProduct.addTitle">
          <input type="number" class="addprice" placeholder="價格"
          v-model="addProduct.addPrice">
          <i class="fas fa-check" @click="addItem"></i>
        </div>
<!--☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ -->
        <ul class="orders">
          <li class="order text" v-for="item in OrderDetails" :key="item.id">
            <h3>
            <i class="fas fa-times" v-if="item.id!==getProduct.id"
            @click="removeItem(item)"></i>
            <i class="far fa-check-circle"
            v-if="item.id===getProduct.id"
            @click="doneEdit(item)"
            ></i>
            <span class="product-name" v-if="item.id!==getProduct.id" @dblclick="editTitle(item)">
            {{item.Name}}
            </span>
            <input type="text" class="edit-title"
            v-if="item.id===getProduct.id"
            v-model="getTitle"
            >
            </h3>
            <p>$<span class="price"
            v-if="item.id!==getProduct.id"
             @dblclick="editTitle(item)"
            >{{item.Price}}</span>
            <input type="text" class="edit-price"
            v-if="item.id===getProduct.id"
            v-model="getPrice"
            >
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
        <p>$<span class="price">{{total}}</span></p>
        </h3>
        <div class="decide">
          <a class="decide_btn" @click="sendOrder">訂單成立</a>
        </div>
      </div>
      <div class="chat-area">
        <div class="message_area">
          <ul class="messages">
             <li  class="massage-user">
              <h3>
                <div class="user-photo"></div>
                <span class="user-message">
                  る☆んるるる~♪る☆んるるる~♪る☆んるるる~♪る☆んるるる~♪
                </span> <span class="submit-time">12:43</span>
              </h3>
            </li>
            <li class="massage-to-user">
              <h3>
                <span class="submit-time">12:43</span><span class="to-user-message">
                  おはようございます社長
                </span>
                <div class="to-user-photo"></div>
              </h3>
            </li>
             <li class="massage-to-user">
              <h3>
                <span class="submit-time">12:43</span><span class="to-user-message">
                  ご機嫌良さそうですね
                </span>
                <div class="to-user-photo"></div>
              </h3>
            </li>
             <li  class="massage-user">
              <h3>
                <div class="user-photo"></div>
                <span class="user-message">
                  はい！
                </span> <span class="submit-time">12:43</span>
              </h3>
            </li>
             <li  class="massage-user">
              <h3>
                <div class="user-photo"></div>
                <span class="user-message">
                  ( ^ω^ )
                </span> <span class="submit-time">12:43</span>
              </h3>
            </li>
            <li  class="massage-user">
              <h3>
                <div class="user-photo"></div>
                <span class="user-message">
                  123123123123
                </span> <span class="submit-time">12:43</span>
              </h3>
            </li>
             <li class="massage-to-user">
              <h3>
                <span class="submit-time">12:43</span><span class="to-user-message">
                  123123123123
                </span>
                <div class="to-user-photo"></div>
              </h3>
            </li>
             <li  class="massage-user">
              <h3>
                <div class="user-photo"></div>
                <span class="user-message">
                  123123123123
                </span> <span class="submit-time">12:43</span>
              </h3>
            </li>
             <li  class="massage-user">
              <h3>
                <div class="user-photo"></div>
                <span class="user-message">
                  123123123123
                </span> <span class="submit-time">12:43</span>
              </h3>
            </li>
          </ul>
        </div>
        <div class="submit_area">
          <a class="update-photo">
            <i class="fas fa-images"></i>
          </a>
          <input type="text" class="text-area">
          <a class="submit_BTN">
           <i class="far fa-comment-alt"></i>
          </a>
        </div>
      </div>
    </div>
     <editroom></editroom>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import editroom from './Model/Editroom.vue';
import $ from '../../../node_modules/jquery';

export default {
  data() {
    return {
      OrderDetails: [
      ],
      noIdDetails: [],
      add: true,
      addProduct: {
        id: '',
        addTitle: '',
        addPrice: '',
      },
      getProduct: '',
      getTitle: '',
      getPrice: '',
      token: '',
      roomID: '',
      roomInfo: '',
    };
  },
  components: {
    editroom,
  },
  mounted() {
    this.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    $('.openmodale').click((e) => {
      e.preventDefault();
      $('.modale').addClass('opened');
    });
    $('.closemodale').click((e) => {
      e.preventDefault();
      $('.modale').removeClass('opened');
    });
  },
  beforeCreate() {
    document.body.className = 'chatroom_BGI';
  },
  computed: {
    total() {
      let totalPrice = 0;
      this.OrderDetails.forEach((i) => {
        totalPrice += Number(i.Price);
      });
      return totalPrice;
    },
  },
  methods: {
    saveRoom() {
      localStorage.setItem('saveRoom', this.roomID);
    },
    changeInput() {
      this.add = !this.add;
    },
    editTitle(i) {
      this.getProduct = i;
      this.getTitle = i.Name;
      this.getPrice = i.Price;
    },
    doneEdit(item) {
      /* eslint no-param-reassign: "error" */
      item.Name = this.getTitle;
      item.Price = this.getPrice;
      this.getTitle = '';
      this.getPrice = '';
      this.getProduct = {};
    },
    removeItem(item) {
    /* eslint no-unused-vars: "error" */
      let newIndex = '';
      this.OrderDetails.forEach((i, key) => {
        if (item.id === i.id) {
          newIndex = key;
        }
      });
      this.OrderDetails.splice(newIndex, 1);
    },
    addItem() {
      const addTitle = this.addProduct.addTitle.trim();
      const addPrice = this.addProduct.addPrice.trim();
      const addId = Math.floor(Date.now());
      if (!addTitle || !addPrice) {
        return;
      }
      this.OrderDetails.push({
        id: addId,
        Name: addTitle,
        Price: addPrice,
        Amount: 1,
      });
      this.addProduct.addTitle = '';
      this.addProduct.addPrice = '';
      this.add = !this.add;
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
          this.$router.push('/ChatroomList');
        }
      });
    },
    sendOrder() {
      this.OrderDetails.forEach((i) => {
        this.noIdDetails.push({
          Name: i.Name,
          Price: i.Price,
          Amount: i.Amount,
        });
      });
      const API = `${process.env.VUE_APP_APIPATH}api/Orders`;
      const OrderDetails = this.$qs.stringify({
        Name: '',
        OrderDetails: this.noIdDetails,
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
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* TEST ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆ */
    getOrder() {
      // const API = `${process.env.VUE_APP_APIPATH}api/Orders`;
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
    const vm = this;
    vm.roomID = vm.$route.params.Id;
    localStorage.setItem('roomID', vm.roomID);
    const roomAPI = `${process.env.VUE_APP_APIPATH}api/Rooms/${vm.roomID}`;
    vm.axios.get(roomAPI)
      .then((res) => {
        vm.roomInfo = res.data;
      });
  },
};
</script>

<style lang="scss">
@import '~@sweetalert2/themes/bootstrap-4/bootstrap-4.scss';
@import '@/assets/scss/color.scss';
@import '@/assets/scss/_chatroom.scss';
//☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆
.chatroom_BGI{
  // background-color: $colorHeader;
 background-image: url(/image/chat-bgc.png);
 background-size: cover;
 position: relative;
}
.swal2-title {
  font-family: myfont, japanese-font, serif;
  font-size: 22px;
}
 .swal2-content {
    font-family: myfont, japanese-font, serif;
  font-size: 20px;
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
</style>

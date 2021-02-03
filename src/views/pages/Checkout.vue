<template>
  <div>
    <div class="checkout_container">
      <img src="/image/flower.png" alt="" class="flower01">
      <img src="/image/flower.png" alt="" class="flower02">
      <img src="/image/flower.png" alt="" class="flower03">
      <h2 class="checkout-title">
        <img src="/image/catHead.png" alt="" width="35px">
        <span>結帳 checkout</span>
        <img src="/image/star002.png" alt="" width="35px">
      </h2>
      <form action="" class="checkout-form">
        <div class="leftBlock">
          <h2 class="receiver-detail">
        <img src="/image/ribon002.png" alt="" width="50px">
        <span>收件人資料</span>
        </h2>
        <div class="receive-content">
        <div class="checkout_name-group">
        <label for="name" class="receiver-name">姓名</label>
        <input type="text" v-model="personalDetail.Name">
        </div>
        <div class="checkout_phone-group">
        <label for="phone">手機</label>
        <input type="text" v-model="personalDetail.Phone">
        </div>
        <div class="checkout_address-group">
        <label for="address">地址</label>
        <input type="text" v-model="personalDetail.Address"
        class="checkout-address"
        >
        </div>
        <div class="checkout_mail-group">
        <label for="mail">信箱</label>
        <input type="email" v-model="personalDetail.Email" class="checkout-email">
        </div>
        </div>
        </div>
      <div class="center-line"></div>
       <div class="rightBlock">
         <h2 class="pay-and-deliver">
           <img src="/image/ribon002.png" alt="" width="50px">
           <span>
           付款及取貨
           </span>
           </h2>
          <div class="delive-content">
            <label class="payment-detail">付款方式</label>
            <div class="pay-select-group">
              <select name="" id="" v-model="personalDetail.Payment">
                <option value="1">平台付款</option>
                <option value="2" selected>銀行轉帳</option>
              </select>
              <!-- <div class="payment_card">
                <div class="card-number">
                 <label for="">卡號</label>
                 <input type="text">
                </div>
                <div class="data-limit">
                  <label for="">到期日</label>
                  <input type="text"> / <input type="text">
                </div>
                <div class="cvv">
                  <label for="">後三碼</label>
                  <input type="text">
                </div>
              </div> -->
            </div>
          <div class="line"></div>
          <label class="deliver-detail">取貨方式</label>
          <div class="delivery">
            <select name="" id="" v-model="personalDetail.Pickup">
              <option value="1">面交</option>
              <option value="2">宅配</option>
            </select>
          </div>
          <div class="memo">
            <label for="">備註</label>
            <textarea name="" id="" cols="30" rows="10" class="memo-area"
            v-model="personalDetail.Remark"
            placeholder="★( ^ω^ )★"
            ></textarea>
          </div>
          </div>
       </div>
          <div class="checkout_btn">
            <a @click="putOrder">
              <img src="/image/order-BTN.png" alt="" width="130px">
            </a>
          </div>
      </form>
    </div>
    <!-- Loading ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆-->
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
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      personalDetail: {
        Name: '',
        Address: '',
        Email: '',
        Phone: '',
        Payment: '',
        Pickup: '',
        Remark: '',
      },
      token: '',
      orderID: '',
      loading: false,
    };
  },
  created() {
    this.orderID = this.$route.params.Id;
    setTimeout(() => {
      this.loading = true;
    }, 1500);
    this.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
  },
  beforeCreate() {
    document.body.className = 'checkout_BGI';
  },
  methods: {
    putOrder() {
      const vm = this;
      const putOrder = `https://miubuy.rocket-coding.com/api/Orders/${vm.orderID}`;
      const orderDetail = vm.$qs.stringify(vm.personalDetail);
      const config = {
        method: 'put',
        url: putOrder,
        headers: {
          Authorization: `Bearer ${vm.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: orderDetail,
      };
      vm.axios(config)
        .then((response) => {
          console.log(response);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '✨訂單送出成功( ´∀｀)✨',
            showConfirmButton: false,
            timer: 2500,
          })
            .then(() => {
              this.$router.push('/Mypage/Buyer');
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/color.scss';
  @import '@/assets/scss/_checkout.scss';
</style>

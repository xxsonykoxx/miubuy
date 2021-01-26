<template>
  <div class="checkout_container">
    <h2>收件人資料</h2>
    <div class="checkout_name-group">
      <label for="name">姓名</label>
      <input type="text" v-model="personalDetail.Name">
    </div>
    <div class="checkout_phone-group">
      <label for="phone">手機</label>
      <input type="text" v-model="personalDetail.Phone">
    </div>
    <div class="checkout_address-group">
      <label for="address">地址</label>
      <input type="text" v-model="personalDetail.Address">
    </div>
    <div class="checkout_mail-group">
      <label for="mail">信箱</label>
      <input type="email" v-model="personalDetail.Email">
    </div>
  <div class="line"></div>
    <h2>付款方式</h2>
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
  <h2>取貨方式</h2>
  <div class="delivery">
    <select name="" id="" v-model="personalDetail.Pickup">
      <option value="1">面交</option>
      <option value="2">宅配</option>
    </select>
  </div>
  <div class="memo">
    <label for="">備註</label>
    <textarea name="" id="" cols="30" rows="10" class="memo-area"
    v-model="personalDetail.Remark"></textarea>
  </div>
  <div class="checkout_btn">
    <a @click="putOrder">送出</a>
  </div>
  </div>
</template>

<script>
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
        Remark: '註解',
      },
      token: '',
      orderID: '',
    };
  },
  created() {
    this.orderID = sessionStorage.getItem('OrderID');
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
      const putOrder = `${process.env.VUE_APP_APIPATH}api/Orders/${vm.orderID}`;
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
          this.$router.push('/Mypage/Seller');
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

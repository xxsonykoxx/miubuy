<template>
  <div class="checkout_container">
    <h2>收件人資料</h2>
    <div class="checkout_name-group">
      <label for="name">姓名</label>
      <input type="text">
    </div>
    <div class="checkout_phone-group">
      <label for="phone">手機</label>
      <input type="text">
    </div>
    <div class="checkout_address-group">
      <label for="address">地址</label>
      <input type="text">
    </div>
    <div class="checkout_mail-group">
      <label for="mail">信箱</label>
      <input type="email">
    </div>
  <div class="line"></div>
    <h2>付款方式</h2>
    <div class="pay-select-group">
      <select name="" id="">
        <option value="" selected>信用卡</option>
      </select>
      <div class="payment_card">
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
      </div>
    </div>
  <div class="line"></div>
  <h2>取貨方式</h2>
  <div class="delivery">
    <select name="" id="">
      <option value="">超商取貨</option>
      <option value="">面交</option>
      <option value="">宅配</option>
    </select>
  </div>
  <div class="memo">
    <label for="">備註</label>
    <textarea name="" id="" cols="30" rows="10" class="memo-area"></textarea>
  </div>
  <div class="checkout_btn">
    <a href="">送出</a>
  </div>
  </div>
</template>

<script>
export default {
  created() {
  },
  beforeCreate() {
    document.body.className = 'checkout_BGI';
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/color.scss';
  @import '@/assets/scss/_checkout.scss';
</style>

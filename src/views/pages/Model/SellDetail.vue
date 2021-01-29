<template>
  <div class="seller-modale" aria-hidden="true">
    <div class="seller-modal-dialog">
      <div class="seller-modal-header">
        <h2 class="creatroom_title">
          <img src="/image/deco_cat.png" alt="" class="star001" />
          訂單詳細
          <img src="/image/deco_cat.png" alt="" class="star001" />
        </h2>
      </div>
      <div class="seller-modal-body">
        <div class="seller-modal-L">
          <h2 class="seller_shopName">
            <img src="/image/oukan_icon.png" width="20px">店名：
            <span>{{sellerdata.RoomName}}</span></h2>
            <div class="seller_room-photo"
            :style="{'background-image': `url(${sellerdata.RoomPicture})`}"
            ></div>
            <h2 class="seller-detail_seller">賣家：<span>{{sellerdata.SellerNickname}}</span></h2>
            <h2 class="seller-detail_price">訂單金額：<span>$ {{sellerdata.TotalPrice}}</span></h2>
            <ul class="seller-detail-left">
              <li class="seller-detail_detail">
                <h2>訂單項目</h2>
              </li>
              <li class="seller_buylist" v-for="detail in sellerdata.Detail" :key="detail.Id">
                <img src="/image/pin.png" alt="" width="30px">
                <span>{{detail.Name}}</span>
                <span class="item-price">$ {{detail.Price}}</span>
              </li>
            </ul>
        </div>
        <div class="seller-modal-R">
          <div class="seller-detail_orderStatus">
            <h2>訂單狀態：<span>未付款</span></h2>
            <h2>付款方式：<span>轉帳</span></h2>
            <h2>取貨方式：<span>面交</span></h2>
          </div>
          <div class="line005">
          </div>
          <div class="seller-detail_myinfo">
            <h2>買家姓名：<span>{{sellerdata.Name}}</span></h2>
            <h2>買家電話：<span>{{sellerdata.Phone}}</span></h2>
            <h2>買家信箱：<span>{{sellerdata.Email}}</span></h2>
            <h2>買家地址：<span>{{sellerdata.Address}}</span></h2>
            <h2>買家備註：<span>{{sellerdata.Remark}}</span></h2>
          </div>
          <div class="line005"></div>
          <div class="seller-detail_review">
            <h2>給賣家的評價</h2>
            <div class="review-content">
              <h2 class="review-stars">★★★★★</h2>
              <h2 class="toSeller-comment">留言：
                <span>{{sellerdata.SellerReviews}}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="seller-modal-footer">
        <button class="closemodale"
        @click="close">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from '../../../../node_modules/jquery';

export default {
  data() {
    return {
      token: '',
    };
  },
  props: ['sellerdata'],
  mounted() {
  },
  methods: {
    close() {
      $('.closemodale').click((e) => {
        e.preventDefault();
        $('.seller-modale').removeClass('opened');
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
@import '@/assets/scss/_sellerDetail.scss';

</style>

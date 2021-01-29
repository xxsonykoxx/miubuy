<template>
  <div class="buyer-modale" aria-hidden="true">
    <div class="buyer-modal-dialog">
      <div class="buyer-modal-header">
        <h2 class="creatroom_title">
          <img src="/image/deco_cat.png" alt="" class="star001" />
          訂單詳細
          <img src="/image/deco_cat.png" alt="" class="star001" />
        </h2>
      </div>
      <div class="buyer-modal-body">
        <div class="buyer-modal-L">
          <h2 class="buyer_shopName">
            <img src="/image/oukan_icon.png" width="20px">店名：
            <span>{{buyerdata.RoomName}}</span></h2>
            <div class="buyer_room-photo"
            :style="{'background-image': `url(${buyerdata.RoomPicture})`}"
            ></div>
            <h2 class="buyer-detail_seller">賣家：<span>{{buyerdata.SellerNickname}}</span></h2>
            <h2 class="buyer-detail_price">訂單金額：<span>$ {{buyerdata.TotalPrice}}</span></h2>
            <ul class="buyer-detail-left">
              <li class="buyer-detail_detail">
                <h2>訂單項目</h2>
              </li>
              <li class="buyer_buylist" v-for="detail in buyerdata.Detail" :key="detail.Id">
                <img src="/image/pin.png" alt="" width="30px">
                <span>{{detail.Name}}</span>
                <span class="item-price">$ {{detail.Price}}</span>
              </li>
            </ul>
        </div>
        <div class="buyer-modal-R">
          <div class="buyer-detail_orderStatus">
            <h2>訂單狀態：<span>未付款</span></h2>
            <h2>付款方式：<span>轉帳</span></h2>
            <h2>取貨方式：<span>面交</span></h2>
          </div>
          <div class="line005">
          </div>
          <div class="buyer-detail_myinfo">
            <h2>買家姓名：<span>{{buyerdata.Name}}</span></h2>
            <h2>買家電話：<span>{{buyerdata.Phone}}</span></h2>
            <h2>買家信箱：<span>{{buyerdata.Email}}</span></h2>
            <h2>買家地址：<span>{{buyerdata.Address}}</span></h2>
            <h2>買家備註：<span>{{buyerdata.Remark}}</span></h2>
          </div>
          <div class="line005"></div>
          <div class="buyer-detail_review">
            <h2>給賣家的評價</h2>
            <div class="review-content">
              <h2 class="review-stars">★★★★★</h2>
              <h2 class="toSeller-comment">留言：
                <span>{{buyerdata.SellerReviews}}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="buyer-modal-footer">
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
  props: ['buyerdata'],
  mounted() {
  },
  methods: {
    close() {
      $('.closemodale').click((e) => {
        e.preventDefault();
        $('.buyer-modale').removeClass('opened');
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
@import '@/assets/scss/_buyerDetail.scss';

</style>

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
            <button class="reviewBTN"
            v-if="add"
            @click="doReview"
            >評價賣家</button>
            <div class="review-content" v-else>
              <div class="flex">
                <star-rating v-model="rating"></star-rating>
                <i class="far fa-check-circle" @click="sendReview"></i>
              </div>
              <h2 class="toSeller-comment">留言：
                <input type="text" class="review-text"
                v-model="comment">
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="buyer-modal-footer">
        <button class="confirmBTN"
        @click="completeOrder"
        v-if="completeBTN"
        >完成交易</button>
        <button class="closemodale"
        @click="close">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import starRating from 'vue-star-rating';
import $ from '../../../../node_modules/jquery';

export default {
  data() {
    return {
      token: '',
      rating: 0,
      add: true,
      comment: '',
      completeBTN: false,
    };
  },
  props: ['buyerdata'],
  mounted() {
  },
  components: {
    starRating,
  },
  created() {
    this.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    if (this.buyerdata.Status === '已發貨') {
      this.completeBTN = true;
    }
  },
  methods: {
    completeOrder() {
      if (this.buyerdata.Status === '已發貨') {
        const completeAPI = `https://miubuy.rocket-coding.com/api/Orders/${this.buyerdata.Id}`;
        const completeData = this.$qs.stringify({
          Status: 9,
        });
        const config = {
          method: 'put',
          url: completeAPI,
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: completeData,
        };
        this.axios(config)
          .then((res) => {
            console.log(res);
          });
      }
    },
    sendReview() {
      const reviewAPI = `https://miubuy.rocket-coding.com/api/Ratings/${this.buyerdata.Id}`;
      const reviewData = this.$qs.stringify({
        SellerStar: this.rating,
        SellerReviews: this.comment,
      });
      const config = {
        method: 'put',
        url: reviewAPI,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: reviewData,
      };
      this.axios(config)
        .then((res) => {
          console.log(res);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '評價成功送出 (´・ω・｀)',
            showConfirmButton: false,
            timer: 2500,
          })
            .then(() => {
              this.$router.push('/Mypage/Buyer');
              window.location.reload();
            });
        });
    },
    close() {
      $('.closemodale').click((e) => {
        e.preventDefault();
        $('.buyer-modale').removeClass('opened');
      });
    },
    doReview() {
      this.add = !this.add;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
@import '@/assets/scss/_buyerDetail.scss';
.reviewBTN {
  min-width: 75px;
  min-height: 35px;
  font-size: 20px;
  background-color: $colorBar;
  border: none;
  color: #fff;
  border-radius: 4px;
  margin-top: 15px;
  margin-left: 15px;
  font-family: myfont, japanese-font, serif;
  cursor: pointer;
  &:hover {
    background-color: darken($colorBar,10%);
  }
}
.review-text {
  border: none;
  height: 30px;
  font-size: 12px;
  border-bottom: 1px solid rgb(190, 185, 179);
  min-width: 240px;
  color: $colorBrown;
  letter-spacing: 1.5px;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  i {
    margin-right: 30px;
    cursor: pointer;
    color: lighten($colorBrown,20%);
    &:hover {
      color:$colorBrown;
    }
  }
}
</style>

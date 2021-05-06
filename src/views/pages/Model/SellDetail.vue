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
            {{sellerdata.RoomName}}</h2>
            <div class="seller_room-photo"
            :style="{'background-image': `url(${sellerdata.RoomPicture})`}"
            ></div>
            <h2 class="seller-detail_seller">買家：<span>{{sellerdata.BuyerNickname}}</span></h2>
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
            <h2>訂單狀態：<span>{{sellerdata.Status}}</span></h2>
            <h2>付款方式：<span>{{sellerdata.Payment}}</span></h2>
            <h2>取貨方式：<span>{{sellerdata.Pickup}}</span></h2>
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
            <h2>給買家的評價</h2>
            <div v-if="sellerdata.BuyerStar==='☆☆☆☆☆'">
              <button class="reviewBTN"
              v-if="add"
              @click="doReview"
              >評價買家</button>
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
            <div v-if="sellerdata.BuyerStar!=='☆☆☆☆☆'">
              <h3 class="ReviewStar">
                {{sellerdata.BuyerStar}}
              </h3>
              <h3 class="Comment">
                {{sellerdata.BuyerReviews}}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div class="seller-modal-footer">
        <button class="confirmBTN"
        v-if="status==='已付款'"
        @click="confirmOrder">已發貨</button>
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
    };
  },
  props: ['sellerdata', 'status'],
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
  },
  methods: {
    close() {
      $('.closemodale').click((e) => {
        e.preventDefault();
        $('.seller-modale').removeClass('opened');
      });
    },
    doReview() {
      this.add = !this.add;
    },
    confirmOrder() {
      const confirmAPI = `https://miubuy.rocket-coding.com/api/Orders/${this.sellerdata.Id}`;
      const confirmData = this.$qs.stringify({
        Status: '已發貨',
      });
      const config = {
        method: 'put',
        url: confirmAPI,
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: confirmData,
      };
      this.axios(config)
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '通知買家已發貨 ★彡',
            showConfirmButton: false,
            timer: 2500,
          })
            .then(() => {
              this.$router.push('/Mypage/Seller');
              window.location.reload();
            });
        });
    },
    sendReview() {
      const reviewAPI = `https://miubuy.rocket-coding.com/api/Ratings/${this.sellerdata.Id}`;
      const reviewData = this.$qs.stringify({
        BuyerStar: this.rating,
        BuyerReviews: this.comment,
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
              this.$router.push('/Mypage/Seller');
              window.location.reload();
            });
        });
    },
  },
};
</script>

<style lang="scss">
$color_ribon: rgb(204,104,116);
@import '@/assets/scss/color.scss';
@import '@/assets/scss/_sellerDetail.scss';
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
  font-size: 15px;
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
.confirmBTN {
  background-color: $color_ribon !important;
  width: 100px !important;
  &:hover {
    background-color: darken($color_ribon, 10%)!important;
  }
}
.seller_shopName {
  color:$color_ribon;
}
</style>

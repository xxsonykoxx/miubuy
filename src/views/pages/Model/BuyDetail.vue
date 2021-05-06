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
            {{buyerdata.RoomName}}</h2>
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
            <h2>訂單狀態：<span>{{buyerdata.Status}}</span></h2>
            <h2>付款方式：<span>{{buyerdata.Payment}}</span></h2>
            <h2>取貨方式：<span>{{buyerdata.Pickup}}</span></h2>
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
            <div
            v-if="buyerdata.SellerStar==='☆☆☆☆☆'">
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
            <div v-if="buyerdata.SellerStar!=='☆☆☆☆☆'">
              <h3 class="ReviewStar">
                {{buyerdata.SellerStar}}
              </h3>
              <h3 class="Comment">
                {{buyerdata.SellerReviews}}
              </h3>
            </div>
            </div>
        </div>
      </div>
      <div class="buyer-modal-footer">
        <button class="confirmBTN"
        @click="payDone"
        v-if="status==='未付款'"
        >已付款</button>
        <button class="confirmBTN"
        @click="pickDone"
        v-if="status==='已發貨'"
        >確認收貨</button>
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
  props: ['buyerdata', 'status'],
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
  mounted() {
  },
  methods: {
    payDone() {
      if (this.buyerdata.Status === '未付款') {
        const completeAPI = `https://miubuy.rocket-coding.com/api/Orders/${this.buyerdata.Id}`;
        const completeData = this.$qs.stringify({
          Status: '已付款',
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
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '通知賣家已付款(´ω`)',
              showConfirmButton: false,
              timer: 5000,
            })
              .then(() => {
                this.$router.push('/Mypage/Buyer');
                window.location.reload();
              });
          });
      }
    },
    pickDone() {
      if (this.status === '已發貨') {
        const completeAPI = `https://miubuy.rocket-coding.com/api/Orders/${this.buyerdata.Id}`;
        const completeData = this.$qs.stringify({
          Status: '訂單完成',
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
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '通知賣家收到商品！(´ω`)',
              showConfirmButton: false,
              timer: 2500,
            })
              .then(() => {
                this.$router.push('/Mypage/Buyer');
                window.location.reload();
              });
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
  font-size: 26px;
  font-family: myfont, japanese-font, serif;
  border-bottom: 1px solid rgb(190, 185, 179);
  min-width: 240px;
  color: $colorBrown;
  letter-spacing: 0.2px;
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
.ReviewStar {
  margin-top: 10px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  color: darken($colorHeader,10%);
  font-size: 28px;
}
.Comment {
  margin-top: 10px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  color: $colorBrown;
  font-size: 24px;
}
$color_ribon: rgb(204,104,116);
.buyer_shopName {
  color: $color_ribon;
}
</style>

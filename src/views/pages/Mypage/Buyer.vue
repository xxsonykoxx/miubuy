<template>
  <div class="seller mypage_order_content">
    <div class="deco01">
      <img src="/image/deco_cat-ribon.png" alt="" class="deco_cat-ribon" />
    </div>
    <div class="deco02">
      <img src="/image/deco_cat.png" alt="" width="40px" />
    </div>
    <div class="deco03">
      <img src="/image/buyer.png" alt="" class="buyer_icon" />
    </div>
    <ul class="buying_content" v-if="orderNum>0">
      <li class="buying_list_opened" v-for="(order, key) in orders" :key="order.Id"
      @click="getIndex(key)"
      >
         <div class="expand-bar">
          <img src="/image/star002.png" alt="" class="deco001 openmodale"
          @click="open(order.Status)"
          >
        </div>
        <div class="order_content">
          <div class="order_title">
            <a href="#" class="order_photo_link">
              <div class="order_photo openmodale"
              @click="open(order.Status)"
              :style="{'background-image': `url(${order.RoomPicture})`}"
              ></div>
            </a>
            <h3 class="order_name">
              <img src="/stars.png" alt="" width="20px" />
              <a href="#" class="openmodale"
               @click="open(order.Status)"
              >{{order.RoomName}}</a>
            </h3>
          </div>
          <div class="title_group">
            <h3 class="price">
              <p class="price_title">
                <img
                  src="/image/ribon_icon.png"
                  alt=""
                  width="28px"
                  class="title_deco"
                />
                金額
              </p>
              <p class="order_price">$ <span>{{order.TotalPrice}}</span></p>
            </h3>

            <h3 class="status">
              <p class="status_title">
                <img
                  src="/image/cat_icon.png"
                  alt=""
                  width="24px"
                  class="title_deco"
                />
                訂單狀態
              </p>
              <p class="order_status">
                {{order.Status}}
              </p>
            </h3>
            <h3 class="review">
              <p class="review_title">
                <img
                  src="/image/cat_icon.png"
                  alt=""
                  width="28px"
                  class="title_deco"
                />
                賣家評價
              </p>
              <p class="order_review">
                {{order.BuyerStar}}
                <br>
                <span>{{order.BuyerReviews}}</span>
              </p>
            </h3>
          </div>
        </div>
      </li>
    </ul>
    <ul class="buying_content" v-if="orderNum===0">
      <li class="nodetail_buyer">
        <img src="/image/dodetail-buy.png" alt="">
      </li>
    </ul>
    <buyerdetail :buyerdata="orders[index]"
    :status="status"></buyerdetail>
  </div>
</template>

<script>
import $ from '../../../../node_modules/jquery';
import buyerdetail from '../Model/BuyDetail.vue';

export default {
  data() {
    return {
      token: '',
      id: '',
      orders: '',
      orderNum: '',
      buyers: '',
      myOrder: '',
      expand: true,
      index: '',
      status: '',
    };
  },
  mounted() {
  },
  methods: {
    getIndex(key) {
      this.index = key;
    },
    open(i) {
      this.status = i;
      setTimeout(() => {
        $('.buyer-modale').addClass('opened');
      }, 500);
    },
  },
  components: {
    buyerdetail,
  },
  created() {
    const vm = this;
    this.id = localStorage.getItem('ID');
    vm.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    const buyerAPI = 'https://miubuy.rocket-coding.com/api/BuyerRatings';
    const config = {
      method: 'get',
      url: buyerAPI,
      headers: {
        Authorization: `Bearer ${vm.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    vm.axios(config)
      .then((res) => {
        console.log(res);
        vm.orders = res.data;
        vm.orderNum = res.data.length;
        // 買家ID拿 所有買家吉賣家列表
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
/*==============★ 本體  內容區★==============*/
.buying_list_opened {
  position: relative;
}
.mypage_order_content {
  font-family: myfont, japanese-font, serif;
  color: darken($colorBrown, 10%);
  position: relative;
  background-color: $colorBrown;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid darken($colorBrown, 10%);
  margin: 20px;
  margin-top: 10px;
}
.deco01 {
  position: absolute;
  z-index: 0 !important;
  top: -40px;
  left: -30px;
}
.deco02 {
  position: absolute;
  z-index: 0 !important;
  bottom: -10px;
  right: -15px;
}
.deco03 {
  position: absolute;
  z-index: 0 !important;
  top: -84px;
  left: 80px;
}
.buyer_icon {
  width: 250px;
}
.deco_cat-ribon {
  width: 100px;
}
.buying_list_closed,
.buying_list_opened {
  margin: 30px;
  .expand-bar {
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    align-items: center;
    border-radius: 8px 8px 0px 0px;
    background-color: $colorHeader;
    height: 20px;
    border: 2px solid darken($colorBrown, 10%);
    transition: all 0.5s;
    &:hover {
      cursor: pointer;
      .expand-btn {
        color: $colorCat;
      }
    }
  }
  .order_content {
    border-radius: 0px 0px 8px 8px;
    background-color: $colorCat;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border: 2px solid darken($colorBrown, 10%);
    border-top: none;
  }
  .order_review,
  .order_review__closed {
    color: darken($colorHeader, 10%);
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.order_title {
  flex: 1;
  a {
    color: $colorBrown;
    &:hover {
      color: $colorHeader;
    }
  }
  .order_photo_link {
    display: flex;
    justify-content: center;
  }
  .order_name {
    text-align: center;
    margin-top: 5px;
    font-size: 22px;
  }
}
.order_photo {
  width: 90%;
  height: 100px;
  background-image: url(/image/download20201101225100.png);
  background-size: cover;
  background-position: center center;
}

.title_group {
  display: flex;
  flex: 2;
  justify-content: space-between;
  .price,
  .status,
  .review {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .order_price,
  .order_status,
  .order_review {
    font-size: 22px;
  }
  .order_review {
    span {
      color: $colorBrown;
    }
  }
  .order_price {
    font-size: 28px;
  }
  .status {
    flex: 1;
    text-align: center;
  }
  .review {
    flex: 1;
    text-align: center;
  }
  .price_title,
  .review_title,
  .status_title {
    position: relative;
    padding: 6px;
    margin-left: 20px;
    background: linear-gradient(transparent 50%, $colorHeader 20%);
    font-size: 25px;
  }
  .title_deco {
    position: absolute;
    top: 5px;
    left: -15px;
  }
}
.nodetail_buyer {
  display: flex;
  justify-content: center;
  img {
    width: 50%;
  }
}
.vue-star-rating-star[data-v-fde73a0c] {
  width: 28px;
}
</style>

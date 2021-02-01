<template>
  <div class="seller mypage_order_content">
    <div class="deco01">
      <img src="/image/deco_cat-ribon.png" alt="" class="deco_cat-ribon" />
    </div>
    <div class="deco02">
      <img src="/image/deco_cat.png" alt="" width="40px" />
    </div>
    <div class="deco03">
      <img src="/image/sellist.png" alt="" class="sellist_icon" />
    </div>
    <ul class="selling_content" v-if="orderNum>0">
      <li class="buying_list_opened" v-for="(order, key) in orders" :key="order.Id"
      @click="getIndex(key)"
      >
         <div class="expand-bar">
          <img src="/image/star002.png" alt="" class="deco001 openmodale" @click="open"
          >
        </div>
        <div class="order_content">
          <div class="order_title">
            <a href="#" class="order_photo_link">
              <div class="order_photo openmodale"
              @click="open"
              :style="{'background-image': `url(${order.RoomPicture})`}"
              ></div>
            </a>
            <h3 class="order_name">
              <img src="/stars.png" alt="" width="20px" />
              <a href="#" class="openmodale"
               @click="open"
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
                訂單状態
              </p>
              <p class="order_status">
                {{order.Status}}
              </p>
            </h3>
            <h3 class="review">
              <p class="review_title">
                <img
                  src="/image/ribon_icon.png"
                  alt=""
                  width="28px"
                  class="title_deco"
                />
                評價
              </p>
              <p class="order_review">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </p>
            </h3>
          </div>
        </div>
      </li>
    </ul>
    <ul class="buying_content" v-if="orderNum===0">
      <li class="nodetail_seller">
        <img src="/image/dodetail-sell.png" alt="">
      </li>
    </ul>
    <sellerdetail :sellerdata="orders[index]"></sellerdetail>
  </div>
</template>

<script>
import $ from '../../../../node_modules/jquery';
import sellerdetail from '../Model/SellDetail.vue';

export default {
  data() {
    return {
      token: '',
      id: '',
      orders: '',
      orderNum: '',
      index: '',
    };
  },
  components: {
    sellerdetail,
  },
  methods: {
    getIndex(key) {
      this.index = key;
    },
    open() {
      $('.openmodale').click((e) => {
        e.preventDefault();
        $('.seller-modale').addClass('opened');
      });
    },
  },
  created() {
    const vm = this;
    this.id = localStorage.getItem('ID');
    vm.token = document.cookie.replace(
      // eslint-disable-next-line no-useless-escape
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    const sellerAPI = `${process.env.VUE_APP_APIPATH}api/SellerRatings`;
    const config = {
      method: 'get',
      url: sellerAPI,
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
@import '@/assets/scss/_seller.scss';
.nodetail_seller {
  display: flex;
  justify-content: center;
  img {
    width: 50%;
  }
}
.vue-star-rating-rating-text {
  opacity: 0;
}
</style>

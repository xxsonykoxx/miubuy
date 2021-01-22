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
    <ul class="buying_content">
      <li class="buying_list_opened">
        <div class="expand-bar">
          <i class="fas fa-caret-down expand-btn"></i>
        </div>
        <div class="order_content">
          <div class="order_title">
            <h3 class="order_name__closed">
              <img src="/stars.png" alt="" width="20px" />
              <a href="#">ブロマイド（加賀美ハヤト）</a>
            </h3>
          </div>
          <div class="title_group">
            <h3 class="price">
              <p class="order_price__closed">$ <span>123</span></p>
            </h3>

            <h3 class="status">
              <p class="order_status__closed">
                未付款
              </p>
            </h3>
            <h3 class="review">
              <p class="order_review__closed">
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
      <li class="buying_list_opened">
        <div class="expand-bar">
          <i class="fas fa-caret-down expand-btn"></i>
        </div>
        <div class="order_content">
          <div class="order_title">
            <h3 class="order_name__closed">
              <img src="/stars.png" alt="" width="20px" />
              <a href="#">ブロマイド（夜見れな）</a>
            </h3>
          </div>
          <div class="title_group">
            <h3 class="price">
              <p class="order_price__closed">$ <span>123</span></p>
            </h3>

            <h3 class="status">
              <p class="order_status__closed">
                未付款
              </p>
            </h3>
            <h3 class="review">
              <p class="order_review__closed">
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
      <li class="buying_list_opened">
        <div class="expand-bar">
          <i class="fas fa-caret-up expand-btn"></i>
        </div>
        <div class="order_content">
          <div class="order_title">
            <a href="#" class="order_photo_link">
              <div class="order_photo"></div>
            </a>
            <h3 class="order_name">
              <img src="/stars.png" alt="" width="20px" />
              <a href="#">ブロマイド（加賀美ハヤト）</a>
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
              <p class="order_price">$ <span>123</span></p>
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
                未付款
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
    <ul class="buying_content"></ul>
    <ul class="editor_content"></ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import '@/assets/scss/color.scss';
/*==============★ 本體  內容區★==============*/
.mypage_order_content {
  font-family: japanese-font, myfont, serif;
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
  top: -40px;
  left: -30px;
}
.deco02 {
  position: absolute;
  bottom: -10px;
  right: -15px;
}
.deco03 {
  position: absolute;
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
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    justify-content: space-between;
  }
  .order_price,
  .order_status,
  .order_review {
    margin-bottom: 45px;
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
    margin-right: 30px;
    margin-left: 30px;
    letter-spacing: 2px;
    background: linear-gradient(transparent 50%, $colorHeader 20%);
    font-size: 18px;
  }
  .title_deco {
    position: absolute;
    top: 0px;
    left: -10px;
  }
}
</style>

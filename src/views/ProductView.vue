<template>
<div>
  <Loading :active="isLoading"></Loading>
  <div class="container">
      <!-- row 決定內層的數量 -->
      <div class="mt-5 container">
          <div class="row">
            <div class="col-sm-6">
                <div class="productPicture">
                    <img :src="product.imageUrl">
                </div>
            </div>
            <div class="d-flex flex-column col-sm-6 justify-content-center">
              <div class="my-3 text-center">
                   <h2>{{ product.title }}</h2>
              </div>
              <div class="px-3">
                <div class="text-end">
                  <span class="badge      rounded-pill btn-pink
                  category-style">
                    {{product.category}}
                  </span>
                </div>
                <div class="my-3">
                   <p>{{ product.description }}</p>
                  <p>{{ product.content }}</p>
                </div>
                <div class="price my-3" v-if="!product.price">
                ${{ product.origin_price }}
                </div>
                <div class="d-flex align-items-baseline my-3">
                  <div class="price mx-1" v-if="product.price">
                   ${{ product.price }}
                  </div>
                  <del class="fs-6 text-muted ms-1"> ${{ product.origin_price   }}
                  </del>
                </div>
                <div>
                  <div class="input-group my-3">
                    <input
                      type="number"
                      class="bg-light border-bottom px-3
                      add-cart-btn"
                      v-model.number="qty"
                      min="1"
                    />
                    <button
                      type="button"
                      class="btn btn-pink"
                      @click="addToCart(product.  id, qty)"
                      :disabled="loadingStatus. loadingItem === product. id"
                    >
                     <i
                        class="fas fa-spinner   fa-pulse"
                         v-if="loadingStatus. loadingItem ===  product.id"
                     ></i>
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
        <div>
          <div class="mt-5">
            <h4 class="text-primary border-bottom d-flex    position-relative pb-3 px-3">
                   購物說明 </h4>
          </div>
          <div class="px-3">
            <p class="notice-title pt-3">退換貨須知</p>
          <p class="notice-txt"> 感謝您購買商品，為保護消費者權益，大部分商品皆享有 7 天鑑賞期（含例假日）<br> 如需辦理退換貨請詳閱以下事項： </p>
          <ul class="list-style-circle ps-4">
            <li class="mb-2"> 7 天鑑賞期時間判定基準：如 1/1 號收到商品，則請 1/7（含）前申請退換貨，依此類推。 </li>
            <li class="mb-2"> 商品鑑賞期不等於試用期，退回時請保持商品與包裝完整，如因外力撞擊等意外因素，造成了商品刮傷受損，請恕無法接受退換貨。 </li>
            <li class="mb-2"> 如商品超過鑑賞期欲辦理退換貨者，恕不受理。 </li>
            </ul>
            <p class="notice-title pt-1">運送方式</p>
            <ul class="list-style-circle ps-4">
              <li class="mb-2"> 宅配到府：將會有立格扉配合之物流業者配送至指定收件地點 </li>
              <li class="mb-2"> 超取商品：將配送至您所指定的門市，到店時將會發送取貨通知簡訊及E-mail通知您前往取貨 </li>
              <li class="mb-2"> 國際配送：由於地區不同，也將造成運費計算不同，海外訂購者請在購買前先詢問「線上客服」。國際商品除商品本身瑕疵問題，恕不接受退貨。 </li>
            </ul>
            <p class="notice-title pt-1">付款方式</p>
            <ul class="list-style-circle ps-4">
              <li class="mb-2"> 信用卡即時線上一次刷卡付款 </li>
              <li class="mb-2"> ATM付款 </li>
              <li class="mb-2"> 貨到付款</li>
            </ul>
          </div>
        </div>
  </div>
</div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      product: {},
      qty: 1,
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  methods: {
    getProduct () {
      // $router -> 方法
      // $route -> 物件 -> 取值
      const { id } = this.$route.params
      this.$http(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        })
    },
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      if (this.qty <= 0) {
        alert('請輸入正確數量')
      } else {
        this.loadingStatus.loadingItem = id
        this.isLoading = true
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
          .then((res) => {
            this.loadingStatus.loadingItem = ''
            emitter.emit('get-cart')
            this.isLoading = false
          })
          .catch((err) => {
            alert(err.data.message)
          })
      }
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style scoped>
  .productPicture{
    position: relative;
    height: 80%;
    padding-bottom: 75%;
  }

  .productPicture img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    border: 10px solid #dee2e6;
  }

  .btn-pink{
    border: 1px #ff6978 solid;
    background: #ff6978;
    color: white;
  }

  .category-style{
    width: 80px;
  }

  .fs-6 {
    font-size: 1rem!important;
  }

  .text-muted {
    color: #adb5bd!important;
  }

  .price{
    font-size: 1.5rem;
    font-weight: 500;
  }

  .add-cart-btn{
    outline: none;
    border: none;
  }

  .text-primary{
    color: #043869!important;
    font-weight: 700;
    font-size: 1.3rem;
  }

  .notice-title{
    font-weight: 800;
    font-size: 1.1rem;
  }

  .notice-txt{
    font-weight: 700;
  }

  .list-style-circle {
    list-style-type: circle;
  }

</style>

<template>
<div>
  <Loading :active="isLoading"></Loading>
  <div class="container d-flex mt-5">
      <div class="col-2 mt-5">
          <ul class="nav flex-column">
            <li class="navList">
              <span class="txt" @click="navList('全部商品')">全部商品</span>
            </li>
            <li class="navList">
              <span class="txt" @click="navList('布置靈感')">布置靈感</span>
            </li>
            <li class="navList">
              <span class="txt" @click="navList('設計文具')">設計文具</span>
            </li>
            <li class="navList">
              <span class="txt" @click="navList('療癒小物')">療癒小物</span>
            </li>
            <li class="navList">
              <span class="txt" @click="navList('收納好物')">收納好物</span>
            </li>
          </ul>
      </div>
      <div class="col-10 mt-5">
        <div class="d-flex flex-row flex-wrap">
              <div v-for="product in products" :key="product.id">
                <div class="productsBox flex-column" v-if="product.isSelected">
                  <div class="top">
                    <img :src="product.imageUrl" alt="">
                   </div>
                  <div class="bottom">
                    <router-link :to="`/product/${product.id}`">
                       <h3>{{ product.title }}</h3>
                    </router-link>
                    <div class="text d-flex justify-content-start align-items-center">
                      <i class='bx bx-heart'></i>
                      <i class='bx bxs-cart-add'
                         @click="addToCart(product.id, qty)"
                         ></i>
                      <span class="price">NT{{ product.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
  </div>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
</div>
</template>

<script>
import emitter from '@/libs/emitter'
import Pagination from '@/components/PaginationView.vue'

export default {
  data () {
    return {
      cartData: {},
      products: [],
      pagination: {},
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`)
        .then((res) => {
          // 從api取得所有產品資料，加入data的products
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.products.forEach(function (item) {
            item.isSelected = true
          })
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    addToCart (id, qty = 1) {
      this.isLoading = true
      const data = {
        product_id: id,
        qty
      }
      this.loadingStatus.loadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then((res) => {
          this.loadingStatus.loadingItem = ''
          emitter.emit('get-cart')
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    navList (item) {
      this.products.forEach(function (product) {
        if (item === '全部商品') {
          product.isSelected = true
        } else {
          if (product.category === item) {
            product.isSelected = true
          } else {
            product.isSelected = false
          }
        }
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style scope>
  .navList{
    margin: 5px 0 5px 0;
    position:relative;
  }

  .navList .txt{
    color: #111010;
    font-size: 20px;
  }

  .navList .txt::after{
    content: "";
    position: absolute;
    left: 0 ;
    bottom: 3px;
    width: 80px;
    height: 6px;
    background-color: rgba(240, 186, 196, 0.5);
    opacity: 0;
  }

  .navList.active .txt::after{
    opacity: 1;
  }

  .navList .txt:hover{
    color: #4f4f4f;
    cursor: pointer;
  }

  .productsBox {
      position: relative;
      margin: 0 30px 60px 30px;
      box-shadow: 0 0 5px rgb(0 0 0 / 20%);
      width: 400px;
      flex-wrap: wrap;
  }
  .productsBox .top {
    position: relative;
    height: 300px;
  }
  .productsBox .top img {
    display: inline-block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
  .productsBox .bottom {
    padding: 15px;
  }
  .productsBox .bottom a{
    text-decoration: none;
    color: #111010;
  }
  .productsBox .bottom a:hover{
    color: #4f4f4f;
  }
  .productsBox .bottom .price {
    display: inline-block;
    letter-spacing: 1px;
    font-size: 22px;
    color: #4f4f4f;
    margin-left: 55%;
  }
  .productsBox .bottom i {
      display: inline-block;
      font-size: 24px;
      color: #b2b2b2;
      margin: 0 10px;
      cursor: pointer;
  }
  .productsBox .bottom i:hover{
    color: #f19fb1;
  }
</style>

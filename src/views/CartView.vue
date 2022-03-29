<template>
    <div class="container mt-5">
      <div>
        <h2>結帳 Checkout</h2>
        <Loading :active="isLoading"></Loading>
        <ul class="steps list-unstyled d-flex justify-content-between position-relative mx-auto">
          <li class="steps-item active w-33 d-flex flex-column align-items-center py-2 px-4"><p class="small rounded-circle text-center mb-2"> 1 </p> 資料填寫 </li>
          <li class="steps-item w-33 d-flex flex-column align-items-center py-2 px-4"><p class="small rounded-circle text-center mb-2"> 2 </p> 訂單建立 </li>
          <li class="steps-item w-33 d-flex flex-column align-items-center py-2 px-4"><p class="small rounded-circle text-center mb-2"> 3 </p> 完成訂單 </li>
        </ul>
        <div class="text-end">
            <button class="btn btn-outline-gray w-10 py-2 me-md-2 mb-2 mb-md-0" type="button"
                    :disabled=" cart.carts.length === 0 "
                    @click="deleteAllCarts()">清空購物車</button>
        </div>
        <div>
          <h4 class="text-primary text-center border-bottom d-flex align-items-center
            justify-content-center position-relative pb-3 mb-0">
             購物清單 </h4>
        </div>
        <ul class="list-unstyled border-bottom py-4 mb-3">
          <template v-if="cart.carts">
            <li v-for="item in cart.carts" :key="item.id" class="row justify-content-between mb-4">
              <div class="row align-items-center">
                <div class="col-3 p-0">
                   <img :src="item.product.imageUrl" alt=""  class="product-img">
                </div>
                <div class="p-0 col-6">
                  <div class="d-flex m-0 w-100 align-items-center">
                    <div class="p-0 col-8">
                      <div class="productName">{{item.product.title}}
                      </div>
                    </div>
                      <div class="p-0 col-2">
                        <div class="input-group input-group-sm">
                          <div class="input-group">
                         <!-- @blur 當元素失去焦點時觸發blur事件 -->
                            <input min="1" type="number" class="form-control"
                               v-model.number="item.qty"
                               @blur="updateCart(item)"
                               :disabled="loadingStatus.loadingItem === item.id">
                            <span class="input-group-text" id="basic-addon2">
                          {{ item.product.unit }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <div class="col-2 p-0">
                  <div class="productTotal text-center"> NT{{ $filters.currency(item.final_total) }}</div>
                </div>
                <div class="col-1 p-0">
                  <div class="productDel text-center">
                    <span>
                      <button
                        type="button"
                        class="btn btn-outline-pink   btn-sm"
                        @click="removeCartItem(item.id)"
                        :disabled="loadingStatus. loadingItem === item.id"
                      >
                        <i class='bx bxs-trash-alt'></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
        <div class="input-group mb-3 input-group-sm">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="請輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-gray"
              type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-3 p-0"></div>
          <div class="d-flex col-6 p-0">
              <div class="col-6 text-center summary">
                共 {{ cart.carts.length }} 項
              </div>
              <div div class="col-6 text-center summary">
                總計
              </div>
          </div>
          <div class="col-2 p-0">
            <div class="text-center">
               NT{{$filters.currency(cart.total) }}
            </div>
          </div>
          <div class="col-1 p-0"></div>
          </div>
      </div>
      <div class="my-5 row justify-content-center">
        <div>
          <h4 class="text-primary text-center border-bottom d-flex align-items-center
            justify-content-center position-relative pb-3 mb-0">
             訂購人資訊 </h4>
        </div>
        <Form
          ref="form"
          class="col-md-6 py-4"
          v-slot="{ errors }"
          @submit="onSubmit"
        >
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <Field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <Field
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="0912345678"
              :rules="isPhone"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <Field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-outline-pink"
                    :disabled="cart.carts.length === 0 || Object.keys(errors).length > 0">
              送出訂單
            </button>
          </div>
        </Form>
      </div>
    </div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false,
      cart: {
        carts: []
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: ''
    }
  },
  mounted () {
    this.getCart()
  },
  methods: {
    // getProduct (id) {
    //   this.$router.push(`/product/${id}`)
    // },
    getCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data
          this.isLoading = false
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    removeCartItem (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.loadingStatus.loadingItem = id
      this.$http.delete(url)
        .then((response) => {
          alert(response.data.message)
          emitter.emit('get-cart')
          this.getCart()
        })
        .catch((err) => {
          alert(err.data.message)
        })
      this.loadingStatus.loadingItem = ''
      this.isLoading = false
    },
    updateCart (item) {
      this.loadingStatus.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data: cart })
        .then((res) => {
          alert(res.data.message)
          this.loadingStatus.loadingItem = ''
          this.getCart()
        })
        .catch((err) => {
          alert(err.data.message)
          this.loadingStatus.loadingItem = ''
        })
    },
    deleteAllCarts () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then((res) => {
          alert(res.data.message)
          emitter.emit('get-cart')
          this.getCart()
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入正確的號碼格式'
    },
    onSubmit () {
      this.isLoading = true
      const order = this.form
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data: order })
        .then((res) => {
          this.$httpMessageState(res, '建立訂單')
          this.$router.push(`/checkout/${res.data.orderId}`)
          this.$refs.form.resetForm()
          this.form.message = ''
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, '建立訂單')
        })
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.isLoading = true
      this.$http.post(api, { data: coupon })
        .then((res) => {
          this.$httpMessageState(res, '加入優惠券')
          this.getCart()
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, '加入優惠券')
        })
    }
  }
}
</script>

<style scoped>
  .steps {
    max-width: 500px;
    z-index: 1;
  }
  .steps-item {
    position: relative;
  }
  .steps-item.active {
    color: #ff6978;
  }
  .steps p {
    width: 40px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: #ccc;
  }
  .steps-item.active p {
    background-color: #ff6978;
  }
  .steps-item:not(:first-child):after {
    content: "";
    position: absolute;
    top: 30%;
    left: -50%;
    width: 100%;
    height: 2px;
    background-color: #ccc;
    z-index: -1;
  }
  .w-33 {
    width: 33%;
  }

  .w-10 {
    width: 10%;
  }

  .btn-outline-gray{
    border: 1px #8d949b solid;
    color: #8d949b;
  }

  .btn-outline-gray:hover {
    color: white;
    background-color: #8d949b;
    border-color: #8d949b;
  }

  .border-bottom {
    border-bottom: 1px solid #dee2e6!important;
  }

  .text-primary{
    color: #043869!important;
    font-weight: 700;
  }

  .product-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .btn-outline-pink{
    border: 1px #ff6978 solid;
    color: #ff6978;
  }

  .btn-outline-pink:hover{
    background: #ff6978 ;
    color: white;
  }

</style>

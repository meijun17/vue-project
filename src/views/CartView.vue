<template>
    <div class="container">
      <div>
        <h2>購物車</h2>
        <Loading :active="isLoading"></Loading>
        <div class="text-end">
            <button class="btn btn-outline-danger" type="button"
                    :disabled=" cart.carts.length === 0 "
                    @click="deleteAllCarts()">清空購物車</button>
        </div>
        <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      @click="removeCartItem(item.id)"
                      :disabled="loadingStatus.loadingItem === item.id"
                    >
                      <i
                        class="fas fa-spinner fa-pulse"
                        v-if="loadingStatus.loadingItem === item.id"
                      ></i>
                      移除商品
                    </button>
                  </td>
                  <td>
                    <router-link class="nav-link" :to="`/product/${item.product.id}`">{{ item.product.title }}</router-link>
                    <!-- <button @click.prevent="getProduct(item.product.id)">
                      {{ item.product.title }}
                    </button> -->
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group mb-3">
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
                  </td>
                  <td class="text-end">
                    <small
                      v-if="cart.final_total !== item.total"
                      class="text-success"
                      >折扣價：</small
                    >
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ $filters.currency(cart.total) }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="addCouponCode"
              >
                套用優惠碼
              </button>
            </div>
          </div>
      </div>
      <div class="my-5 row justify-content-center">
        <Form
          ref="form"
          class="col-md-6"
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
            <button type="submit" class="btn btn-danger"
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

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <h2><router-link class="nav-link" to="/">Light Life</router-link></h2>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li>
            <router-link to="/articles" class="nav-link">Blog</router-link>
          </li>
          <li class="nav-item">
              <router-link  class="nav-link" to="/cart"
              style="position:relative">
                  <i class='bx bx-cart' style="font-size: 24px"></i>
                  <span class="badgeStyle">
                    {{ cartData.carts.length }}
                  </span>
              </router-link>
          </li>
          <li class="nav-item">
              <router-link class="nav-link" to="/admin/products">進入後台</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: []
      }
    }
  },
  methods: {
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          console.log(res)
          this.cartData = res.data.data
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>

<style scoped>
  .badgeStyle{
    border-radius: 50rem ;
    display: inline-block;
    padding: 0.35em 0.65em;
    font-size: 0.5em;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    white-space: nowrap;
    background-color: rgb(238, 59, 59);
    position: absolute;
    top: 0.2rem;
    left: 1.5rem;
  }
</style>

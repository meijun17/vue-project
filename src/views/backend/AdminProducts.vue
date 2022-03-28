<template>
  <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary" type="button" @click="openModal('new')">
                建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th width="120">
                產品名稱
            </th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else class="text-danger">未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"  @click="openModal('edit', item)">
                        編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"  @click="openDelModal(item)">
                        刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    <ProductModal :product="tempProduct" :is-new="isNew" @update-product="updateProduct" ref="productModal">
  </ProductModal>
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"></DelModal>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationView.vue'
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DeleteModal.vue'

export default {
  props: ['token'],
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      modal: {
        editModal: '',
        delModal: ''
      },
      currentPage: 1
    }
  },
  components: {
    Pagination,
    ProductModal,
    DelModal
  },
  inject: ['emitter'],
  methods: {
    getProducts (page = 1) {
      this.currentPage = page
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          alert(err.data.message)
        })
    },
    openModal (isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    updateProduct (item) {
      this.tempProduct = item
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      this.isLoading = true
      let method = 'post'
      let status = '新增產品'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
        status = '更新產品'
      }
      const productComponent = this.$refs.productModal
      this.$http[method](api, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res, status)
          productComponent.hideModal()
          this.getProducts(this.currentPage)
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, status)
        })
    },
    openDelModal (item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    delProduct () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.isLoading = true
      const status = '刪除產品'
      this.$http.delete(api)
        .then((res) => {
          this.isLoading = true
          this.$httpMessageState(res, status)
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          this.getProducts(this.currentPage)
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.response, status)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

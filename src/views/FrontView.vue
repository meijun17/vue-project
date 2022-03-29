<template>
  <div>
    <FrontNavbar></FrontNavbar>
    <router-view></router-view>
    <FrontFooterView></FrontFooterView>
  </div>
</template>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'
import FrontFooterView from '@/components/FrontFooterView.vue'
export default {
  components: {
    FrontNavbar,
    FrontFooterView
  }
}
</script>

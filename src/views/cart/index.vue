<template>
  <div>
    <nav-bar class="nav-bar">
      <template #center>
        购物车({{ cartCount }})
      </template>
    </nav-bar>
    <div class="cart-list">
      <cart-item
        v-for="item in cartList"
        :key="item.id"
        :good-info="item"
        :checked="item.check"
         @click.native="handleCheckItem(item)"/>
    </div>
    <main-tab-bar />
    <cart-bottom-bar class="cart-bottom-bar" />
  </div>
</template>

<script>
  import { CHECK_ITEM } from '@/store/mutation-types.js'
  import NavBar from '@/components/common/NavBar/NavBar.vue'
  import MainTabBar from '@/components/content/MainTabBar/MainTabBar.vue'
  import CartItem from './components/cartItem.vue'
	import CartBottomBar from './components/CartBottomBar.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      MainTabBar,
      CartItem,
			CartBottomBar
    },
    computed: {
      ...mapGetters(['cartCount', 'cartList'])
    },
    methods: {
      handleCheckItem(item) {
        this.$store.commit(CHECK_ITEM, item)
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: var(--color-tint);
    color: #FFFFFF
  }
  .cart-list {
    margin-top: 54px;
    padding-bottom: 90px;
  }
	.cart-bottom-bar {
		position: fixed;
		bottom: 50px;
		width: 100%;
	}
</style>

<!-- 首页 -->
<template>
  <div id="home">
    <!-- 用于做切换 tab 的吸顶效果 -->
    <switch-tab v-show="stickyTab" ref="switchTab2" class="switch-tab2" :tabTitle="['流行', '新款', '精选']" @changeTab="tabChange" />
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <!-- 可滚动区域---开始 -->
    <scroll
      class="scroll-wrap"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp='loadMore'
    >
      <div class="banner" v-if="banner.length">
        <a class="banner-link">
          <img :src="banner[0].image" alt="" @load="bannerLoad">
        </a>
      </div>
      <div class="recommend" v-if="recommend.length">
        <div class="recommend-item" v-for="item in recommend" :key="item.sort">
          <img :src="item.image" alt="item.title">
        </div>
      </div>
      <switch-tab ref="switchTab1" class="switch-tab" :tabTitle="['流行', '新款', '精选']" @changeTab="tabChange" />
      <good-list :goodList="showGoods"></good-list>
    </scroll>
    <!-- 可滚动区域---结束 -->
    <back-to-top v-show="showBackToTop" @click.native="handleBackToTop" />
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from '@/components/content/MainTabBar/MainTabBar.vue'
  import NavBar from 'components/common/NavBar/NavBar.vue'
  import SwitchTab from 'components/common/SwitchTab/SwitchTab.vue'
  import Scroll from 'components/common/Scroll/Scroll.vue'
  import GoodList from 'components/content/GoodList/GoodList.vue'
  import { getHomeMultiData, fetchHomeGoods } from '@/api/home.js'
  import { debounce } from '@/utils/debounce.js'
  import { backTopMixin } from '@/common/mixin.js'

  export default {
    name: 'Home',
    components: {
      MainTabBar,
      NavBar,
      SwitchTab,
      Scroll,
      GoodList
    },
    mixins: [backTopMixin],
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] }
        },
        curType: 'pop',
        tabOffsetTop: 0,
        stickyTab: false,
        leaveY: 0, // 记录离开页面时y轴的位置
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.curType].list
      }
    },
    created() {
      // 获取头部 banner 和 recommend 数据
      this.getHomeMultiData()
      // 获取 tab 栏商品数据
      this.getGoodsList('pop')
      this.getGoodsList('new')
      this.getGoodsList('sell')
    },
    mounted() {
      // 监听图片加载完成
      this.$bus.$on('imgLoad', this.refresh)
    },
    activated() {
      this.$refs.scroll &&  this.$refs.scroll.scrollTo(0, this.leaveY, 0)
      // 防止页面会在切换回来之后直接滑动到最上面
      // this.$refs.scroll &&  this.$refs.scroll.refresh()
    },
    deactivated() {
      this.leaveY = this.$refs.scroll ? this.$refs.scroll.getBetterScrollY() : 0
      // 离开页面取消监听
      this.$bus.$off('imgLoad', this.refresh)
    },
    methods: {
      /**
       * 事件监听相关
       */
      tabChange(index) {
        switch (index){
          case 0:
            this.curType = 'pop'
            break
          case 1:
            this.curType = 'new'
            break
          case 2:
            this.curType = 'sell'
            break
        }
        // 让两个 tab 的激活项保持一致
        this.$refs.switchTab1.currentIndex = index
        this.$refs.switchTab2.currentIndex = index
      },
      contentScroll(position) {
        this.showBackTop(position)
        // 切换 tab 的显示隐藏
        this.stickyTab = Math.abs(position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore() {
        this.getGoodsList(this.curType)
      },
      // banner 图片加载完成，计算切换 tab 的准确高度
      bannerLoad() {
        this.tabOffsetTop = this.$refs.switchTab1.$el.offsetTop
      },
      // 重新计算可滚动高度
      refresh() {
        debounce(this.$refs.scroll.refresh).call()
      },
      /**
       * 接口相关
       */
      // 获取上半部分 banner 数据
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },

      // 获取 tab 内容
      getGoodsList(type) {
        const page = this.goods[type].page + 1
        fetchHomeGoods(type, page).then(res => {
          // 这里其实用到了 push 的参数可以是很多个这个特点
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page++
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
  .banner-link {
    display: block;
  }
  .banner-link img {
    width: 100%;
  }
  .recommend {
    display: flex;
    justify-content: space-around;
    padding: 20px 0
  }
  .recommend-item img {
    width: 80px;
  }
  .switch-tab2 {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .scroll-wrap {
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>

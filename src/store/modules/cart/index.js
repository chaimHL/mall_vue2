import { ADD_COUNT, ADD_TO_CART, CHECK_ITEM } from '@/store/mutation-types.js'

const cart = {
  state: {
    cartList: []
  },
  mutations: {
    // 商品数量+1
    [ADD_COUNT](state, payload) {
      payload.count++
    },
    // 添加进购物车
    [ADD_TO_CART](state, payload) {
      payload.check = true
      payload.count = 1
      state.cartList.push(payload)
    },
    // 商品勾选
    [CHECK_ITEM](state, payload) {
      payload.check = !payload.check
    }
  },
  actions: {
    addCart({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
				// 判断购物是否已经有此商品，如果有就把这个对象的引用指向 oldProduct
				const oldProduct = state.cartList.find(item => item.id === payload.id)
				
				if (oldProduct) {
				  // 已存在，就让 count 加1
				  commit(ADD_COUNT, oldProduct)
					resolve('数量+1')
				} else {
				  // 不存在，则添加属性 count，值为1
				  commit(ADD_TO_CART, payload)
					resolve('添加新商品')
				}
			})
    }
  }
}

export default cart

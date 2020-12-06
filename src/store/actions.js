import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldproduct = context.state.cartList.find(item => item.goodsId === payload.goodsId)
            if (oldproduct) {
                context.commit(ADD_COUNTER, oldproduct)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                payload.checked = false
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    }
}
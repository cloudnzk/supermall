export default{
    addCart(context,payload){
        /**
         *  用Promise回调，返回结果
         * */
        return new Promise((resolve,reject) => {
            // payload新添加的商品
            // let oldProduct = null
            // for(let item of state.cartList){
            //     if(item.iid === payload.iid){
            //         oldProduct = item
            //     }
            // }
            
            // 1. 查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // 2.判断oldProduct，商品之前是不是已经加入了
            if (oldProduct){
                // oldProduct.count += 1
                context.commit('addCounter',oldProduct)
                resolve('当前商品购买数量加一')
            }

            else{
                payload.count = 1
                context.commit('addToCart',payload)
                resolve('新商品添加到购物车')
                // context.state.cartList.push(payload)
            }
        })
    },
}
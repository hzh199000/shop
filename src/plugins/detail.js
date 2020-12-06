export function getDetailImages(id) {
    return axios.get('http://localhost:3000/api/DetailImages/showDetailImages', {
        params: {
            goodsId: id
        }
    })
}
export function getDetailInfo(id) {
    return axios.get('http://localhost:3000/api/DetailInfo/showDetailInfo', {
        params: {
            goodsId: id
        }
    })
}
export function getShopInfo(id) {
    return axios.get('http://localhost:3000/api/ShopInfo/showShopInfo', {
        params: {
            goodsId: id
        }
    })
}
export function getGoodsInfo(id) {
    return axios.get('http://localhost:3000/api/GoodsImages/showGoodsImages', {
        params: {
            goodsId: id
        }
    })
}
export class Goods {
    constructor(detailInfo, columns, services) {
        this.title = detailInfo.title
        this.newPrice = detailInfo.newPrice
        this.oldPrice = detailInfo.oldPrice
        this.discount = detailInfo.discount
        this.columns = columns
        this.services = services

    }
}
export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
export class Shop {
    constructor(shopInfo, score) {
        this.logo = shopInfo.logo
        this.name = shopInfo.name
        this.sells = shopInfo.sells
        this.sellCounterFilter = shopInfo.sellCounterFilter
        this.goodsCount = shopInfo.goodsCount
        this.score = score

    }
}
// sqlMap.js  sql语句
const sqlMap = {
    // Stu: {
    //     add: 'insert into axios_demo(stu_Id,stu_name,stu_sex,stu_college,stu_class) values (0,?,?,?,?)',
    //     show: 'select * from axios_demo',
    //     del: 'delete from axios_demo where stu_Id = ?',
    //     update: 'update axios_demo set stu_name = ?,stu_sex = ?,stu_college = ?,stu_class = ? where stu_Id = ?'
    // },
    Home: {
        show: 'select * from goods'
    },
    HomeBanners: {
        show: 'select * from banners'
    },
    HomeRecommends: {
        show: 'select * from recommends'
    },
    HomeGoods: {
        show: 'select * from goods'
    },
    DetailImages: {
        show: "select * from detail where goodsId = ?"
    },
    DetailInfo: {
        show: "select * from goods where goodsId = ?"
    },
    ShopInfo: {
        show: "select * FROM shop where shopId in (select shopId from goods where goodsId = ?)"
    },
    GoodsImages: {
        show: "select * from goodsInfo where goodsId = ?"
    }
}

module.exports = sqlMap
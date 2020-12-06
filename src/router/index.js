import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
    // const originalPush = VueRouter.prototype.push

// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

const Home = () =>
    import ('views/home/Home')
const Detail = () =>
    import ('views/detail/Detail')
const Category = () =>
    import ('views/category/Category')
const Cart = () =>
    import ('views/cart/Cart')
const Profile = () =>
    import ('views/profile/Profile')

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }

    // {
    //     path: '/tongxunlu',
    //     name: 'Tongxunlu',
    //     component: Tongxunlu
    // },
    // {
    //     path: '/fenlei',
    //     name: 'Fenlei',
    //     component: Fenlei
    // }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
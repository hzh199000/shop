export function getHomeBanners() {
    return axios.get('http://localhost:3000/api/HomeBanners/showHomeBanners')
}
export function getHomeRecommends() {
    return axios.get('http://localhost:3000/api/HomeRecommends/showRecommends')
}
export function getHomeFeature() {
    return axios.get('http://localhost:3000/api/HomeFeature/showFeature')
}
export function getHomeGoods() {
    return axios.get('http://localhost:3000/api/HomeGoods/showHomeGoods')
}
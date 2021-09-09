import { getProducts, getRecommendeds } from './api';

const ApiService = {
    loadProduct(dispatch : any) {
        getProducts().then(products => {
            dispatch({ type: 'LOAD_PRODUCTS', payload: products })
        }).catch(() => {
            dispatch({ type: 'ERROR_PRODUCTS', payload: null })
        }).finally(() => { })
    },

    cartProducts(dispatch : any , products : any) {
        dispatch({ type: 'GET_CART_PRODUCTS', payload: products })
    },

    loadRecommendedProducts(dispatch : any) {
        getRecommendeds().then(products => {
            dispatch({ type: 'GET_RECOMMENDED_PRODUCTS', payload: products })
        }).catch(() => {
            dispatch({ type: 'ERROR_PRODUCTS', payload: null })
        }).finally(() => { })
    },

}
export default ApiService;
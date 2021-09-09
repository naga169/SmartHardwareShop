const initialState = {
    productList: [],
    recommendedProductList: [],
    cartProducts: [],
    toggleModal: false,
    selectedProduct: {},
    loading: true,
    error: false,
};
function productReducer(state = initialState, action) {
    switch (action.type) {

        case 'LOAD_PRODUCTS':
            return { ...state, productList: action.payload }
        case 'GET_RECOMMENDED_PRODUCTS':
            return {...state ,recommendedProductList: action.payload }
        case 'SET_CART_PRODUCTS':
                return {...state ,cartProducts: action.payload }
        case 'GET_CART_PRODUCTS':
                return {...state }
        case 'ERROR_USERS':
            return { ...state, recommendedProductList: [], error: true, loading: false }
        case 'SHOW_HIDE_MODAL':
            return {...state, toggleModal : action.payload }
        case 'SELECTED_PRODUCT':
            return {...state , selectedProduct : action.payload }
        default:
            return state;
    }
};
export default productReducer;
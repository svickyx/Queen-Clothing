const CartActionTypes = {
    TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN',
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CLEAR_ITEM_FROM_CART:'CLEAR_ITEM_FROM_CART'
};

export default CartActionTypes;

// 注意這裡是沒有para接收的，錯誤的格式：
// const CartActionTypes = ()=> {
//     TOGGLE_CART: 'TOGGLE_CART'
// }
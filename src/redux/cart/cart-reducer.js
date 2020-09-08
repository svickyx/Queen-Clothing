// 1，先設initial state
// 2, 寫出cartReducer
// 3，完成cart-type
// 4. 完成cart-action
// 5. 把cartReducer加入root cartReducer

import CartActionTypes from './cart-type';

import {addItemToCart, removeItemFromCart} from './cart-utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state=INITIAL_STATE, action)=> {
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state,
                hidden: !state.hidden 
                // (這裡用state.hidden)
            }
        case CartActionTypes.ADD_ITEM:
            return{
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
                //這裡把cartItems的狀態變成了cart-utils裡面寫的function了
            }
        case CartActionTypes.REMOVE_ITEM:
            return{
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
                // 這裡忘記把filter寫成一個function了，忘記接收一個props: cartItem
            }
        case CartActionTypes.CLEAR_CART:
            return{
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}

export default cartReducer;
import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem)=> accumalatedQuantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem)=> accumalatedQuantity + cartItem.quantity * cartItem.price, 0)
)

//1. 要用到createSelector 注意S要大寫
//2. input selector, it's a function: 起名字按照select+名字, get the whole state, just return a slice of it.
//在這個例子裡，input selector get the whole state reducer, but only pull the cart part
//3. selectCartItems is a property of cart(?), createSelector 有兩個arguments, first argument是a collection of input selector/an array,
// the second argument is a function that return the value we want from the selector, which is cartItems
//4. 因為用了createSelector這個東西來創造了selectCartItem, it is a memorized selector
//5. 在來創造一個新的selector: selectCartItemsCount,就可以用到之前selector的東西
//6. 寫完selectCartItemsCount, 就可以把cart-icon component換掉了 =》 看cart-icon.js
//7. 同理，selectCartItems 也可以去換掉cart-dropdown component的內容 =》 看cart-dropdown.js
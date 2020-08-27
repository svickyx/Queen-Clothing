import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {toggleCartHidden} from '../../redux/cart/cart-action';
import {selectCartItemsCount} from '../../redux/cart/cart-selector';

import {ReactComponent as ShoppingBagIcon} from '../../assets/shopping-bag.svg';

import '../cart-icon/cart-icon.scss';

const CartIcon = ({toggleCartHidden, itemCount})=> {
    return(
        <div className='cart-icon-container' onClick={toggleCartHidden}>
            <ShoppingBagIcon className='shopping-bag-icon'/>
            <span className='item-count'>{itemCount}</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: ()=> dispatch(toggleCartHidden())
  })

  const mapStateToProps = createStructuredSelector({
      itemCount: selectCartItemsCount
  })
//用reduce的方法把cart裡面的所有item.quantity加起來,pass to CartIcon component, 並且改變裡面的數字

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

// import cartReducer to cart-icon component:
// 1. import {connet}
// 2. import toggleCart from '../../redux/cart/cart-action';
// 3. import CartActionTypes - {toggleCart}
// 4. 然後寫mapDispatchToProps, it get the dispatch, and we will call it 'toggleCartHidden', which is just a function that trigger the dispatch of toggleCartHidden
// ***注意dispatch of toggleCartHidden後面還要加（）
// 5. 然後補齊export default conect()的兩個paras
// 6. 這樣的話CartIcon will have access to toggleCartHidden, 所以在口號裡添加{toggleCartHidden}, 可以使用onClick

// selector 
//7. 因為寫好selectCartItemsCount， 所以可以把mapStateToProps改掉了，原來長這樣：
// const mapStateToProps = ({cart: {cartItems}}) => ({
//     itemCount: cartItems.reduce((accumalatedQuantity, cartItem)=> accumalatedQuantity + cartItem.quantity, 0)
// })
//8. 現在mapStateToProps接收到的是whole state, 但是通過selectCartItemsCount達到對應的地方去
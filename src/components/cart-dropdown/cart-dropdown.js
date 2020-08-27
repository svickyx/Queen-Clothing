import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {createStructuredSelector} from 'reselect';
import {selectCartItems} from '../../redux/cart/cart-selector';

import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item';

import {toggleCartHidden} from '../../redux/cart/cart-action'

import '../cart-dropdown/cart-dropdown.scss';

const CartDropdown = ({cartItems, history, dispatch})=> {
    return(
        <div className='cart-dropdown'> 
            <div className='cart-items'>
                {   cartItems.length ?
                    cartItems.map( cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                    : <span className='empty-message'>Your cart is empty</span>
                }
            </div>
            <CustomButton onClick = {()=> 
                {history.push('/checkout');
                dispatch(toggleCartHidden())
            }}>
                GO TO CHECKOUT
            </CustomButton>
            {/* 這裡toggleCartHidden的作用是為了當click go to checkout button，然後跳到check out page的時候，trigger hidden state to ture
            本來要用mapDispatchtoProps的，但是另外一種寫法就是直接在cartDropdown這個component裡面接收dispatch這個props就能用了 */}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));

// withRouter 用法：
// 1. 當添加了withRouter, compoenent have access to {history}
// 2. 通過任何形式比如onClick = {()=> history.push('/therightpageurl)}
// 3. 最後別忘了export那裡，要把所有的component都用withRouter包起來


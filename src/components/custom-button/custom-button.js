import React from 'react';
import '../custom-button/custom-button.scss';

const CustomButton = ({children, isGoogleSignIn, inverted, type, ...otherProps})=> {

    return(
        <button 
        className= {`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in': ''} 
        custom-button`}
        {...otherProps}
        >{children}</button>
    )
}
///這裡pass {childre}過來是因為這個button的裡面的文字不是特定的，而是根據他所在的位置有所改變
//所以如果 <CustomButton>Sign up</CustomButton> 裡面的children 就會變成 sign up

export default CustomButton;

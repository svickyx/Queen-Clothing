import React from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {createUserProfileDocument, auth} from '../../firebase/firebase.utils';
import '../sign-up/sign-up.scss';

class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

   handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state
        if(password !== confirmPassword){
            alert('password not match')
            return;
        }
        // 這裡先檢查密碼有沒有一致，沒有一致什麼都不能做，給alert
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            
            await createUserProfileDocument(user, {displayName})
            // 這裡不明白
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            // 當createUserProfileDocument成功了之後，就可以把form清空了，用setState
        }catch(error){
            console.log('error', error.message)
        }
        
   };

    handleChange = event => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state
        return(
            <div className='sign-up'>
                <h2>I don't have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    {/* 下面這裡的name, label, value這些名字都要一樣包含大小寫 */}
                    <FormInput 
                    type='text'
                    name='displayName'
                    value={displayName}
                    label='displayName'
                    onChange = {this.handleChange}
                    required
                    />
                    <FormInput 
                    type='email'
                    name='email'
                    value={email}
                    label='email'
                    onChange = {this.handleChange}
                    required
                    />
                    <FormInput 
                    type='password'
                    name='password'
                    value={password}
                    label='password'
                    onChange = {this.handleChange}
                    required
                    />
                    <FormInput 
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    label='confirmPassword'
                    onChange = {this.handleChange}
                    required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;

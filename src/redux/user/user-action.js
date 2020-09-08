import UserActionTypes from './user-type'


export const googleSigninStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSigninStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});


export const signinSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signinFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const signoutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signoutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signoutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStart = userCredentials => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});

export const signUpSuccess = ({user, additionalData}) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
});

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});

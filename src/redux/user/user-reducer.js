import UserActionTypes from './user-type';
// ***引進UserActionTypes不需要加{}

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

// 注意這個function格式的標點符號，有的是冒號，有的是分號
const userReducer = (state = INITIAL_STATE, action)=> {
    switch(action.type){
        case UserActionTypes.SIGN_IN_SUCCESS:
        // 這兩個case可以這樣並列，代表的是有任何其中一個action is fired, 都可以執行下面的東西
            return{
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return{
                ...state,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return{
                ...state,
                error: action.payload
            }
        default: 
            return state;
    }
};

export default userReducer;
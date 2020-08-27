import UserActionTypes from './user-type';
// ***引進UserActionTypes不需要加{}

const INITIAL_STATE = {
    currentUser: null
};

// 注意這個function格式的標點符號，有的是冒號，有的是分號
const userReducer = (state = INITIAL_STATE, action)=> {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
        return{
            ...state,
            currentUser: action.payload
        }
        default: 
            return state;
    }
};

export default userReducer;
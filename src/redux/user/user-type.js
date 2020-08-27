// 這個file的目的是為了避免在user-userReducer.js file裡面發生書寫錯誤，比直接打string'SET_CURRENT_USER'更保險
const UserActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
};

export default UserActionTypes;
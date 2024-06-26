import {
    RESET_REGISTER_SUCCESS,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from '../action/type'

const initialState = {
    user:null,
    isAuthenticated:false,
    loading:false,
    register_success:false,
};

const authReducer = (state=initialState, action)=>{
    const {type, payload } = action;

    switch(type){
        case RESET_REGISTER_SUCCESS:
            return{
                ...state,
                register_success:false
            }

        case LOGIN_SUCCESS :
            return{
                ...state,
                isAuthenticated:true
            }
        case LOGIN_FAIL:
            return{
                ...state,
                isAuthenticated:false
        }
        case SET_AUTH_LOADING:
            return{
                ...state,
                loading:true
            }
        case REMOVE_AUTH_LOADING:
            return{
                ...state,
                loading:false
            }

        default:
            return state;
    };
};
export default authReducer;
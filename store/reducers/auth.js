
import {SIGNIN,SIGNUP,LOGOUT,AUTHENTICATE} from '../actions/auth';

const intialState = {
    token:null,
    userId:null
}

export default (state  = intialState,action) =>{
    switch(action.type){
        case AUTHENTICATE:
            return{
                token: action.token,
                userId: action.userId
            };
        case LOGOUT:
            return intialState;
        // case SIGNUP:
        //     return{
        //         token:action.token,
        //         userId:action.userId
        //     }
        default:
            return state;
        
    }
}
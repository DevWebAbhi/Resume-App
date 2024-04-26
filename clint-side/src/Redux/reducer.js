import { ADD_NAME, ADD_PASSWORD, ADD_RESUME, SET_DATA } from "./actionType";

const initialState = {
    name :null,resume:null,password:12345,data:[],pages:1,currentPage:1,
}

export const reducer = (state=initialState, {type,payload})=>{
    switch(type){
        case ADD_NAME :
            return {...state,name:payload}
        case ADD_RESUME : 
            return {...state,resume:payload}
        case ADD_PASSWORD :
            return {...state,password:12345}  
        case SET_DATA :
            return {...state,data:payload} 
        case SET_PAGES :
                return {...state,pages:payload};
        case SET_CURRENT_PAGE :
                return{...state,currentPage:payload};         
        default :
            return state;
    }
}
import { ADD_NAME, ADD_PASSWORD, ADD_RESUME, SET_DATA } from "./actionType";

const initialState = {
    name :null,resume:null,password:null,data:[]
}

export const reducer = (state=initialState, {type,payload})=>{
    switch(type){
        case ADD_NAME :
            return {...state,name:payload}
        case ADD_RESUME : 
            return {...state,resume:payload}
        case ADD_PASSWORD :
            return {...state,password:payload}  
        case SET_DATA :
            return {...state,data:payload}      
        default :
            return state;
    }
}
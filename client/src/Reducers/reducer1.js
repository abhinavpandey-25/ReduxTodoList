import { text } from "body-parser"

const istate={
    text:"",
    input:[{_id:1,wish:'...loading'}]
  }
const reducer1=(state=istate,action)=>{
    switch(action.type){
        case 'UpdateInput':return {
            ...state,
            text:action.payload
        }
        case 'getWish':return {
            ...state,
            input:action.payload
        }
        case 'UpdateData':return {
            ...state,
            input:[...state.input,action.payload],//kyuki res2 m keval current update value hi response m a rhi h hame
            //wo append krni h purane array m
            text:""
        }//may be returnong data to store
        // in the reducer we are having the axis of the state
        //filter is just like map
        case 'Delete':
            const newinput=state.input.filter(val=>{
                return val._id!==action.payload //filter k andar ham ye btate h ki kya kya pass hona chiye from channi
            })
        return{
            ...state,
            input:newinput
            

        }
        default: return  state
    }
}

export default reducer1;
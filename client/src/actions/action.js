export const handleInputAction=(input)=>{
    //as soon as i am typing the this function is been called which is dispatching an action which is handled by the reducer
    // to change  render the name on the screen by changing the text
    console.log('action')
   return {
            
            type:'UpdateInput',
            payload:input //you can use other name instead of payload
            // after dispatching of the action then reducers are been checked
    }
}
export const handleWish=()=>{return ( dispatch)=>{//handle wish jo h wo return krega ek object 
    fetch('/data').then(res=>res.json()).then(res2=>dispatch({type:'getWish',payload:res2}))
}}
export const handleSubmit=(event)=>{
    return(dispatch)=>{ event.preventDefault();
    var items=new URLSearchParams();
    for(const pair of new FormData(event.target)){
        items.append(pair[0],pair[1])
    }
    fetch('/sent',{
        'method':'post',
           'body':items
    }).then(res=>res.json()).then(res2=>dispatch({type:'UpdateData',payload:res2}))
   }  
}
export const handleDelete=(item_id)=>{
    return (dispatch)=>{
        fetch('/removedata/'+item_id,{
            'method':'delete'
            //yhi par hma filter ka use nahi  kar sakte because here we do not hvae the acees to state jo keval reducer
            //ke pass h
        }).then(res=>res.json()).then(res2=>dispatch({type:'Delete',payload:res2}))
    }
}
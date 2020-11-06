import { json, text } from 'body-parser';
import React from 'react'
import {connect} from 'react-redux'
import {handleInputAction,handleWish,handleSubmit,handleDelete} from '../actions/action'
class Home extends React.Component{

  //hame sirf build folder se matlab h if but agar uske bad hamne kisi component   m chages kare 
  //then dubara build karna padega
  // state={
  //   text:'',
  //   input:[{_id:1,wish:'...loading'}]
  // }
  fetchdata(){
    fetch('/data').then(res=>res.json()).then(result=>{
      console.log(result);
      // this.setState({input:result})
    });
  }
componentDidMount(){
  //console.log("mounted");
    this.props.fetchwish();
}
// handleDelete(e){
//   console.log(e);
  
//   fetch('/removedata/'+e,{
//     'method':'delete'
//   }).then(res=>res.json())
//   .then(result=>{
//     console.log(result);
    // const newinput=this.state.input.filter((item)=>{
    //   return( result._id!==item._id);
   // })
   //this.setState({input:newinput})
    //});  
   //this.fetchdata();
  //2 ways we have to re render dom after deletion 1 is to agian call the gete method or the other could be 
  //since we have id of data which we deleted so use filter
 // }
  // handlesubmit(event){
  //   event.preventDefault();
  //   //console.log(event.target);
  //   //will give the whole form
  //   var item=new URLSearchParams();
  //   //so we use the Url search pattern in the form of key value  ppair
  //   for(const pair of new FormData(event.target)){
  //     // console.log(pair);
  //     //will get eveey pair of name value new form data(from form)
  //     item.append(pair[0],pair[1]);
  //   } 
  //   const listitem={
  //     item:document.getElementsByName("item")
  //   }

  //we will get the cors error if we have frontend and backend at different server hame server  ko batana pdta ki usko kiski
  //request accept karna h uske alwa ki req kre toh ie a violation of CORS policy kyki meri frontend se request to facebook
  //will be rejected unless facebook server allows me

  //can be solved using two way ya m fetch m server ka adres daldu aur uske bad server par cors policy violate krdu but 
  //that is not good at production  leevel.

  //yha keval /sent likha as proxy server ko pate h backend k liye localhost:3030/ m jana
  //   fetch('/sent',{
  //    'method':"POST",
  //     'body':item,
  //  }).then(res=>res.json()).then(res2=>{
  //       this.setState({
  //       input:[...this.state.input,res2]
  //  })
  //here u cannot use the below statement as it wouudl push the item but the dom willl not get rendered.
  //  this.state.input.push(res2);
  //  console.log(this.state.input);
  // });
  // event.target.value="";
  
  // }
    render(props){
      const list=this.props.input.map( val=>{ return (
        <div key={val._id} onClick={(e)=>this.props.delete(val._id)} className="item ">{val.wish}</div>)})      
      return(
      <div>
      <form onSubmit={(e)=>{this.props.submit(e)}}>
        <p id="para" >Click on the Items to delete</p>
        <input type="text" autoComplete="off" id="content"  name="item" value={this.props.text} onChange={(e)=>this.props.change(e.target.value)}></input>
        <button className="waves-effect waves-light btn">Submit</button>
      </form>
      <div className="collection">
   <div className="central">
      {list}
   </div>
      </div>
       </div>
       )
    }
  }
  const MapstatetoProps=(state)=>{

    //ye function mere redux store se data utha k layega ans isko props.text ki tarah m yha use krega
    return {
      //ham yha jo bhi likhte h as a props use krte h
      text:state.text  ,
      input:state.input  
    }
  }
  //dispatch function m type and payload rhta h whichi is in the objeect format
  //dispatch will dispatch an action having its type and payload
  const MapDispatchToProps=(dispatch)=>{
    return{
      change:(input)=>dispatch(handleInputAction(input)),
      fetchwish:()=>dispatch(handleWish()),// from here we are dispatching the action
      submit:(event)=>dispatch(handleSubmit(event)),
      delete:(item_id)=>dispatch(handleDelete(item_id))
    }
  }
  export default connect (MapstatetoProps,MapDispatchToProps)(Home);
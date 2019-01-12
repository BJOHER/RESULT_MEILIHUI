import React,{Component} from 'react'
import Kcss from "./edit.module.scss"
import store from "../../store"
import axios from "axios"
import {connect} from "react-redux"
import {NavLink} from "react-router-dom"
class Edit extends Component{

	constructor(props){
		super(props);

		// this.state = {
		// 	shopCart:[]
		// };
		this.state = {
			isShow:true,
			count:4,
			checked:false,
			checkedAll:false
		};
	}

	componentDidMount(){
		// if(this.props.shopCart.length==0){
		// 	this.props.getShopCartPromise();
		// }
		// console.log(this.props.shopCart);
		// this.props.getShopCartPromise();
		// this.props.getShopCartPromise();
		// console.log(this.props.shopCart)
		console.log(this.props.shopCart.length)
		if (this.props.shopCart.length === 0) {
			this.props.getShopCartPromise()

		};
	}

render(){
    return <section> 
    <div>
  {/*Shoppingcart*/}
  <div className={Kcss.top}>
  	<ul>
  		<li><NavLink to="/shoppingcart">返回</NavLink></li>
  		<li>购物车</li>
  		<li><NavLink to="/index">完成</NavLink></li>
  	</ul>
  </div>
  	  {/*<div className={Kcss.guanggao}>
  	  <ul>
  	  <li onClick={()=>{
  	  	this.setState({
  	  		isShow:!this.state.isShow
  	  	})
  	  }}>
  	  {
  	  	this.state.isShow?
  	  	<li>你有两件商品已降价，快去看看吧</li>
  	  	:null
  	  }
  	  </li>
  	  </ul>
  	  </div>*/}	

      	  
   <ul className={Kcss.guanggao}>
   <span className={Kcss.span} onClick={()=>{
   	this.setState({
   		isShow:!this.state.isShow
   	})
   }}> !</span>
   {
   	this.state.isShow?
   	<li>你有两件商品已降价，快去看看吧 !</li>
   	:null
   }                	  	
   </ul>

          {
  	this.props.shopCart.map(item=>
  		this.state.count!==0?
   	<div  className={Kcss.box} key={item.productId}>
   	<ul><li>{}</li></ul>
   	<div className={Kcss.contain}>
   	<div className={Kcss.left}>
   		<input type="checkbox" name="check" ref="checkbox" checked={this.state.checked}
   		onClick={()=>{
     			this.setState({
     				checked:!this.state.checked
     			})
     		}}
   		/>
   		<img src={item.imageUrl} key={item.productId}/>
   	</div>
   	<div className={Kcss.right}>
   		<h2 className={Kcss.hh}>{item.brandName}</h2>	
   		<p className={Kcss.p}>{item.productName}</p>                		
   		<h3 className={Kcss.hhh}>￥{item.price}</h3>
   		{/*<button onClick={this.handleClick.bind(this)}>+</button>
   		         	handleClick(){
   		         		this.setState({
   		         			count:this.state.count+1
   		         		})
   		         	}*/}

  		  <button onClick={()=>{
          var num=this.state.count;
          num++;
  		  	this.setState({
  		  		count:num
  		  	})
          {/*var sum = 0;
                    for(var i=0;i<this.button.length;i++){
                      sum+=this.button[i].item.price*this.state.count
                    }*/}
  		  }}>+</button>
  		  <div className={Kcss.number}>{this.state.count}</div>
  		  <button onClick={()=>{
  		  	this.setState({
  		  		count:this.state.count-1
  		  	})
  		  }}>-</button>         	
  	</div>
  	</div>
        		</div>
        		:null
         )	
     }
     <div className={Kcss.foot}>
     	<ul>
     		<li><input type="checkbox" ref="checkBox" checked={this.state.checked}
     		// checked="aaa"
     		// value="true"
     		onClick={()=>{
     			this.setState({
     				checked:!this.state.checked
     			})
     		}}
     		/><span onClick={()=>{
     			this.setState({
     				checked:!this.state.checked
     			})
     		}}>全选</span></li>
     		{

     		}
     		{/*<li>总价:￥</li>*/}
     		<li><button onClick={()=>{
     			this.setState({
     				count : 0
     			})
     		}}>删除</button></li>
     	</ul>
     </div>
 </div>
       </section> 
    }
}
export default connect(
	(state)=>{
		return{
			shopCart:state.shopcartReducer
		}
	},
	{
	getShopCartPromise(){
		return axios({
			url:"http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=2040204090000006136&key=&sort=&timestamp=1547197364168&summary=4ec3b5393cd107b7d794691a6a9adeea&platform_code=H5",
			method:'get'
		}).then(res=>{
			console.log("send ajax",res.data.products)
			// console.log(res.data.shoppinglist)
			return{
				type:"addList",
				payload:res.data.products
			}
		})
	}
}
)(Edit)

// import React,{Component} from 'react';
// class Edit extends Component{
// 	render(){
// 		return (
// 			<div>edit</div>
// 		)
// 	}
// }
// export default Edit;
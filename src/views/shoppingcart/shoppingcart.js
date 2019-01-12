import React,{Component} from 'react'
import Kcss from "./shoppingcart.module.scss"
import store from "../../store"
import axios from "axios"
import {connect} from "react-redux"
import {NavLink} from "react-router-dom"
class Shoppingcart extends Component{

	constructor(props){
		super(props);

		{/*this.state = {
					shopCart:[]
				};*/}
		this.state = {
			isShow:false,
			// count:4,
			checked:false,
			checkedAll:false
		};
	}

	componentDidMount(){
		if(this.props.shopCart.length==0){
			this.props.getShopCartPromise();
		}
		{/*console.log(this.props.shopCart);
		this.props.getShopCartPromise();
		this.props.getShopCartPromise();
				console.log(this.props.shopCart)
		console.log(this.props.shopCart.length)
		if (this.props.shopCart.length === 0) {
			this.props.getShopCartPromise()

		};*/}
	}

    render(){
        return <section> 

        <div>
       {/*Shoppingcart*/}
       <div className={Kcss.top}>
       	<ul>
       		<li><NavLink to="/index">返回</NavLink></li>
       		<li>购物车</li>
       		{/*<li><a href="/shoppingcart/edit">编辑</a></li>*/}
       		<li><NavLink to="/shoppingcart/edit">编辑</NavLink></li>
       	</ul>
       </div>	
       {
      	this.props.shopCart.map(item=>
       	<div  className={Kcss.box} key={item.productId}>
       	<ul><li>{}</li></ul>
       	<div className={Kcss.contain}>
       	<div className={Kcss.left}>
       		<input type="checkbox" checked={this.state.checked}
       		onClick={()=>{
     			this.setState({
     				checked:!this.state.checked
     			})
     		}}
       		/>
       		<img src={item.imageUrl}/>
       	</div>
       	<div className={Kcss.right}>
       		<h2 className={Kcss.title}>{item.brandName}</h2>	
       		<p className={Kcss.jieshao}>{item.productName}</p>                		
       		<h3 className={Kcss.jiage}>￥{item.price}</h3>
       	</div>
       	</div>
      		</div>
       )	
   }
   <div className={Kcss.foot}>
   	<ul>
   		<li><input type="checkbox" checked={this.state.checked}
   		  onClick={()=>{
     			this.setState({
     				checked:!this.state.checked
     			})
     		}}
   		/><span
   		onClick={()=>{
     			this.setState({
     				checked:!this.state.checked
     			})
     		}}
   		>全选</span></li>
   		<li>总价:￥</li>
   		<li><NavLink to="/login"><button name="去结算"><span className={Kcss.span}>去结算</span></button></NavLink></li>
   	</ul>
   </div>
        </div>
					{this.props.children}
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
)(Shoppingcart)
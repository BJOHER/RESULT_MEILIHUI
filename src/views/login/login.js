import React, { Component } from 'react'
import Kcss from "./login.module.scss"
import store from "../../store"
import axios from "axios"
class Login extends Component{

	constructor(props){
		super(props);

		this.state = {
			click:false,
		}
	}
    render(){
        return <div className={Kcss.all}>
  		<a className={Kcss.a} href="/index"><span className={Kcss.span}>✕</span></a>
		<h3 className={Kcss.h3}>登录/注册</h3>
		<p className={Kcss.p}>注册即送2000元新人红包</p>
		{/*<form method="post" action="/#/index"/>*/}
		
		<input type="password" placeholder="密码" className={Kcss.mima} name="password"
			onClick={()=>{
			this.setState({
				click:!this.state.click
			})
		}}/><br/>
		<button type="submit" className={Kcss.yanse}>点击登录</button>
		<a className={Kcss.a}><p className={Kcss.qiehuan} onClick={()=>{
			this.setState({
			click:!this.state.click
			})
		}}>切换密码登录 ▶</p></a>
		{
			this.state.click?
			<input type="email" placeholder="邮箱" name="email" className={Kcss.email}/>
			:null
		}
		<ul className={Kcss.ul}>
			<li className={Kcss.li}>淘宝</li>
			<li className={Kcss.lii}>支付宝</li>
			<li className={Kcss.liii}>微博</li>
		</ul>	
		</div>
    }
}
export default Login;
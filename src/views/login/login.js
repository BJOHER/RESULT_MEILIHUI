import React, { Component } from 'react'
import axios from 'axios'
class Login extends Component{
    render(){
        return(<div>
                邮箱：<input typy="text" ref="email" />
                密码：<input typy="text" ref="password" />
                <button onClick={this.handlelogin.bind(this)}>登录</button>
            </div>
        )
    }
    handlelogin(){
    	axios({
    		method:'post',
    		url:'/login',
    		data:{
    			email:this.refs.email.value,
    			password:this.refs.password.value
    		}
    	}).then(res=>{
    		console.log(res)
    		if(res.data.ok===0){   			
    			this.props.history.push('/register')
    		}else{
    			this.props.history.push('/index')
    			document.cookie({email:this.refs.email.value,
    			password:this.refs.password.value})
    		}
    	})
    }
}
export default Login;
import React, { Component } from 'react'
import axios from 'axios'
class Login extends Component{
    constructor(props) {
      super(props);
    
      this.state = {
        valiable:false,
      };
    }

    render(){
        return(<div>
                邮箱：<input typy="text" ref="email" onBlur={this.handleblur.bind(this)}/><span>{this.state.valiable?'邮箱可用':'邮箱不可用'}</span>
                姓名：<input typy="text" ref="username" />
                密码：<input typy="text" ref="password" />
                <button onClick={this.handleregister.bind(this)}>注册</button>
            </div>
        )
    }
    handleblur(){
    	axios({
            method:'get',
            url:'/register',
            data:{
                email:this.refs.email.value,
            }
        }).then(res=>{
            console.log(res)
            if(res.data.ok===1){                
                this.setState({
                    valiable:true
                })
            }else{
                this.setState({
                    valiable:false
                })
            }
        })
        
    }
    handleregister(){
        axios({
            method:'post',
            url:'/register',
            data:{
                email:this.refs.email.value,
                username:this.refs.username.value,
                password:this.refs.password.value
            }
        }).then(res=>{
            console.log(res)
            if(res.data.ok===1){               
                this.props.history.push('/login')
            }else{
                this.props.history.push('/register')
            }
        })
    }
}
export default Login;
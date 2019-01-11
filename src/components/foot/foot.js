import React, { Component } from 'react'
import footcss from './foot.module.scss';
class Foot extends Component{
    render(){
        return(
            <div className={footcss.footer}>
                <a href="/index" className={footcss.tel400}>400 - 664 - 6698</a>
                <nav>
                    <a href="/index">首页</a>
                    <a href="/index">客户端</a>
                    <a href="/login">登陆</a>
                    <a href="/login">注册</a>
                </nav>
                <p className={footcss.icp}>浙ICP备16004860号-1</p>
            </div>
        )
    }
}
export default Foot;
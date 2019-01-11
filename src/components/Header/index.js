import React,{Component} from 'react'
import {getColorSize} from '../../views/productdetail/model'
import zjlscss from './index.module.scss'
import {NavLink} from 'react-router-dom'

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            brand : null,
            price : null,
            show : false
        }
    }


    handleClick(){
        this.setState({
            show : !this.state.show
        })
    }

    componentDidMount(){
        getColorSize().then(res=>
            // console.log(this.state.brand)
            // 
          {  console.log(res)
              this.setState({
                brand : res.colorGroup[0].brand,
                price : res.colorGroup[0].price
            })
            console.log(this.state.brand)
            console.log(this.state.price)}
            )
    }

    render(){
        return <div className={zjlscss.header}>
            {/* Header */}
            
                <div className={zjlscss.left}>
                    <span><NavLink to='/productlist'  className={zjlscss.textnone}>返回</NavLink></span>
                </div>
                <div className={zjlscss.middle}>
                    <span>{this.state.brand}</span>
                    <span>￥{this.state.price}</span>                 
                </div>
                <div className={zjlscss.right} onClick={this.handleClick.bind(this)}>
                    <span >更多</span>
                    <div className={this.state.show?zjlscss.appear:zjlscss.disappear}>
                    <ul>
                        <li><NavLink to='/index' className={zjlscss.textnone}>首页</NavLink></li>
                        <li><NavLink to='/shoppingcart' className={zjlscss.textnone}>购物袋</NavLink></li>
                        <li><NavLink to='/login' className={zjlscss.textnone}>个人中心</NavLink></li>
                    </ul>
                </div>
                </div>

               
           
        </div>
    }
}

export default Header
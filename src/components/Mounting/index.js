import React, { Component } from 'react'
import Mountscss from './index.module.scss'
import Headerscss from '../Header/index.module.scss'

class Mounting extends Component{
    constructor(props){
        super(props)

        this.state ={
            show: false,
            change1:false,
            change2 : false,
            change3 : false,
            change4 : false
        }
    }

    componentDidMount(){
        window.onscroll = this.handleScroll.bind(this)

    }

    componentWillUnmount(){
        window.onscroll = null
    }

    handleScroll(){
        // console.log(document.documentElement.scrollTop)

        var o1 = document.querySelector('.proname')
        var o2 = document.querySelector('.prodetail')
        var o3 = document.querySelector('.probrand')
        var o4 = document.querySelector('.procomment')
        var o5 = document.querySelector("."+Headerscss.header)
  
        if(document.documentElement.scrollTop > o1.offsetTop-o5.offsetHeight){
            this.setState({
                show: true,
                change1: true,
                change2 : false
            })
        }else{
            this.setState({
                show : false
            })
        }
        if(document.documentElement.scrollTop > o2.offsetTop-o5.offsetHeight){
            this.setState({
                change1: false,
                change2 : true,
                change3 : false
            })
        }
        if(document.documentElement.scrollTop > o3.offsetTop-o5.offsetHeight){
            this.setState({
                change1 : false,
                change2 : false,
                change3 : true,
                
            })
        }
        if(document.documentElement.scrollTop > o4.offsetTop-o5.offsetHeight){
            this.setState({
                change3 : false,
                change4 : true
            })
        }else{
            this.setState({
                change4 : false
            })
        }
    }   


    render(){


        return <div>
            <div className={this.state.show? Mountscss.mounting :Mountscss.disappear}  >
              <a className={this.state.change1?Mountscss.changeColor : null}  >参数</a> 
              <a className={this.state.change2?Mountscss.changeColor : null} >详情</a> 
              <a className={this.state.change3?Mountscss.changeColor : null} >品牌</a> 
              <a className={this.state.change4?Mountscss.changeColor : null}>评论</a>
              {/* <a></a> */}
            </div>
        </div>
    }
}

export default Mounting
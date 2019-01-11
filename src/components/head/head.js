import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import headcss from './head.module.scss';
import {gethead,getnav,brand} from '../../model/model';
import Search from '../search/search'
// import store from '../../store';
// import {connect} from 'react-redux';

class Head extends Component{
    constructor(props) {
        super(props)
        this.state={
            words:null,
            navlist:[],
            show:false,
            create:false,

        }
        
        
    }
    
    componentDidMount(){
        gethead().then(res=>{
            console.log(res)
            this.setState({
                words:res.words,
            })
        })

        getnav().then(res=>{
            console.log(res);
            this.setState({
                navlist:res
            })
        })

        window.onscroll = this.handleScroll.bind(this)

        brand().then(res=>{
            console.log(res)
        })
        
    }

    componentWillUnmount(){
        window.onscroll = null;
    }

    handleScroll(){
        // console.log(document.documentElement.scrollTop);
        if(document.documentElement.scrollTop > 0){
            this.setState({
                show:true,
            })
            // console.log(this.state.show);
        }else{
            this.setState({
                show:false,
            })
            // console.log(this.state.show);
        }
    }
    /* handleScroll(){
        console.log(document.documentElement.scrollTop);
        if(document.documentElement.scrollTop > 0){
            store.dispatch({
                type:'white',
                payload:true
            })
        }else{
            store.dispatch({
                type:'normol',
                payload:false
            })
        }
    } */

    render(){
        return(
            <div className={this.state.show?headcss.headHome + ' ' + headcss.white:headcss.headHome}>
                <div className={headcss.homeTop}>
                    <ul>
                        <li className={headcss.login}>
                            <span className={headcss.loginBtn}><NavLink to="/login" >登陆</NavLink></span>
                        </li>
                        <li className={headcss.search} onClick={this.handleClick3.bind(this)}>
                            <a href="javascript:;">
                                <strong>{this.state.words}</strong>
                            </a>
                        </li>
                        <li className={headcss.ShoppingCart}>
                            <span><NavLink to="/shoppingcart">购物</NavLink></span>
                        </li>
                    </ul>
                    {
                        this.state.create?
                        <Search name={this.state.words} event={this.handleEvent.bind(this)}/>
                        :null
                    }
                    

                </div>
                <div className={headcss.menu}>
                    <div className={headcss.box}>
                        <ul>
                            <li>
                                <span><NavLink to="/index">推荐</NavLink></span>
                            </li>
                            {
                                this.state.navlist.map((item)=>{
                                    return(
                                        <li key={item.categoryId}>
                                            <span onClick={this.handleClick2.bind(this,item.categoryId,item.englishname)}><NavLink to={`/silo/${item.englishname}`}>{item.name}</NavLink></span>
                                        </li>
                                    )
                                })
                            }
                            <li onClick={this.handleClick.bind(this)}>
                                <span><NavLink to="/upcoming"  >上新</NavLink></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    handleClick(){
        console.log('aaa')
        this.setState({
            show:true
        })
    }

    handleClick2(categoryId,englishname){
        window.localStorage.setItem('categoryId',categoryId);
        window.localStorage.setItem('englishname',englishname);
        document.documentElement.scrollTop = 0;
    }

    handleClick3(){
        this.setState({
            create:true
        })
    }

    handleEvent(){
        this.setState({
            create:false
        })
    }
}
export default Head;
// export default connect(
//     (state)=>{
//         return{
//             show:state.headReducer
//         }
//     },

//     {
//         handleScroll(){
//             console.log(document.documentElement.scrollTop)
//             if(document.documentElement.scrollTop > 0){
//                 return {
//                     type:'white',
//                     payload:true
//                 }
//             }
//         }
//     }
// )(Head);
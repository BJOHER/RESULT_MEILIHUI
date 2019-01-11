import React, { Component } from 'react'
import searchcss from './search.module.scss'
import {search} from '../../model/model'

class Search extends Component{
    
    constructor(props) {
        super(props)
        this.state={
            list:[],
            show:false,
            wu:false,
        }  
    }

    componentDidMount(){
        search().then(res=>{
            console.log(res);
            this.setState({
                list:res
            })
        })
    }
    render(){
        return (
            <div className={searchcss.searchBar}>
                <div className={searchcss.searchKeyword}>
                    <div className={searchcss.BJH}>
                        <div className={searchcss.searchKeywordBox}>
                            <span></span>
                            <form className={searchcss.inputSearchForm}>
                                <input className={searchcss.keyword} placeholder={this.props.name} ref="content" onFocus={this.handleFocus.bind(this)}/>
                            </form>
                            {
                                this.state.show?
                                <span className={searchcss.remove} onClick={this.handleClick.bind(this)}></span>
                                :null
                            }
                        </div>
                        <div className={searchcss.cancel}>
                            <span onClick={this.handleClick2.bind(this)}>取消</span>
                        </div>
                    </div>
                </div>
                <div className={searchcss.searchRelation}>
                    <div className={searchcss.searchRelationBox}>
                        <div className={searchcss.default}>
                            <div className={searchcss.find}>
                                <h3>搜索发现</h3>
                                <div className={searchcss.findList}>
                                    {
                                        this.state.list.map((item,index)=>{
                                            return(
                                                <span key={index}>{item.findKeyWord}</span>
                                            )
                                            
                                        })
                                    }
                                </div>
                            </div>
                            <div className={searchcss.history}>
                                <h3>历史搜索</h3>
                                <span className={searchcss.wai}>
                                    <span>删除</span>
                                </span>
                                <div className={searchcss.historyList}>
                                    <ul>
                                        <li className={searchcss.swipeout}></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleFocus(){
        console.log('aaa');
        this.refs.content.value = this.props.name;
        if(this.refs.content.value === ''){
            this.setState({
                show:false
            })
        }else{
            this.setState({
                show:true
            })
        }
        if(this.state.wu === true){
            this.refs.content.value = ''
        }
    }
    handleClick(){
        this.refs.content.value = ""
        this.setState({
            show:false,
            wu:true,
        })
    }

    handleClick2(){
        this.props.event();
    }
    
}
export default Search;
import React, { Component } from 'react';
import cmslistcss from './cmsList.module.scss';
import {cmsDetail} from '../../model/model';
// import {connect} from 'react-redux';
class Cmslist extends Component{
    constructor(props) {
        super(props)
        this.state={
            data:[],
        }
    }
    
    componentDidMount(){
        cmsDetail(
            'get',
            `http://www.mei.com/appapi/cms/cmsDetail/v3?silo=${window.localStorage.getItem('categoryId')}&ids=${window.localStorage.getItem('id')}&timestamp=1547039341863&summary=e2266688d2e1c62211ea7e3215e96a48&platform_code=H5`
        ).then(res=>{
            console.log(res)
            if(res){
                this.setState({
                    data:res[0].data
                })
            }
        })

        // console.log(this.props.data);
        // if(this.props.data.length === 0){
        //     this.props.cms(
        //         `http://www.mei.com/appapi/cms/cmsDetail/v3?silo=${window.localStorage.getItem('categoryId')}&ids=${window.localStorage.getItem('id')}&timestamp=1547039341863&summary=e2266688d2e1c62211ea7e3215e96a48&platform_code=H5`
        //     )
        // }
    }

    componentWillReceiveProps(){
        cmsDetail(
            'get',
            `http://www.mei.com/appapi/cms/cmsDetail/v3?silo=${window.localStorage.getItem('categoryId')}&ids=${window.localStorage.getItem('id')}&timestamp=1547039341863&summary=e2266688d2e1c62211ea7e3215e96a48&platform_code=H5`
        ).then(res=>{
            console.log(res)
            if(res){
                this.setState({
                    data:res[0].data
                })
            }
            
        })
    }
    render(){
        return(
            <div className={cmslistcss.cmsList}>
                <div>
                    <div>
                        <div className={cmslistcss.categoryList}>
                            <div className={cmslistcss.subMenu}>
                                <ul>
                                    {
                                        this.state.data.map((item)=>{
                                            return(
                                                <li key={item.categoryTwoId}>
                                                    <div>
                                                        <img src={item.categoryImgStr} alt=""/>
                                                    </div>
                                                </li>
                                            )
                                            
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// export default connect(
//     (state)=>{
//         return {
//             data:state.cmslistReducer
//         }
//     },

//     {
//         cms(url){
//             return (
//                 cmsDetail(
//                     'get',
//                     url
//                 ).then(res=>{
//                     console.log(res);
//                     return (
//                         {
//                             type:'addlist',
//                             payload:res[0].data
//                         }
//                     )
//                 })
//             )
//         }
//     }
// )(Cmslist);
export default Cmslist;
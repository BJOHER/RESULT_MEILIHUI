import React, { Component } from 'react';
import Head from '../../components/head/head';
import Foot from '../../components/foot/foot';
import upcomingcss from './upcoming.module.scss';
import {getUp} from '../../model/model';
class Upcoming extends Component{
    constructor(props) {
        super(props)
        this.state={
            list:[],
        }
    }
    
    componentDidMount(){
        getUp().then(res=>{
            console.log(res);
            this.setState({
                list:res
            })
        })
    }
    render(){
        return(
            <div>
                <Head/>
                <div className={upcomingcss.upcoming}>
                    <div className={upcomingcss.info}>
                        <h2>
                            距离开场还剩
                            <span className={upcomingcss.time}>10</span>
                            <span>小时</span>
                        </h2>
                        <div className={upcomingcss.tips}>
                            订阅您喜欢的品牌，我们将在活动当天提醒您！
                        </div>
                    </div>
                    {
                        this.state.list.map((item)=>{
                            return (
                                <div className={upcomingcss.container} key={item.eventId} onClick={this.handleClick.bind(this,item.siloEn,item.eventId,item.urlkey)}>
                                    <div className={upcomingcss.eventItem}>
                                        <div className={upcomingcss.upcomingBtn}>
                                            <span className={upcomingcss.hitarea}></span>
                                            <span className={upcomingcss.remindTxt}>开售提醒</span>
                                        </div>
                                        <div className={upcomingcss.BJH}>
                                            <img src={item.imageTmallUrl} alt=""/>
                                            <div className={upcomingcss.eventInfo}>
                                                <div className={upcomingcss.eventIcon}>
                                                    <span></span>
                                                </div>
                                                <div className={upcomingcss.eventBase}>
                                                    <span className={upcomingcss.eventBrand}>{item.englishName}</span>
                                                    <span className={upcomingcss.eventName}>{item.chineseName}</span>
                                                    <span className={upcomingcss.eventDiscount}>{item.discount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <Foot/>
            </div>

        )
    }

    handleClick(siloEn,eventCode,URLKey){
        this.props.history.push(`productlist/siloEn=${siloEn}&eventCode=${eventCode}&URLKey=${URLKey}`)
    }
}
export default Upcoming;
import React, { Component } from 'react';
import Head from '../../components/head/head';
import homecss from './index.module.scss';
import {homebanner,getAd,getNewHot} from '../../model/model';
import Foot from '../../components/foot/foot';
class Index extends Component{
    constructor(props) {
        super(props)
        this.state={
            mainImg:null,
            mainTitle:null,
            subTitle:null,
            img:null,
            NewList:[],
            HotList:[],
        }
    }
    
    componentDidMount(){
        homebanner().then(res=>{
            // console.log(res);
            this.setState({
                mainImg:res[0].main_image,
                mainTitle:res[0].main_title,
                subTitle:res[0].sub_title,
            })
        })

        getAd().then(res=>{
            console.log(res);
            this.setState({
                img:res.img
            })
        })

        getNewHot().then(res=>{
            console.log(res);
            this.setState({
                NewList:res[0].events,
                HotList:res[1].events,
            })
        })
    }

    

    render(){
        return(
            <div>
                <Head/>

                <div className={homecss.big}>
                    <div className={homecss.bannerItem}>
                        <img src={this.state.mainImg} alt=""/> 
                        <div className={homecss.bannerSlogan}>
                            <div className={homecss.bannerLabel}></div>
                            <strong>{this.state.mainTitle}</strong>
                            <span>{this.state.subTitle}</span>
                            <p></p>
                        </div>
                    </div> 
                </div>

                <div className={homecss.newArea}>
                    <div className={homecss.area}>
                        <img src={this.state.img} alt=""/>
                    </div>
                </div>

                <div className={homecss.newEvent}>
                    <div className={homecss.title}>
                        <img src="/images/new.png" alt=""/>
                    </div>
                    <div className={homecss.container}>
                        {
                            this.state.NewList.map((item)=>{
                                return(
                                    <div className={homecss.item} key={item.eventId} onClick={this.handleClick.bind(this,item.siloEn,item.eventId,item.urlkey)}>
                                        <div className={homecss.EventItem}>
                                            <div className={homecss.BJH}>
                                                <img src={item.imageUrl} alt="" />
                                                <div className={homecss.eventInfo}>
                                                    <div className={homecss.eventIcon}></div>
                                                    <div className={homecss.eventBase}>
                                                        <span className={homecss.eventBrand}>{item.englishName}</span>
                                                        <span className={homecss.eventName}>{item.chineseName}</span>
                                                        <span className={homecss.eventDiscount}>{item.discountText}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={homecss.hotBrand}>
                    <div className={homecss.title}>
                        <img src="/images/hot.png" alt=""/>
                    </div>
                    <div className={homecss.container}>
                        {
                            this.state.HotList.map((item)=>{
                                return(
                                    <div className={homecss.item} key={item.eventId} onClick={this.handleClick.bind(this,item.siloEn,item.eventId,item.urlkey)}>
                                        <div className={homecss.eventItem}>
                                             <div className={homecss.BJH}>
                                                <img src={item.imageUrl} alt=""/>
                                                <div className={homecss.eventInfo}>
                                                    <div className={homecss.eventIcon}></div>
                                                    <div className={homecss.eventBase}>
                                                        <span className={homecss.eventBrand}>{item.englishName}</span>
                                                        <span className={homecss.eventName}>{item.chineseName}</span>
                                                        <span className={homecss.eventDiscount}>{item.discountText}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={homecss.moreEvent}>
                    <div className={homecss.title}>
                        <img src="/images/more.png" alt=""/>
                    </div>
                    <div className={homecss.container}>
                        <div className={homecss.left}>
                            <img src="/images/active.png" alt=""/>
                        </div>
                        <div className={homecss.right}>
                            <img src="/images/coming.png" alt=""/>
                        </div>
                    </div>
                </div>

                <Foot/>
            </div>
            
        )
    }
    
    handleClick(siloEn,eventCode,URLKey){
        this.props.history.push(`/productlist?siloEn=${siloEn}&eventCode=${eventCode}&URLKey=${URLKey}`)
    }
}
export default Index;
import React, { Component } from 'react';
import Head from '../../components/head/head';
import silocss from './silo.module.scss';
import {getSiloBanner,cmsDetailId,product} from '../../model/model';
import Cmslist from '../../components/cmslist/cmsList';
import { PullToRefresh } from 'antd-mobile';
// import ReactDOM from 'react-dom';

// import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';

class Silo extends Component{
    constructor(props) {
        super(props)
        this.state={
            banners:[],
            mainImg:null,
            subTitle:null,
            description:null,
            id:null,
            eventlist:[],
            refreshing:false,
            down:true,
            current:1,
            totalPages:null,
            create:true,
            mainImg2:null,
            do:false,
        }
    }

    componentDidMount(){


        getSiloBanner(
            'get',
            `http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=${window.localStorage.getItem('categoryId')}&platform_code=PLATEFORM_H5`
        ).then(res=>{
            console.log(res);
            if(window.localStorage.getItem('categoryId') === '2013000100000000011'){
                res.banners.push({main_image:'/images/banner.jpg'})
            }
            if(res.banners.length > 1){
                this.setState({
                    banners:res,
                    mainImg:res.banners[0].main_image,
                    mainTitle:res.banners[0].main_title,
                    subTitle:res.banners[0].sub_title,
                    description:res.banners[0].description,
                    do:true,
                    mainImg2:res.banners[1].main_image,
                })
            }else{
                this.setState({
                    banners:res,
                    mainImg:res.banners[0].main_image,
                    mainTitle:res.banners[0].main_title,
                    subTitle:res.banners[0].sub_title,
                    description:res.banners[0].description,
                    do:false,
                })
            }
            console.log(this.state.create)
        })


        cmsDetailId(
            'get',
            `http://www.mei.com/appapi/cms/cmsList/v3?silo=${window.localStorage.getItem('categoryId')}&timestamp=1547039341660&summary=d080ef890dcd363881cfa28a0fbcd6e6&platform_code=H5`
        ).then(res=>{
            console.log(res);
            if(window.localStorage.getItem('categoryId') !== '2013000100000000011' ){
                window.localStorage.setItem('id',res.resultList[0].id)
            }
            
            if(window.localStorage.getItem('categoryId') === '2013000100000000011'){
                this.setState({
                    create:false
                })
            }else{
                this.setState({
                    create:true
                })
            }
        })

        product(
            'get',
            `http://www.mei.com/appapi/silo/eventForH5?categoryId=${window.localStorage.getItem('englishname')}&pageIndex=1&timestamp=1547086977820&summary=c854ba9743390df2fbf2a0beaaea20dd&platform_code=H5`
        ).then(res=>{
            console.log(res);
            this.setState({
                eventlist:res.eventList,
                totalPages:res.totalPages,
            })
        })

    }

    componentWillReceiveProps(){
        console.log(window.localStorage.getItem('categoryId'))
        window.localStorage.getItem('categoryId')
        getSiloBanner(
            'get',
            `http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=${window.localStorage.getItem('categoryId')}&platform_code=PLATEFORM_H5`
        ).then(res=>{
            console.log(res);
            if(window.localStorage.getItem('categoryId') === '2013000100000000011'){
                res.banners.push({main_image:'/images/banner.jpg'})
            }
            if(res.banners.length > 1){
                this.setState({
                    banners:res,
                    mainImg:res.banners[0].main_image,
                    mainTitle:res.banners[0].main_title,
                    subTitle:res.banners[0].sub_title,
                    description:res.banners[0].description,
                    do:true,
                    mainImg2:res.banners[1].main_image,
                })
            }else{
                this.setState({
                    banners:res,
                    mainImg:res.banners[0].main_image,
                    mainTitle:res.banners[0].main_title,
                    subTitle:res.banners[0].sub_title,
                    description:res.banners[0].description,
                    do:false,
                })
            }
            // console.log(this.state.create)
        })
        

        cmsDetailId(
            'get',
            `http://www.mei.com/appapi/cms/cmsList/v3?silo=${window.localStorage.getItem('categoryId')}&timestamp=1547039341660&summary=d080ef890dcd363881cfa28a0fbcd6e6&platform_code=H5`
        ).then(res=>{
            console.log(res);
            if(window.localStorage.getItem('categoryId') !== '2013000100000000011'){
                window.localStorage.setItem('id',res.resultList[0].id)
            }
            if(window.localStorage.getItem('categoryId') === '2013000100000000011'){
                this.setState({
                    create:false
                })
            }else{
                this.setState({
                    create:true
                })
            }
        })

        product(
            'get',
            `http://www.mei.com/appapi/silo/eventForH5?categoryId=${window.localStorage.getItem('englishname')}&pageIndex=1&timestamp=1547086977820&summary=c854ba9743390df2fbf2a0beaaea20dd&platform_code=H5`
        ).then(res=>{
            console.log(res);
            this.setState({
                eventlist:res.eventList,
                totalPages:res.totalPages,
            })
        })
        
    }
    
    render(){
        return(
            <div>
                <Head/>

                <div className={silocss.big}  >
                    <div className={silocss.bannerItem} >
                        {
                            this.state.do?
                            <ReactSwipe className="carousel" swipeOptions={{continuous:true,auto:3000}}>
                                <img src={this.state.mainImg} alt=""/>
                                <img src={this.state.mainImg2} alt=""/>
                            </ReactSwipe>
                            :<img src={this.state.mainImg} alt=""/>
                        }
                        
                        <div className={silocss.bannerSlogan}>
                            <div className={silocss.bannerLabel}></div>
                            <strong>{this.state.mainTitle}</strong>
                            <span>{this.state.subTitle}</span>
                            <p>{this.state.description}</p>
                        </div>
                    </div> 
                </div>



                {/* <ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: true ,auto:1000}}
      >
        
      </ReactSwipe> */}


                {
                    this.state.create?
                    <Cmslist/>
                    :null
                }
                


                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr =el}
                    style={{
                        
                        overflow:'auto',
                    }}
                direction={'up'}
                refreshing={this.state.refreshing}
                onRefresh={()=>{
                    var num = this.state.current;
                    num++
                    this.setState({refreshing:true,current:num});
                        // this.setState({refreshing:false})
                        if(this.state.current <= this.state.totalPages){
                            product(
                                'get',
                                `http://www.mei.com/appapi/silo/eventForH5?categoryId=${window.localStorage.getItem('englishname')}&pageIndex=${this.state.current}&timestamp=1547086977820&summary=c854ba9743390df2fbf2a0beaaea20dd&platform_code=H5`
                            ).then(res=>{
                                console.log(res);
                                this.setState({
                                    eventlist:[...this.state.eventlist,...res.eventList],
                                    refreshing:false
                                })
                            })
                        }
                        
                }}
                >
                    {
                        <div className={silocss.eventContainer}>
                        {
                            this.state.eventlist.map((item)=>{
                                return (
                                 <div className={silocss.item} key={item.eventCode} onClick={this.handleClick.bind(this,item.siloEn,item.eventId,item.urlkey)}>
                                     <div className={silocss.eventItem}>
                                         <div className={silocss.BJH}>
                                             <img src={item.imageUrl} alt=""/>
                                             <div className={silocss.eventInfo}>
                                                 <div className={silocss.eventIcon}></div>
                                                 <div className={silocss.eventBase}>
                                                     <span className={silocss.eventBrand}>{item.englishName}</span>
                                                     <span className={silocss.eventName}>{item.chineseName}</span>
                                                     <span className={silocss.eventdiscount}>{item.discountText}</span>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                )
                            })
                        }
                     </div>
                    }
                </PullToRefresh>

                
                   
            </div>
        )
    }
    handleClick(siloEn,eventId,urlkey){
        this.props.history.push(`/productlist/siloEn=${siloEn}&eventCode=${eventId}&URLKey=${urlkey}`)
    }
}
export default Silo;
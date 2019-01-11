import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import {getDetail,getColorSize,getHot} from './model'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Mounting from '../../components/Mounting'
import detailscss from './productdetail.module.scss'
import CountDown from '../../components/CountDown'

class Productdetail extends Component{
    constructor(props){
        super(props)

        this.state = {
            looplist : [],
            colorsize : null,
            colorsizepname : null,
            colorsizemarketId : null,
            colorsizeprice : null,
            colorsizediscount :null,
            DetaildeliverDate : null,
            ticketInfo : null,
            servicelist : [],
            sizelist:[],
            materialimg :null,
            attributesList : null,
            sizeUnit : null,
            productsize1 :null,
            sizeTable : [],
            productimg : [],
            message : null,
            maintenanceList : null,
            brandName : null,
            brandImg : null,
            brand_story : null,
            hotlist:[],
            attributesNewList : [],
            show1 : false,
            ticketvalue : null,
            ticketarr : [],
            show2 :false,
            servicearr : [],
            productReview : [],
            ReviewCount : null

        }
    }

    handleClick(){
        // console.log('aa')
        this.setState({
            show1 : !this.state.show1
        })
    }

    handleClick2(){
        console.log('handleClick2')
        this.setState({
            show2 : !this.state.show2
        })
    }

    handleClickGo(id){
        console.log(this.props)
        console.log(this.props.history)
        
    }

    componentDidMount(){
        
        getDetail().then(res=>{
            // console.log(res)
            // console.log(res.images)
            this.setState({
                looplist : res.images,
                DetaildeliverDate:res.deliver_date,
                ticketInfo : res.ticketInfo[0].ruleInfo,
                servicelist : res.service_labels,
                materialimg :res.description.material_quality_img,
                attributesList : res.description.attributesList.pop(),
                sizeUnit : res.sizeMeasure.sizeUnit,
                productsize1 : res.sizeMeasure.sizeTable.shift(),
                sizeTable : res.sizeMeasure.sizeTable,
                productimg : res.description.product_img1,
                message : res.description.message,
                maintenanceList : res.description.maintenanceList[0],
                brandName : res.brandName,
                brandImg : res.brandImg,
                brand_story : res.brand_story,
                attributesNewList : res.description.attributesList,
                ticketvalue : res.ticketInfo[0],
                ticketarr: res.ticketInfo,
                servicearr : res.service_labels,
                productReview : res.productReviews.reviews,
                ReviewCount :res.productReviews.totalCount
                // ticketrangeDesc : res.ticketInfo[]
                // ticketruleInfo : res.ticketInfo[]
                // ticketstartDate :res.ticketInfo[]
                // ticketendDate : res.ticketInfo[]
            }) 
            // console.log(this.state.looplist)
            // console.log(this.state.attributesList)
            // console.log(this.state.attributesNewList)
            // console.log(this.state.brandName)
            console.log(this.state.ticketvalue)
            console.log(this.state.ticketarr)
            console.log(this.state.servicearr)
            console.log(this.state.productReview)
        })

        getColorSize().then(res=>{
            console.log(res)  
            this.setState({
                colorsize:res.colorGroup[0],
                colorsizepname :res.colorGroup[0].productName,
                colorsizemarketId: res.colorGroup[0].marketPrice,
                colorsizeprice : res.colorGroup[0].price,
                colorsizediscount :res.colorGroup[0].itemPriceDto.discount,
                sizelist : res.size

            })  
            // console.log(this.state.colorsize)
        })

        getHot().then(res=>{
            console.log(res)
            this.setState({
                hotlist:res
            })
        })

    }



    render(){
        return(
            <div >
                {/* Productdetail */}
             <Header />
            <Mounting />
            
            {/* swiper */}
            <section>
            <div className={detailscss.swiper}>
                <ReactSwipe
                    key={this.state.looplist.length} className="carousel" swipeOptions={{ continuous: false ,auto :5000}}>
                     {
                        this.state.looplist.map((item,index)=>
                            <img src={item.bigImgUrl} key={index}/>                   
                        )
                    }
                </ReactSwipe>
            </div>
            {/* 商品名 */}
            <div className={detailscss.producttitle}>
                  <h3>
                      {this.state.colorsizepname}
                  </h3>
            </div>
            {/* 商品价 */}
            <div className={detailscss.productprice }>
                <del>￥{this.state.colorsizemarketId}</del>
                <strong>￥{this.state.colorsizeprice}</strong>

               <div className={detailscss.detailtags}>
                 <span> {this.state.colorsizediscount}折</span>
                </div>
                <div className={detailscss.delivery}>
                    <span><em>{this.state.DetaildeliverDate}</em></span>
                </div>
                {/* 闪购 */}
               <div className={detailscss.otherinfoitem}>
                    <div className={detailscss.countdown}>
                        <span className={detailscss.stitle}>闪购</span>
                        <div className={detailscss.stext}> <CountDown /></div>
                    </div>
               </div>
               {/* 领券 */}
               <div  className={detailscss.otherinfoitem + ' ' +detailscss.ticket} onClick={this.handleClick.bind(this)}  >
                    <div className={detailscss.coupons}>
                        <div className={detailscss.title}>领券</div>
                        <div className={detailscss.summary}>{this.state.ticketInfo}</div>
                    </div>
                    {/* <div className={this.state.show?detailscss.ticketshow:null}> */}
                      {/* <button onClick={this.handleClick.bind(this)}>Press</button> */}
                   {/* </div> */}
               </div>
                {/* 服务 */}
                <div className={detailscss.otherinfoitem} onClick={this.handleClick2.bind(this)}>
                    <div className={detailscss.servicelabels}>
                     <div className={detailscss.title}>服务</div>
                     <div className={detailscss.labels}>
                        {
                            this.state.servicelist.map((item,index)=>
                                <span key={index}>{item.label_title}</span>
                                )
                        }
                     </div>
                    </div>
                    {/* <div className={this.state.show?detailscss.ticketshow:null}> */}
                      {/* <button onClick={this.handleClick.bind(this)}>Press</button> */}
                   {/* </div> */}
                </div>
                {/* 尺码 */}
                <div className={detailscss.otherinfoitem}>
                    <div className={detailscss.sizelist}>
                    <div  className={detailscss.title}>尺码</div>
                     <div  className={detailscss.size}>
                        {
                            this.state.sizelist.map((item,index)=>
                                <span key={index}>{item.sizeId}</span>
                                )
                        }
                     </div>
                    </div>
                </div>
            </div>
            {/* 商品参数 */}
            <div  className={detailscss.blockdesc + ' ' +"proname"} >
                <h3>商品参数</h3>
                <div className={detailscss.blockinfo}>
                 <div className={detailscss.showmore}>
                        <img src={this.state.materialimg}/>
                        <ul>
                            {
                                this.state.attributesList?
                                <li>
                                    <label>
                                        {this.state.attributesList.name}
                                    </label>
                                    <span>
                                        {this.state.attributesList.value}
                                    </span>
                                </li>
                                :null
                                }
                            {this.state.attributesNewList.map((item,index)=>
                                    <li key={index}>
                                        <label>{item.name}</label> 
                                        <span>{item.value}</span>
                                    </li>
                                )}
                        </ul>
                 </div>
                </div>
            </div>
            {/* 尺码信息 */}
            <div className={detailscss.blockdesc + " " + detailscss.clearfix + " " + detailscss.sizetable}>
              <h3 className={detailscss.blockheading}>尺码信息
                <span className={detailscss.unit}>单位:{this.state.sizeUnit}</span>
                <span className={detailscss.showsizepop} >尺码指南</span>
              </h3>
             
              <div className={detailscss.slide_content + " " +detailscss.clearfix}>
                <div className={detailscss.name}>
                    <ul className={detailscss.list1} >
                        {
                            this.state.productsize1?
                            Object.keys(this.state.productsize1).map(key =>
                                // console.log(this.state.productsize1[key])
                                <li key={key}>{this.state.productsize1[key]}</li>
                                )
                            :null
                        }
                    </ul>  

                    <div className={detailscss.sizetable}>
                        <div className={detailscss.container + " " +detailscss.clearfix}>
                            {
                                this.state.sizeTable.map(item=>
                                    <ul key={item.product_size} className={detailscss.list2}>
                                        {
                                            Object.keys(item).map(key =>
                                                <li key={key}>{item[key]}</li>
                                                )
                                        }
                                        {/* <li>{item.def14}</li>
                                        <li>{item.def8}</li>
                                        <li>{item.def10}</li>
                                        <li>{item.def19}</li>
                                        <li>{item.def22}</li>
                                        <li>{item.specifications}</li> */}
                                    </ul>)
                            }
                        </div>
                    </div>
                </div>
              </div>
            </div>            
            {/* 商品详情 */}
            <div className={detailscss.blockdesc+ ' ' +"prodetail"}>
              <h3 className={detailscss.blockheading}>商品详情</h3>
              <div className={detailscss.blockinfo}>
                <div className={detailscss.images}>
                    {this.state.productimg.map((item,index)=>
                        <img src={item.bigImgUrl} key={index}/>
                        )}
                    <p>{this.state.message}</p>
              </div>
            </div>
            </div>
            {/* 洗护与保养 */}
            <div className={detailscss.blockdesc}>
              <h3 className={detailscss.blockheading}>洗护与保养</h3>
              <div className={detailscss.blockinfo}>
                 <p className={detailscss.p1}>{this.state.maintenanceList}</p>
              </div>
           </div>
            {/* 品牌 */}
            <div className={detailscss.blockdesc+ ' ' +"probrand"}>
                <h3 className={detailscss.blockheading}>
                    <a>
                      <strong>{this.state.brandName}</strong>
                      <span>品牌主页</span>
                    </a>
                </h3>
                <div className={detailscss.blockinfo}>
                  <div className={detailscss.showmore}>
                        <a>
                            <img src={this.state.brandImg} />
                            <p className={detailscss.p2}>
                                {this.state.brand_story}
                            </p>
                        </a>
                  </div>
                </div>
            </div>
            {/* 警告 */}
            <div  className={detailscss.blockdesc}>
              <div className={detailscss.blockinfo}>
                <div >
                     <img  src="https://cdn13.mei.com/category/20180830/4a0d36fe97744688842ed5a9164b73891ac47f6e1a03bdfe.jpg@750w_408h_2e_100q" alt="" className="service-tips" />
                </div>
             </div>
             </div>
            {/* 用户评论 */}
            <div className={detailscss.blockdesc+ ' ' +"procomment"}>
                 <h3 className={detailscss.blockheading}>用户评论
                   <span className={detailscss.reviewtotal}>({this.state.ReviewCount})</span> 
                   <a className={detailscss.toreviewall}>查看全部</a>
                   </h3>
                   <div className={detailscss.blockinfo}>
                        {
                            this.state.productReview.length===0?
                            <div className={detailscss.nouser}>暂无用户评论</div>:
                            this.state.productReview.map((item,index)=>
                                    <div key={index} className={detailscss.review}>
                                        <div className={detailscss.user}>
                                            <span>{item.userName?item.userName:'匿名'}</span>
                                        </div>
                                        <div className={detailscss.content}>
                                            {item.content}
                                        </div>
                                        <div className={detailscss.date}>
                                             {item.dateTime}
                                        </div>
                                    </div>
                            )
                        }
                    </div>
            </div>
            {/* 大家都在看 */}
            <div className={detailscss.hot}>
              <h3 className={detailscss.blockheading}>大家都在看</h3>
              <div className={detailscss.container1}>
                <div className={detailscss.productitem}>
  
                    <div className={detailscss.pic}>


                    {this.state.hotlist.map(item=>
                        <div key={item.productId} className={detailscss.hotp} onClick={this.handleClickGo.bind(this,item.productId)}>
                        
                                <img src={item.imgUrl}/>
                                <div className={detailscss.productinfo}>
                                <span className={detailscss.brandname}>{item.brand_name}</span>
                                <span className={detailscss.productname}>{item.product_name}</span>
                                </div>
                                <div className={detailscss.productpricebox}>
                                <span className={detailscss.price}>￥{item.price}</span>
                                <del>￥{item.market_price}</del>
                                </div>
                                <div className={detailscss.discount}>{item.discount}折</div>
                            
                        </div>
                        )}
                    </div>
         
                </div>
              </div>
            </div>
            </section>
            <div className={this.state.show1?detailscss.ticketshow:detailscss.disappear}>
                <h4>领取优惠券</h4>
                <div className={detailscss.pdetailpopupcontent}>
                      {
                        this.state.ticketarr?
                        this.state.ticketarr.map((item,index)=>
                            <div key={index}  className={detailscss.couponpopupitem}>
                                <div className={detailscss.value}>
                                 <span className={detailscss.number}>
                                    {item.value}
                                 </span>
                             </div>
                             <div className={detailscss.info}>
                              <div className={detailscss.label}>
                                {item.label}  
                            </div>
                              <div className={detailscss.text}>
                                <span>{item.rangeDesc}</span>
                                <span>{item.ruleInfo}</span>
                              </div>
                            <div className={detailscss.time}>
                                {item.startDate}-{item.endDate}
                            </div>
                      </div>
                             <div className={detailscss.status}>
                              <span>立即领取</span>
                             </div>
                            </div>
                          ):null
                      }

                </div>
                <a  onClick={this.handleClick.bind(this)}>确定</a>
            </div>
            <div className={this.state.show2?detailscss.serviceshow+ ' ' + "overflow":detailscss.disappear}>
                <h4>魅力惠服务</h4>
                <div className={detailscss.pdetailpopupcontent}>
                   {
                       this.state.servicearr?
                       this.state.servicearr.map((item,index)=>
                        <div key={index}    >
                            <dl className={detailscss.serviceitem}>
                                <dt>{item.label_title}</dt>
                                <dd>{item.label_text}</dd>
                            </dl>
                        </div>
                       ):null
                   }
                   {/* <div>
                       <dl>
                           <dt>全场满688包邮</dt>
                           <dd>单笔订单折后总金额满人民币688元将享受免运费配送，不足金额订单，统一收取10元邮费，无续重费</dd>
                       </dl>
                   </div> */}
                </div>
                <a  onClick={this.handleClick2.bind(this)}>确定</a>
            </div>
            
            <Footer />
       </div>
        
        )
    }


}
export default Productdetail;
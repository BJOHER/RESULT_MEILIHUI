import React,{Component} from 'react'
import footerscss from  './index.module.scss'
import {NavLink} from 'react-router-dom'
import {getColorSize,getDetail,getProduct} from '../../views/productdetail/model'

class Footer extends Component{
    constructor(props){
        super(props)

        this.state ={
            show : false,
            info : null,
            infoprice : null,
            infocolor : null,
            infoimg : null,
            infosize : [],
            number : 1,
            eventId : null,
            productId : null
        }
    }    

    handleClick(){
        this.setState({
            show : !this.state.show
        })
    }

    handleClickGo(id){
        console.log(this);
        console.log(id)
        // this.props.history.push(`/shoppcart/${id}`)
    }

    handleClickAdd(){
        console.log(this.state.number++)
        var addnumber = this.state.number++
        this.setState({
            number : addnumber
        })
    }

    handleClickDel(){
        console.log(this.state.number--)
        if(this.state.number === 0){
            this.state.number = 1
        }
        var delnumber = this.state.number--
        this.setState({
            number : delnumber
        })
    }

    componentDidMount(){
        getColorSize().then(res=>{
            console.log(res.colorGroup[0])
            this.setState({
                info : res.colorGroup[0],
               infoprice: res.colorGroup[0].price,
               infocolor : res.colorGroup[0].color,
               infoimg :  res.colorGroup[0].productImgUrl
            })
        })
        getDetail().then(res=>{
            this.setState({
                infosize : res.size
            })
        })

        getProduct().then(res=>{
            this.setState({
                eventId :res.eventId,
                productId : res.productId
            })
           console.log(this.state.eventId)
           console.log(this.state.productId)
        })
    }

    render(){
        return <div className={footerscss.footer}>
            {/* Footer */}
            <div className="car-bottom-bar">
              <div className={footerscss.leftarea}>
              
                    <span className="btn-text"><NavLink to="/shoppingcart" className={footerscss.change}>购物袋</NavLink></span>
             
              </div>
            </div>
            <div className={footerscss.submitbtn}>
              <span className="x1x2 add-to-cart btn-space" onClick={this.handleClick.bind(this)}>加入购物车</span>
              <span className="add-to-checkout x1x2" onClick={this.handleClick.bind(this)} >立即购买</span>
            </div>

            <div className={this.state.show?footerscss.popup:null}>
                <div className={footerscss.info}>
                    <div className={footerscss.thumbnail}>
                        <img src={this.state.infoimg }/>
                    </div>
                    <div className={footerscss.pricesizecolor}>
                        <div className={footerscss.productpricebox}>
                            <span>￥{this.state.infoprice}</span>
                        </div>
                        <div className={footerscss.selected}>
                            <span>已选择"{this.state.infocolor}"</span>
                        </div>
                    </div>
                    <a onClick={this.handleClick.bind(this)} className={footerscss.cancel}>X</a>
                </div>

                <div className={footerscss.pdetailpopupcontent}>
                    <div className={footerscss.skucontrol}>
                        <div className={footerscss.sizeblock}>
                            <h3>尺码</h3>
                            <div className={footerscss.size}>
                                {
                                    this.state.infosize.map((item,index)=>
                                        <span key={index}>{item.sizeValue}</span>
                                    )
                                }
                            </div>
                        </div>
                        <div className={footerscss.numblock}>
                            <h3>数量</h3>
                            <div className={footerscss.num}>
                                <div className={footerscss.quantity}>
                                    <a onClick={this.handleClickDel.bind(this) } className={this.state.number===1?footerscss.white:null}>-</a>
                                    <span >{this.state.number}</span>
                                    <a onClick={this.handleClickAdd.bind(this)}>+</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className={footerscss.submitbtn2}>
                    <span className="x1x2 add-to-cart btn-space" onClick={this.handleClickGo.bind(this,this.state.eventId)} ><NavLink to="/shoppingcart">加入购物车</NavLink></span>
                    <span className="add-to-checkout x1x2"  >立即购买</span>
                </div>
            </div>
        </div>
    }
}

export default Footer
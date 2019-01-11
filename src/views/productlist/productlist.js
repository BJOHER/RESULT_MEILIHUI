import React, { Component } from 'react'
import axios from 'axios'

// import ReactDOM from "react-dom";
import productslistcss from './productlist.module.scss'
import {Icon } from 'antd-mobile';
import { PullToRefresh } from 'antd-mobile';//同时引用样式
import { BackTop,Popover} from 'antd';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux'

const content = (
    <ul className={productslistcss.show}>
        <li><a href="./index">首页</a></li>
        <li><a href="./shoppingcart">购物袋</a></li>
        <li><a href="./center">个人中心</a></li>
    </ul>
);  
class Productlist extends Component{
	constructor(props) {
	  super(props);	
	  this.state = {
	  	productslist:[],
	  	eventName:'',
	  	isshow:false,
	  	info:'',
       	refreshing: false,
       	down: false,
       	current:1,
 	    useBodyScroll: false,
 	    totalpages:1,
 	    index:0,
 	    isfocus1:true,
 	    isfocus2:false,
 	    isfocus3:false,
 	    isfocus4:false,
 	    key:'',
 	    sort:'',
        toggle:true,
        brandlist:[],
        silo_id:'',
        added:1000,
        addedlist:[],
        filter:false,
        xiding:false
	  };
	}
	
	componentDidMount(){
		console.log(this.props);
		console.log(this.props.location.search)
		// console.log((this.props.location.search).split("&")[1].split("=")[1])
		this.setState({
			info:this.props.location.search
		})
		if(this.state.productslist.length===0){
			//ajax
			axios({
				url:`http://www.mei.com/appapi/event/product/v3?pageIndex=${this.state.current}&categoryId=${(this.props.location.search).split("&")[1].split("=")[1]}&key=&sort=`
			}).then(res=>{
				this.setState({
					eventName:res.data.eventName,
					productslist:res.data.products,
					totalpages:res.data.totalPages,
                    silo_id:res.data.silo_id
				})
			})
		}
        window.onscroll=this.handlescroll.bind(this);

	}

    render(){
        return (<div id={productslistcss.productlist}>
	            <div className={this.state.xiding?productslistcss.xiding+' '+productslistcss.header:productslistcss.header}>
	            	<div className={productslistcss.hide}>
	            		<span className={productslistcss.first} onClick={this.props.history.goBack}><Icon type="left" /></span>
	            		<span className={productslistcss.second}>{this.state.eventName}</span>
	            		<span className={productslistcss.last} onClick={this.handleclick.bind(this)}>
                            <Popover placement="bottom" content={content} trigger="click">
                                <strong><Icon type="ellipsis" /></strong>
                            </Popover>               
                        </span>
	            	</div>	            	
      				<ul className={productslistcss.nav}>
            			<li onClick={this.sort1.bind(this)} className={this.state.isfocus1?productslistcss.focus:''}>人气</li>
            			<li onClick={this.sort2.bind(this)} className={this.state.isfocus2?productslistcss.focus:''}>折扣</li>
            			<li onClick={this.sort3.bind(this)} className={this.state.isfocus3?productslistcss.focus:''}>价格{this.state.toggle?<Icon type="down" />:<Icon type="up" />}</li>
            			<li onClick={this.sort4.bind(this)} className={this.state.isfocus4?productslistcss.focus:''}>筛选</li>
            		</ul>	            		
	            </div>
            	<div className={productslistcss.free}>
            		<span className={productslistcss.first}>免运</span>
            		<span>全场满688包邮</span>
            	</div>
            	      <PullToRefresh
            	        damping={60}
            	        ref={el => this.ptr = el}
            	        style={{
            	        }}
            	        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
            	        direction={this.state.down ? 'down' : 'up'}
            	        refreshing={this.state.refreshing}
            	        onRefresh={() => {
            	        	console.log(this.state.current,this.state.totalpages);
            	        	if(this.state.current>=this.state.totalpages){
            	        		this.setState({ refreshing: false });
            	        	}else{
            	        		this.setState({ refreshing: true });
            	        		var pageindex=this.state.current;
            	        		pageindex++;
            	        		this.setState({
            	        			current:pageindex
            	        		})
            	          		axios({
            						url:`http://www.mei.com/appapi/event/product/v3?pageIndex=${this.state.current}&categoryId=${(this.props.location.search).split("&")[1].split("=")[1]}&key=${this.state.key}&sort=${this.state.sort}`
            					}).then(res=>{
            						this.setState({
            							refreshing: false,
            							eventName:res.data.eventName,
            							productslist:[...this.state.productslist,...res.data.products],
            						})
            					})
            	        	}
            	          
            	        }}
            	      >
            	      	{this.state.productslist.length>0?<ul className={productslistcss.list}>
            	           {this.state.productslist.map(item =><li key={item.productId+this.state.sort+this.state.key}  onClick={this.handleClicktodetail.bind(this,item)} className={productslistcss.list}>
            	             <img src={item.imageUrl} alt=""/>
                             <div className={productslistcss.tag}>{item.tagListDto?item.tagListDto.map(item=><span>{item.tag}</span>):null}</div>
            	             <div><strong>{item.brandName}</strong></div>
            	             <div>{item.productName}</div>
            	             <div className={productslistcss.price}>
            	             	<span className={productslistcss.first}>{'￥'+item.price}</span>
            	             	<span className={productslistcss.second}>{'￥'+item.marketPrice}</span>
            	             	<span className={productslistcss.last}>{item.discount+'折'}</span>
            	             </div>
                             {item.allOutOfStock==="1"?<span className={productslistcss.saleout}>已售罄 SALE OUT</span>:null}
            	          </li>
            	        )}
            	        </ul>:<ul className={productslistcss.list}>没有更多数据</ul>}
            	      </PullToRefresh>

                <BackTop />

                {
                    this.state.isfocus4?<div className={productslistcss.filter}>
                            <input type="text" placeholder="最低价钱" ref="min"/>
                            <input type="text" placeholder="最高价钱" ref="max"/>
                    {this.state.addedlist.length?<ul className={productslistcss.brandslist}>已选：
                                            {this.state.addedlist.map((item,index)=><li className={productslistcss.focus}>
                                                <span onClick={this.handledel.bind(this,index,item)}>X</span>{item}</li>)}
                                        </ul>:null}
                    <ul className={productslistcss.brandslist}>
                        {this.state.brandlist.map((item,index)=><li key={index} onClick={this.hndleadd.bind(this,index,item)} >{item.brandName}</li>)}
                    </ul>
                    <div className={productslistcss.fixed}>
                        <span onClick={this.handlehide.bind(this)}>全部清除</span>
                        <span onClick={this.handlesure.bind(this)}>确定</span>
                    </div>
                </div>:null
            }
            </div>)
        
    }
    handlescroll(){
        // console.log(document.documentElement.scrollTop)
        if((document.documentElement.scrollTop||document.body.scrollTop)>=400){
            this.setState({
                xiding:true
            })
        }else{
            this.setState({
                xiding:false
            })
        }
    }

    handlehide(){
        this.setState({
            isfocus4:false,
            addedlist:[]
        })
    }
    handledel(index,item){
             this.state.addedlist.splice(index,1)
            let arr=[...this.state.addedlist]       
        this.setState({

            addedlist:arr
        })
    }
    handlesure(){
        console.log(this.refs.min.value,this.refs.max.value)
        this.setState({
            isfocus4:false,
            filter:true,
            min:this.refs?this.refs.min.value:'',
            max:this.refs?this.refs.max.value:'',
        })
        axios({
            url:`http://www.mei.com/appapi/event/search/v3?brandNames=${this.state.addedlist.join(',').replace(/ /g,"+")}&thirdCategories=&chineseCodes=&eventId=${(this.props.location.search).split("&")[1].split("=")[1]}&siloId=${this.state.silo_id}&minPrice=${this.refs.min.value}&maxPrice=${this.refs.max.value}&sort=&key=&pageIndex=${this.state.current}`
            }).then(res=>{
                console.log(res.data.products)
                this.setState({
                    productslist:res.data.products,
                    eventName:res.data.eventName,
                    totalpages:res.data.totalPages
            })
        })
    }
    hndleadd(index,item){
        
        if(this.state.addedlist.indexOf(item.brandName)===-1){
           this.setState({
                addedlist:[...this.state.addedlist,item.brandName]
            }) 
        }
        
    }
    sort1(){
    	this.setState({
    		isfocus1:true,
    		isfocus2:false,
    		isfocus3:false,
    		isfocus4:false,
    		key:'',
    		sort:''
    	})
        if(this.state.filter){
            axios({
                    url:`http://www.mei.com/appapi/event/search/v3?brandNames=${this.state.addedlist.join(',').replace(/ /g,"+")}&thirdCategories=&chineseCodes=&eventId=${(this.props.location.search).split("&")[1].split("=")[1]}&siloId=${this.state.silo_id}&minPrice=${this.state.min}&maxPrice=${this.state.max}&sort=&key=&pageIndex=${this.state.current}`
            }).then(res=>{
                this.setState({
                    eventName:res.data.eventName,
                    productslist:res.data.products
                })
            })
        }else{
              axios({
                url:`http://www.mei.com/appapi/event/product/v3?pageIndex=${this.state.current}&categoryId=${(this.props.location.search).split("&")[1].split("=")[1]}&key=&sort=`
            }).then(res=>{
                this.setState({
                    eventName:res.data.eventName,
                    productslist:res.data.products
                })
            })  
        }
    	
    }
    sort2(){
    	this.setState({
    		isfocus1:false,
    		isfocus2:true,
    		isfocus3:false,
    		isfocus4:false,
    		key:'1',
			sort:'ASC'
    	})
        if(this.state.filter){
            axios({
                    url:`http://www.mei.com/appapi/event/search/v3?brandNames=${this.state.addedlist.join(',').replace(/ /g,"+")}&thirdCategories=&chineseCodes=&eventId=${(this.props.location.search).split("&")[1].split("=")[1]}&siloId=${this.state.silo_id}&minPrice=${this.state.min}&maxPrice=${this.state.max}&sort=ASC&key=1&pageIndex=${this.state.current}`
            }).then(res=>{
                this.setState({
                    eventName:res.data.eventName,
                    productslist:res.data.products
                })
            })}else{
                axios({
                    url:`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${(this.props.location.search).split("&")[1].split("=")[1]}&key=1&sort=ASC`
                }).then(res=>{
                    this.setState({
                        eventName:res.data.eventName,
                        productslist:res.data.products
                    })
                })
            }
    	
    }
	sort3(){
		this.setState({
            toggle:!this.state.toggle,
			isfocus1:false,
			isfocus2:false,
			isfocus3:true,
			isfocus4:false,
			
		})
        if(this.state.toggle===false){
            this.setState({
                key:'',
                sort:'ASC'
            })
            if(this.state.filter){
                axios({
                        url:`http://www.mei.com/appapi/event/search/v3?brandNames=${this.state.addedlist.join(',').replace(/ /g,"+")}&thirdCategories=&chineseCodes=&eventId=${(this.props.location.search).split("&")[1].split("=")[1]}&siloId=${this.state.silo_id}&minPrice=${this.state.min}&maxPrice=${this.state.max}&sort=ASC&key=&pageIndex=${this.state.current}`
                }).then(res=>{
                    this.setState({
                        eventName:res.data.eventName,
                        productslist:res.data.products
                    })
                })}else{
                   axios({
                   url:`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${(this.props.location.search).split("&")[1].split("=")[1]}&key=&sort=ASC`
                   }).then(res=>{
                       this.setState({
                           eventName:res.data.eventName,
                           productslist:res.data.products
                       })
                   }) 
                }
            
        }else{
            this.setState({
                key:'',
                sort:'DESC'
            })
            if(this.state.filter){
                axios({
                        url:`http://www.mei.com/appapi/event/search/v3?brandNames=${this.state.addedlist.join(',').replace(/ /g,"+")}&thirdCategories=&chineseCodes=&eventId=${(this.props.location.search).split("&")[1].split("=")[1]}&siloId=${this.state.silo_id}&minPrice=${this.state.min}&maxPrice=${this.state.max}&sort=DESC&key=&pageIndex=${this.state.current}`
                }).then(res=>{
                    this.setState({
                        eventName:res.data.eventName,
                        productslist:res.data.products
                    })
                })}else{
                    axios({
                        url:`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${(this.props.location.search).split("&")[1].split("=")[1]}&key=&sort=DESC`
                    }).then(res=>{
                        this.setState({
                            eventName:res.data.eventName,
                            productslist:res.data.products
                        })
                    })
                }
        }
    }
    	   
	sort4(){
		this.setState({
			isfocus1:false,
			isfocus2:false,
			isfocus3:false,
			isfocus4:true
		})
        axios({               
            url:`http://www.mei.com/appapi/event/brand/v3?brandNames=&thirdCategories=&eventId=${(this.props.location.search).split("&")[1].split("=")[1]}&filterType=filter_brand&siloId=${this.state.silo_id}`
        }).then(res=>{
            this.setState({
                brandlist:res.data.brands
            })
        })    	
    }

    handleClicktodetail(item){

            // console.log(this.state.info.split('&')[1].split("=")[1])
            //ajax 数据请求完再给detail组件
            // this.props.getdetailinfo(item,this.state.info.split('&')[1].split("=")[1],this).then(res=>{
            //     this.props.history.push(`/productdetail?eventCode=${this.state.info.split('&')[1].split("=")[1]}&glsCode=${item.glsCode}&URLKey=${this.state.info.split('&')[2].split("=")[1]}`);
            // })
            // //跳转
    	    axios({
                url:`http://www.mei.com/appapi/product/getAppProductDetailUrl/v3?eventCode=${this.state.info.split('&')[1].split("=")[1]}&glsCode=${item.glsCode}`
            }).then(res=>{
                window.localStorage.setItem('detail',JSON.stringify(res.data))
                this.props.history.push(`/productdetail?eventCode=${this.state.info.split('&')[1].split("=")[1]}&glsCode=${item.glsCode}&URLKey=${this.state.info.split('&')[2].split("=")[1]}`);
            })
    	}

    handleclick(){
    	this.setState({
    		isshow:!this.state.isshow
    	})
    }
   
    handleFocus(){
    	this.setState({
    		isfocus:true
    	})
    }
}

export default Productlist;
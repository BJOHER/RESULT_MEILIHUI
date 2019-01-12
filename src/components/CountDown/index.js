import React, { Component } from 'react'
import {getDetail} from  '../../views/productdetail/model'

class CountDown extends Component{
    constructor(props){
        super(props)

        this.state = {
            endTime : 0,
            begin : 0,
            day : 0 ,
            hour : 0 ,
            minute : 0 ,
            second : 0
        }
    }
    //数据传过来的时间
    componentDidMount(){
        getDetail(this.props.myname).then(res=>{
            console.log(res)
            this.setState({
                endTime : res.ticketInfo.length=== 0 ?0 :  res.ticketInfo[0].endDateLong,
                begin :  res.ticketInfo.length=== 0 ?0 : res.ticketInfo[0].startDateLong
            })
            // console.log(this.state.endTime)
            // console.log(this.state.begin)
            // console.log(Date())
            //用setInterval解决个异步
            setInterval(this.countdown(this.state.begin,this.state.endTime),3000)
        })

    }

    componentWillUnmount(){
        clearInterval(this.timer);
      }
  

    countdown = (begin,endTime)=>{
        let end_time = endTime
        let begin_time = begin
        let now_time = new Date().getTime()
        let cdtime1 = end_time - begin_time
        let cdtime = end_time - now_time
        // console.log(end_time)
        // console.log(begin_time)
        // console.log(now_time)
        // console.log(cdtime1)
        // console.log(cdtime)
        this.timer = setInterval(()=>{
            if (cdtime > 1000) {
                cdtime -= 1000;
                let day = Math.floor((cdtime / 1000 / 3600) / 24);
                let hour = Math.floor((cdtime / 1000 / 3600) % 24);
                let minute = Math.floor((cdtime / 1000 / 60) % 60);
                let second = Math.floor(cdtime / 1000 % 60);
                // console.log(day)
                // console.log(hour)
                // console.log(minute)
                // console.log(second)
                this.setState({
                    day:day,
                    hour:hour < 10 ? "0" + hour : hour,
                    minute:minute < 10 ? "0" + minute : minute,
                    second:second < 10 ? "0" + second : second

                })
        }else{
            clearInterval(this.timer);
        }
        },1000)

    }

    render(){
        return <div>
            <span>{this.state.day}天
            {this.state.hour}时
            {this.state.minute}分
            {this.state.second}秒
            </span>
        </div>
    }
}

export default CountDown
import axios from 'axios';
function gethead(){
    return(
        axios({
            method:'get',
            url:'http://www.mei.com/appapi/search/searchDefault/v3',
        }).then(res=>{
            // console.log(res);
            return res.data;
        })
    )
}

function homebanner(){
    return(
        axios({
            method:'get',
            url:'http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5',
        }).then(res=>{
            // console.log(res);
            return res.data.banners;
        })
    )
}

function getnav(){
    return(
        axios({
            method:'get',
            url:'http://www.mei.com/appapi/silo/navigationAll/v3?timestamp=1546933013021&summary=dd50a4cea423fb9d42a5baebb7377a09',
        }).then(res=>{
            // console.log(res);
            res.data.lists[0].englishname = 'crossborder';
            res.data.lists[1].englishname = 'women';
            res.data.lists[2].englishname = 'men';
            res.data.lists[3].englishname = 'cosmetics';
            res.data.lists[4].englishname = 'lifestyle';
            res.data.lists[5].englishname = 'kids';
            return res.data.lists;
        })
    )
}

function getAd(){
    return(
        axios({
            method:'get',
            url:'http://www.mei.com/appapi/home/newZoneEntrance/v3?credential='
        }).then(res=>{
            console.log(res);
            return res.data;
        })
    )
}

function getNewHot(){
    return(
        axios({
            method:'get',
            url:'http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1546939513409&summary=fbd31c0cb53307d857dd3377a179156c&platform_code=H5',
        }).then(res=>{
            // console.log(res);
            return res.data.lists;
        })
    )
}

function getUp(){
    return(
        axios({
            method:'get',
            url:'http://www.mei.com/appapi/upcoming/index/v3?platform_code=H5&timestamp=1547014647370&summary=5674214f35abcd25970e13e42f0cfb51',
        }).then(res=>{
            return res.data.lists[0].events
        })
    )
}

function getSiloBanner(method,url){
    return (
        axios({
            method:method,
            url:url,
        }).then(res=>{
            console.log(res.data)
            return res.data
        })
    )
}

function cmsDetailId(method,url){
    return (
        axios({
            method:method,
            url:url,
        }).then(res=>{
            return res.data
        })
    )
}

function cmsDetail(method,url){
    return (
        axios({
            method:method,
            url:url
        }).then(res=>{
            return res.data.resultList
        })
    )
}

function product(method,url){
    return (
        axios({
            method:method,
            url:url
        }).then(res=>{
            return res.data
        })
    )
}


function brand(){
    return (
        axios({
            method:'post',
            url:'//www.mei.com/appapi/brand/brandInfo/v3',
            data:{
                brandId: '3616200100000000853',
                timestamp: '1547116320182',
                summary: 'e9ca675b3c7fcd6fa0c2408aa7e78559',
                platform_code: 'H5',
            },
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
            
        }).then(res=>{
            return res
        })
    )
}

function search(){
    return(
        axios({
            method:'get',
            url:'http://www.mei.com/appapi/search/searchFind/v3'
        }).then(res=>{
            return res.data.searchFindList;
        })
    )
}
export {gethead,homebanner,getnav,getAd,getNewHot,getUp,getSiloBanner,cmsDetail,cmsDetailId,product,brand,search};
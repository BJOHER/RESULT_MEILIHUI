import axios from 'axios'
//详情数据
function getDetail(data){
    return axios({
        url : `http://www.mei.com/appapi/product/detail/v3?categoryId=${data.eventId}&productId=${data.productId}&platform_code=H5&timestamp=1546936741508&summary=a849f1a6061e0a2adfb7477e56eac71e`
    }).then(res=>{
        // console.log(res.data)
        return res.data.infos
    })
}

function getColorSize(data){
    return axios({
        url : `http://www.mei.com/appapi/product/colorgroupsize/v3?categoryId=${data.eventId}&productId=${data.productId}&platform_code=H5&timestamp=1546936903691&summary=37dd1d07836517317d4b2f398174cacf`
    }).then(res=>{
        console.log(res.data)
        return res.data.infos
    })
}

function getHot(data){
    return axios({
        url : `http://www.mei.com/appapi/product/hot/v3?categoryId=${data.eventId}&productId=${data.productId}&platform_code=H5`
    }).then(res=>
      { console.log(res.data)
       return res.data.categoryList
    }
        )
}

// function getProduct(data){
//     return axios({
//         url : `http://www.mei.com/appapi/product/getAppProductDetailUrl/v3?eventCode=${this.props.detail.eventId}&glsCode=TY5-206-02147`
//     }).then(res=>{
//         console.log(res.data)
//         return res.data
//     })
// }

export {getDetail,getColorSize,getHot}
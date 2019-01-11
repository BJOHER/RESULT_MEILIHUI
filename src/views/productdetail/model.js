import axios from 'axios'
//详情数据
function getDetail(){
    return axios({
        url : 'http://www.mei.com/appapi/product/detail/v3?categoryId=2040204090000006134&productId=2121212199000091720&platform_code=H5&timestamp=1546936741508&summary=a849f1a6061e0a2adfb7477e56eac71e'
    }).then(res=>{
        // console.log(res.data)
        return res.data.infos
    })
}

function getColorSize(){
    return axios({
        url : 'http://www.mei.com/appapi/product/colorgroupsize/v3?categoryId=2040204090000006134&productId=2121212199000091720&platform_code=H5&timestamp=1546936903691&summary=37dd1d07836517317d4b2f398174cacf'
    }).then(res=>{
        console.log(res.data)
        return res.data.infos
    })
}

function getHot(){
    return axios({
        url : 'http://www.mei.com/appapi/product/hot/v3?categoryId=2040204090000006134&productId=2121212199000091720&platform_code=H5'
    }).then(res=>
      { console.log(res.data)
       return res.data.categoryList
    }
        )
}

function getProduct(){
    return axios({
        url : 'http://www.mei.com/appapi/product/getAppProductDetailUrl/v3?eventCode=38224&glsCode=TY5-206-02147'
    }).then(res=>{
        console.log(res.data)
        return res.data
    })
}

export {getDetail,getColorSize,getHot,getProduct}
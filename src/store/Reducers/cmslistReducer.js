const cmslistReducer = (prevstate=[],action)=>{
    console.log(action);
    let{type,payload} = action;
    switch(type){
        case "addlist" :
            return [...payload];
        default:
            return prevstate;
    }
}
export default cmslistReducer;
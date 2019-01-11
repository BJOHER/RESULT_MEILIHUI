const productslistReducer = (prevstate=null,action)=>{
	let {type,payload}=action;
	switch(type){
		case 'detailInfo':
		// console.log(payload)
			return payload;
		case 'eventname':
		 return payload;
		default:
			return prevstate
	}
}
export default productslistReducer;
const shopcartReducer = (prevstate=[],action)=>{
	console.log(action);
	let {type,payload} = action;
	switch(type){
		case "addList":
			return [...prevstate,...payload];
		case "dalList":
			return prevstate
		default:
			return prevstate
	}
}

export default shopcartReducer;
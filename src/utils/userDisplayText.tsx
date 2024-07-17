const UserDisplayText = (text : string) : string => {

	const array = text.split(' ')
	const twoItemArray = [];

	if(array.length > 1){
		for(let i = 0; i < 2 ; i++){
			twoItemArray.push(array[i][0])
		}
	}else{
		twoItemArray.push(array[0][0])
	}

	return twoItemArray.join("").toUpperCase();
}


export default UserDisplayText;
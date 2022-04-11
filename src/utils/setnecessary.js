/**
 * 
 * @param {*} items 체크해야할 항목들
 * @param {*} results validate에서 return해준 결과 이며 { {key:value},{key:value}}
 * @description item이 items에 존재하는지 확인 여부
 */
const isValidate = (items,results) =>{
    for(let item in results){
        if(items.includes(item)){
            if(!results[item]['valid']){
                return false;
            }
        }
    }

    return true
}


export { isValidate }
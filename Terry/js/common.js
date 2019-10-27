/**获取参数数据
 * @param paramKey
 * @returns {string}
 */
function getParamByUrl(paramKey){
    var url=window.location.search.substring(1);
    var arr=url.split("&");
    var result=[];
    for(var i=0;i < arr.length;i++){
        var param=arr[i].split("=");
        if(paramKey === param[0]){
            return  param[1];
        }
    }
    return "";
}

/**
 * js控制角度，返回旋转的度数
 * @param tan
 * @returns {number}
 */
function getTanDeg (tan) {
  return Math.atan(tan) / (Math.PI / 180);
}
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
    return "false";
}
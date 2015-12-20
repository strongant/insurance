/*
 * jquery.ckUtils-1.0 
 * 
 * Author: kaka
 * Date: 2014-06-25 16:50:00
 */
 
;(function($){
	
	$.ckUtil={
		currentDate:function(){
			var d=moment().format("YYYY-MM-DD HH:mm:ss");
			return d;
		},
		getTimestamp:function(){
			var d=moment().format("mmssms");
			var r=Math.random().toString();
			r=r.substr(r.length-4);
			var ts=d+""+r;
			return ts;
		}
	};
	
	$.ckAjaxUtil={
		getLocalJSONObject:function(array,isEncodeURI){
			var isEncode=(typeof(isEncodeURI)=="undefined"||isEncodeURI);
			var obj={};
			$.each(array,function(i,item){
				obj[item.name]=isEncode?encodeURI(item.value):item.value;
			});
			return obj;
		},
		getLocalJSONString:function(jsonObject){
			return JSON.stringify(jsonObject);
		},
		base64Encode:function(str){
			return BASE64.encoder(str);
		},
		getServerJSON:function(purl,pdata,pcallback){
			var _data=pdata+"&t="+$.ckUtil.getTimestamp();	//客户端编码后Base64编码后数据传递；
			$.ajax({
				type: "GET",
				url: purl,
				data: _data,
				dataType: "json",
				cache: false,
				success: function(msg){
					pcallback(msg);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
				   
				},
				
			});
		}
	};
	
})(jQuery);
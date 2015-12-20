/*!
 * jquery.ckFormValidate-1.0 
 * 
 * Author: kaka
 * Date: 2012-10-14 16:50:00
 */
 
(function($){
	
	var right="√";
	var wrong="×";
	
	$.clearValidInfo=function(validateRules){
		$(validateRules).each(function(i,item){
			var e=$("#"+item.id);
			e.removeClass("error");
			e.nextAll("span.mark").html("");
			e.nextAll("span.prompt").html("");
		});
	};
	
	$.validateForm=function(validateRules){
		
		var isvalid=true;
		$(validateRules).each(function(i,item){
			var e=$("#"+item.id);
			if(item.regex){
				var result = validate(e,item.regex);
				error(e,result,item.msg);
				isvalid=isvalid & result;
			}
			
			//无法通过正则表达式验证
			if(item.fun){
				var result=item.fun();
				error(e,result,item.msg);
				isvalid=isvalid & result;
			}
			
		});
		
		return isvalid?true:false;
	};
	
	$.fn.validateForm=function(validateRules){
		
		var el=this;
		
		$(validateRules).each(function(i,item){
			
			//每个输入框之后添加提示信息；
			var e=el.find("#"+item.id);
			
			var $span_1=$("<span>").addClass("mark");		//正确错误标记
			e.after($span_1);
			
			var $span_2=$("<span>").addClass("prompt");		//错误提示
			$span_1.after($span_2);
			
			
			//注册验证相关的事件，keyup(自动根据正则去验证)
			if(item.regex){
				e.bind("blur",function(event){
						if(event.which==9) return false;
						var result=validate(e,item.regex);
						error(e,result,item.msg);
						return false;
					});
			}
			
			//无法通过正则表达式验证
			if(item.fun){
				e.bind("blur",function(event){
					if(event.which==9) return false;
					var result=item.fun();
					error(e,result,item.msg);
					return false;
				});
			}
			
			
		});
	};
	
	function validate($obj,reg){
		var val=$obj.val();
		//进行正则表达式验证
		var regex=new RegExp(reg);
		return regex.test(val);
	}
	
	function error($obj,result,msg){	
		if(!result){
			
			$obj.addClass("error");
			$obj.nextAll("span.mark")
				.css({"color":"#ff0000","font-size":"16px"})
				.html(wrong);
			
			$obj.nextAll("span.prompt")
				.css({"color":"#ff0000","background-color":"#FFCCFF","font-size":"16px"})
				.html(msg);
		} else {
			$obj.removeClass("error");
			$obj.nextAll("span.mark")
				.css({"color":"#008000"})
				.html(right);
			
			$obj.nextAll("span.prompt")
				.css({"color":"#008000","background-color":"#CCFFCC"})
				.html("");
		}
	}
	
	
})(jQuery);
//对用户的输入进行校验

var user = {

	init : function() {
		var _this = this;
		//为注册按钮进行绑定click事件
		$("#reg").click(function() {
			//客户端表单验证通过后执行
			var isValid = $.validateForm(_this.validateRules);
		});
		//对用户的输入绑定验证
		$("#inputForm").addClass("validate_form").validateForm(_this.validateRules);
	},
	validateRules : [{
		"id" : "memberMobile",
		"msg" : "手机号码格式不正确",
		"fun" : function() {
			var $telNum = $("#memberMobile").val().trim();
			var url = "http://tcc.taobao.com/cc/json/mobile_tel_segment.htm";
			$.ajax({
				type : "GET",
				url : url,
				data : {
					tel : $telNum
				},
				dataType : "jsonp",
				jsonp : 'callback',
				success : function(json) {
					return json.mts != null;
				}
			});
		}
	}, {
		"id" : "password",
		"msg" : "密码格式不正确",
		"fun" : function() {
			var len = $("#password").val().trim().length;
			return len >= 0 & len <= 20;
		}
	}, {
		"id" : "memberEmail",
		"regex" : "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$",
		"msg" : "邮箱格式错误"
	}]
};

$(function() {
	user.init();
});

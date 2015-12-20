$(function() {
	//初始化汽车购买页面信息
	cardBuy.init();
});

//选项卡切换
var cardBuy = {
	init : function() {
		var _this = this;
		//初始化右边功能菜单
		_this.initMenu();
		//绑定增加和较少数量的方法
		$('#increase').click(function() {
			_this.increase();
		});
		$('#decrease').click(function() {
			_this.decrease();
		});
		//绑定输入数量验证方法
		$("input[name='buyCount']").keyup(function() {
			_this.checkNum();
		});
		$("input[name='buyCount']").blur(function(){
			//检测数量有效性
			_this.validCount();
		});
	},
	initMenu : function() {
		var _this = this;
		//特效
		$("#main_right_middle_title_last").css("width", $("#tab-container").width() - $("#main_right_middle_title ul").width() - 70);
		//绑定右边功能菜单
		$("#main_right_middle_title li").bind("click", function() {
			//右边功能菜单
			var a = "url(images/tabs_bg.jpg)  no-repeat scroll -110px 0 ";
			$("#main_right_middle_title li").css({
				"background" : a
			});
			$("#main_right_middle_title li").children("a").css("color", "#36F");

			$(this).css({
				"background" : "url(images/tabs_bg.jpg) no-repeat scroll 0 0"
			});
			$(this).children("a").css("color", "#FFF");
			//判断当前点击的是哪一个选项
			var cname = $(this).attr('class');
			if (cname == 'a3') {
				//显示产品简介层
				$('#tab-01').show();
				$('#tab-02').hide();
			}
			if (cname == 'a2') {
				$('#tab-01').hide();
				//显示特别约定层
				$('#tab-02').show();
			}
		});
		$($("#main_right_middle_title li").get(1)).css({
			"background" : "url(images/tabs_bg.jpg) repeat-y scroll 0 0"
		});
		$($("#main_right_middle_title li").get(1)).children("a").css("color", "#FFF");
	},
	validCount:function(){
		var tagNum = $("input[name='buyCount']").attr('tag');
		$("input[name='buyCount']").val(tagNum);
	},
	checkNum : function() {
		//取出当前input中tag隐藏值
		var tagNum = $("input[name='buyCount']").attr('tag');
		//得到为输入前的值
		var v_count = $("input[name='buyCount']").val();
		if (isNaN(v_count)) {
			alert('请输入有效数字!');
			//保留原来的值
			$("input[name='buyCount']").val(tagNum);
		}
	},
	getSum : function() {
		//目前数量
		var v_count = $('input.input_buyCount').val();
		//目前单价
		var v_price = $('#unitPrice').text();
		//计算总价
		var v_sum = v_price * v_count;
		$("#sumPrice").text(v_sum);
		$('input.input_buyCount').attr('tag',v_count);
	},
	increase : function() {
		var _this = this;
		//得到当前文本框中的值
		var v_count = $('input.input_buyCount').val();
		if (!isNaN(v_count)) {
			v_count = parseInt(v_count) + 1;
			$('input.input_buyCount').val(v_count);
			//计算总价并将值填入
			_this.getSum();
		}
	},
	decrease : function() {
		var _this = this;
		//得到当前文本框中的值
		var v_count = $('input.input_buyCount').val();
		if (!isNaN(v_count)) {
			v_count = parseInt(v_count) - 1;
			if (v_count < 1) {
				v_count = 1;
			}
			$('input.input_buyCount').val(v_count);
			_this.getSum();
		}
	}
};

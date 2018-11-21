$(function() {
	jsToStyle();
	function jsToStyle() { //	js加载样式
		//		蒙版
		$('.coverall').height($(window).height());
		$('.coverall').width($(window).width());
//		item
		$('.publicItem-contentRight').each(function(){
			var that=$(this);
			that.width(that.parents('.publicItem-content').width()-that.siblings('.publicItem-contentLeft').width())
		})
	}

})
(function($$, $) {
	init($$, $);
	type=0;
})(mui, jQuery);
function init($$, $){
//	data
	var currYear = (new Date()).getFullYear();
	$("#selectTimestart").mobiscroll({
		preset: 'date' ,
		theme: 'android-ics light', 
		startYear: currYear - 2, 
		endYear: currYear + 2 ,
		mode: 'scroller', 
		lang: 'zh',
	});
	$("#selectTimeend").mobiscroll({
		preset: 'date' ,
		theme: 'android-ics light', 
		startYear: currYear - 2, 
		endYear: currYear + 2 ,
		mode: 'scroller', 
		lang: 'zh',
	});
//	用户类型
	if(userType==0){
		$('.usertype0').stop().show();
		$('.usertype1').stop().hide();
		$('#selectlh').on('click',function(){
			mui.toast('请选择小区');
		});
		$('#selectdyh').on('click',function(){
			mui.toast('请选择楼号');
		});
		xQList();
	}else{
		$('.usertype0').stop().hide();
		$('.usertype1').stop().show();
		azdzList();
	}
//	echart
	$('head').append($('<script charset="utf-8" src="/js/front/static/echarts-all.js" type="text/javascript"></script>'));
	jsStyle();
	var legend= {data: ['进水压力']};
	var xAxisList=['0:00', '3:00', '6:00', '9:00', '12:00', '15:00', '18:00', '21:00', '24:00'];
	var seriesList=[{type: 'line',data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6]}];
	echartInit(legend,xAxisList,seriesList);
//	tab
	$('.itemmobile').on('click',function(){getByType($(this))});
}
function echartInit(legend,xAxisList,seriesList){
	chartOption = {
			legend:legend,
			toolbox: {show: false,feature: {mark: {show: true},dataView: {show: true,readOnly: false},magicType: {show: true,type: ['line', 'bar']},restore: {show: true},saveAsImage: {show: true}}},
			calculable: false,
			grid: {x: 35,x2: 10,y: 30,y2: 25},
			xAxis: [{type: 'category',data: []}],
			yAxis: [{type: 'value',splitArea: {show: true}}],
			series: []
		};
	chartOption.xAxis[0].data=xAxisList;
	chartOption.series=seriesList;
	var lineChart = echarts.init(document.getElementById('lineChart'));
	lineChart.setOption(chartOption);
}
function jsStyle(){
		$('.chartBox').height($(window).height() - $('.publicNav').height() - $('.topBox').height() - 20);
		$('.chartBox').html($('<div class="chart" id="lineChart"></div>'));
}
function typeList(){
	var url='';
	switch (type) {
	case 0:
		url='/ihds/statistics/front/ylqxList';
		break;
	case 1:
		url='/ihds/statistics/front/llqxList';
		break;
	case 2:
		url='/ihds/statistics/front/wdqxList';
		break;
	case 3:
		url='/ihds/statistics/front/rlqxList';
		break;
	case 4:
		url='/ihds/statistics/front/snwwdqxList';
		break;
	default:
		url='/ihds/statistics/front/ylqxList';
		break;
	}
	list(url);
}
function list(url){
	var xq=$('#selectXq').html()=='请选择小区'?'':$('#selectXq').html();
	var lh=$('#selectlh').html()=='请选择楼号'?'':$('#selectlh').html();
	var dyh=$('#selectdyh').html()=='请选择楼号'?'':$('#selectdyh').html();
	var azdz=$('#selectAzdd').html()=='请选择安装地点'?'':$('#"selectAzdd"').html();
	var kssj=$('#selectTimestart').val()==''?'':$('#selectTimestart').val();
	var jssj=$('#selectTimeend').val()==''?'':$('#selectTimeend').val();
	$.ajax({
		url : url,
		type : "post",
		data:{
			'userid':memId,
			'usertype':userType,
			'xq':xq,
			'lh':lh,
			'dyh':dyh,
			'azdz':azdz,
			'kssj':kssj,
			'jssj':jssj,
		},
		error : function(request) {
			mui.toast("Connection error");
		},
		success : function(res) {
			console.log(res)
			if (res.code==0) {
				var dataList=res.data;
				switch (type) {
				case 0:
					var legend= {data: ['进水压力', '回水压力','换热站进水压力', '换热站回水压力']};
					var seriesList=[{name: '进水压力',type: 'line',data: []},{name: '回水压力',type: 'line',data: []},{name: '换热站进水压力',type: 'line',data: []},{name: '换热站回水压力',type: 'line',data: []}];
					var xAxisList=[];
					for(var i=0;i<dataList.length;i++){
						xAxisList.push(dataList[i].sj);
						seriesList[0].data.push(dataList[i].jsyl);
						seriesList[1].data.push(dataList[i].hsyl);
						seriesList[2].data.push(dataList[i].jsyl_2);
						seriesList[3].data.push(dataList[i].hsyl_2);
					}
					echartInit(xAxisList,seriesList);
					break;
				case 1:
					var legend= {data: []};
					var seriesList=[{name: '温度曲线',type: 'line',data: []}];
					var xAxisList=[];
					for(var i=0;i<dataList.length;i++){
						xAxisList.push(dataList[i].sj);
						seriesList[0].data.push(dataList[i].ll);
					}
					echartInit(legend,xAxisList,seriesList);
					break;
				case 2:
					var legend= {data: ['进水温度', '回水温度','换热站进水温度', '换热站回水温度']};
					var seriesList=[{name: '进水温度',type: 'line',data: []},{name: '回水温度',type: 'line',data: []},{name: '换热站进水温度',type: 'line',data: []},{name: '换热站回水温度',type: 'line',data: []}];
					var xAxisList=[];
					for(var i=0;i<dataList.length;i++){
						xAxisList.push(dataList[i].sj);
						seriesList[0].data.push(dataList[i].jswd);
						seriesList[1].data.push(dataList[i].hswd);
						seriesList[2].data.push(dataList[i].jswd_2);
						seriesList[3].data.push(dataList[i].hswd_2);
					}
					echartInit(legend,xAxisList,seriesList);
					break;
				case 3:
					var legend= {data: []};
					var seriesList=[{name: '热量曲线',type: 'line',data: []}];
					var xAxisList=[];
					for(var i=0;i<dataList.length;i++){
						xAxisList.push(dataList[i].sj);
						seriesList[0].data.push(dataList[i].rl);
					}
					echartInit(legend,xAxisList,seriesList);
					break;
				case 4:
					var legend= {data: ['室内温度', '室外温度']};
					var seriesList=[{name: '室内温度',type: 'line',data: []},{name: '室外温度',type: 'line',data: []}];
					var xAxisList=[];
					for(var i=0;i<dataList.length;i++){
						xAxisList.push(dataList[i].sj);
						seriesList[0].data.push(dataList[i].snwd);
						seriesList[1].data.push(dataList[i].swwd);
					}
					echartInit(legend,xAxisList,seriesList);
					break;
				default:
					var legend= {data: []};
					var xAxisList=[];
					var seriesList=[{type: 'line',data: []}];
					echartInit(legend,xAxisList,seriesList);
					break;
				}
			}else{
				var legend= {data: []};
				var xAxisList=[];
				var seriesList=[{type: 'line',data: []}];
				echartInit(legend,xAxisList,seriesList);
				mui.toast(res.msg);
			}
		}
	});
}
function azdzList(){
	var picker = new mui.PopPicker({ layer: 1 });
	var newarr=[];
	$.ajax({
		url : "/ihds/statistics/front/azdzList",
		type : "post",
		data:{
			'memId':memId,
			'userType':userType,
		},
		success : function(res) {
			console.log(res)
			if (res.code==0) {
				var oldarr=res.data;
				for(var i=0;i<oldarr.length;i++){
					var obj={value: '',text: '',};
					obj.value=oldarr[i].azdz;
					obj.text=oldarr[i].azdz;
					newarr.push(obj)
				}
				picker.setData(newarr);
				$('#selectAzdd').on('click', function() {
					picker.show(function(SelectedItem) {
						$('#selectAzdd').html(SelectedItem[0].value);
					})
				});
			}else{
				mui.toast(res.msg);
			}
		}
	});
}

function xQList(){
	var picker = new mui.PopPicker({ layer: 1 });
	var newarr=[];
	$.ajax({
		url : "/ihds/statistics/front/xQList",
		type : "post",
		data:{
			'memId':memId,
			'userType':userType,
		},
		success : function(res) {
			console.log(res)
			if (res.code==0) {
				var oldarr=res.data;
				for(var i=0;i<oldarr.length;i++){
					var obj={value: '',text: '',};
					obj.value=oldarr[i].xq;
					obj.text=oldarr[i].xq;
					newarr.push(obj)
				}
				picker.setData(newarr);
				$('#selectlh').unbind('click');
				$('#selectXq').html('请选择小区');
				$('#selectXq').on('click', function() {
					picker.show(function(SelectedItem) {
						$('#selectXq').html(SelectedItem[0].value);
						$('#selectlh').unbind('click');
						$('#selectdyh').unbind('click');
						$('#selectlh').html('请选择楼号');
						$('#selectdyh').html('请选择单元号');
						$('#selectdyh').on('click',function(){
							mui.toast('请选择楼号');
						});
						lhList();
					})
				});
			}else{
				mui.toast(res.msg);
			}
		}
	});
}
function lhList(){
	var picker = new mui.PopPicker({ layer: 1 });
	var newarr=[];
	var xq=$('#selectXq').html()=='请选择小区'?'':$('#selectXq').html();
	$.ajax({
		url : "/ihds/statistics/front/lhList",
		type : "post",
		data:{
			'xq':xq
		},
		success : function(res) {
			console.log(res)
			if (res.code==0) {
				var oldarr=res.data;
				for(var i=0;i<oldarr.length;i++){
					var obj={value: '',text: '',};
					obj.value=oldarr[i].lh;
					obj.text=oldarr[i].lh;
					newarr.push(obj)
				}
				picker.setData(newarr);
				$('#selectlh').on('click', function() {
					picker.show(function(SelectedItem) {
						$('#selectlh').html(SelectedItem[0].value);
						$('#selectdyh').unbind('click');
						$('#selectdyh').html('请选择单元号');
						dyhList();
					})
				});
			}else{
				mui.toast(res.msg);
			}
		}
	});
}
function dyhList(){
	var picker = new mui.PopPicker({ layer: 1 });
	var newarr=[];
	var xq=$('#selectXq').html()=='请选择小区'?'':$('#selectXq').html();
	var lh=$('#selectlh').html()=='请选择楼号'?'':$('#selectlh').html();
	$.ajax({
		url : "/ihds/statistics/front/dyhList",
		type : "post",
		data:{
			'xq':xq,
			'lh':lh,
		},
		success : function(res) {
			console.log(res)
			if (res.code==0) {
				var oldarr=res.data;
				for(var i=0;i<oldarr.length;i++){
					var obj={value: '',text: '',};
					obj.value=oldarr[i].dyh;
					obj.text=oldarr[i].dyh;
					newarr.push(obj)
				}
				picker.setData(newarr);
				$('#selectdyh').on('click', function() {
					picker.show(function(SelectedItem) {
						$('#selectdyh').html(SelectedItem[0].value);
					})
				});
			}else{
				mui.toast(res.msg);
			}
		}
	});
}
function getByType(item){
	if($(item).hasClass('itemactive')){
		return false;
	}else{
		$('.itemmobile').removeClass('itemactive');
		$(item).addClass('itemactive');
		type=$(item).index('.itemmobile');
		console.log(type);
		if(type==4){
			$('.usertype0').stop().hide();
			$('.usertype1').stop().hide();
		}else{
			if(userType==0){
				$('.usertype0').stop().show();
				$('.usertype1').stop().hide();
			}else{
				$('.usertype0').stop().hide();
				$('.usertype1').stop().show();
			}
		}
		jsStyle();
		typeList();
//		var xq=$('#selectXq').html()=='请选择小区'?'':$('#selectXq').html();
//		var lh=$('#selectlh').html()=='请选择楼号'?'':$('#selectlh').html();
//		var dyh=$('#selectdyh').html()=='请选择楼号'?'':$('#selectdyh').html();
//		var azdz=$('#selectAzdd').html()=='请选择安装地点'?'':$('#"selectAzdd"').html();
//		var kssj=$('#selectTimestart').val()==''?'':$('#selectTimestart').val();
//		var jssj=$('#selectTimeend').val()==''?'':$('#selectTimeend').val();
//		if(xq==''||lh==''||dyh==''||azdz==''){
//			return false;
//		}else{
//			
//		}
		
	}
}

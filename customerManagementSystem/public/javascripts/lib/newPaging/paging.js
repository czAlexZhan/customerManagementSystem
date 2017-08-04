// 引入jBox相关js、css文件
document.write("<script type='text/javascript' src='javascripts/lib/jBox/jquery.jBox-2.3.min.js'></script>");
document.write("<script type='text/javascript' src='javascripts/lib/jBox/i18n/jquery.jBox-zh-CN.js'></script>");
document.write("<link type='text/css' rel='stylesheet' href='javascripts/lib/jBox/Skins/Blue/jbox.css'/>");


var pager = {
	pagerId: 'div_pager',// 分页组件div id
	resultId: 'listView1',// 搜索结果显示页
	currentPage: 1,// 当前页
	totalPage: 1,// 总页数
	actionName: '',// action请求
	param: {},// 表单参数
	fn: {},
	
	/**
	 * 初始化
	 */
	init: function(obj) {
		this.pagerId = (obj.pagerId != null && obj.pagerId != '') ? obj.pagerId : 'div_pager';
		this.resultId = (obj.resultId != null && obj.resultId != '') ? obj.resultId : 'listView1';
		
		this.actionName = (obj.actionName != null && obj.actionName != '') ? obj.actionName : '';
		this.param = obj.param;
		this.currentPage = isNaN(this.param.currentPage) ? 1 : parseInt(this.param.currentPage);
		
		this.fn = obj.fn;
		
		if(this.currentPage < 1) {
			this.currentPage = 1;
		}
		
		//生成分页控件Html
		this.search(this.currentPage);
	},
	
	/**
	 * 生成分页组件
	 */
	generPageHtml : function(currentPage){
	
		currentPage = parseInt(currentPage);
		this.totalPage = (this.totalPage <= 1) ? 1: this.totalPage;// 判断总页数
		if(currentPage > this.totalPage) { // 判断当前页
			currentPage = this.totalPage;
		}
		var hasPrv = (currentPage > 1); // 是否有上一页
		var hasNext = (currentPage < this.totalPage); // 是否有下一页
		var prv = (currentPage<=2) ? 1 : (currentPage-1); // 上一页的页数是？
		var next = (currentPage >= this.totalPage-1) ? this.totalPage : (currentPage + 1);// 下一页的页数是？
		
		var str_prv = '', str_next = '', str_goFirst = '', str_goFinal = '';
		if(hasPrv){
			str_goFirst = '<a class="goFirst" onclick="pager.search(1);"><img src="/javascripts/lib/newPaging/images/goFirstImg_A.png"/></a>';
			str_prv = '<a href="javascript:void(0);" onclick="pager.search('+prv+');" title="上页">上页</a>';
		}else{
			str_goFirst = '<span class="goFirst"><img src="/javascripts/lib/newPaging/images/goFirstImg_X.png"/></span>';
			str_prv = '<span class="disabled">上页</span>';
		}
		
		if(hasNext){
			str_goFinal = '<a class="goFirst" onclick="pager.search('+this.totalPage+');"><img src="/javascripts/lib/newPaging/images/goFinalImg_A.png"/></a>';
			str_next = '<a href="javascript:void(0);" onclick="pager.search('+next+');" title="下页">下页</a>';
		}else{
			str_goFinal = '<span class="goFirst"><img src="/javascripts/lib/newPaging/images/goFinalImg_X.png"/></span>';
			str_next = '<span class="disabled">下页</span>';
		}
		
		
		var str = '';
		var dot = '<span>...</span>';
		var totalPage_info = '<span class="normalsize">共'+this.totalPage+'页，到第 '+
				'<input id="btn_go_input" type="text" onkeyup="checkNum(this)" onafterpaste="checkNum(this)"/>'+
				' 页<input id="btn_go" type="button" value="确定" onclick="pager.gopage();"/></span>';
		
		//分页处理
		if(this.totalPage <= 8){// 总页数少于等于8，则全部显示
			for(var i=1;i<=this.totalPage;i++){
				if(currentPage == i){
					str += '<span class="curr">'+i+'</span>';
				}else{
					str += '<a href="javascript:void(0);" onclick="pager.search('+i+');" title="第'+i+'页">'+i+'</a>';
				}
			}
		}else{// 大于8的情况
			if(currentPage <= 5){//当前页少于5的情况，则不设置【...】过渡字段
				for(var i=1;i<=7;i++){// 直接显示1-7页
					if(currentPage == i){
						str += '<span class="curr">'+i+'</span>';
					}else{
						str += '<a href="javascript:void(0);" onclick="pager.search('+i+');" title="第'+i+'页">'+i+'</a>';
					}
				}
				str += dot;// 7页之后用【...】过渡
			}else{// 当前页为大于5的情况，前面显示1-2页，然后【...】过渡，然后显示目标页前后各两页，例如当前页为第8页，则【1 2 ... 6 7 8 9 10 ...】这样显示
				str += '<a href="javascript:void(0);" onclick="pager.search(1);" title="第1页">1</a>';
				str += '<a href="javascript:void(0);" onclick="pager.search(2);" title="第2页">2</a>';
				str += dot;
				
				var begin = currentPage - 2;
				var end = currentPage + 2;
				if(end > this.totalPage){
					end = this.totalPage;
					begin = end - 4;
					if(currentPage - begin < 2){
						begin = begin-1;
					}
				}else if(end + 1 == this.totalPage){
					end = this.totalPage;
				}
				for(var i=begin;i<=end;i++){
					if(currentPage == i){
						str += '<span class="curr">'+i+'</span>';
					}else{
						str += '<a href="javascript:void(0);" onclick="pager.search('+i+');" title="第'+i+'页">'+i+'</a>';
					}
				}
				if(end != this.totalPage){
					str += dot;
				}
			}
		}
		
		str = "&nbsp;" + str_goFirst + str_prv + str + str_next + str_goFinal + totalPage_info;
		$("#"+this.pagerId).html(str);
	},
	
	/**
	 * 输入页面跳转
	 */
	gopage: function() {
		var pageNum = $("#btn_go_input").val();
		if(parseInt(pageNum) > this.totalPage) {
			pageNum = this.totalPage;
		} 
		if(parseInt(pageNum) < 1 || pageNum == '') {
			pageNum = 1;
		} 
		this.search(pageNum);
	},
	
	/**
	 * ajax查询数据
	 */
	search: function(currentPage) {
		$.jBox.tip("数据加载中", "loading");
		this.param.currentPage = parseInt(currentPage);
		$.ajax({
            url: this.actionName,
            async: true,
            type: "POST",
            data: this.param ,
            success : function(result) {
            	$.jBox.closeTip();
            	
				$("#"+pager.resultId).html(result);// 设置显示结果
				pager.totalPage = parseInt($("#"+pager.resultId+" #totalPage").val() != "" ? $("#"+pager.resultId+" #totalPage").val() : 0);// 获取总页数
				//生成分页控件Html
				pager.generPageHtml(currentPage);// 重新生成分页组件
				if(pager.fn != null) {
					// 函数
					pager.fn();
				}
            }
		});
	}
	
};

/**
 *	jBox弹窗分页组件
 **/
var jBoxPager = {
	pagerId: 'jBox_pager',// 分页组件div id
	resultId: 'jBox_resultView',// 搜索结果显示页
	jBoxId: 'jBoxId',
	currentPage: 1,// 当前页
	totalPage: 1,// 总页数
	actionName: '',// action请求
	param: {},// 表单参数
	fn: {},
	
	/**
	 * 初始化
	 */
	init: function(obj) {
		this.pagerId = (obj.pagerId != null && obj.pagerId != '') ? obj.pagerId : 'jBox_pager';
		this.resultId = (obj.resultId != null && obj.resultId != '') ? obj.resultId : 'jBox_resultView';
		this.jBoxId = (obj.jBoxId != null && obj.jBoxId != '') ? obj.jBoxId : 'jBoxId';
		
		this.actionName = (obj.actionName != null && obj.actionName != '') ? obj.actionName : '';
		this.param = obj.param;
		this.currentPage = isNaN(this.param.currentPage) ? 1 : parseInt(this.param.currentPage);
		
		this.fn = obj.fn;
		
		if(this.currentPage < 1) {
			this.currentPage = 1;
		}
		
		//生成分页控件Html
		this.search(this.currentPage);
	},
	
	/**
	 * 生成分页组件
	 */
	generPageHtml : function(currentPage){
	
		currentPage = parseInt(currentPage);
		this.totalPage = (this.totalPage <= 1) ? 1: this.totalPage;// 判断总页数
		if(currentPage > this.totalPage) { // 判断当前页
			currentPage = this.totalPage;
		}
		var hasPrv = (currentPage > 1); // 是否有上一页
		var hasNext = (currentPage < this.totalPage); // 是否有下一页
		var prv = (currentPage<=2) ? 1 : (currentPage-1); // 上一页的页数是？
		var next = (currentPage >= this.totalPage-1) ? this.totalPage : (currentPage + 1);// 下一页的页数是？
		
		var str_prv = '', str_next = '', str_goFirst = '', str_goFinal = '';
		if(hasPrv){
			str_goFirst = '<a class="goFirst" onclick="jBoxPager.search(1);"><img src="/javascripts/lib/newPaging/images/goFirstImg_A.png"/></a>';
			str_prv = '<a href="javascript:void(0);" onclick="jBoxPager.search('+prv+');" title="上页">上页</a>';
		}else{
			str_goFirst = '<span class="goFirst"><img src="/javascripts/lib/newPaging/images/goFirstImg_X.png"/></span>';
			str_prv = '<span class="disabled">上页</span>';
		}
		
		if(hasNext){
			str_goFinal = '<a class="goFirst" onclick="jBoxPager.search('+this.totalPage+');"><img src="/javascripts/lib/newPaging/images/goFinalImg_A.png"/></a>';
			str_next = '<a href="javascript:void(0);" onclick="jBoxPager.search('+next+');" title="下页">下页</a>';
		}else{
			str_goFinal = '<span class="goFirst"><img src="/javascripts/lib/newPaging/images/goFinalImg_X.png"/></span>';
			str_next = '<span class="disabled">下页</span>';
		}
		
		
		var str = '';
		var dot = '<span>...</span>';
		var totalPage_info = '<span class="normalsize">共'+this.totalPage+'页，到第 '+
				'<input id="jBox_btn_go_input" type="text" onkeyup="checkNum(this)" onafterpaste="checkNum(this)"/>'+
				' 页<input id="jBox_btn_go" type="button" value="确定" onclick="jBoxPager.gopage();"/></span>';
		
		//分页处理
		if(this.totalPage <= 8){// 总页数少于等于8，则全部显示
			for(var i=1;i<=this.totalPage;i++){
				if(currentPage == i){
					str += '<span class="curr">'+i+'</span>';
				}else{
					str += '<a href="javascript:void(0);" onclick="jBoxPager.search('+i+');" title="第'+i+'页">'+i+'</a>';
				}
			}
		}else{// 大于8的情况
			if(currentPage <= 5){//当前页少于5的情况，则不设置【...】过渡字段
				for(var i=1;i<=7;i++){// 直接显示1-7页
					if(currentPage == i){
						str += '<span class="curr">'+i+'</span>';
					}else{
						str += '<a href="javascript:void(0);" onclick="jBoxPager.search('+i+');" title="第'+i+'页">'+i+'</a>';
					}
				}
				str += dot;// 7页之后用【...】过渡
			}else{// 当前页为大于5的情况，前面显示1-2页，然后【...】过渡，然后显示目标页前后各两页，例如当前页为第8页，则【1 2 ... 6 7 8 9 10 ...】这样显示
				str += '<a href="javascript:void(0);" onclick="jBoxPager.search(1);" title="第1页">1</a>';
				str += '<a href="javascript:void(0);" onclick="jBoxPager.search(2);" title="第2页">2</a>';
				str += dot;
				
				var begin = currentPage - 2;
				var end = currentPage + 2;
				if(end > this.totalPage){
					end = this.totalPage;
					begin = end - 4;
					if(currentPage - begin < 2){
						begin = begin-1;
					}
				}else if(end + 1 == this.totalPage){
					end = this.totalPage;
				}
				for(var i=begin;i<=end;i++){
					if(currentPage == i){
						str += '<span class="curr">'+i+'</span>';
					}else{
						str += '<a href="javascript:void(0);" onclick="jBoxPager.search('+i+');" title="第'+i+'页">'+i+'</a>';
					}
				}
				if(end != this.totalPage){
					str += dot;
				}
			}
		}
		
		str = "&nbsp;" + str_goFirst + str_prv + str + str_next + str_goFinal + totalPage_info;
		$(this.jBoxId + "#"+this.pagerId).html(str);
	},
	
	/**
	 * 输入页面跳转
	 */
	gopage: function() {
		var pageNum = $("#jBox_btn_go_input").val();
		if(parseInt(pageNum) > this.totalPage) {
			pageNum = this.totalPage;
		} 
		if(parseInt(pageNum) < 1 || pageNum == '') {
			pageNum = 1;
		} 
		this.search(pageNum);
	},
	
	/**
	 * ajax查询数据
	 */
	search: function(currentPage) {
		$.jBox.tip("数据加载中", "loading");
		this.param.currentPage = parseInt(currentPage);
		$.ajax({
            url: this.actionName,
            async: true,
            type: "POST",
            data: this.param ,
            success : function(result) {
            	$.jBox.closeTip();
				$(jBoxPager.jBoxId + "#"+jBoxPager.resultId).html(result);// 设置显示结果
				jBoxPager.totalPage = parseInt($(jBoxPager.jBoxId + "#"+jBoxPager.resultId+" #totalPage").val()!=""?$(jBoxPager.jBoxId + "#"+jBoxPager.resultId+" #totalPage").val():0);// 获取总页数
				//生成分页控件Html
				jBoxPager.generPageHtml(currentPage);// 重新生成分页组件
				// 函数
				jBoxPager.fn();
            }
		});
	}
	
};


/***************前台分页开始*********************/

var showPageList;
//前台分页 使用方法，引用/javascripts/lib/newPaging/newPaging.css, 
//					/javascripts/lib/newPaging/paging.js ,
//		 调用pagingColumnByForegroundNew(divId,showList,pageSize);

/**
参数一：要生成分页控件位置的id名
参数二：要进行分页的集合对象（tr集合）
参数三：每页条数
*/
function pagingColumnByForegroundNew(divId,showList,pageSize){
	//pageDivId++;
	$("#"+divId).html("");
	var pageDiv="";
	//pagingColumnShowList=showList;
	pageDiv += "<div id='div_pager'>";
	pageDiv += " <a class='goFirst' id='pagingColumnFirstPage"+divId+"' title='首页' ><img src='/javascripts/lib/newPaging/images/goFirstImg_A.png'/></a>";
	pageDiv += " <a class='' id='pagingColumnUpPage"+divId+"' title='上一页' >上页 </a>";
	//pageDiv += "<i class='paging_text'>&nbsp;第&nbsp;</i><input type='hidden' id='pagingColumnIndexPage"+divId+"' value='1'/><input type='text' class='paging_input_text' id='pagingColumnCurrentPage"+divId+"' value='1' onkeypress='return noNumbers(event)' />&nbsp;页/共&nbsp;<i class='paging_text' id='pagingColumnTotalPage"+divId+"'></i>页&nbsp;<a class='paging_link page-go' id='pagingColumnSkip"+divId+"' title='GO' >GO</a>";
	
	pageDiv += "<span id='page_span'></span>";
	
	//pageDiv += "每页<input type='text' id='pagingColunmSelect"+divId+"' style='width:40px;' value='"+pageSize+"' onkeypress='return noNumbers(event)' />条记录&nbsp;|&nbsp;";
	pageDiv += "<input type='hidden' id='pagingColunmSelect"+divId+"' style='width:40px;' value='"+pageSize+"' />";
	pageDiv += " <a class='' id='pagingColumnDownPage"+divId+"' title='下一页' >下页</a>";
	pageDiv += " <a class='goFirst' id='pagingColumnLastPage"+divId+"' title='末页' ><img src='/javascripts/lib/newPaging/images/goFinalImg_A.png'/></a>";

	pageDiv += '<span class="normalsize">共<i class="paging_text" id="pagingColumnTotalPage'+divId+'"></i>页，到第<input type="hidden" id="pagingColumnIndexPage'+divId+'" value="1"/> '+
				'<input class="btn_go_input" id="pagingColumnCurrentPage'+divId+'" type="text" value="" onkeyup="checkNum(this)" onafterpaste="checkNum(this)"/>'+
				' 页<input class="btn_go" id="pagingColumnSkip'+divId+'" type="button" value="确定"/></span>';
	pageDiv += "</div>";
	$("#"+divId).html(pageDiv);
	var pagingColumnCount=divId;
	showPageList=showList;
	pagingColumnChangePage(showList,pagingColumnCount);
	$("#pagingColumnSkip"+pagingColumnCount).click(function(){
		pagingColumnChangePage(showList,pagingColumnCount);
	});
	$("#pagingColumnFirstPage"+pagingColumnCount).click(function(){
		showPagingColumnFirstPage(showList,pagingColumnCount);
	});
	$("#pagingColumnUpPage"+pagingColumnCount).click(function(){
		showPagingColumnUpPage(showList,pagingColumnCount);
	});
	$("#pagingColumnDownPage"+pagingColumnCount).click(function(){
		showPagingColumnDownPage(showList,pagingColumnCount);
	});
	$("#pagingColumnLastPage"+pagingColumnCount).click(function(){
		showPagingColumnLastPage(showList,pagingColumnCount);
	});
}


//分页功能
function pagingColumnChangePage(showList,pagingColumnCount){
	var list = showList;
	var count = list.length;
	var currentPage = $("#pagingColumnCurrentPage"+pagingColumnCount).val();
	if(($.trim(currentPage)=="" || parseInt(currentPage)==0) && count!=0){//yuan.yw 2013-08-14 输入框页数为0时处理
		currentPage="1"; 
		$("#pagingColumnCurrentPage"+pagingColumnCount).val("1");
	}else if(($.trim(currentPage)=="" || parseInt(currentPage)==0||!(/^[1-9]+[0-9]*$/).test(currentPage)) ){
		if(parseInt(count)==0){
			$("#pagingColumnCurrentPage"+pagingColumnCount).val("0");
			$("#pagingColumnIndexPage"+pagingColumnCount).val("0");
		}else {
			$("#pagingColumnCurrentPage"+pagingColumnCount).val("1");
			$("#pagingColumnIndexPage"+pagingColumnCount).val("1");
		}
		if(isNaN(currentPage)){
		   currentPage = 1;
		}
	}

	var pageSize = $("#pagingColunmSelect"+pagingColumnCount).val();
	var lastPage = pagingColumnTotalPage(count,pageSize);
	//console.log(currentPage+"----"+lastPage);
	if(currentPage > lastPage){
		currentPage=lastPage;
		$("#pagingColumnCurrentPage"+pagingColumnCount).val(lastPage);
		$("#pagingColumnIndexPage"+pagingColumnCount).val(lastPage);
	}
	
	var str = '';
	var dot = '<span>...</span>';	
	//分页处理
	if(lastPage <= 8){// 总页数少于等于8，则全部显示
		for(var i=1;i<=lastPage;i++){
			if(currentPage == i){
				str += '<span class="curr">'+i+'</span>';
			}else{
				str += '<a href="javascript:void(0);" onclick="searchPage('+i+',\''+pagingColumnCount+'\');" title="第'+i+'页">'+i+'</a>';
			}
		}
	}else{// 大于8的情况
		if(currentPage <= 5){//当前页少于5的情况，则不设置【...】过渡字段
			for(var i=1;i<=7;i++){// 直接显示1-7页
				if(currentPage == i){
					str += '<span class="curr">'+i+'</span>';
				}else{
					str += '<a href="javascript:void(0);" onclick="searchPage('+i+',\''+pagingColumnCount+'\');" title="第'+i+'页">'+i+'</a>';
				}
			}
			str += dot;// 7页之后用【...】过渡
		}else{// 当前页为大于5的情况，前面显示1-2页，然后【...】过渡，然后显示目标页前后各两页，例如当前页为第8页，则【1 2 ... 6 7 8 9 10 ...】这样显示
			str += '<a href="javascript:void(0);" onclick="searchPage(1,\''+pagingColumnCount+'\');" title="第1页">1</a>';
			str += '<a href="javascript:void(0);" onclick="searchPage(2,\''+pagingColumnCount+'\');" title="第2页">2</a>';
			str += dot;
			//console.log("currentPage:"+currentPage);
			var begin = currentPage - 2;
			var end = parseInt(currentPage) + 2;
			if(end > lastPage){
				end = lastPage;
				begin = end - 4;
				if(currentPage - begin < 2){
					begin = begin-1;
				}
			}else if(end + 1 == lastPage){
				end = lastPage;
			}
			for(var i=begin;i<=end;i++){
				if(currentPage == i){
					str += '<span class="curr">'+i+'</span>';
				}else{
					str += '<a href="javascript:void(0);" onclick="searchPage('+i+',\''+pagingColumnCount+'\');" title="第'+i+'页">'+i+'</a>';
				}
			}
			if(end != lastPage){
				str += dot;
			}
		}
	}
	$("#"+pagingColumnCount+" #page_span").html(str);
	
	var currentList = doPage(list,currentPage,pageSize);
	$.each(list,function(){
		$(this).hide();
	});
	$.each(currentList,function(){
		$(this).show();
	});
	$("#pagingColumnTotalPage"+pagingColumnCount).html(lastPage);
	$("#pagingColumnIndexPage"+pagingColumnCount).val(currentPage);//当前页 隐藏域值 yuan.yw 2013-08-14
	/*
	if(currentPage==1){
		$("#pagingColumnFirstPage").attr("disabled",true);
		$("#pagingColumnUpPage").attr("disabled",true);
		$("#pagingColumnDownPage").attr("disabled",false);
		$("#pagingColumnLastPage").attr("disabled",false);
	}else if(currentPage == lastPage){
		$("#pagingColumnFirstPage").attr("disabled",false);
		$("#pagingColumnUpPage").attr("disabled",false);
		$("#pagingColumnDownPage").attr("disabled",true);
		$("#pagingColumnLastPage").attr("disabled",true);
	}else{
		$("#pagingColumnFirstPage").attr("disabled",false);
		$("#pagingColumnUpPage").attr("disabled",false);
		$("#pagingColumnDownPage").attr("disabled",false);
		$("#pagingColumnLastPage").attr("disabled",false);
	}*/
}

//显示首页
function showPagingColumnFirstPage(showList,pagingColumnCount){
	var list = showList;
	var currentPage = 1;
	var pageSize = $("#pagingColunmSelect"+pagingColumnCount).val();
	var currentList = doPage(list,currentPage,pageSize);
	$.each(list,function(){
		$(this).hide();
	});
	$.each(currentList,function(){
		$(this).show();
	});
	$("#pagingColumnCurrentPage"+pagingColumnCount).val(currentPage);
	$("#pagingColumnIndexPage"+pagingColumnCount).val(currentPage);//当前页 隐藏域值 yuan.yw 2013-08-14
	pagingColumnChangePage(showList,pagingColumnCount);
	/*
	$("#pagingColumnFirstPage").attr("disabled",true);
	$("#pagingColumnUpPage").attr("disabled",true);
	$("#pagingColumnDownPage").attr("disabled",false);
	$("#pagingColumnLastPage").attr("disabled",false);
	*/
}

//显示上一页
function showPagingColumnUpPage(showList,pagingColumnCount){
	
	var list = showList;
	//var currentPage = $("#pagingColumnCurrentPage"+pagingColumnCount).val();
	var currentPage = $("#pagingColumnIndexPage"+pagingColumnCount).val();//yuan.yw 2013-08-14
	if(currentPage==1){
		return;
	}
	if(!(/^[1-9]+[0-9]*$/).test(currentPage)) {
		return;
	}
	currentPage--;
	var pageSize = $("#pagingColunmSelect"+pagingColumnCount).val();
	var currentList = doPage(list,currentPage,pageSize);
	$.each(list,function(){
		$(this).hide();
	});
	$.each(currentList,function(){
		$(this).show();
	});
	$("#pagingColumnIndexPage"+pagingColumnCount).val(currentPage);//当前页 隐藏域值 yuan.yw 2013-08-14
	$("#pagingColumnCurrentPage"+pagingColumnCount).val(currentPage);
	/*
	if(currentPage==1){
		$("#pagingColumnFirstPage").attr("disabled",true);
		$("#pagingColumnUpPage").attr("disabled",true);
		$("#pagingColumnDownPage").attr("disabled",false);
		$("#pagingColumnLastPage").attr("disabled",false);
	}else{
		$("#pagingColumnFirstPage").attr("disabled",false);
		$("#pagingColumnUpPage").attr("disabled",false);
		$("#pagingColumnDownPage").attr("disabled",false);
		$("#pagingColumnLastPage").attr("disabled",false);
	}
	*/
	pagingColumnChangePage(showList,pagingColumnCount);
}

//显示下一页
function showPagingColumnDownPage(showList,pagingColumnCount){
	
	var list = showList;
	var count = list.length;
	//var currentPage = $("#pagingColumnCurrentPage"+pagingColumnCount).val();
	var currentPage = $("#pagingColumnIndexPage"+pagingColumnCount).val();//yuan.yw 2013-08-14
	if(!(/^[1-9]+[0-9]*$/).test(currentPage)) {
		return;
	}
	var pageSize = $("#pagingColunmSelect"+pagingColumnCount).val();
	var lastPage = pagingColumnTotalPage(count,pageSize);
	if(currentPage >= lastPage){
		currentPage = lastPage;
	}
	if(currentPage < lastPage){
		currentPage++;
	}
	var currentList = doPage(list,currentPage,pageSize);
	$.each(list,function(){
		$(this).hide();
	});
	$.each(currentList,function(){
		$(this).show();
	});
	$("#pagingColumnIndexPage"+pagingColumnCount).val(currentPage);//当前页 隐藏域值 yuan.yw 2013-08-14
	$("#pagingColumnCurrentPage"+pagingColumnCount).val(currentPage);
	/*
	if(currentPage==lastPage){
		$("#pagingColumnFirstPage").attr("disabled",false);
		$("#pagingColumnUpPage").attr("disabled",false);
		$("#pagingColumnDownPage").attr("disabled",true);
		$("#pagingColumnLastPage").attr("disabled",true);
	}else{
		$("#pagingColumnFirstPage").attr("disabled",false);
		$("#pagingColumnUpPage").attr("disabled",false);
		$("#pagingColumnDownPage").attr("disabled",false);
		$("#pagingColumnLastPage").attr("disabled",false);
	}*/
	pagingColumnChangePage(showList,pagingColumnCount);
}

//显示尾页
function showPagingColumnLastPage(showList,pagingColumnCount){
	
	var list = showList;
	var count = list.length;
	var currentPage = $("#pagingColumnCurrentPage"+pagingColumnCount).val();
	if(!(/^[1-9]+[0-9]*$/).test(currentPage)) {
		return;
	}
	var pageSize = $("#pagingColunmSelect"+pagingColumnCount).val();
	var lastPage = pagingColumnTotalPage(count,pageSize);
	currentPage = lastPage;
	var currentList = doPage(list,currentPage,pageSize);
	$.each(list,function(){
		$(this).hide();
	});
	$.each(currentList,function(){
		$(this).show();
	});
	$("#pagingColumnIndexPage"+pagingColumnCount).val(currentPage);//当前页 隐藏域值 yuan.yw 2013-08-14
	$("#pagingColumnCurrentPage"+pagingColumnCount).val(currentPage);
	/*
	$("#pagingColumnFirstPage").attr("disabled",false);
	$("#pagingColumnUpPage").attr("disabled",false);
	$("#pagingColumnDownPage").attr("disabled",true);
	$("#pagingColumnLastPage").attr("disabled",true);
	*/
	pagingColumnChangePage(showList,pagingColumnCount);
}
function searchPage(currentPage,pagingColumnCount){
	$("#pagingColumnIndexPage"+pagingColumnCount).val(currentPage);
	$("#pagingColumnCurrentPage"+pagingColumnCount).val(currentPage);
	pagingColumnChangePage(showPageList,pagingColumnCount);
}
//分页逻辑
/**
参数一：要分页的集合
参数二：当前页
参数三：每页显示的数量
*/
function doPage(list,currentPage,pageCount){
	var currentIndex=(currentPage-1)*pageCount;
	var pageList=new Array();
	var count=pageCount;
	$.each(list,function(index,obj){
		if(count==0){
			return false;
		}
		if(index >= currentIndex){
			pageList.push(obj);
			count--;
		}
	});
	return pageList;
}

//计算总页数
/**
参数一：总行数
参数二:每页显示的数量
*/
function pagingColumnTotalPage(listCount,pageSize){
	var lastPage = parseInt(listCount / pageSize);
	var remainder = listCount % pageSize;
	if( remainder > 0 ){
		lastPage++;
	}
	return lastPage;
}
/***************前台分页结束*********************/

function checkNum(node){
	var reg = new RegExp("^\\+?[1-9][0-9]*$", "g");// g表示全局 验证非零的正整数
	var num  = node.value;
	
	if(!reg.test(num)) {
		node.value = "";
	}
	  
}
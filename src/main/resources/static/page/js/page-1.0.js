//==================================================
//        数据分页JS_v1.0 2016-4-22
//================================================

/**
 * 加载分页信息
 * @param data  
 */
function initPage(data){
	var view = "";
	if(data.totalElements>0){
		var currentPage = data.pageable.pageNumber+1;
		view +=" <tbody></table></div><div >"
		+"<table style='width:100%;border:0px;background:none'>"
		+"<tr class='tr_pagenumber'>"
		+"<td style='vertical-align:top; text-align: center;border:0px'><div class='pagination' style='padding-top: 0px;margin-top: 0px;'>";
		if(data.totalElements>0){
		view = view+"<ul class='pagination'>";
		if(currentPage==1){
			view = view+"<li class='previous'><a> 首页</a></li>"
			+"<li><a>&laquo;</a></li>";
		}else{						
			view = view+"<li style=\"cursor:pointer;\"><a onclick=\"nextPage(1)\" class='previous'>首页</a></li>"
			+"<li style=\"cursor:pointer;\"><a onclick=\"nextPage("+(currentPage-1)+")\">&laquo;</a></li>";
		}
		var showTag = 5;//分页标签显示数量
		var startTag = 1;
		if(currentPage>showTag){
			startTag = currentPage-1;
		}
		var endTag = startTag+showTag-1;
		for(var i=startTag; i<=data.totalPages && i<=endTag; i++){
			if(currentPage==i){
				view = view+"<li class='active'><a><font color='#FFF'>"+i+"</font></a></li>";
			}else{
				view = view+"<li style=\"cursor:pointer;\"><a onclick=\"nextPage("+i+")\">"+i+"</a></li>";
			}
		}
		if(currentPage==data.totalPages){
			view = view+"	<li><a>&raquo;</a></li>"
			+"<li class='next'><a>尾页 </a></li>";
		}else{
			view = view+"	<li style=\"cursor:pointer;\"><a onclick=\"nextPage("+(currentPage+1)+")\">&raquo;</a></li>"
			+"	<li style=\"cursor:pointer;\" class='next'><a onclick=\"nextPage("+data.totalPages+")\">尾页 </a></li>";
		}
		view = view+"</ul>";					
		}
		view = view+ "</div></td>"
		+"</tr><input type='hidden' id='currPageNumber' value="+ currentPage +">"
		+"</table>"
		+"</div>";
			}
		//弹出
		$("#pageDiv").html(view);  
}

//下一页
function nextPage(page){	
	selectAll(page);//页数页面回掉方法
}
//获取页数
function getPageNum(page){
	if(!page){
		page = 1;
	}
	return page;
}


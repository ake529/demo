var sssize;
$(function(){
	 document.title = "三办后台系统-视图变更日志列表页面";
	 getPageData(1,getsize());
})

function getPageData(page, size) {
	var viewId = $("#iframepage").val();
	var result = null;
	ssszie = $("#sssize").val();
	if(size == null){
		page = pagenum(page);
	}else if(ssszie != size){
		page = pagenum(1);
	}
	if(getsize() == null){
		size = 10
	}
	if(size==null){
		size = getsize();
	}
	
	 $.ajax({
         type:"post",
         url:basePath+"/ViewModules/getViewLog",
         data: {
             pageNum: page,
             pageSize: size,
             viewId: viewId
         },
         async: false,
         success:function(data){
        	 result = data;
        	 if(size == null){
				   $("#sssize").val(pagesize);
			   }else{
				   $("#sssize").val(size);
			   }
        	 var page = data.resultData.content;
             var view = "";
             if (page == null || page.length == 0) {
                 view = view + "<tr ><td colspan=\"5\" style='text-align:center;'><span class='glyphicon glyphicon-info-sign' style='color:#0682E3'></span>&nbsp;暂无数据</td></tr>";
             } else {
            	var number = 1;
             	for (var i = 0; i < page.length; i++) {
                     view  += '<tr style="cursor:pointer;" ondblclick="updateTd(this)"><td>'
                         + number++
                         + '</td>'
                         + '<td class="doubleClick" title=\"'+page[i].viewVersion+'\" style=\'min-width: 50px;max-width:105px;word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; word-wrap:break-word;\'>'
                         + page[i].viewVersion
                         + '</td>'
                         + '<td class="doubleClick" title=\"'+page[i].viewName+'\" style=\'min-width: 50px;max-width:105px;word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; word-wrap:break-word;\'>'
                         + page[i].viewName
                         + '</td>'
                         + '<td class="doubleClick" title=\"'+page[i].createTime+'\" style=\'min-width: 50px;max-width:105px;word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; word-wrap:break-word;\'>'
                         + page[i].createTime
                         + '</td>';
                     view  += '<td >'
                		 +   '<button class="btn btn-edit" onclick="getview(\''+page[i].id+'\')" >查看</button></td></tr>';
                 }
             }
             $("#tbody").html(view);
             pageInt(result.resultData);
         }
     });       
}

/*
 * 由于td里面的内容过多，手动控制显示全部或显示部分
 */
function updateTd(id){
	var wordBreak = $(id).find("td.doubleClick:last").attr("style").indexOf("white-space");
	if(wordBreak != (-1)){
		$(id).find("td").css({"white-space":"","overflow":"","text-overflow":""});
	}else{
		$(id).find("td").css({"white-space":"nowrap","overflow":"hidden","text-overflow":"ellipsis"});
	}
}

function getview(viewLogId){
	 var url = "modules/view/dialog/viewShowDialog.html";
	 var pageTitle = "查看视图记录";
	$.dialog({
        id: "editViewDialog",
        title: pageTitle,
        width: 900,
        height: 500,
        lock: true,
        max:false,
        padding: 0,
        fixed:true,
        zIndex: 500,
        background: '#dd0726', /* 背景色 */
        opacity: 0.5, /* 透明度 */
        content: 'url:' + url,
        data: {"viewLogId":viewLogId},
        modal: true,
    });
}

/**
 * 返回应用列表
 */
function returnViewList(){
	$("#iframepage").load(basePath+"/modules/view/list.html");
}

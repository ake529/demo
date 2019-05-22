var sssize;
$(function(){
	 document.title = "测试列表页面";
	 getPageData(1,getsize());
	 $('#viewName').on('change',getPageData(1,getsize()));
})
function getBasePath(){ 
	 var pathName = document.location.pathname; 
	 var index = pathName.substr(1).indexOf("/"); 
	 var result = pathName.substr(0,index+1); 
	 return result; 
}

function getPath(){  
	 return window.location.protocol +"//"+ window.location.host+getBasePath();
}

var basePath = getPath();
function getPageData(page, size) {
	var result = "";
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
         type:"get",
         url:basePath+"/dept/getDeptListByDept",
         data: {
        	 page: page-1,
             size: size,
             deptName: $("#viewName").val(),
             //inValuesViewState:"0,2,3",
             useState:"1"
         },
         async: false,
         success:function(data){
        	 result = data;
        	 if(size == null){
				   $("#sssize").val(pagesize);
			   }else{
				   $("#sssize").val(size);
			   }
        	 console.log(data);
        	 var page = data.content;
             var view = "";
             if (page == null || page.length == 0) {
                 view = view + "<tr><td colspan=\"7\" style='text-align:center;'><span class='glyphicon glyphicon-info-sign' style='color:#0682E3'></span>&nbsp;暂无数据</td></tr>";
             } else {
             	for (var i = 0; i < page.length; i++) {
                     view  += '<tr style="cursor:pointer;" ondblclick="updateTd(this)"><td>'
                         + page[i].id
                         + '</td>'
                         + '<td class="doubleClick" title=\"'+page[i].deptName+'\" style=\'min-width: 50px;max-width:105px;word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; word-wrap:break-word;\'>'
                         + page[i].deptName
                         + '</td>'
                         + '<td class="doubleClick" title=\"'+page[i].deptlevel+'\" style=\'min-width: 50px;max-width:105px;word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; word-wrap:break-word;\'>'
                         + page[i].deptlevel
                         + '</td>'
                         + '<td class="doubleClick" title=\"'+page[i].createTime+'\" style=\'min-width: 50px;max-width:105px;word-break:keep-all; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; word-wrap:break-word;\'>'
                         + page[i].createTime
                         + '</td>'
                         +'<td >'
                		 +   '<button class="btn btn-edit" onclick="editView(\''+page[i].deptName+'\',\''+page[i].id+'\')" >查看部门信息</button>&nbsp'
                		 +   '<button class="btn btn-danger" onclick="del(\''+page[i].id+'\')" >删除</button>&nbsp'
                         + '</td>'
                         + '</tr>';
                 }
             }
             $("#tbody1").html(view);
             //$("#divpage").show();
             pageInt(result);
             
//             if(10 <= data.totalResult){
//			    }else{
//			    	$("#divpage").html("");
//			    }
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
//enter事件
document.onkeydown=function(e){
    var isFocus = $("#viewName").val()!=null;
    if(isFocus){
        var ev = document.all ? window.event : e;
        if(e.keyCode==13){
        	 getPageData(0,getsize());
        }
    } 
}




function editView(name,id){
	  var url = "../view/dialog/add.html";
	    pageTitle = "编辑节点";   	    
	    $.dialog({
	        id: "labelListDialog",
	        title: pageTitle,
	        width: 600,
	        height: 250,
	        lock: true,
	        max:false,
	        padding: 0,
	        fixed:true,
	        zIndex: 500,
	        background: '#dd0726', /* 背景色 */
	        opacity: 0.5, /* 透明度 */
	        content: 'url:' + url,
	        data: {name:name,id:id},
	        cancelVal : '关闭',
	        modal: true,
	        button: [{
	                name: '提交',
	                callback: function (data) {               	
	                	var result = this.content.addOrUpdate();
	                	 getPageData(1, 10);
                		if(null == result){
	                		return true;
	                	}
	                },
	                focus: true
	            }
	        ]
	    }); 
	
}

function showResult(result){
	 if(result.resultCode=="SUCCESS"){
				  layer.msg(result.resultMsg, {
	                 icon : 1
	             });	 
	    }else{
				  layer.msg(result.resultMsg, {
	                 icon : 2
	             });
	    }
	 getPageData(1,getsize());
}




//审核提交
function auditSubmit(applicationId){
	layer.alert('你确定提交审核吗？', {
			skin: 'layui-layer-lan' //样式类名  自定义样式
			,closeBtn: 1    // 是否显示关闭按钮
			,anim: 1 //动画类型
		  ,btn: ['确定', '取消']
		  ,yes: function(index){
			  $.ajax({
			         type:"post",
			         url:basePath+"/ApplicationModules/update",
			         data:{
			        	 applicationId:applicationId,
			        	 applicationState:"1"
			         },
			         dataType:"json",
			         async: false,
			         success:function(data){
			        	 showResult(data)
			         }
			     }); 
		    layer.close(index);
		  }
	});
}

/**
 * 查看应用修改记录
 * applicationId 应用主键Id
 */
function showChangeRecord(id){
	$("#iframepage").val(id);
	$("#iframepage").load(basePath+"/modules/view/changeRecordList.html");
}
/**
 * 获取项目名
 * 形如：/trade
 */
function del(id){
	$.ajax({
		type:"post",
		url:basePath+"/dept/deleteDept",
		data:{id:id},
		dataType:"text",
		async: false,
		success:function(data){
			getPageData(1,getsize());
				alert("删除成功！");
		
		}
	})
}
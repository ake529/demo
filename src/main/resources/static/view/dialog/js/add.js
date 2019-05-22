api = frameElement.api, W = api.opener;
$(function(){
	 document.title = "部门详细页面";
	 //getPageData();
	 var name=api.data.name;
	 if(name != null){
		 getData(name);
	 }
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
//编辑应用信息
function getData(name){
	
	$.ajax({
		 type:"get",
         url:basePath+"/dept/getDept",
         data:{
        	 name:name
          },
          dataType:"json",
          async: false,
          success:function(data){
        	  $("#node").val(data.deptName);
        	  $("#url").val(data.deptlevel);
        	  $("#address").val(data.deptNickName);
        	  $("#port").val(data.dptmAdminName);
          }
	})
}
//新建应用
var flag="";		
function addOrUpdate(){		
	var node = $("#node").val();
	var url = $("#url").val();
	var name = $("#name").val();
	/*var password = $("#password").val();*/
	var address = $("#address").val();
	var port = $("#port").val();
		 $.ajax({
	         type:"Put",
	         url:basePath+"/dept/addDept",
	         data:{
	        	deptName:node,
	        	id:api.data.id,
	        	deptlevel:url,
	        	deptNickName:address,
	        	dptmAdminName:port
	         },
	         dataType:"json",
	         async: false,
	         success:function(data){
	            alert("提交成功！");
	         }	        
	     });      

}


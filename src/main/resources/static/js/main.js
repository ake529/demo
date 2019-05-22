/**
 * 
 */
window.onload = function(){
	document.title = "个人资料-统一用户";
	view();
};
//查询用户资料
function view(){
	var myDate=new Date() ;
	$.ajax({
		type : "POST",
		url :"http://192.168.81.13:8080/demo/dept/deleteDept",
		data:{id:"4028d18d67aa85290167aa9761e40001",appId:"123",appKey:"key123"},
		async:false,
		success : function(data) {
			console.log(data);
		}
	});
}
api = frameElement.api, W = api.opener;
$(function(){
	 document.title = "三办后台系统-应用列表页面";
	 if(api.data.viewLogId!=""){
		 getViewModules(api.data.viewLogId)
	//		 $("#applicationId").val(api.data.applicationId);
	//		 findFieldInfo();
	//		 $("#useState").val(api.data.useState)
	//		 if(api.data.useState=="2"){
	//			 $("#viewId").val("");
	//			 
	//		 }
	//		 $("#picture").on("click", function() {
	//			$("#uploadImg").click();
	//			$("#uploadImg").change(function(){
	//				upload();
	//			});
	//		 });
		 $('#editViewFrom').find('input,button').attr('disabled',true);
		 $('#tbody').find('input,select,button').attr('disabled',true);
	 }
})

function findFieldInfo(){
	$.ajax({
        type:"post",
        url:basePath+"/FieldInfo/getByViewIdBasis",
        data:{
        	viewId:$("#viewId").val()
        },
        dataType:"json",
        async: false,
        success:function(data){
        	if(""!=data.resultData){
        		var dataList = data.resultData;
        		var html = "";
        		var fixedField = ["title","userid","username","operationid"];
        		var fixed = [];
        		var notfixed = [];
        		for(var i in dataList){
        			var field = dataList[i].field.toLowerCase();
        			if($.inArray(field,fixedField) != -1){
        				fixed.push(dataList[i])
        			}else{
        				notfixed.push(dataList[i]);
        			}
        		}
        		html = fixedArrangement(fixed.concat(notfixed));
        		
        		$("#tbody").html(html);
        	}
        }
    }); 
}


function fixedArrangement(dataList){
	var html = "";
	
	for(var i in dataList){
		var id = dataList[i].id;
		var field = dataList[i].field;
		var fieldName = dataList[i].fieldName;
		var fieldType = dataList[i].fieldType.toUpperCase();
		var fieldLength = dataList[i].fieldLength==null?"": dataList[i].fieldLength;
		var required = dataList[i].required;
		var fieldNote = dataList[i].fieldNote==null?"":dataList[i].fieldNote;
		var isFile = dataList[i].isFile;
		
		var tr = "<tr>";
		
		if(field=="title" ||field=="userid" || field == "username" || field == "operationid"){
			tr +=  "<td><input type = 'hidden' name = 'id' value = \'"+id+"\' /><input type = 'text' name = 'field' title = \'"+field+"\' value = \'"+field+"\' readonly='readonly' /></td>";
			tr +=  "<td><input type = 'text' name = 'fieldName' title = \'"+fieldName+"\' value = \'"+fieldName+"\' /></td>"
				 +  "<td>"
				 +   "<select name='fieldType' onclick='dynamic(this)' disabled='disabled'>";
		}else{
			tr +=  "<td><input type = 'hidden' name = 'id' value = \'"+id+"\' /><input type = 'text' name = 'field' title = \'"+field+"\' value = \'"+field+"\' /></td>";
			tr +=  "<td><input type = 'text' name = 'fieldName' title = \'"+fieldName+"\' value = \'"+fieldName+"\' /></td>"
				 +  "<td>"
				 +   "<select name='fieldType' onclick='dynamic(this)'>";
		}
			
			if(isFile){
				fieldType = "FILE";
			}
			
		  switch (fieldType) {
			case "VARCHAR":
				tr +=    "<option value = 'VARCHAR'>VARCHAR</option>"
	             +    "<option value = 'DATETIME'>DATETIME</option>"
	             +    "<option value = 'BIGINT'>BIGINT</option>"
	             +    "<option value = 'DOUBLE'>DOUBLE</option>"
	             +    "<option value = 'FILE'>FILE</option>";
				break;
			case "DATETIME":
				tr +=    "<option value = 'DATETIME'>DATETIME</option>"
				 +    "<option value = 'VARCHAR'>VARCHAR</option>"
	             +    "<option value = 'BIGINT'>BIGINT</option>"
	             +    "<option value = 'DOUBLE'>DOUBLE</option>"
	             +    "<option value = 'FILE'>FILE</option>";
				break;
			case "BIGINT":
				tr +=    "<option value = 'BIGINT'>BIGINT</option>"
				 +    "<option value = 'DATETIME'>DATETIME</option>"
				 +    "<option value = 'VARCHAR'>VARCHAR</option>"
	             +    "<option value = 'DOUBLE'>DOUBLE</option>"
	             +    "<option value = 'FILE'>FILE</option>";
				break;
			case "DOUBLE":
				tr +=    "<option value = 'DOUBLE'>DOUBLE</option>"
				 +    "<option value = 'BIGINT'>BIGINT</option>"
				+    "<option value = 'DATETIME'>DATETIME</option>"
				 +    "<option value = 'VARCHAR'>VARCHAR</option>"
				 +    "<option value = 'FILE'>FILE</option>";
				break;
			case "FILE":
				tr +=    "<option value = 'FILE'>FILE</option>"
				 +   "<option value = 'DOUBLE'>DOUBLE</option>"
				 +    "<option value = 'BIGINT'>BIGINT</option>"
				 +    "<option value = 'DATETIME'>DATETIME</option>"
				 +    "<option value = 'VARCHAR'>VARCHAR</option>";
				break;
			default:
				break;
			}
		    tr +=        	"</select>"
			 +			"</td>";
		    
		    
		    if(fieldType == "VARCHAR" || fieldType == "FILE"){
		    	tr +=  "<td><input type ='text' name = 'fieldLength' value = \'"+fieldLength+"\' onkeyup='this.value=this.value.replace(/[^0-9-]+/,\"\")' /></td>"
		    }else{
		    	tr +=  "<td><input type ='text' name = 'fieldLength' value = \'"+fieldLength+"\' disabled /></td>"
		    }
			 
		    if(field=="title" ||field=="userid" || field == "username" || field == "operationid"){
				 	tr +=	"<td> 是否非空：<input type ='checkbox' name = 'required'  checked = 'checked' disabled='disabled'/></td>";
				 }else{
					 if(required == "no"){
   					 tr +=	"<td> 是否非空：<input type ='checkbox' name = 'required'  /></td>";
   				 }else{
   					 tr +=	"<td> 是否非空：<input type ='checkbox' name = 'required'  checked = 'checked'/></td>";
   				 }
				 }
			 
			 tr +=  "<td><input type = 'text' name = 'fieldNote' value = \'"+fieldNote+"\' /></td>";
			 
			 if(field=="title" ||field=="userid" || field == "username" || field == "operationid"){
				 tr +="<td><button class='btn btn-danger' onclick='deleteField(this);' disabled='disabled'>删除</button></td></tr>";
			 }else{
				 tr +="<td><button class='btn btn-danger' onclick='deleteField(this);' >删除</button></td></tr>";
			 }
				
		 	html += tr;
	}
	
	return html;
}

function dynamic(select){
	var $select = $(select);
	var select = $select.val();
	if(select=="VARCHAR" || select=="FILE"){
		$select.parent().next().find('input').attr('disabled',false);
	}else{
		$select.parent().next().find('input').attr('disabled',true);
	}
}

function tableToJson(){
	var html = [];
	$('#tbody').find('tr').each(function () {  
		var field = $(this).find('td').find('[name="field"]').val();
    	if(!isEmpty(field)){
    		var tr = {};
            $(this).find('td').each(function () {
               var id = $(this).find('[name="id"]').val();
               if(id){
             	   tr.id = id;
               }
               var field = $(this).find('[name="field"]').val();
               if(field){
            	   tr.field = field;
               }
               var fieldName = $(this).find('[name="fieldName"]').val();
               if(fieldName){
            	   tr.fieldName = fieldName;
               }
               var fieldType = $(this).find('[name="fieldType"]').val();
               if(fieldType){
            	   tr.fieldType = fieldType;
               }
               var fieldLength = $(this).find('[name="fieldLength"]').val();
               if(fieldLength){
            	   tr.fieldLength = fieldLength;
               }
               var requiredLength =$(this).find('[name="required"]').length;
               if(requiredLength>0){
            	   var required = $(this).find('[name="required"]').is(':checked');
                   if(required){
                	   tr.required = "yes";
                   }else{
                	   tr.required = "no";
                   }
               }
               var fieldNote = $(this).find('[name="fieldNote"]').val();
               if(fieldNote){
            	   tr.fieldNote = fieldNote;
               }
               
               tr.useState = api.data.useState;
            })  
            html.push(tr);
    	}else{
    		return false;
    	}
    })
    
    return JSON.stringify(html);
}

//根据id查询
function getViewModules(id){
	var result = null
	 $.ajax({
         type:"post",
         url:basePath+"/ViewModules/getViewModules",
         data:{"viewLogId":id},
         dataType:"json",
         async: false,
         success:function(data){
        	 if(data.resultData!=null){
        		 initHtml(data.resultData,"editViewFrom");
        		 var json = $.parseJSON(data.resultData.changeAfter);
        		 
        		 console.info(json);
        		var html = "";
        		var fixedField = ["title","userid","username","operationid"];
         		var fixed = [];
         		var notfixed = [];
         		for(var i in json){
         			var field = json[i].field.toLowerCase();
         			if($.inArray(field,fixedField) != -1){
         				fixed.push(json[i])
         			}else{
         				notfixed.push(json[i]);
         			}
         		}
         		html = fixedArrangement(fixed.concat(notfixed));
         		$("#tbody").html(html);
         		
        		 var files = data.resultData.fileNames;
        		 if(files!=null && files!=""){
        			 files = files.split(',');
        			 for(var i=0;i<files.length; i++){
        				 console.info(files[i]);
            			 var html = '<div>'
            	               + '<span>'+files[i]+'</span>'
            	               +'</div>';
                	
            	               var $div = $("#files").find("div").length;
            	               if($div >= 1){
            	            	    $div = $($("#files").find("div")[$("#files").find("div").length-1]);
            	            	    $div.after(html);
            	               }else{
            	            	    $("#files").html(html);
            	               }
            		 }
        		 }
        	 }
         }
     }); 
}

function addField(tr){
	var $tr = $($("#tbody").find("tr")[$("#tbody").find("tr").length-1]);
	var html = "<tr>"
			 +  "<td><input type = 'hidden' name = 'id'/><input type = 'text' name = 'field' placeholder='字段' /></td>"
			 +  "<td><input type = 'text' name = 'fieldName' placeholder='中文名称' /></td>"
			 +  "<td>"
			 +        "<select name='fieldType' onclick='dynamic(this)'>"
             +       				"<option value = 'VARCHAR'>VARCHAR</option>"
             +        				"<option value = 'DATETIME'>DATETIME</option>"
             +        				"<option value = 'BIGINT'>BIGINT</option>"
             +        				"<option value = 'DOUBLE'>DOUBLE</option>"
             +        				"<option value = 'FILE'>FILE</option>"
             +        			"</select>"
			 +			"</td>"
			 +  "<td><input type ='text' name = 'fieldLength' placeholder='长度' onkeyup='this.value=this.value.replace(/[^0-9-]+/,\"\")' /></td>"
			 +	"<td> 是否非空：<input type ='checkbox' name = 'required' /></td>"
			 +  "<td><input type = 'text' name = 'fieldNote' placeholder='备注' /></td>"
			 +  "<td><button class='btn btn-danger' onclick='deleteField(this);' >删除</button></td></tr>";
	$tr.after(html)
}

function deleteField(tr){
	var $tr = $(tr).parent().parent();
	$tr.remove()
}

var download = path+"/file/download?attachmentId=";

function upload(){
    $.ajaxFileUpload({
        url: path+"/file/fileUpload", 
        type: 'post',
        secureuri: false, // 一般设置为false
        fileElementId: "uploadImg", // 上传文件的id、name属性名
        dataType: 'text', // 返回值类型，一般设置为json、application/json
        success: function(data, status){
            if(data !=null && data !=''){
            	var jsonObj = $.parseJSON(data.replace(/<.*?>/ig,""));
            	if(jsonObj.originalFile==""){
            		return;
            	}	
            	  var html = '<div>'
	               + '<a href = "'+download+jsonObj.attachmentId+'" >'+jsonObj.originalFile+'</a>|<a href = "#" onclick="deleteDiv(this,\''+jsonObj.newFile+'\',\''+jsonObj.attachmentId+'\')" >删除</a>'
	               + '<input type = "hidden" name = "fileAddress" value = '+jsonObj.attachmentId+' />'
	               +'</div>';
    	
	               var $div = $("#files").find("div").length;
	               if($div >= 1){
	            	    $div = $($("#files").find("div")[$("#files").find("div").length-1]);
	            	    $div.after(html);
	               }else{
	            	    $div = $("#files").html(html);
	               }
            }
        }
    });
}

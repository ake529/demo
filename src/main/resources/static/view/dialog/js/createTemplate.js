$(function(){
    $("#picture").on("click", function() {
        $("#uploadImg").click();
        upload();
    });
});
//上传图片
function upload(){
    $('#uploadImg').fileupload({
        url : BASEPATH + '/file/fileUpload',//请求发送的目标地址
        Type : 'POST',//请求方式 ，可以选择POST，PUT或者PATCH,默认POST
        //dataType : 'json',//服务器返回的数据类型
        autoUpload : false,
        acceptFileTypes : /(gif|jpe?g|png|bmp|xls)$/i,//验证图片格式
        maxNumberOfFiles : 100,//最大上传文件数目
        maxFileSize : 10000000, // 文件上限1MB
        minFileSize : 100,//文件下限  100b
        messages : {//文件错误信息
            acceptFileTypes : '文件类型不匹配',
            maxFileSize : '文件过大',
            minFileSize : '文件过小'
        }
    })
    //图片添加完成后触发的事件
        .on("fileuploadadd", function(e, data) {
            //validate(data.files[0])这里也可以手动来验证文件格式和大小

            //隐藏或显示页面元素

            var url = getUrl(data.files[0]);
            var str ="<img class=\"image\" src="+url+"></n>";
            jqXHR = data.submit();
        })
        //当一个单独的文件处理队列结束触发(验证文件格式和大小)
        .on("fileuploadprocessalways", function(e, data) {
            //获取文件
            file = data.files[0];
            //获取错误信息
            if (file.error) {
                console.log(file.error);
            }
        })
        //上传请求失败时触发的回调函数
        .on("fileuploadfail", function(e, data) {
            console.log(data.errorThrown);
        })
        //显示上传进度条
        .on("fileuploadprogressall", function(e, data) {
        })
        //上传请求成功时触发的回调函数
        .on("fileuploaddone", function(e, data) {
            if(data.result.message != undefined){


            }

        })
        //上传请求结束后，不管成功，错误或者中止都会被触发
        .on("fileuploadalways", function(e, data) {
            //getPageData($("#type").val(),$("#filename").text());
        })
    //文件上传前触发事件
    $('#uploadImg').bind('fileuploadsubmit', function (e, data) {
        data.formData = {type : $("#type").val() };  //如果需要额外添加参数可以在这里添加
    });



    //手动验证
    function validate(file) {
        //获取文件名称
        var fileName = file.name;
        //验证图片格式
        if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(fileName)) {
            console.log("文件格式不正确");
            return true;
        }
        //验证excell表格式
        /*  if(!/.(xls|xlsx)$/.test(fileName)){
             alert("文件格式不正确");
             return true;
         } */

        //获取文件大小
        var fileSize = file.size;
        if (fileSize > 1024 * 1024) {
            alert("文件不得大于一兆")
            return true;
        }
        return false;
    }

    //获取图片地址
    function getUrl(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
   /* Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }*/
}
var app = new Vue({
    el:'#app',
    data:{
        message:'Login'
    }
});
var username = new Vue({
    el:'#username',
    data:{
        message:'Username'
    }
});

var password =new Vue ({
    el:'#password',
    data:{
        message:'Password'
    }
});

function wronguser()
{
    var x=document.getElementById("user").value;
    if(x==""||isNaN(x))
    {
        alert("Wrong username or password!");
    }
<<<<<<< HEAD
=======
}*/

function Ajax(json){
    var url=json.url;
    var method=json.method;
    var success=json.success;
    var obj=json.obj;
    var request=null;
    if(window.XMLHttpRequest){
        request=new XMLHttpRequest();
    }else{
        try{
            request=new ActiveObject('Microsoft.XMLHTTP');
        }
        catch(faild){
            alert('Error:Ajax request faild');
        }
    }
    if(request!=null){
        request.onreadystatechange=function(){
            if(request.readyState==4&&request.status==200){
                var text=request.responseText;
                success(text);
            }else{
            }
        }
        request.open(method,url,true);
        request.send(JSON.stringify(obj));
    }
}
function post(){
    obj={
        name:document.getElementsByName('name')[0].value,
        password:document.getElementsByName('password')[0].value
    };
    Ajax({
        url:'/login',
        method:'POST',
        success:function(text){
            document.getElementById('msg').innerText=text;
        },
        obj:obj
    })
>>>>>>> master
}
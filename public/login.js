
function Ajax(json){
    var url=json.url;
    var method=json.method;
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
            if(request.status===401){
                document.getElementById('msg').innerText="Invalid Email or Password!";
            }else if (request.status===200){
                window.location.href = window.location.search.substring(6 ,window.location.search.length);
            }
        };
        request.open(method,url,true);
        request.send(JSON.stringify(obj));
    }
}

function post(){
    obj={
        email:document.getElementsByName('email')[0].value,
        password:document.getElementsByName('password')[0].value
    };
    Ajax({
        url:'/login',
        method:'POST',
        obj:obj
    });
}
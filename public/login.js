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
}
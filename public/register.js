




var password = document.getElementById("password")
    , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
        return false;
    } else {
        confirm_password.setCustomValidity('');
        return true;
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
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
    if (!validatePassword()) {
        document.getElementById('msg').innerText="Password don't match";
        return false;
    }
    if(request!=null){
        request.onreadystatechange=function(){
            if(request.status===401){
                document.getElementById('msg').innerText="Incorrect E-mail Form!";
            }
            if(request.status===422){
                document.getElementById('msg').innerText="Email already been taken!";
            } else if (request.status===200){
                if (request.redirect !== undefined && request.redirect) {
                    window.location.href = request.redirect_url;
                } else {
                    window.location.href = '/forum';
                }
            }
        };
        request.open(method,url,true);
        request.send(JSON.stringify(obj));
    }
}

function post(){
    obj={
        name:document.getElementsByName('name')[0].value,
        firstname:document.getElementsByName('firstname')[0].value,
        lastname:document.getElementsByName('lastname')[0].value,
        email:document.getElementsByName('email')[0].value,
        gender:document.getElementsByName('gender')[0].value,
        password:document.getElementsByName('password')[0].value
    };
    Ajax({
        url:'/register.html',
        method:'POST',
        obj:obj
    });
}

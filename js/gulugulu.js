function isEmail() {
    var emailInput = document.form1.email.value;
    var ePattern =new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");

    if(!ePattern.test(emailInput))
      {
       alert("请填写正确的EMail地址");
       ePattern.focus();
       return false;
       }else{
       daojishi(10,this);
    }


}
function isLogin() {
    // 用户名
    var nameInput=document.form1.name.value;
    var nPattern = new RegExp("^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$");
    if(!nPattern.test(nameInput))
    {
        alert("用户名不正确,至少三个字符，不能含特殊符号");
        nameInput.focus();
        return false;
    }
    // 验证码
    var yzInput=document.form1.yanZhen.value;
    // 设置密码
    var pswInput=document.form1.password.value;
    var pPattern=new RegExp("/^[a-zA-Z0-9_-]{6,16}$/");
    if(!pPattern.test(pswInput))
    {
        alert("密码长度至少要四个字符");
        pswInput.focus();
        return false;
    }
    var pswInput1=document.form1.password1.value;

}

//验证码
// var countdown=60;
// function setTime(val) {
//     if (countdown === 0) {
//         val.removeAttribute("disabled");
//         val.value="获取验证码";
//         countdown = 60;
//     } else {
//         val.setAttribute("disabled", true);
//         val.value="重新发送(" + countdown + ")";
//         countdown--;
//         setTimeout(function() {
//             settime(val)
//         },1000)
//     }
//
// }

// function daojishi(seconds,obj){
//     if (seconds > 1){
//         seconds--;
//         $(obj).val(seconds+"秒后重新获取 ").attr("disabled", true);//禁用按钮
//         // 定时1秒调用一次
//         setTimeout(function(){
//             daojishi(seconds,obj);
//         },1000);
//     }else{
//         $(obj).val("免费获取验证码").attr("disabled", false);//启用按钮
//     }
// }
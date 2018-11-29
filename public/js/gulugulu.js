var tickId = 0;
//验证码时间
var countdown = 60;
var gainVerificationCodeButton;

// 获取验证码按钮点击事件
function gainVerificationCode(button) {
	if (!isEmail()) {
		return;
	}

	gainVerificationCodeButton = button;

	clearInterval(tickId);
	tickId = setInterval(tick, 1000);
	// 先马上执行一次。
	tick();

	// todo jquery请求后台发送验证码

}

function isEmail() {
	var emailInput = document.form1.email.value;
	var ePattern = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");

	if (!ePattern.test(emailInput)) {
		alert("请填写正确的EMail地址");
		ePattern.focus();
		return false;
	}

	return true;
}

// 每秒被执行一次的定时函数。
function tick() {
	countdown--;
	if (countdown <= 0) {
		clearInterval(tickId);
		gainVerificationCodeButton.removeAttribute("disabled");
		gainVerificationCodeButton.value = "获取验证码";
		countdown = 60;
	} else {
		gainVerificationCodeButton.setAttribute("disabled", true);
		gainVerificationCodeButton.value = "重新发送(" + countdown + ")";
	}
}

// 用户名
function isName() {
    var nameInput = document.form1.name.value;
    var nPattern = new RegExp("^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$");
    if (!nPattern.test(nameInput)) {
        alert("用户名不正确,至少三个长度，不能含特殊符号");
        nameInput.focus();
        return false;
    }
}
// 设置密码
function isPsw() {
    var pswInput = document.form1.password.value;
    var pPattern = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$");
    if (!pPattern.test(pswInput)) {
        alert("密码长度6至20个长度，密码需包含字母和数字");
        pswInput.focus();
        return false;
    }
    // 确认密码
    var pswInput1 = document.form1.password1.value;
    if(pswInput1!==pswInput){
        alert("密码前后输入不一致，请重新输入");
        pswInput1.focus();
        return false;
    }
}
//验证码不能空或不正确

function isGainVerificationCode() {
    var gPattern = new RegExp("/^[0-9]+$/");
	var gainInput = document.form1.yanZh.value;
	// var gPattern = new RegExp("/^[0-9]+$/");
	if (!gPattern.test(gainInput)){
	// if(gainInput==""){
		alert("验证码不正确");
		gainInput.focus();
		return false;
	}
}
//登录页面的用户名/邮箱/密码不能为空或不正确


//选中复选框激活按钮
function check(){
    var checkbox = document.getElementById("check1");//选中checkbox的id；
	var stm=document.getElementById("submit");
    if(checkbox.checked===true){//按钮已选中
        stm.removeAttribute("disabled");//移除disabled
    }else{
    	stm.setAttribute("disabled",true);
    }
}


// 注册按钮判断
function isLogin() {
    isName();
    isEmail();
    isGainVerificationCode();
    isPsw();
}

//登录按钮判断
function landing() {
    var nameInput1=document.getElementById("name1").value;
    var pswInput1=document.getElementById("password2").value;
	// var npPattern=new RegExp(" /\\S/");
	if (nameInput1===""||pswInput1===""){
		alert("输入不能为空或不正确！");
		npPattern.focus();
		return false;
	}
}
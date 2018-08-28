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

function isLogin() {
	// 用户名
	var nameInput = document.form1.name.value;
	var nPattern = new RegExp("^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$");
	if (!nPattern.test(nameInput)) {
		alert("用户名不正确,至少三个字符，不能含特殊符号");
		nameInput.focus();
		return false;
	}
	// 验证码
	var yzInput = document.form1.yanZhen.value;
	// 设置密码
	var pswInput = document.form1.password.value;
	var pPattern = new RegExp("/^[a-zA-Z0-9_-]{6,16}$/");
	if (!pPattern.test(pswInput)) {
		alert("密码长度至少要四个字符");
		pswInput.focus();
		return false;
	}
	var pswInput1 = document.form1.password1.value;

}

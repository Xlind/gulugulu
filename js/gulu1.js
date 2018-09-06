var tickId = 0;
//验证码时间
var countdown = 60;
var gainVerificationCodeButton;


$(function(){
	$("#myModal").modal('hide');
});

$(function(){
	$("#myModal").on('hide.bs.modal',function(){
		alert('确定现在就要离开，不完成注册吗？...');
	})
});

/*---------------------------注册输入框验证功能------------------------------------*/
$(
function validator(){
	//输入项验证器
	$('#registFrom').bootstrapValidator({
		live: 'disabled',
		submitButtons: '#submit',
		message:'输入的值无效，请重新输入',
		feedbackIcons:{
			valid:'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields:{
			username:{
				message:'用户名验证失败',
				validators:{
					notEmpty:{
						message:'请填写用户名'
					},
					stringLength:{
						min:2,
						max:20,
						message:'用户名长度在2至20位之间'
					},
					regexp:{
						regexp:/^[0-9a-zA-Z\u4e00-\u9fa5_]{2,16}$/,
						message:'用户名不正确,至少2个长度，不能含特殊符号'
					}
				}
			},
			email:{
				validators:{
					notEmpty:{
						message:'请填写邮箱地址'
					},
					emailAddress:{
						message:'请输入合法的邮箱地址'
					}
				}
			},
			pw1:{
				validators:{
					notEmpty:{
						message:"请输入密码"
					},
					/*stringLength:{
						min:6,
						max:25,
						//message:'密码长度6至25位之间'
					},*/
					regexp:{
						regexp:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
						message:'密码长度6至20个长度，密码需包含字母和数字'
					}/*,
					identical:{
						field:'pw2',
						message:'两次输入密码不一致'
					}*/
					
				}
				
			},
			password:{
				validators:{
					notEmpty:{
						message:'请输入密码'
					},
					/*stringLength:{
						min:6,
						max:25,
						//message:'密码长度6至25位之间'
					},*/
					regexp:{
						regexp:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
						message:'密码长度6至20个长度，密码需包含字母和数字'
					},
					identical:{
						field:'pw1',
						message:'两次输入密码不一致'
					}
					
				}
			},
			code:{
				validators:{
					notEmpty:{
						message:'请输入验证码'
					},
					identical:{
						field:'Codemeg',
						message:'输入的验证码不正确，请重新输入'
					}
				}
			},
			Codemeg:{
				validators:{
					notEmpty:{
						message:''
					}
				}
			}
			
		}
	}).on('success.form.bv',function(e){
		e.preventDefault();
		//alert("Hello");
		//ajax提交
		var str = JSON.stringify({ "name": $("#name").val(), "pwd":$("#password1").val(), "email":$("#email").val() });
		
			$.ajax({
				   type:'post',
				   contentType:'application/json',
				   url:'user/frontendregist.do',
				   dataType:'json',
				   data: str,			  
				   success: function(data){				          
				          if (data.data == "注册成功") {
				        	  alert("注册成功");
				             // window.sessionStorage.setItem("uname", data.data); 
				        	  window.location.href="http://localhost:8000/Gulugulu/";
				          } else {
//				        	  $("#meg").html("登陆错误");
				          }
			          }
				 });
	});	
	          /*  $("#submit").click(function () {//非submit按钮点击后进行验证，如果是submit则无需此句直接验证
                $("#registFrom").bootstrapValidator('validate');//提交验证
                if ($("#fregistFrom").data('bootstrapValidator').isValid()) {//获取验证结果，如果成功，执行下面代码
                    alert("yes");//验证成功后的操作，如ajax
                }
            });*/
}
);


/*---------------------------end注册输入框验证功能------------------------------------*/

/*---------------------------获取验证码功能------------------------------------*/
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
    $.ajax({
        url:"sendIdCode.do",
        type:"GET",
        dataType:'json',
        data:{username:$("#name").val(),mail:$("#email").val()},
        contentType:"application/json",
        //timeout:5000,
        success:function(data){
        	$("#Codemeg").val(data.code);
        },
        error:function(data){
        }
    });

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
//判断是否输入了email地址
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

/*---------------------------end获取验证码功能------------------------------------*/


/*---------------------------勾选checkbox以启动submit按钮------------------------------------*/
function check(){
    var checkbox = document.getElementById("check1");//选中checkbox的id；
	var stm=document.getElementById("submit");
    if(checkbox.checked===true){//按钮已选中
        stm.removeAttribute("disabled");//移除disabled
    }else{
    	stm.setAttribute("disabled",true);
    }
}
/*---------------------------end勾选checkbox以启动submit按钮------------------------------------*/



function isRegister(){
/*	alert("注册成功，正在跳转....");
//	var str = JSON.stringify({ "name": $("#name").val(), "pwd":$("#password1").val(), "email":$("#email").val() });
//
//	$.ajax({
//		   type:'post',
//		   url: "user/frontendregist.do",
//		   dataType:'json',
//		   data: str,
//		   ContentType = 'application/json',
//		   success: function(data){
//		          //alert("Data Loaded: " + JSON.stringify(data));
//		          if (data.data == "success") {
//		        	  $("#meg").html("登陆成功");
//// 		        	  location.reload(true);
//// 		        	  $("#meg").html($("#id").val());
//		          } else {
//		        	  $("#meg").html("登陆错误");
//		          }
//	          }
//		 });
	validator();
	var bootstrapValidator = $("#registFrom").data('bootstrapValidator');
	bootstrapValidator.validate();
	if(bootstrapValidator.inValid()){
		alert("Hello");
	}*/
}



/*---------------------------登录用户------------------------------------*/
//登录用户
function landing() {
	
    var nameInput1=document.getElementById("name1").value;
    var pswInput1=document.getElementById("password2").value;
    var npPattern=new RegExp(" /\\S/");
	if (nameInput1===""||pswInput1===""){
		alert("输入不能为空或不正确！");
		npPattern.focus();
		return false;
	}
	
	var str = JSON.stringify({ "name": $("#name1").val(), "pwd":$("#password2").val() });


	$.ajax({
		   type:'post',
		   url: "user/username.do",
		   dataType:'json',
		   data: str,
		   contentType:"application/json",
		   success: function(data){
		          //alert("Data Loaded: " + JSON.stringify(data));
		          if (data.data == "success") {
					  alert("登录成功，正在跳转......");
		        	  window.location.replace("http://localhost:8000/Gulugulu/");

        	  
//		        	  location.reload(true);
// 		        	  $("#meg").html($("#id").val());
		          } else {
		        	  //$("#loginmeg").val("登陆错误");
		        	  alert("密码错误，请重新登陆");
//					  window.location.replace("http://localhost:8000/Gulugulu/");
		          }
	          }
		 });
	
}


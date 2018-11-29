
// $(function(){
// 	$("#myModal").modal('hide');
// });

$(function(){
	$("#myModal").on('hide.bs.modal',function(){
		alert('确定现在就要离开，不完成注册吗？...');
	})
});

// $(function() {
// 	var sessionUname=$("#sessionUname").html().trim();
// 	console.log("sessionUname is %s",sessionUname);
// 	if(sessionUname!= null){
// 		$("#login").hide();
// 		$("#liH").hide();
// 		$("#register").hide();
// 	}
// 	if(sessionUname==""){
// 		$("#login").show();
// 		$("#liH").show();
// 		$("#register").show();
// 	}
// });

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
	}).on('submit',function(e){
		e.preventDefault();
	var formData = $(this).serialize()
	$.ajax({
	  url: '/register',
	  type: 'post',
	  data: formData,
	  dataType: 'json',
	  success: function (data) {
		var err_code = data.err_code
		if (err_code === 0) {
		  // window.alert('注册成功！')
		  // 服务端重定向针对异步请求无效
		  window.location.href = '/'
		} else if (err_code === 1) {
		  window.alert('邮箱已存在！')
		} else if (err_code === 2) {
		  window.alert('昵称已存在！')
		} else if (err_code === 500) {
		  window.alert('服务器忙，请稍后重试！')
		}
	  }
	})
	         
}
)
})
$('#login_form').on('submit', function (e) {
	e.preventDefault()
	var formData = $(this).serialize()
	console.log(formData)
	$.ajax({
	  url: '/login',
	  type: 'post',
	  data: formData,
	  dataType: 'json',
	  success: function (data) {
		var err_code = data.err_code
		if (err_code === 0) {
		  // window.alert('注册成功！')
		  // 服务端重定向针对异步请求无效
		  window.location.href = '/'
		} else if (err_code === 1) {
		  window.alert('用户名或者密码错误')
		} else if (err_code === 500) {
		  window.alert('服务器忙，请稍后重试！')
		}
	  }
	})
  })
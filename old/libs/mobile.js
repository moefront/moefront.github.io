/** 
MoeFront Introduce Page(Mobile Version) Javascript
@2015/07/15
@Copyright(c) 2015 MoeFront Members
*/

function introduce(){
	console.log("是时候展现 MoeFront 真正的技术了！");
	$("#content").css({"display":"none"}).delay(300);
	$("#content").html("<h3>What is MoeFront?</h3><p id='introduce-text'><span id='introduce-moe'>MOE</span> 是日文中“萌(萌え)”的读音，日语“萌”（萌え）用来形容可爱的女生和男生等。作为二次元的代表，MoeFront的每位成员都带着萌属性。</p>" +
		"<p id='introduce-text'><span id='introduce-front'>FRONT</span> 即Front-end，意为Web开发中的前端。我们以学习HTML、CSS 以及JavaScript、AJAX 和 挑战 IFE 暑期任务为目的组成这个团队。</p>" +
		"<p id='introduce-text'><span id='introduce-ife'>我们为共同的目标，来到相同的地方。<br>IFE，我们来了！</span></p><br><br>");
	$("#content").fadeIn(500);
}

function showmembers(){
	console.log("想勾搭窝萌的成员吗？联系电话：110（误");
	$("#content").css({"display":"none"}).delay(300);
	$("#content").html('<h3>MoeFront&acute;s members</h3><div class="member"><img src="avatar/cd.jpg" alt="CDog"><div class="member-introduce">CDog <small> 大学生 </small><br>Node.js / Javascript</div></div><br>'+
		'<div class="member"><img src="avatar/im.jpg" alt="吟梦"><div class="member-introduce">吟梦 <small> 高中生 </small><br>PHP / CSS / HTML5</div></div><br>' + 
		'<div class="member"><img src="avatar/freedom.jpg" alt="AngelFreedom"><div class="member-introduce">AngelFreedom <small> 在职 </small><br>PHP / CSS / 运维</div></div><br>'+
		'<div class="member"><img src="avatar/boot.jpg" alt="Tyan Boot"><div class="member-introduce">Tyan Boot <small> 高中生 </small><br>PHP / C++</div></div><br>' +
		'<div class="member"><img src="avatar/aj.jpg" alt="Awoer"><div class="member-introduce">Awoer <small> 创业者 </small><br>PHP / 服务器运维</div></div><br>' +
		'<div class="member"><img src="avatar/sh.jpg" alt="Awoer"><div class="member-introduce">祀画 <small> 高中生 </small><br>PHP / HTML</div></div><br><br><br>');
	$("#content").fadeIn(500);
}

function likeus(){
	console.log("Do you like us?");
	$("#content").css({"display":"none"}).delay(300);
	$("#content").html("<h3>Do you like us?</h3><p id='thx'>感谢你对我们的支持w</p><br><br><p><span id='like'><a href='#' onclick='doLike()' id='like'>❤Like Us</a></span></p>");
	$("#content").fadeIn(500);
}

function home(){
	$("#content").css({"display":"none"}).delay(300);
	$("#content").html('<br><br><h2 class="default-text title-moe">Welcome to MoeFront</h2><br><p style="color:#888888;font-family:Microsoft Yahei;font-weight:bold;font-size:14px;padding:8px;">MoeFront是一个为<a style="color:#000;text-decoration:none;" href="http://www.huodongxing.com/event/4289098977400">百度前端技术学院暑期训练营</a>而成立的年轻团队。我们由6个小伙伴组成，准备学习关于WebApp的开发。'+
		'此外，我们的平均年龄只有16岁左右，<del>而且都是萌萌哒的小萝莉（其实并不是</del></p><br><br><p class="default-text">&copy;Copyright MoeFront Team 2015<br>Finished by all members of MoeFront</p><br><br>');
	$("#content").fadeIn(500);
}

$.ajax({
	url:"http://front.moe/like.php?cmd=get",
	dataType:"json",
	success:function(data){
		$("#like").html('<a href="#" id="like">❤ '+data.likes+'</a>');
		$('#thx').html('我们已经感受到了你的喜欢，谢谢。');
	},
	error:function(){
		$("#like").html("niconiconi~");
	}
});
function doLike(){
	var $like_num=$("#like");
	$.ajax({
		url:"http://front.moe/like.php?cmd=add",
		dataType:"json",
		success:function(data){
			$("#like").html('<a href="#" id="like">❤ '+data.likes+'</a>');
			$('#thx').html('我们已经感受到了你的喜欢，谢谢。');
		},
		error:function(){
			$("#like").html("niconiconi~");
		}
	});


}
$("#like").click(function(){
	doLike();
})

function getwidth(){
	var imwidth = document.body.clientWidth;
	console.log("当前屏幕宽度："+imwidth);
	if(imwidth > 720)
		window.location.href="index.html";
}

$(document).ready(function(){
	getwidth();
});
/** 
MoeFront Introduce Page(Mobile Version) Javascript
@2015/07/15
@Copyright(c) 2015 MoeFront Members
*/

function introduce(){
	console.log("是时候展现 MoeFront 真正的技术了！");
	$("#content").css({"display":"none"}).delay(300);
	$("#content").html("<p id='introduce-text'><span id='introduce-moe'>MOE</span> 是日文中“萌(萌え)”的读音，日语“萌”（萌え）用来形容可爱的女生和男生等。作为二次元的代表，MoeFront的每位成员都带着萌属性。</p>" +
		"<p id='introduce-text'><span id='introduce-front'>FRONT</span> 即Front-end，意为Web开发中的前端。我们以学习HTML、CSS 以及JavaScript、AJAX 和 挑战 IFE 暑期任务为目的组成这个团队。</p>" +
		"<p id='introduce-text'><span id='introduce-ife'>我们为共同的目标，来到相同的地方。<br>IFE，我们来了！</span></p><br><br>");
	$("#content").fadeIn(500);
}

function showmembers(){
	console.log("想勾搭窝萌的成员吗？联系电话：110（误");
	$("#content").css({"display":"none"}).delay(300);
	$("#content").html('<div class="member"><img src="avatar/cd.jpg" alt="CDog"><div class="member-introduce">CDog<br>Node.js / Javascript</div></div><br>'+
		'<div class="member"><img src="avatar/im.jpg" alt="吟梦"><div class="member-introduce">吟梦<br>PHP / CSS / HTML5</div></div><br>' + 
		'<div class="member"><img src="avatar/freedom.jpg" alt="AngelFreedom"><div class="member-introduce">AngelFreedom<br>PHP / CSS / 运维</div></div><br>'+
		'<div class="member"><img src="avatar/boot.jpg" alt="Tyan Boot"><div class="member-introduce">Tyan Boot<br>PHP / C++</div></div><br>' +
		'<div class="member"><img src="avatar/aj.jpg" alt="Awoer"><div class="member-introduce">Awoer<br>PHP / 服务器运维</div></div><br>' +
		'<div class="member"><img src="avatar/sh.jpg" alt="Awoer"><div class="member-introduce">祀画<br>PHP / HTML</div></div><br>');
	$("#content").fadeIn(500);
}

function likeus(){
	console.log("Do you like us?");
	$("#content").css({"display":"none"}).delay(300);
	$("#content").html("<p>感谢你对我们的支持w</p><br><br><p><span id='like'><a href='#' onclick='doLike()' id='like'>❤Like Us</a></span></p>");
	$("#content").fadeIn(500);
}
$.ajax({
	url:"http://front.moe/like.php?cmd=get",
	dataType:"json",
	success:function(data){
		$("#like span").html(data.likes);
	},
	error:function(){
		$("#like span").html("niconiconi~");
	}
});
function doLike(){
	var $like_num=$("#like span");
	$.ajax({
		url:"http://front.moe/like.php?cmd=add",
		dataType:"json",
		success:function(data){
			$("#like span").html(data.likes);
			$("#thx").fadeIn();
			$.cookie("moemoeda", "moemoeda"); 
		},
		error:function(){
			$("#like span").html("niconiconi~");
		}
	});


}
$("#like").click(function(){
	doLike();
})
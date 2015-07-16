$(function(){

	$("#headline").fadeIn(2000);

	$("#fstscreen").height(window.innerHeight);
	//init animation
	var $secinner=$("#Intr");
	$secinner.isShone=false;

	var $thdinner=$("#Member");
	$thdinner.isShone=false;
	var $footer=$("#LikeScr");
	var $fstscreen=$("#fstscreen");



	//anime functions
	function showIntr(){
		$secinner.isShone=true;
		$("h2#h21").fadeIn(function(){
			$("h2#h22").fadeIn(function(){
				$("#moeIntr p").fadeIn(function(){
					$("#frontIntr p").fadeIn(function(){
						$("#mfIntr p").fadeIn();
					});
				});
			});
		})
		console.log("Intr Show Time!");
	}

	function showMember(){
		console.log("Member Show Time!");
		var memberlist=$("#memberlist").children();

		function showitem(item){
			$(memberlist[item]).fadeIn(function(){
				if (item<memberlist.length-1){
					showitem(item+1);
				}else{
					$thdinner.isShone=true;
				}
			});
		}
		$("#thdinner > h2").fadeIn(function(){
			showitem(0);
		})
		
	}

	
	$(document).scroll(function(){
		if($(document).scrollTop() > $secinner.offset().top && !$secinner.isShone) {
			showIntr();
		}
		if($(document).scrollTop() > $thdinner.offset().top && !$thdinner.isShone) {
			showMember();
		}
		if($(document).scrollTop()+window.innerHeight == ($footer.offset().top+$footer.height())) {
			$("nav a[href=#LikeScr]").parent().addClass("cur").siblings().removeClass("cur");
			
		}
		if($(document).scrollTop() >=0 && $(document).scrollTop() < $fstscreen.height()) {
			$("nav a[href=#fstscreen]").parent().addClass("cur").siblings().removeClass("cur");
			
		}
		if($(document).scrollTop() >= $secinner.offset().top && $(document).scrollTop() < $secinner.offset().top+$secinner.height()) {
			$("nav a[href=#Intr]").parent().addClass("cur").siblings().removeClass("cur");
			
		}
		if(($(document).scrollTop() >= $thdinner.offset().top && $(document).scrollTop() < $thdinner.offset().top+$thdinner.height()) && !($(document).scrollTop()+window.innerHeight == ($footer.offset().top+$footer.height()))) {
			$("nav a[href=#Member]").parent().addClass("cur").siblings().removeClass("cur");
			
		}
	});


	//Like
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
		if ($.cookie("moemoeda")){
			$("#no2").fadeIn();
		}else{
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
		

	}
	$("#like").click(function(){
		doLike();
	});

	$("#fstscreen a.next").click(function(){
		$("nav a[href=#Intr]").click();
	});
	$("#Intr a.next").click(function(){
		$("nav a[href=#Member]").click();
	});
	$("#Member a.next").click(function(){
		$("nav a[href=#LikeScr]").click();
	});


	$("nav a").click(function(event){		
		event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top+250},800);
		});
	$("nav a[href=#fstscreen]").click(function(event){		
		event.preventDefault();
			$('html,body').animate({scrollTop:0},800);
		});
});
function getwidth(){
	var imwidth = document.body.clientWidth;
	console.log("当前屏幕宽度："+imwidth);
	if(imwidth <= 720)
		window.location.href="mobile.html";
}

$(document).ready(function(){
	getwidth();
});

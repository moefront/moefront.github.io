$(function(){

	$("#headline").fadeIn(2000);

	$("#fstscreen").height(window.innerHeight);
	//init animation
	var $secinner=$("#secscreen");
	$secinner.isShone=false;

	var $thdinner=$("#thdscreen");
	$thdinner.isShone=false;



	//anime functions
	function showIntr(){
		$secinner.isShone=true;
		$("#moeIntr h2").fadeIn(function(){
			$("#moeIntr b").fadeIn(function(){
				$("#moeIntr p").fadeIn(function(){
					$("#frontIntr h2").fadeIn(function(){
						$("#frontIntr p").fadeIn(function(){
							$("#frontIntr b").fadeIn(function(){
								$("#mfIntr p").fadeIn();

							});

						});
					});
				});

			});
		});
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
	})
	$("#headlines").animate({width:"80%"});

	//Navbar Function
	var navH = $("#secscreen").offset().top;
   	 //滚动条事件
    	$(window).scroll(function(){
    		//获取滚动条的滑动距离
    		var scroH = $(this).scrollTop();
   		 //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，执行的函数或代码
    		if(scroH>=navH){
    			$("#header-nav").fadeIn(500);
  		  }
    		//否则，执行以下代码
    		else if(scroH<navH)
    		{
    			$("#header-nav").css({"display":"none"});
   		 }
	});

});

jQuery(document).ready(function($) {
	$(".scroll").click(function(event){		
		event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
		});
});

var imwidth = document.body.clientWidth;
console.log("当前屏幕宽度："+imwidth);
if(imwidth <= 720)
	window.location.href="mobile.html";
$(function(){
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
							$("#frontIntr b").fadeIn(function(){
								$("#frontIntr p").fadeIn(function(){
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
		url:"like.php?cmd=get",
		dataType:"json",
		success:function(data){
			$("#like span").html(data.likes);
		},
		error:function(){
			$("#like span").html("服务器在开小差。稍后再试吧");
		}
	});
	function doLike(){
		var $like_num=$("#like span");
		if ($.cookie("moemoeda")){
			$("#no2").fadeIn();
		}else{
			$.ajax({
				url:"like.php?cmd=add",
				dataType:"json",
				success:function(data){
					$("#like span").html(data.likes);
					$("#thx").fadeIn();
					$.cookie("moemoeda", "moemoeda"); 
				},
				error:function(){
					$("#like span").html("服务器在开小差。稍后再试吧");
				}
			});
			
			
		}
		

	}
	$("#like").click(function(){
		doLike();
	})
	$("#headlines").animate({width:"80%"});
});

var cntWd, sldWd, tb;
	$(function() {
		
		cntWd = $('#container').innerWidth();
		tb = $('#thumbs');
		sldWd = tb.outerWidth();
		
		$('#container').mousemove(function(e)
		{
			tb.css({left: ((cntWd - sldWd)*((e.pageX / cntWd).toFixed(3))).toFixed(1) +"px" });
 		});
});
(function($){
	var methods = 
	{
		init:function(imgCont,time){
			var me = this;
			var imgCount = imgCont;
			var time = time;
			
			me.append('<ul id="imgList"></ul>');

			for(i = 0; i < imgCount; i++)
			{
				var htmlStr = '<li><a href="#"><img src="0'+(i+1)+'.jpg" alt=""></a></li>';
				me.find('#imgList').append(htmlStr);
			}
			me.append('<ul id="ctrlBar"></ul>');
			me.find('#ctrlBar').append('<li class="ctrlBtn selected">1</li>');

			for(i = 2; i <= imgCount; i++)
			{
				var htmlStr = '<li class="ctrlBtn">' + i + '</li>';
				me.find('#ctrlBar').append(htmlStr);
			}
			me.move('start',time);
			me.move('ctrl_start',time);			
		},
		start:function(time){
			var me = this;
			this.time = time;
			
			interval = setInterval(function()
			{
				left = parseInt(me.find('#imgList').css('left'));		
				i = -left/640 + 1;	
				if(left == -640*4)
				{
					me.find('#imgList').css({'left':0})					
				}
				else
				{
					distence = -i * 640 +'px';
					me.find('#imgList').animate({
						left: distence},'fast')
				}
				index =  (i+5) % 5;
				me.find('#ctrlBar').find('.ctrlBtn').removeClass('selected');
				me.find('#ctrlBar').find('.ctrlBtn').eq(index).addClass('selected');
			},time);	
		},

		ctrl_start:function(time){
			var me = this;
			var time = time;
			me.find('#ctrlBar').find('.ctrlBtn').each(function(i)
			{
				me.find('#ctrlBar').find('.ctrlBtn').bind('click',function(){
					var index = this.innerHTML;
					var left = (index-1) * -640 + 'px';
					me.find('#imgList').css({'left':left});
					clearInterval(interval);
					me.find('#ctrlBar').find('.ctrlBtn').removeClass('selected');
					me.find('#ctrlBar').find('.ctrlBtn').eq(index-1).addClass('selected');
					me.move('start',time);
				})				
			});
		}
	}
	$.fn.move = function(){
		var method = arguments[0];
 
		if(methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if( typeof(method) == 'object' || !method ) {
			method = methods.init;
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.move' );
			return this;
		}
		return method.apply(this, arguments);
	}
})(jQuery)
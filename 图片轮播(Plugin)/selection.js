(function($){

//	var compCfg;
	var selected;
/*
	function initData(data){
		var allSelelction = $('<li dicId="all" >全部</li>');
		var listItemArr = [allSelelction];
		allSelelction.data({
			dicId:'',
			dicName:'全部'
		})
		$(data).each(function(){
			if(this.dicId && this.dicId!=''){
				var listItem = $('<li dicId="'+this.dicId+'">'+this.dicName+'</li>');
				listItemArr.push(listItem)
				listItem.data(this);
			}
		})
		return listItemArr;
	}
*/
	var methods = {
		init:function(conf){
			var dfconf = {
				title:'选项',
				initReq:'selection',
				dfSelection:'all',  //初始化属性
				data:'',
				onSelected:function(data){
					console.log('-dfconf-');
					console.log(data);
				},
				onMoreBtnClick:function(){

				}

			}
			var compCfg = $.extend(dfconf,conf);//将输入的conf合并到dconf中
			this.data($.extend(dfconf,conf));
			var me = this;

			//基本HTML
			var htmlStr = '<div class="selection"><h3>'+compCfg.title+':</h3><div class="selectionsCntr"><ul class="selection_list"></ul></div></div>';
			me.html(htmlStr);
			var cntr = me;
			if(compCfg.initReq){
				$.sendRmsReq({
					reqName:compCfg.initReq,
					data:compCfg.data,
					success:function(data){
						me.selection('setData',data.data);
						
						//判断长度是否超过42，超过42则显示更多的按钮
						if(me.find('ul').height()>42){
							var moreBtn = $('<span class="more_btn" expand="0">更多</span>')
							cntr.find('.selection').append(moreBtn);
							moreBtn.bind('click',function(){
								var me = $(this);
								var flag = me.attr('expand');
								if(flag == 0){
									cntr.find('.selectionsCntr').css({
										height:'auto',
										'overflow-y':'auto'
									});
									me.text('收起');
									me.attr('expand','1');
								}else{
									cntr.find('.selectionsCntr').css({
										height:'40px',
										'overflow-y':'hidden'
									});
									me.text('更多');
									me.attr('expand','0');
								} 

								compCfg.onMoreBtnClick();
								return false;
							});
						}
						
						me.selection('setValue',compCfg.dfSelection);
					}
				})
			}
			

			me.find('ul').bind('click',function(e){
				var target = $(e.target);
				if(target.data().dicName){
					cntr.find('.selection_selected').removeClass('selection_selected')
					target.addClass('selection_selected');
					me.data('selected',target.data());

					var selectedData = target.data();
					if(target.data().dicId=='all'){
						selectedData.dicId = '';
					}
					me.data('onSelected')(selectedData)
				}
			});
		},
		setData:function(data){
			var me = this;
			var listCntr = me.find('.selection_list');
			listCntr.empty();
			listCntr.append(initData(data));

			var compCfg = me.data();
			me.selection('setValue',compCfg.dfSelection);
			
		},
		addData:function(data){
			var me = this;
			var listCntr = me.find('.selection_list');
			listCntr.append(initData(data));
		},
		getValue:function(){
			var data = this.data('selected');

			if(data){
				return this.data('selected');
			}else{
				return {dicId:'',dicName:''}
			}
			
		},
		setValue:function(dicId){
			var me = this;
			this.find('.selection_selected').removeClass('selection_selected');
			var target = this.find('li[dicId='+dicId+']');
			target.addClass('selection_selected');
			me.data('selected',target.data());
		}
	}

	$.fn.selection=function(conf){
		var method = arguments[0];
 
		if(methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		} else if( typeof(method) == 'object' || !method ) {
			method = methods.init;
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.selection' );
			return this;
		}
		return method.apply(this, arguments);
	}
})(jQuery)
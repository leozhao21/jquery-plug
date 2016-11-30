/** jquery扩展 **/

/**
 * 根扩展
 * setURLParam 设置URL参数，
 * compareDataTime 比较时间的大小
 */

jQuery.extend({ 
	//设置URL参数
	//返回值是一个对象，status:表示返回返回值的状态；info:包含返回的信息
	setURLParam: function (url,param,value) {
		var return_value = {status:false,info:'url有误错误'};
		
		if((url.split('?').length-1) <= 1){//url包含2个以上问号，不执行if语句
			return_value.status = true;
			//传入的参数或者参数值为空或者未定义直接返回传入的URL
			if(param == "" || param == undefined || value == "" || value == undefined){
				return_value.info = url;
			}else {
				//获取问号的索引
				var index = Number(url.indexOf("?"));
				var len = url.length; //获取URL长度
				if(index < 0){
					//问号索引小于0，即：url不包含问号
					return_value.info = url+'?'+param+"="+ value;
				}else if((index+1) >= len){
					//问号位于字符串的最后一位
					return_value.info = url+param+"="+ value;
				}else{//问号不是位于URL的最后一位
					var query = url.substring(Number(url.indexOf("?"))+1);//获取URL中问号后的字符串
					var p = new RegExp("(^|)" + param + "=([^&]*)(|$)");//通过正则表达式找到字符串的参数
					url=url.split("?")[0];//清除url中的问号，保留问号前的字符串，便于返回结果
					if(p.test(query)){//验证URL中是否存在传入的参数，存在：执行if语句；不存在执行else语句
						//使用split函数把包含参数的字符串分为2部分
				        var firstParam=query.split(param)[0];//字符串中参数前面的第一段字符串
				        var secondParam=query.split(param)[1];//字符串中参数后的第二段字符串
				        if(secondParam.indexOf("&")>-1){//第二段字符串是否包含&符号，包含：执行if；不包含：执行else
				        	//获取第二段字符串中第一个&符号后的所有字符串，这样就把&符号前 传入参数param的值给去掉了
				            var lastPraam=secondParam.substring(secondParam.indexOf("&"));
				            //拼接返回的字符串
				            
				            if(firstParam){
				            	//第一段字符串不为空，返回的URL 需要把第一段字符串拼接到传入参数的前面，并加上&符号
				            	return_value.info = url + '?'+firstParam+param+'='+value+lastPraam;
				            }else{
				            	//第一段字符串为空，说明传入的参数前没有其他参数
				            	return_value.info = url + '?'+param+'='+value+lastPraam;
				            }
				        }else{
				        	//第二段字符串不包含&符号，说明URL中参数的位置位于最后
				            if(firstParam){
				            	//第一段字符串不为空，返回的URL 需要把第一段字符串拼接到传入参数的前面
				            	return_value.info = url + '?'+firstParam+param+'='+value;
				            }else{
				            	//第一段字符串为空，说明URL中没有其他参数
				            	return_value.info = url + '?'+param+'='+value;
				            }
				        }
				    }else{
				    	//URL不存在传入的参数，则在URL 后面添加新的参数
			        	return_value.info = url + '?'+query+'&'+param+'='+value;
				    }  
				} 
			}
		}
		return return_value;
	},
	
	//删除URL参数
	//返回值是一个对象，status:表示返回返回值的状态；info:包含操作信息
	deleteURLParam: function (url,param) {
		var return_value = {status:false,info:'url有错误!'};
		
		if((url.split('?').length-1) <= 1){//url包含2个以上问号，不执行if语句
			
			//传入的参数为空或者未定义，返回错误信息
			if(param == "" || param == undefined){
				return_value.info = '传入参数"'+ param +'"有误！';
			}else {
				//获取问号的索引
				var index = Number(url.indexOf("?"));
				var len = url.length; //获取URL长度
				if(index < 0 || (index+1) >= len){
					//url不包含问号或问号在最后一位，返回操作信息
					return_value.info = 'URL中不存在参数：'+ param;
				}else{//问号不是位于URL的最后一位
					var query = url.substring(Number(url.indexOf("?"))+1);//获取URL中问号后的字符串
					var p = new RegExp("(^|)" + param + "=([^&]*)(|$)");//通过正则表达式找到字符串的参数
					url=url.split("?")[0];//清除url中的问号，保留问号前的字符串，便于返回结果
					if(p.test(query)){//验证URL中是否存在传入的参数，存在：执行if语句；不存在执行else语句
						//url包含传入的参数，需要进行删除操作，所以状态设置为true
						 return_value.status = true;
						
						//使用split函数把包含参数的字符串分为2部分
				        var firstParam=query.split(param)[0];//字符串中参数前面的第一段字符串
				        var secondParam=query.split(param)[1];//字符串中参数后的第二段字符串
				        var _index = Number(secondParam.indexOf("&"));
				       
				        if(_index > -1){//第二段字符串是否包含&符号，包含：执行if；不包含：执行else
				        	//获取第二段字符串中第一个&符号后的所有字符串(不包含&符号)，这样就把&符号前 传入参数param的值和后面的&符号去掉了
				        	var lastPraam="";
				        	if((_index+1) < secondParam.length){
				        		lastPraam=secondParam.substring(secondParam.indexOf("&")+1);
				        	}
				            
				            if(firstParam){
				            	//第一段字符串不为空，返回的URL 需要把第一段字符串拼接到传入参数的前面，并加上&符号
				            	return_value.info = url + '?'+firstParam + lastPraam;
				            }else{
				            	//第一段字符串为空，说明传入的参数前没有其他参数
				            	return_value.info = url + '?' + lastPraam;
				            }
				        }else{
				        	//第二段字符串不包含&符号，说明URL中参数的位置位于最后
				            if(firstParam){
				            	//去除第一段后面的&符号
				            	firstParam = firstParam.substring(0,firstParam.lastIndexOf('&'));
				            	//第一段字符串不为空，返回的URL 需要把第一段字符串拼接到URL中，然后返回URL
				            	return_value.info = url + '?'+firstParam;
				            }else{
				            	//第一段字符串为空，说明URL中没有其他参数，删除参数后，返回URL
				            	return_value.info = url;
				            }
				        }
				    }else{
				    	//URL不存在传入的参数，则返回URL
				    	return_value.status = false;
				    	return_value.info = url;
				    }  
				} 
			}
		}
		return return_value;
	},
	
	//日期时间比较
	//返回值：true:传入的参数第一个大于第二个；false:第二个大于等于第一个
	compareDataTime: function (date1,date2){
		//先把字符串都转换成日期。然后再用毫秒数进行比较
	    var oDate1 = new Date(date1);
	    var oDate2 = new Date(date2);
	    if(oDate1.getTime() > oDate2.getTime()){
	    	return true;
	    } else {
	    	return false;
	    }
	}
}); 


/**
 * jquery对象扩展
 */
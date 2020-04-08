function AjaxManager(){}

AjaxManager.getAjaxObject = 
	function(){
		var xmlHttp = null;
		try { 
			xmlHttp = new XMLHttpRequest(); 
		} catch (e) {
			try { 
				xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try { 
					xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {
					xmlHttp = null; 
				}
			}
		}
		return xmlHttp;
	}

AjaxManager.ajaxRequest = 
	function(method, url, isAsync, sendMsg, funct){
		var xmlHttp = AjaxManager.getAjaxObject();
		if (xmlHttp === null){
			window.alert('It seems that your browser does not support AJAX. Update it or download a newer browser.');
			return;
		}
	
		xmlHttp.open(method, url, isAsync);

		xmlHttp.onreadystatechange = function (){
			if (xmlHttp.readyState == 4){
				if(funct!=null){
					funct(xmlHttp.responseText);
				}
			}
			
		}
		xmlHttp.send(sendMsg);
}		
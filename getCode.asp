<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>Document</title>
  <script type="text/javascript">
  var code='<%=request("code")%>';
  var params='<%=request("params")%>';
  var paramArr=params.split(",");
  var from=paramArr[0];
  if(from=="showGoods"){
	  var accountId=paramArr[1];
	  var uuid=paramArr[2];
	  //alert(accountId+","+uuid+","+code);
	  location.href="http://www.qrcodesy.com:8080/GoodsPublic/merchant/main/goShowHtmlGoods?trade=jfdhjp&uuid="+uuid+"&accountId="+accountId+"&code="+code;
  }
  else if(from=="bindWX"){
	  var accountId=paramArr[1];
	  location.href="http://www.qrcodesy.com:8080/GoodsPublic/merchant/phone/bindWX?accountId="+accountId+"&code="+code;
  }	
  else if(from=="checkPhoneAdmin"){
	  var fromUrl=paramArr[1];
	  var fromWebSite=paramArr[2];
	  var uuid=paramArr[3];
	  location.href="http://www.qrcodesy.com:8080/GoodsPublic/merchant/phone/"+fromUrl+"?code="+code+"&fromWebSite="+fromWebSite+"&uuid="+uuid;
  }
  </script>
 </head>
 <body>

 </body>
</html>

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
  var accountId=paramArr[0];
  var uuid=paramArr[1];
  //alert(accountId+","+uuid);
  location.href="http://www.qrcodesy.com:8080/GoodsPublic/merchant/main/goShowHtmlGoods?trade=jfdhjp&uuid="+uuid+"&accountId="+accountId+"&code="+code;
  </script>
 </head>
 <body>

 </body>
</html>

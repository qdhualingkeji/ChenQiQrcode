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
  var jsonParams=JSON.parse('<%=request("jsonParams")%>');
  location.href="http://www.qrcodesy.com:8080/GoodsPublic/merchant/main/goShowHtmlGoods?trade=jfdhjp&uuid="+jsonParams.uuid+"&accountId="+jsonParams.accountId+"&code="+code;
  </script>
 </head>
 <body>

 </body>
</html>

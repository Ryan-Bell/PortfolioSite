<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>REDIRECT</title>
<!-- forward immediately -->
<!--	<script>window.location.replace("http://www.google.com")</script>-->
	<script>history.replaceState("state1", "LegitamatePage", "fakeURL");</script>
</head>
<body>
<h2>I can autoforward you back to an app or web service with any of the following info</h2>
<h4>I can also be confgured to only allow certain groups or even specific users through</h4>

<?php
echo phpversion();
foreach(array_keys($_SERVER) as $paramName)
	  echo $paramName . "-" . $_SERVER[$paramName] . "<br>";
?>
</body>
</html>

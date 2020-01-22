<?php
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
 $file = file_get_contents('js/testtags.json');
 $data = json_decode($file);
 unset($file);

 if($_POST['intent'] == "add")
 {
  if (filter_var($_POST['imgurl'], FILTER_VALIDATE_URL)) {
   $data[] = array('name'=>$_POST['name'],'imgurl'=>$_POST['imgurl']);
   echo "Success in adding " .  $_POST['name'];
  } else {
     echo("$_POST is not a valid URL");
  }
 }else if ($_POST['intent'] == "rm")
 {
    $i = 0;
    foreach($data as $element) {
	if($_POST["name"] == $element->name)
	{
		unset($data[$i]);
		echo "Removed " . $_POST["name"];
	}
	$i++;
    }
 }
   file_put_contents('js/testtags.json',json_encode($data));
   unset($data);
?>

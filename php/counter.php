<?php
$filename = "hits.txt";

$file = file($filename);
$file = array_unique($file);
$file = array_diff($file, array(""));
$hits = count($file);
echo $hits - 2;

$fd = fopen ($filename , "r");
$fstring = fread ($fd , filesize ($filename));
fclose($fd);
$fd = fopen ($filename , "w");
$fcounted = $fstring."\n".getenv("REMOTE_ADDR");
$fout= fwrite ($fd , $fcounted );
fclose($fd);
?>

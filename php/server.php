<?php

$file = 'log.txt';
if (isset($_GET['text']))
{
   $current = $_GET['text'];
   file_put_contents($file, $current);

} else {
   $current = file_get_contents($file);
}


echo $current;

<?php
if(!defined("BASE_PATH")) define("BASE_PATH", "http://localhost/chart/renz-repo/Initial-OES/OES/");
function base_url(String $link = "") {
    return BASE_PATH . "{$link}";
}


?>
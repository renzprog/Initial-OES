<?php
$conn = new mysqli("localhost", "root", "", "db_abis");

if(!$conn) die("Error => " . $conn->error);
?>
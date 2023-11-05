<?php
require "../db/conn.php";
require "../template/constants.php";

$sql = "";
if(isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = "SELECT 
            `tbf`.id as 'id',
            CASE
                WHEN TRIM(CONCAT(`tbf`.firstname, ' ',`tbf`.lastname)) = '' THEN '--'
                ELSE CONCAT(`tbf`.firstname, ' ',`tbf`.lastname)
            END as 'name',
            `tbf`.`lrn`,
            `tbf`.`strand` as 'strand',
            `tbf`.`track` as 'track',
            `tbf`.`gradelevel` as 'gradelevel',
            CASE 
                WHEN `tbf`.`sex` = 'F' THEN 'Female'
                ELSE 'Male'
            END as 'sex',
            `tbf`.`placeofbirth`,
            CONCAT(`tbf`.Cbrgy, ' ', `tbf`.`Chousenum`, ' ', `tbf`.`Cstreet`, ' ', `tbf`.`Ccity`) as 'addr'
            FROM `tb_form` `tbf`
            WHERE `tbf`.id  = {$id}";
} else {
    $sql = "SELECT 
            `tbf`.id as 'id',
            CASE 
                WHEN TRIM(CONCAT(`tbf`.firstname, ' ',`tbf`.lastname)) = '' THEN '--'
                ELSE CONCAT(`tbf`.firstname, ' ',`tbf`.lastname)
            END as 'name',
            CASE
                WHEN `tbf`.strand = '' OR `tbf`.strand IS NULL
                THEN `tbf`.track 
                ELSE `tbf`.strand 
            END as 'strand',
            `tbf`.gradelevel as 'gradelevel'
            FROM `tb_form` `tbf`";
}

$query = $conn->query($sql);


$data = array();

while($result = $query->fetch_object()) array_push($data, $result);


echo json_encode(["data" => $data]);
?>
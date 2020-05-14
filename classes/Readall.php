<?php
    require_once("../sys-config.php"); 
    require_once("SysDB.php");
    $db = new \SysTem\SysDB(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    header("Content-type: application/json; charset=utf-8");

    $data = $db->get_results("SELECT * FROM company, post WHERE company.postnr = post.postnr");
    echo json_encode($data); 
?>
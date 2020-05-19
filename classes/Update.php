<?php
    require_once("../sys-config.php"); 
    require_once("SysDB.php");
    $db = new \SysTem\SysDB(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    $id;
    $arr = array();

    foreach ($_GET as $key => $value) {
        if($key != "id"){
            $arr[$key] = $value;
        } else {
            $id = array("id" => $value);
        }
    }
    $data = $db->update("company", $arr, $id);
?>
<?php
    require_once("../sys-config.php"); 
    require_once("SysDB.php");
    $db = new \SysTem\SysDB(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    $arr;
    
    if(!empty($_GET)){
        foreach ($_GET as $key => $value) {
            $arr[$key] = $value;
        }
        $data = $db->insert("company", array($arr));
    } else {
        return False;
    }



?>
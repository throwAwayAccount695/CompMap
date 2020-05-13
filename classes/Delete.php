<?php
    require_once("../sys-config.php"); 
    require_once("SysDB.php");
    $db = new \SysTem\SysDB(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    $db->delete_row("company", "id", $_GET["id"]);
?>
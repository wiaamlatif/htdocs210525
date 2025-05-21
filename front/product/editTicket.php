<?php
    session_start();

    if(isset($_GET['idTicket'])){
        $idTicket = $_GET['idTicket'];
        $_SESSION['idTicketSelected']=$idTicket;
    }

    if(isset($_SESSION['idEmployee'])){
        $idEmployee=$_SESSION['idEmployee'];
    }

    //displayHeadsTickets(data.idEmployee);
    //displayDetailTicket(data.idTicket);
    $toSend = [
                  "idTicket" => $idTicket,             
                "idEmployee" => $idEmployee
               ];

print_r(json_encode($toSend));

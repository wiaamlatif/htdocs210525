<?php
    session_start();
    
   if(isset($_GET['idEmployee'])){
      $idEmployee =$_GET['idEmployee'];
      $_SESSION['idEmployee']=$idEmployee;
   }
      
require_once "\htdocs\include\database.php";

//>>Get MIN id tickets 
$sql="SELECT MIN(id_ticket) AS minIdTicket
      FROM tickets
      WHERE id_employee = $idEmployee;";

$result = mysqli_query($conn, $sql); 

$myTicket = mysqli_fetch_assoc($result);

$minIdTicket = $myTicket['minIdTicket'];

$idTicketSelected=$minIdTicket;
if(isset($_SESSION['idTicketSelected'])){
   $idTicketSelected =$_SESSION['idTicketSelected'];      
}

//>>Get list tickets 
//>> Get tickets       
$sql ="SELECT * FROM tickets
       WHERE id_employee = $idEmployee;";
             
$result = mysqli_query($conn,$sql);
                
$headTickets = mysqli_fetch_all($result, MYSQLI_ASSOC);

$arrayHeadTicket=[];
if(!empty($headTickets)){ 

   foreach ($headTickets as $headTicket){ 

         $idTicket = $headTicket['id_ticket'];
         $nrTicket = $headTicket['nr_ticket'];
      $totalTicket = $headTicket['total_ticket'];

      $elementHeadTicket = [  
            "idTicket" => $idTicket,
            "nrTicket" => $nrTicket,
         "totalTicket" => $totalTicket
                           ];
      
      array_push($arrayHeadTicket,$elementHeadTicket); 

   }//foreach

   //>> Get Total ticket
   $sql="SELECT SUM(total_ticket) as totalTickets FROM tickets
         WHERE `id_employee`= $idEmployee;";

   $result = mysqli_query($conn, $sql); 

   $sumTickets = mysqli_fetch_assoc($result);

   $totalTickets = $sumTickets['totalTickets'];

   //>> Get firstName
   $sql="SELECT first_name AS firstName FROM employees 
       WHERE id_employee = $idEmployee;";
                    
   $result = mysqli_query($conn, $sql);

   $employee = mysqli_fetch_assoc($result);

   $firstName = $employee['firstName']; 

   $_SESSION['firstName']=$firstName;

   //>> Get nrTicketSelected
   $sql="SELECT nr_ticket AS nrTicketSelected
   FROM tickets 
   WHERE id_ticket  = $idTicketSelected;";
               
   $result = mysqli_query($conn, $sql);

   $theTicket = mysqli_fetch_assoc($result);

   $nrTicketSelected="";
   if($theTicket!=null ){
         $nrTicketSelected = $theTicket['nrTicketSelected']; 
   } 
  
   $arrayVar = [
                   "totalTickets" => $totalTickets,
                      "firstName" => $firstName,
               "nrTicketSelected" => $nrTicketSelected,
               "idTicketSelected" => $idTicketSelected
               ];

   array_push($arrayHeadTicket,$arrayVar); 

   print_r(json_encode($arrayHeadTicket));

}



/*
//0:{idTicket: '1', nrTicket: '00000001', totalTicket: '0.00'}
//1:{idTicket: '2', nrTicket: '00000002', totalTicket: '0.00'}
//2:{idTicket: '4', nrTicket: '00000004', totalTicket: '0.00'}
//3:{idTicket: '5', nrTicket: '00000005', totalTicket: '0.00'}
?>  
*/

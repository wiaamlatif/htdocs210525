<?php require '/home/vol9_5/infinityfree.com/if0_38168562/htdocs/config.php'; ?>
<?php
$title ="Liste des categories";
ob_start();
?>
      <?php $varSell="Sell";$varData="Data";?>
      <?php include ROOT_DIRECTORY.'/include/navAdmin.php'; ?>

<div class="container py-2">

<table class="table table-striped table-hover">
  <thead>
    <tr><!-- table row--->
      <th>Id</th><!-- table head--->     
      <th>User</th>
      <th>nr_ticket</th>
      <th>total_ticket</th>     
      <th>Date</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>

  <?php 
      require_once ROOT_DIRECTORY.'/include/database.php';

      $sql = "SELECT * FROM tickets
              INNER JOIN users 
              ON tickets.id_user = users.id_user
              WHERE tickets.validated = 0";

      $sqlPdo = $pdo -> query($sql)
                     -> fetchAll(PDO::FETCH_ASSOC);


      foreach ($sqlPdo as $row) {  
       // echo "<pre>";
       // var_dump($row);
       // echo "</pre>";
  ?>              
    <tr>
       <td><?=$row['id_ticket']?></td>
      
       <td><?=$row['login']?></td>

       <td><?=$row['nr_ticket']?></td>

       <td><?=$row['total_ticket']?></td>
     
       <td><?= date_format(date_create($row['date_ticket']),"d/m/Y H:i")?></td>  

       <td>
          
          <a href="edit.php?id=<?=$row['id_ticket']?>" class="btn btn-primary btn-sm">Editer</a>             

          <a href="print.php?id=<?=$row['id_ticket']?>" class="btn btn-success btn-sm" onclick="return confirm('Imprimer le ticket Nr <?=$row['nr_ticket']?> ?')"><i class="fa-solid fa-print"></i></a>                 

          <a href="suprim.php?id=<?=$row['id_ticket']?>" class="btn btn-danger btn-sm" onclick="return confirm('Supprimer le ticket Nr <?=$row['nr_ticket']?> ?')">Suprimer</a>                 
          
        </td>       
       
    </tr> 

  <?php     
      }                             
  ?>          

  </tbody>        
</table>

</div>

<?php $content = ob_get_clean(); ?>

<?php include ROOT_DIRECTORY."/layout.php" ?>






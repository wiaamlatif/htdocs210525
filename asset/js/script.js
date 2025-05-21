function startTime() {
  const today = new Date();
  let h = today.getHours()-1;
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('displayTime').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function ajouterTicket(){

  var xhr = new XMLHttpRequest();

  xhr.open('GET','iniTicket.php',true)

  xhr.onload = function() {

    if(xhr.status==200){

      var  data = JSON.parse(this.response);
       
      var idEmployee = parseInt(data.idEmployee)

      console.log(data);
      
      //typeof(data.idEmployee);

      displayHeadsTickets(idEmployee);
  
    }
  }

  xhr.send()
  
}

function deleteTicket(idTicket){
//  alert(idTicket);

  var xhr = new XMLHttpRequest();

  xhr.open('GET','deleteTicket.php?idTicket='+idTicket,true);

  xhr.onload = function() {

    if(xhr.status==200){

    var  data =  JSON.parse(this.response);

  //  console.log(data)

    displayHeadsTickets(data)

    }//status==200    

  }

  xhr.send()
 
}//deleteTicket

function pickProduct(idProduct){
 //alert(idProduct);

  // Add one line on the table lignes_ticket with quantity=1 (pickProduct.php)
 
  var xhr = new XMLHttpRequest();

  xhr.open('GET','pickProduct.php?idProduct='+idProduct,true);

  xhr.onload = function() {

    if(xhr.status==200){

    var  data =  JSON.parse(this.response);

    //data bring the id Ticket where the product will be added
   // console.log(data);
     
    displayHeadsTickets(data.idEmployee);
    displayDetailTicket(data.idTicket);
    // document.getElementById('totalTicket'+data.idTicket).innerHTML="ABC"

    }//status==200

  }//function

  xhr.send();
  
  
}//choisirProduit


function getQuantity(idLigneTicket,plusMinus){

 // console.log(idLigneTicket);
 // console.log(typeof(plusMinus));

  //Get quantity from lignes_ticket   
  //=====================================
  var xhr = new XMLHttpRequest();
    
  xhr.open('GET','getQuantity.php?idLigneTicket='+idLigneTicket+'&plusMinus='+plusMinus,true);

  xhr.onload = function() {

   if(xhr.status==200){

    var  data =  JSON.parse(this.response);
    
   // console.log(data);

    displayHeadsTickets(data.idEmployee);
    displayDetailTicket(data.idTicket);
        
   }//status==200 
    

  }//xhr.onload 

  xhr.send();
   
  }//getQuantity
  

function deleteItemTicket(idLigneTicket){

  var xhr = new XMLHttpRequest();

  xhr.open('GET','deleteItemTicket.php?idLigneTicket='+idLigneTicket,true);

  xhr.onload = function() {

    if(xhr.status==200){

      var  data =  JSON.parse(this.response);

      //idTicket
     // console.log(data);

      displayHeadsTickets(data.idEmployee);
      displayDetailTicket(data.idTicket);

    }//status==200
  
  }//xhr.onload 

  xhr.send();

}//deleteItemTicket

function deleteItemsTicket(){

  var xhr = new XMLHttpRequest();

  xhr.open('GET','deleteItemsTicket.php',true);

  xhr.onload = function() {

    if(xhr.status==200){

      var  data =  JSON.parse(this.response);

      //idTicket
     // console.log(data);

      displayHeadsTickets(data.idEmployee);
      displayDetailTicket(data.idTicket);      

    }//status==200
  
  }//xhr.onload 

  xhr.send();

}

//This function for opening a session with idTicketSelected 
function editTicket(idTicket){

  var xhr = new XMLHttpRequest();
  
  xhr.open('GET','editTicket.php?idTicket='+idTicket,true);

  xhr.onload = function() {

    if(xhr.status==200){

      var  data =  JSON.parse(this.response);

      //idTicket
      //console.log(data);

      displayHeadsTickets(data.idEmployee);
      displayDetailTicket(data.idTicket);

    }//status==200
  
  }//xhr.onload 

  xhr.send();
   
}

function displayHeadsTickets(idEmployee){

  var xhr = new XMLHttpRequest();
  
  xhr.open('GET','dataHeadsTickets.php?idEmployee='+idEmployee,true);

  xhr.onload = function() {

      if(xhr.status==200){

        var  data =  JSON.parse(this.response);

        var data1 = data.slice(-1);

        var data2 = data.slice(0,-1);

        //console.log(data);
        //console.log(data1);
        //console.log(data2);

        var idTicketSelected = data1[0].idTicketSelected;

        var nrTicketSelected = data1[0].nrTicketSelected;
        var displayNrTicketEl=document.getElementById('displayNrTicket');
            displayNrTicketEl.innerText = nrTicketSelected ;

        //firstName
        var firstName = data1[0].firstName;
            document.getElementById('btnVendeur').innerText=firstName;
        
        //totalTickets          
        var totalTickets = data1[0].totalTickets;
        document.getElementById('totalTickets').innerText=totalTickets;

        document.getElementById('showDetailTicket').innerHTML="";
        document.getElementById('totalHeadTicket').innerText="";
        document.getElementById('totalFootTicket').innerText="";
        document.getElementById('displayNrTicket').innerText="";
        document.getElementById('showHeadsTickets').innerHTML="";

        data2.forEach(element => {  

          var       idTicket = element.idTicket ;
          var       nrTicket = element.nrTicket ;
          var    totalTicket = element.totalTicket ;

          var headTickets = `<tr id="trHeadTicket`+idTicket+`" class="border border-dark fw-bold `+idTicket+`">
                                <td>`+idTicket+`</td>
                                <td>`+nrTicket+`</td>
                                <td id="totalTicket`+idTicket+`">`+totalTicket+`</td>
                                <td>
                                  <div class="d-flex">

                                    <button class="btn btn-danger btn-sm"
                                    onclick="deleteTicket(`+idTicket+`)">
                                    <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                                            
                                    <button class="btn btn-success btn-sm"
                                    onclick="editTicket(`+idTicket+`)">
                                    <i class="fa-solid fa-pencil"></i>
                                    </button>

                                  </div>
                                </td>
                              </tr>`;
          
            document.getElementById('showHeadsTickets').innerHTML+=headTickets; 

          if(idTicket==idTicketSelected){

            document.getElementById('displayNrTicket').innerText=nrTicket;

            if( totalTicket > 0) 
            {
              document.getElementById('totalHeadTicket').innerText=parseInt(totalTicket).toFixed(2);
              document.getElementById('totalFootTicket').innerText=parseInt(totalTicket).toFixed(2);
            }
            else
              {       
               document.getElementById('totalHeadTicket').innerText="0.00";
               document.getElementById('totalFootTicket').innerText="0.00";
       
               var msg = `<tr>
                           <td colspan="8">
                             <span><strong class="text text-danger">This ticket  Nr: `+nrTicketSelected+` is Empty</strong></span>
                           </td>
                         </tr>
                         `
               document.getElementById('showDetailTicket').innerHTML=msg; 
               
              } // totalTicket == 0
          }
          
        });//forEach 

          var trHeadTicketEl = document.getElementById('trHeadTicket'+idTicketSelected);

          if(trHeadTicketEl!=null){
          trHeadTicketEl.classList.add('table-info');
          }

      } //status==200
//*********************************/        
//*********************************/
//*********************************/       
       //*******/    
//*********************************/
//*********************************/
//*********************************/        
/*


*/
     //status==200

  }// onload function

  xhr.send()
 
}//displayHeadsTickets

function displayDetailTicket(idTicket){
 // alert(idTicket);
 
  var xhr = new XMLHttpRequest();

  xhr.open('GET','ticketData.php?idTicket='+idTicket,true);

  xhr.onload = function() {

      if(xhr.status==200){

        var  data =  JSON.parse(this.response);

//*********************************/        
//*********************************/
//*********************************/       
//     console.log(data);//*******/
//*********************************/
//*********************************/
//*********************************/
        var maxIdLineSelected = data.pop();

        var idLineSelected = data.pop();

//================================================================================

        if (data.length > 0) {
                    
          document.getElementById('showDetailTicket').innerHTML="";    

          data.forEach(element => {
                  
          //  console.log(element.id_ticket);  

          var idLigneTicket=element.id_ligne_ticket
          var idProduct=element.id_product
          var idCategory=element.id_category
          var imgSrc = element.imgSrc
          var nameProduct=element.name_product
          var quantity = element.quantity
          var price = element.price
          var totalItem = element.totalItem   
                    
          var datailTicket=`<tr id="trDetailTicket`+idLigneTicket+`" class="border border-dark fw-bold">
                              <td id="tdIdTicket">`+idLigneTicket+`</td>
                              <td>`+idProduct+`</td>

                              <td>`+idCategory+`</td>

                              <td>`+
                              `<img class="img img-fluid" src="/uploads/products/`+imgSrc+`" width="70px" alt="`+`">`+
                              `</td>

                              <td>`+nameProduct+`</td>

                              <td><!---Quantity------> 
                   
                              <div class="d-flex border-top border-bottom border-dark">
                                  <button id="supItemCart`+idLigneTicket+`" class="supItemCart btn btn-danger btn-sm"
                                  onclick="deleteItemTicket(`+idLigneTicket+`)">
                                  <i class="fa-solid fa-trash-can"></i>
                                  </button>               
                                  <button id="decrementQuantity`+idLigneTicket+`" class="decrementQuantity btn btn-primary"
                                  onclick="getQuantity(`+idLigneTicket+`,`+0+`)">
                                  -
                                  </button>
                                  <span id="quantity`+idLigneTicket+`" class="quantity">`+quantity+`</span>
                                  <button id="incrementQuantity`+idLigneTicket+`" class="incrementQuantity btn btn-primary"
                                  onclick="getQuantity(`+idLigneTicket+`,`+1+`)">
                                  +
                                  </button> 
                                </div>
                              </td>

                              <td>`+price+`</td>

                              <td>`+totalItem+`</td>
                            </tr>`; 
                                
            document.getElementById('showDetailTicket').innerHTML+=datailTicket; 
          
          });//forEach

          // maxIdLineSelected 
          // idLineSelected

          var trDetailTicketEl = document.getElementById('trDetailTicket'+idLineSelected);
          
          if(trDetailTicketEl!=null){

            if(idLineSelected==maxIdLineSelected) {
              trDetailTicketEl.classList.add('table-warning');
            } else {
              trDetailTicketEl.classList.add('table-info');
            }

          }//!=null                    
      } 

      }//status==200

  }//onload

  xhr.send();

}//displayDetailTicket

// data transmited to displayDetailTicket from ticketData.php
//        data :[ {
//                 id_ligne_ticket,
//                      id_product,
//                     id_category,
//                          imgSrc,
//                    name_product,
//                        quantity,
//                           price,
//                      totalItem
//                               },
//                     totalTicket,
//                        idPicked,
//                     maxIdPicked,
//                        idTicket,
//                     olfIdTicket
//              ] 9 varaibles to receive
       
function displayProductsCategory(idCategory){
 //alert(idCategory)

var xhr = new XMLHttpRequest();

  xhr.open('GET','productsData.php?idCategory='+idCategory,true);

  xhr.onload = function() {

      if(xhr.status==200){

        var  data =  JSON.parse(this.response);

//*********************************/        
//*********************************/
//*********************************/       
  //   console.log(data);//*******/
//*********************************/
//*********************************/
//*********************************/  

        var idProductSelected = data.pop(); 
     
        if (data.length > 0) {

          document.getElementById('displayProducts').innerHTML="";    

          data.forEach(element => {

          var   idProduct = element.idProduct
          var  idCategory = element.idCategory 
          var      imgsrc = element.imgsrc
          var nameProduct = element.nameProduct
          var       price = element.price

          var datailProduct=`<tr id="trDetailProduct`+idProduct+`" class="border border-dark fw-bold">            
                                <td class="idProduct">`+idProduct+`</td>
                                <td class="idCategory">`+idCategory+`</td>

                                <td id="imgProduct">            
                                <img class="img img-fluid imgProduct" src="/uploads/products/`+imgsrc+`" width="70px" onclick="selectProduct(`+idProduct+`)">
                                </td>

                                <td>`+nameProduct+`</td>
                                <td class="price">`+price+`</td>            
                             </tr>            
                            `

          document.getElementById('displayProducts').innerHTML+=datailProduct; 

          });

         var trDetailProductEl = document.getElementById("trDetailProduct"+idProductSelected);

         if(trDetailProductEl!=null){
          trDetailProductEl.classList.add('table-info');
         }
          
        }//if (data.length > 0)

      }//status==200

  }//onload

  xhr.send();

}

//This function for opening a session with idProductSelected 
function selectProduct(idProduct){

  var xhr = new XMLHttpRequest();
  
  xhr.open('GET','selectProduct.php?idProduct='+idProduct,true);

  xhr.onload = function() {

    if(xhr.status==200){

      var  data =  JSON.parse(this.response);

      //*********************************/        
      //*********************************/
      //*********************************/       
       //   console.log(data.idCategory);//*******/
      //*********************************/
      //*********************************/
      //*********************************/  


      pickProduct(idProduct);
      displayProductsCategory(data.idCategory);
     

    }//status==200
  
  }//xhr.onload 

  xhr.send();
   
}




// Functions :
// function startTime
// function ajouterTicket()
// function deleteTicket()
// function deleteItemTicket()
// function deleteItemsTicket()
// function pickProduct()
// function getQuantity()
// function displayHeadsTickets()
// function displayDetailTicket
// function displayProductsCategory

//===================================

//C:\htdocs\front\product\deleteItemsTicket.php---------------------OK
//C:\htdocs\front\product\deleteItemTicket.php----------------------OK
//C:\htdocs\front\product\deleteTicket.php--------------------------OK
//C:\htdocs\front\product\dataHeadsTickets.php----------------------OK
//C:\htdocs\front\product\dropDownCategory.php----->productsTable---OK
//C:\htdocs\front\product\dropDownVendeur.php------>numTable--------OK
//C:\htdocs\front\product\getQuantity.php---------------------------OK
//C:\htdocs\front\product\index.php---------------------------------OK
//C:\htdocs\front\product\iniTicket.php-----------------------------OK
//C:\htdocs\front\product\numTable.php-----------index--------------OK
//C:\htdocs\front\product\pickProduct.php---------------------------OK
//C:\htdocs\front\product\productsData.php--------------------------OK
//C:\htdocs\front\product\productsTable.php------index--------------OK
//C:\htdocs\front\product\ticketData.php----------------------------OK
//C:\htdocs\front\product\ticketTable.php--------index--------------OK
//===================================







<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
</head>
<body>
       <button onclick="sayHi()">Click me</button>

        <script>

                function sayHi(){

                  const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

                  
                  var arraySilced1 = fruits.slice(-2);
                  var arraySilced2 = fruits.slice(0,-2);

                  console.log("fruits :"+fruits);
                  console.log("arraySilced1 :"+arraySilced1);
                  console.log("arraySilced2 :"+arraySilced2);
                } 

        </script>

</body>
</html>
function validateData()
{
    var name =document.getElementById('productName').value;
    var price =document.getElementById('productPrice').value;
   // var img =document.getElementById('productName').value;
    //var description =document.getElementById('productDescription').value;

    if(name == "")
    {
        alert ("Product name is required !");
        return false;
    }
    if(price == "")
    {
        alert ("Price is required !");
        return false;
    }
    else if(price <1)
    {
        alert("Price can't be less then 1");
    }
     
    return true;
}

function displayData()
{
    var itemList ;

    if(localStorage.getItem("itemList") == null)
    {
        itemList =[];
    }
    else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }
    var html ="";
    itemList.forEach((element,index) => {
        html+="<tr>";
        html +="<td>" + (index +1) +"</td>";
        html +="<td>" + element.name +"</td>";
        html +="<td>" + element.price +"</td>";
        html +="<td>" + element.description +"</td>";
        html += `<td> <img src="${element.url}"></img>`;
        html +=  `<td> <button id="delete" onclick="deleteItem(${index})"> Delete</button></td>
        <td> <button id="edit" onclick="editItem(${index})">Edit</button></td>`;
        html+="</tr>";
        document.querySelector("#crudTable tbody").innerHTML =html;

    });
}
document.onload =displayData();

function addData()
{
    if( validateData() ==true)
    {
        var name =document.getElementById('productName').value;
        var price =document.getElementById('productPrice').value ;
        var description =document.getElementById('productDescription').value;
         var image = document.getElementById("img").files[0];
         
        
        
        
         
        
       
            //  if (image) {
            //     reader.readAsDataURL(image);
            // }
            // else{
            //     image.css('display', 'none');
            //     image.attr('src', '');
            // }
       

        
        var itemList ;

        if(localStorage.getItem("itemList") == null)
        {
            itemList =[];
        }
        else{
            itemList = JSON.parse(localStorage.getItem("itemList"));
        }
         
           

            if( image != undefined) {
                var reader = new FileReader();
         
        reader.readAsDataURL(image);
        reader.addEventListener('load',()=>{
           

            itemList.push({
                name:name,
                price:price,
                description:description,
                url:reader.result
                
            });
    
            localStorage.setItem('itemList',JSON.stringify(itemList));
            displayData(); 
          })
            }
            else{
                itemList.push({
                    name:name,
                    price:price,
                    description:description,
                    url : `img/default.jpg`
                     
                    
                });
        
                localStorage.setItem('itemList',JSON.stringify(itemList));
                displayData(); 
            }
         
        
        displayData();  
       document.getElementById('productName').value ='';
       document.getElementById('productPrice').value ='';
       // var img =document.getElementById('productName').value;
      document.getElementById('productDescription').value='';
    }
}
function deleteItem(index)
{ 
     
       var itemList ;

        if(localStorage.getItem("itemList") == null)
        {
            itemList =[];
        }
        else{
            itemList = JSON.parse(localStorage.getItem("itemList"));
        }

        itemList.splice(index,1);
        localStorage.setItem('itemList',JSON.stringify(itemList));
         
displayData();
}

function editItem(index)
{
    document.getElementById('submit').style.display ="none";
    
    document.getElementById('update').style.display ="block";


    var itemList ;

        if(localStorage.getItem("itemList") == null)
        {
            itemList =[];
        }
        else{
            itemList = JSON.parse(localStorage.getItem("itemList"));
        }


         document.getElementById('productName').value = itemList[index].name;
         document.getElementById('productPrice').value=itemList[index].price;
       //  document.getElementById('productName').itemList[index].name;
         document.getElementById('productDescription').value =itemList[index].description;
         

        

         document.querySelector("#update").onclick =function()
         {
            if( validateData() ==true)
            {
               
                   var image = document.getElementById("img").files[0];
      
                    let name =document.getElementById('productName').value;
                    let price =document.getElementById('productPrice').value;
                    let description =document.getElementById('productDescription').value;

                    if( image != undefined) {
                var reader = new FileReader();
                  reader.readAsDataURL(image);
                reader.addEventListener('load',()=>{
           
                    itemList[index].name =name;
                    itemList[index].price =price;
                    itemList[index].description =description;
                    
                     itemList[index].url= reader.result;
                        
                     
            
                    localStorage.setItem('itemList',JSON.stringify(itemList));
                    displayData();
                  });
           
                }
                else{
                    itemList[index].name =name;
                    itemList[index].price =price;
                    itemList[index].description =description;
                    
                     
                        
                     
            
                    localStorage.setItem('itemList',JSON.stringify(itemList));
                    displayData();
                }
                
              document.getElementById('productName').value ='';
              document.getElementById('productPrice').value ='';
              // var img =document.getElementById('productName').value;
             document.getElementById('productDescription').value='';

             document.getElementById('submit').style.display ="block";
    
             document.getElementById('update').style.display ="none";

            }
         }

}
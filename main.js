 
 
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
    var html =``;
    itemList.forEach((element,index) => {
         
        html +=`
        <div class="flex-container" id="displayBlockInner" style="border: 1px solid gray;padding: 20px;">
              <div>
                  <img id ="fixsize" src="${element.url}" alt="Image Product">
              </div>
              <div>
                <label for="id" style="color: gray;">Pid : ${element.productId}</label>
              </div>
              <div>
                <label for="Name" style="color: rgb(0, 0, 0);"> ${element.name}</label>
              </div>
              <div>
                <label for="price" style="color: green;"> ₹ ${element.price} </label>
              </div>
              <div>
                <label for="description" style="color: gray;" id="desc"  >${element.description}</label>
              </div>
                  <div>
              <button id="delete"  onclick="deleteItem(${index} )" style="margin-right: 3px;"> Delete</button>
              <button id="edit"  onclick="editItem( ${index})">Edit</button></div>
            </div>
             `;
        document.querySelector("#displayBlock").innerHTML =html;     

    });
}
 
document.onload =displayData();
function addData()
{
    var name =document.getElementById('productName').value;
var price =document.getElementById('productPrice').value ;
var description =document.getElementById('productDescription').value;
 var image = document.getElementById("img").files[0];
 var id = document.getElementById('productId').value;
 var fg=true
        
    if(id == "")
    {   document.getElementById('pId').style.display='block';
 
        document.getElementById('pId').innerHTML ="Product Id is required !!";
        fg=false;
    } 
        
    
    

      if(name == "")
    {   document.getElementById('pname').style.display='block';
        
        document.getElementById('pname').innerHTML ="Plaese enter name !!";
        fg=false;
      
    }
      if(price == "")
    {
        document.getElementById('pPrice').style.display='block';
         
        document.getElementById('pPrice').innerHTML =" Price is  required!!"
    
        fg=false;
    }
       if(price <1)
    { document.getElementById('pPrice').style.display='block';
         
    document.getElementById('pPrice').innerHTML =" Price must be >1 !!"
        
        
        fg=false;
        
    }

 else if( fg)
    { document.getElementById('pPrice').style.display='none';
    document.getElementById('pname').style.display='none';
    document.getElementById('pId').style.display='none';
    
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
                productId:id,
                name:name,
                price:price,
                description:description,
                url:reader.result
                
            });
           
            alert("Product "+ name+" Added Successfully !!");
            localStorage.setItem('itemList',JSON.stringify(itemList));
            displayData();
           
          })
            }
            else{
                itemList.push({
                    productId:id,
                    name:name,
                    price:price,
                    description:description,
                    url : `img/default.jpg`
                     
                    
                });
                
                alert("Product "+ name+" Added Successfully !!");
                localStorage.setItem('itemList',JSON.stringify(itemList));
                displayData();
            }
           
           
       document.getElementById('productName').value ='';
       document.getElementById('productPrice').value ='';
     
      document.getElementById('productDescription').value='';
      displayData();
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
        alert("Product "+itemList[index].name+" Deleted Successfully !!");
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
         
         document.getElementById('productId').value=itemList[index].productId;
          
          
         document.querySelector("#update").onclick =function()
         {        
            var name =document.getElementById('productName').value;
            var price =document.getElementById('productPrice').value ;
             
            var id = document.getElementById('productId').value;
            
            
            var fg=true
        
            if(id == "")
            {   document.getElementById('pId').style.display='block';
         
                document.getElementById('pId').innerHTML ="Product Id is required !!";
                fg=false;
            } 
                
            
            
        
              if(name == "")
            {   document.getElementById('pname').style.display='block';
                
                document.getElementById('pname').innerHTML ="Plaese enter name !!";
                fg=false;
              
            }
              if(price == "")
            {
                document.getElementById('pPrice').style.display='block';
                 
                document.getElementById('pPrice').innerHTML =" Price is  required!!"
            
                fg=false;
            }
               if(price <1)
            { document.getElementById('pPrice').style.display='block';
                 
            document.getElementById('pPrice').innerHTML =" Price must be >1 !!"
                
                
                fg=false;
                
            }
        
         else if( fg)
            {
               
                   var image = document.getElementById("img").files[0];
      
                    let name =document.getElementById('productName').value;
                    let price =document.getElementById('productPrice').value;
                    let description =document.getElementById('productDescription').value;
                    let pid =document.getElementById('productId').value;
                    if( image != undefined) {
                var reader = new FileReader();
                  reader.readAsDataURL(image);
                reader.addEventListener('load',()=>{
           
                    itemList[index].name =name;
                    itemList[index].price =price;
                    itemList[index].description =description;
                    
                     itemList[index].url= reader.result;
                     itemList[index].productId =pid;
                     
                     alert("Product "+itemList[index].name+" Updated Successfully !!");
                    localStorage.setItem('itemList',JSON.stringify(itemList));
                    displayData();
                  
                  });
           
                }
                else{
                    itemList[index].name =name;
                    itemList[index].price =price;
                    itemList[index].description =description;
                    itemList[index].productId =pid;
                     
                    alert("Product "+itemList[index].name+" Updated Successfully !!");
                     
            
                    localStorage.setItem('itemList',JSON.stringify(itemList));
                    displayData();
                }
                
                document.getElementById('productId').value='';
              document.getElementById('productName').value ='';
              document.getElementById('productPrice').value ='';
              // var img =document.getElementById('productName').value;
             document.getElementById('productDescription').value='';

             document.getElementById('submit').style.display ="block";
    
             document.getElementById('update').style.display ="none";

            }
           
         }
         displayData();

}
 
function SortDataLower()
{
    var itemList ;

        if(localStorage.getItem("itemList") == null)
        {
            itemList =[];
        }
        else{
            itemList = JSON.parse(localStorage.getItem("itemList"));
        }
       
        itemList.sort((a, b) => {
            return a.price - b.price;
        });
        
    
        
            
        
        localStorage.setItem('itemList',JSON.stringify(itemList));
        displayData();   
}

function SortDataByHigher()
{  var itemList ;

    if(localStorage.getItem("itemList") == null)
    {
        itemList =[];
    }
    else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }
   
    itemList.sort((a, b) => {
    return b.price - a.price;
}); 

localStorage.setItem('itemList',JSON.stringify(itemList));
displayData();

}
 
function SortDataByName()
{
    var itemList ;

        if(localStorage.getItem("itemList") == null)
        {
            itemList =[];
        }
        else{
            itemList = JSON.parse(localStorage.getItem("itemList"));
        }
        

        
       
            itemList.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            }); 
        localStorage.setItem('itemList',JSON.stringify(itemList));
        displayData();
}
function SearchById()
{
    let id = document.getElementById('search') ;
    
    var itemList ;

    if(localStorage.getItem("itemList") == null)
    {
        itemList =[];
    }
    else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }
    let html =``;
    
    itemList.forEach((element,index)=>{
        if(  element.productId == id.value || element.name.toLowerCase().includes(id.value.toLowerCase())  ){

                console.log(element.productId); 
            html+=` <div class="flex-container" id="displayBlockInner" style="border: 1px solid gray;padding: 20px;">
            <div>
                <img id ="fixsize" src="${element.url}" alt="Image Product">
            </div>
            <div>
              <label for="id" style="color: gray;">Pid : ${element.productId}</label>
            </div>
            <div>
              <label for="Name" style="color: rgb(0, 0, 0);"> ${element.name}</label>
            </div>
            <div>
              <label for="price" style="color: green;"> ₹ ${element.price} </label>
            </div>
            <div>
              <label for="description" style="color: gray;" id="desc"  >${element.description}</label>
            </div>
                <div>
            <button id="delete"  onclick="deleteItem(${index} )" style="margin-right: 3px;"> Delete</button>
            <button id="edit"  onclick="editItem( ${index})">Edit</button></div>
          </div>`;

          document.querySelector("#displayBlock").innerHTML =html;
       
           
        }
         
       
        
    });

     id.value='';
}
function checkDu(id)
{
    var itemList ;
    let ret =true;
    if(localStorage.getItem("itemList") == null)
    {
        itemList =[];
        return true;
    }
    else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
        itemList.forEach((e) => {
            if(e.productId == id)
            {   
                ret =false;
                return false;
            }
        });
    }
    return ret;
}

function validateData(a)
{   
    var name =document.getElementById('productName').value;
    var price =document.getElementById('productPrice').value;
    let id = document.getElementById('productId').value;
    
    if(a !=1)
    if(id == "")
    {   document.getElementById('pId').style.display='block';
        document.getElementById('pId').innerHTML ="Product Id is required !!";
        alert("Product Id is required !!");
        return false;
    }
    if(a !=1)
    if(checkDu(id) == false)
    { 
        document.getElementById('pId').style.display='block';
       document.getElementById('pId').innerHTML ="Product Id must be unique !!";
       alert("Product Id must be unique  !!");
       return false;
    }

    if(name == "")
    {   document.getElementById('pname').style.display='block';
        document.getElementById('pname').innerHTML ="Plaese enter name !!";
        alert("Plaese enter name !!");
     return false;
    }
    if(price == "")
    {
        document.getElementById('pPrice').style.display='block';
        document.getElementById('pPrice').innerHTML =" Price is  required!!"
        alert("Price is  required !!");
        return false;
    }
    else if(price <1)
    {
        
        document.getElementById('pPrice').style.display='block';
        document.getElementById('pPrice').innerHTML =" Price can't be less then 1"
        alert("Price can't be less then 1 !!");
        return false;
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
              <button id="delete" onclick="deleteItem(${index} )" style="margin-right: 3px;"> Delete</button>
              <button id="edit" onclick="editItem( ${index})">Edit</button></div>
            </div>
             `;
        document.querySelector("#displayBlock").innerHTML =html;     

    });
}
  
document.onload =displayData();
function addData()
{
    if( validateData()  )
    {
        var name =document.getElementById('productName').value;
        var price =document.getElementById('productPrice').value ;
        var description =document.getElementById('productDescription').value;
         var image = document.getElementById("img").files[0];
         var id = document.getElementById('productId').value;
    
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
        
                localStorage.setItem('itemList',JSON.stringify(itemList));
                displayData(); 
            }
         
        
        displayData();  
       document.getElementById('productName').value ='';
       document.getElementById('productPrice').value ='';
     
      document.getElementById('productDescription').value='';
    }
  
}  document.onload =displayData();
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
         
document.onload =displayData();
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
            if( validateData(1) ==true)
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
}) 

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
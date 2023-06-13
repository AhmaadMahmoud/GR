let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let department = document.getElementById("department");
let sumbit = document.getElementById("sumbit");
let mood = "create"
let tmp;
//get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background="#040"
  }
}

//Create Product
let dataProduct = []; //الداتا كلها هحغظها في ارراي علي هيئه اوبجيكت بحيث ان كل لما اعمل اوبجيكت جديد القديم يفضل محفوظ في الارراي دي

if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  let dataProduct = [];
}

sumbit.onclick = function () {
  let newPro = {
    // دا اوبيجكت عشان اربط كل الداتا ببعض
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    department: department.value,
  };
 // هضيف كل الاوبجيكت في الارراي القديمه والجديده
if (mood ==="create")
{
        if (newPro.count > 1) {
          for (let i = 0; i < newPro.count; i++) {
            dataProduct.push(newPro);
          }
        } else {
          dataProduct.push(newPro);
        }
}
else
{
dataProduct[tmp] = newPro
mood = "create";
sumbit.innerHTML=`Create`
sumbit.style.background = "#0dcaf0";
count.style.display="block"

}


  localStorage.setItem("product", JSON.stringify(dataProduct));
  clearData();
  showData();
};

// clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  department.value = "";
}


//read

function showData() {
    
getTotal()
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `

            <tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].department}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>            
            </tr>
`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `
    
    <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
    
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// delete

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

function deleteAll() {
  localStorage.clear
  dataProduct.splice(0)

  showData() 
}  
// update 
function updateData(i)
{
    title.value=dataProduct[i].title
    price.value=dataProduct[i].price
    ads.value=dataProduct[i].ads
    taxes.value=dataProduct[i].taxes
    count.style.display="none"
    discount.value=dataProduct[i].discount
    department.value=dataProduct[i].department
    sumbit.innerHTML=`Update`
    sumbit.style.background="#ffc107"
    mood="update"
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
    getTotal()
}
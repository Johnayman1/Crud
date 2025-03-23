let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let dis = document.getElementById("dis");
let total = document.getElementById("total");
let count = document.getElementById("count");
let cat = document.getElementById("cat");
let create = document.getElementById("submit");

let mood = "create";
let tmp;

// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value + +ads.value - +dis.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#f10";
  }
}

// crate item

let dataItems;

if (localStorage.product != null) {
  dataItems = JSON.parse(localStorage.product);
} else {
  dataItems = [];
}

create.onclick = function () {
  let newItem = {
    title: title.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    dis: dis.value,
    total: total.innerHTML,
    count: count.value,
    cat: cat.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    cat.value != "" &&
    newItem.count < 100
  ) {
    if (mood === "create") {
      if (newItem.count > 1) {
        for (let i = 0; i < newItem.count; i++) {
          dataItems.push(newItem);
        }
      } else {
        dataItems.push(newItem);
      }
    } else {
      dataItems[tmp] = newItem;
      mood = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataItems));

  showData();
};

// clear input

function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  dis.value = "";
  total.innerHTML = "";
  count.value = "";
  cat.value = "";
}

// show data

function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataItems.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataItems[i].title}</td>
            <td>${dataItems[i].price}</td>
            <td>${dataItems[i].tax}</td>
            <td>${dataItems[i].ads}</td>
            <td>${dataItems[i].dis}</td>
            <td>${dataItems[i].total}</td>
            <td>${dataItems[i].cat}</td>
            <td><button onclick="updateItem(${i})" class="update">Update</button></td>
            <td><button onclick="deleteItem(${i})" class="delete">Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let del = document.getElementById("delete");
  if (dataItems.length > 0) {
    del.innerHTML = `
            <button onclick="deleteAll()" id="deleteAll">Delete All (${dataItems.length})</button>
        `;
  } else {
    del.innerHTML = "";
  }
}
showData();

// delete item

function deleteItem(i) {
  dataItems.splice(i, 1);
  localStorage.product = JSON.stringify(dataItems);
  showData();
}

// delete all

function deleteAll() {
  localStorage.clear();
  dataItems.splice(0);
  showData();
}

// update item

function updateItem(i) {
  title.value = dataItems[i].title;
  price.value = dataItems[i].price;
  tax.value = dataItems[i].tax;
  ads.value = dataItems[i].ads;
  dis.value = dataItems[i].dis;
  getTotal();
  count.style.display = "none";
  cat.value = dataItems[i].cat;
  mood = "update";
  create.innerHTML = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search mood

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id === "byTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

// search item

function searchItem(value) {
  let table = "";
  for (let i = 0; i < dataItems.length; i++) {
    if (searchMood === "title") {
      if (dataItems[i].title.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataItems[i].title}</td>
                    <td>${dataItems[i].price}</td>
                    <td>${dataItems[i].tax}</td>
                    <td>${dataItems[i].ads}</td>
                    <td>${dataItems[i].dis}</td>
                    <td>${dataItems[i].total}</td>
                    <td>${dataItems[i].cat}</td>
                    <td><button onclick="updateItem(${i})" class="update">Update</button></td>
                    <td><button onclick="deleteItem(${i})" class="delete">Delete</button></td>
                </tr>
                `;
      }
    } else {
      if (dataItems[i].cat.includes(value.toLowerCase())) {
        table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataItems[i].title}</td>
                    <td>${dataItems[i].price}</td>
                    <td>${dataItems[i].tax}</td>
                    <td>${dataItems[i].ads}</td>
                    <td>${dataItems[i].dis}</td>
                    <td>${dataItems[i].total}</td>
                    <td>${dataItems[i].cat}</td>
                    <td><button onclick="updateItem(${i})" class="update">Update</button></td>
                    <td><button onclick="deleteItem(${i})" class="delete">Delete</button></td>
                </tr>
                `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

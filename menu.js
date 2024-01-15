const urlInput = document.querySelector(".image-url");
const nameInput = document.querySelector(".food-name");
const priceInput = document.querySelector(".input-price");
const createBtn = document.querySelector(".create-btn");
const card = document.querySelector(".card");
const menuLink = document.querySelector(".menuLink");
const orderLink = document.querySelector(".orderLink");
const adminLink = document.querySelector(".adminLink");
const menu = document.querySelector("#menu");
const admin = document.querySelector("#admin");
const order = document.querySelector("#order");
const links = document.querySelectorAll("a");
const orderList = document.querySelector(".order");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
const modalDelBtn = document.querySelector(".modal-del");
const modalCloseBtn = document.querySelector(".modal-close");

orderLink.addEventListener("click", () => {
  menu.style.display = "none";
  admin.style.display = "none";
  order.style.display = "block";
  swLink(orderLink);
});
menuLink.addEventListener("click", () => {
  admin.style.display = "none";
  order.style.display = "none";
  menu.style.display = "block";
  swLink(menuLink);
});
adminLink.addEventListener("click", () => {
  menu.style.display = "none";
  order.style.display = "none";
  admin.style.display = "block";
  swLink(adminLink);
});
function swLink(activeLink) {
  for (let link of links) {
    link.style.color = "#000000";
  }
  activeLink.style.color = "#bd1d1d";
}
getProduct();
createBtn.addEventListener("click", () => {
  addProduct();
});
function addProduct() {
  let obj = {
    name: nameInput.value,
    url: urlInput.value,
    price: priceInput.value,
  };
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.push(obj);
  localStorage.setItem("data", JSON.stringify(data));
  getProduct();
}

function getProduct() {
  card.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.forEach((element, ind) => {
    const block = document.createElement("div");
    card.append(block);
    block.classList.add("card-item");
    const img = document.createElement("img");
    img.src = element.url;
    const h2 = document.createElement("h2");
    h2.classList.add("card-title");
    h2.innerHTML = element.name;
    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price-block");
    const h3 = document.createElement("h3");
    h3.classList.add("price");
    h3.innerHTML = element.price;
    const menubtn = document.createElement("button");
    menubtn.classList.add("price-btn");
    menubtn.innerHTML = "to order";
    priceDiv.append(h3);
    priceDiv.append(menubtn);
    block.append(img);
    block.append(h2);
    block.append(priceDiv);
    menubtn.addEventListener("click", () => {
      let newObj = {
        url: data[ind].url,
        name: data[ind].name,
        price: data[ind].price,
      };

      let orderData = JSON.parse(localStorage.getItem("orderData")) || [];
      orderData.push(newObj);
      localStorage.setItem("orderData", JSON.stringify(orderData));
      getOrdersData();
    });
  });
}

getOrdersData();
function getOrdersData() {
  orderList.innerHTML = "";
  let orderData = JSON.parse(localStorage.getItem("orderData")) || [];
  orderData.forEach((elem, ind) => {
    let orderDiv = document.createElement("div");
    orderList.append(orderDiv);
    orderDiv.classList.add("order-list");
    let num = 1;
    const img = document.createElement("img");
    const txtDiv = document.createElement("div");
    const txt1 = document.createElement("p");
    const txt2 = document.createElement("p");
    const orderInfo = document.createElement("div");
    const delBtn = document.createElement("button");
    const countDiv = document.createElement("div");
    const minus = document.createElement("p");
    const txt4 = document.createElement("p");
    const plus = document.createElement("p");
    img.src = elem.url;
    txtDiv.classList.add("order-txt");
    txt1.classList.add("order-title");
    txt1.innerHTML = elem.name;
    txt2.classList.add("order-time");
    txt2.innerHTML = elem.price + "$";
    orderInfo.classList.add("order-info");
    countDiv.classList.add("count");
    delBtn.classList.add("del-order");
    delBtn.innerHTML = "delete order";
    minus.classList.add("minus", "count-bg");
    minus.innerHTML = "-";
    txt4.classList.add("quantity");
    txt4.innerText = num + "x";
    plus.classList.add("plus", "count-bg");
    plus.innerHTML = "+";
    orderInfo.append(delBtn);
    countDiv.append(minus);
    countDiv.append(txt4);
    countDiv.append(plus);
    orderInfo.append(countDiv);
    txtDiv.append(txt1);
    txtDiv.append(txt2);
    orderDiv.append(img);
    orderDiv.append(txtDiv);
    orderDiv.append(orderInfo);
    delBtn.addEventListener("click", () => {
      removeOrderProduct(ind);
    });

    plus.addEventListener("click", () => {
      ++num;
      txt4.innerHTML = num + "x";
      txt2.innerHTML = Number(num) * elem.price + "$";
    });
    minus.addEventListener("click", () => {
      if (num === 0) {
        num = 0;
        txt4.innerHTML = num + "x";
        txt2.innerHTML = num + "$";
      } else {
        num -= 1;
        txt4.innerHTML = num + "x";
        txt2.innerHTML = Number(num) * elem.price + "$";
      }
    });
  });
}
function removeOrderProduct(ind) {
  let orderData = JSON.parse(localStorage.getItem("orderData")) || [];
  orderData.splice(ind, 1);
  localStorage.setItem("orderData", JSON.stringify(orderData));
  getOrdersData();
}

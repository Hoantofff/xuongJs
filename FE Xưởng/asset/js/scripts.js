/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

const getProducts = async (content) => {
    try {
        const res = await fetch('http://localhost:3000/products');
        const products = await res.json();

        products.forEach(product => {
            // tạo div elm mới
            const div = document.createElement('div');
            div.classList.add('col');
            div.classList.add('mb-5');
            div.innerHTML = `
            <div class="card h-100">
                <!-- Product image-->
                <img class="card-img-top" src="${product.image}" alt="..." />
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder">${product.name}</h5>
                        <!-- Product price-->
                        ${product.price}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="detail.html?id=${product.id}">Chi tiết</a></div>
                </div>
            </div>
            `
            content.append(div);
        })
    } catch (error) {

    }
}

const getProductById = async (image,info,id) => {
    try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const product = await res.json();
        image.innerHTML = `
            <img src="${product.image}"/>
        `
        info.innerHTML = `
            <h1> ${product.name} </h1>
            <p>${product.price}</p>
            
            <button onclick="addToCart('${product.id}',1)" class="btn btn-danger" >Thêm giỏ hàng</button>
        `
    } catch (error) {
        
    }
}

const addToCart = (id,quantity)=>{
    //Check giỏ hàng tồn tại chưa
    const cart = localStorage.getItem('cart');
    if(cart){
        //parse giỏ hàng
        const items = JSON.parse(cart);
        const check = items.filter(item=>item.productId == id);
        if(check.length>0){
            const newItem = items.map(item=>{
                if(item.productId == id){
                    item.quantity = item.quantity + quantity;
                }
                return item
            })
            localStorage.setItem('cart', JSON.stringify(newItem))
        }else{
            const newItem = {
                productId:id,
                quantity:quantity
            }
            localStorage.setItem('cart', JSON.stringify([...items,newItem]))
        }
    }else{
        const newItem = {
            productId:id,
            quantity:quantity
        }
        localStorage.setItem('cart', JSON.stringify([newItem]))
    }
    console.log(cart);
    
}
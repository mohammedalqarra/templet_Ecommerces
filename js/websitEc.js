//cart 

let cart = document.querySelector(".cart");
let cartIcon = document.querySelector("#cart-icon");
let closeCart = document.querySelector("#close-cart");


// cartIcon.onclick = () =>{
//     cart.classList.add("active");
// };

// closeCart.onclick = () =>{
//     cart.classList.remove("active");
// }


if(cartIcon){
    cartIcon.addEventListener("click",()=>{
      cart.classList.toggle('active');
    })
  }
  if(closeCart){
    closeCart.addEventListener("click",()=>{
      cart.classList.remove('active');
    })
  }

  // cart working js

    if(document.readyState == "loading"){
        document.addEventListener("DOMContentLoaded", ready)
    }else{
        ready();
    }
    //making function

     function ready(){
         //remove item from cart

         let removeCartButtons = document.getElementsByClassName("cart-remove");
         console.log(removeCartButtons);

         for(let i=0; i<removeCartButtons.length; i++){
            let button = removeCartButtons[i];
             button.addEventListener("click" , removeCartItem);
         }
         //Quantity Changes
         let quantityInput = document.getElementsByClassName("cart-quantity");
         for(let i=0; i<quantityInput.length; i++){
             let input = quantityInput[i];
             input.addEventListener("change", quantityChange);
           
         }
         //Add To Cart
         
         let addCart = document.getElementsByClassName("add-cart");
         for(let i = 0; i<addCart.length; i++){
             let button = addCart[i];
             button.addEventListener("click", addCartClicked);
         } 
         // Buy Button Work
         document.getElementsByClassName("btn-buy")[0].addEventListener('click', buyButtonClicked);
     }

     //Buy Button 

     function buyButtonClicked(){
         alert("Your Order is placed");
         let cartContent = document.getElementsByClassName("cart-content")[0]
         while(cartContent.hasChildNodes()){
             cartContent.removeChild(cartContent.firstChild);
         }
         updateTotal();
     }

     //remove item from cart

     function removeCartItem(event){
         let buttonClicked = event.target;
         buttonClicked.parentElement.remove();

         updateTotal();
     }
       //Quantity changes
     function quantityChange(event){
         let input = event.target
         if(isNaN(input.value) || input.value <= 0){
             input.value = 1;
         }
         updateTotal();
     }
       //Add To Cart
       function addCartClicked(event){
           let button = event.target
           let shopProducts = button.parentElement
           let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
           let price = shopProducts.getElementsByClassName("price")[0].innerText;
           let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
            console.log(title,price,productImg);
            addProductToCart(title, price, productImg);
            updateTotal();
       }


    function addProductToCart(title, price, productImg){
        let cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        let cartItems = document.getElementsByClassName("cart-content")[0];
        let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        for(let i = 0; i < cartItemsNames.length; i++){
             if(cartItemsNames[i].innerText == title){
           alert("You have already add this item to cart");
           return ;
        }
     
    }
     
 

    let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!--remove cart-->
    <i class="bx bxs-trash-alt cart-remove"></i> `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChange);
}
    
    //Update Total 

     function updateTotal(){
         let cartContent = document.getElementsByClassName("cart-content")[0]
         let cartBoxes = cartContent.getElementsByClassName("cart-box")
         let total = 0 ;
         for(let i = 0; i < cartBoxes.length; i++){
             let cartBox = cartBoxes[i]
             let priceElement = cartBox.getElementsByClassName("cart-price")[0]
             let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
             let price = parseFloat(priceElement.innerText.replace("$",""));
             let quantity = quantityElement.value
             total = total + (price * quantity);
         }
             //if price Contain some Cents Value
             total = Math.round(total * 100) / 100;
          document.getElementsByClassName("total-price")[0].innerText = "$" + total;
        
     }


     
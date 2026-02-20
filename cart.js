document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cartItems");
    const totalPriceEl = document.getElementById("totalPrice");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    function renderCart() {
        cartContainer.innerHTML = "";
        total = 0;

        cart.forEach((item, index) => {
            const priceNumber = parseInt(item.price.replace("₹",""));
            const itemTotal = priceNumber * item.qty;
            total += itemTotal;

            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-price">₹${itemTotal}</span>
                <div>
                    <button class="qty-btn minus">−</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn plus">+</button>
                </div>
                <button class="remove-btn">Remove</button>
            `;

            // PLUS
            div.querySelector(".plus").addEventListener("click", () => {
                item.qty++;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });

            // MINUS
            div.querySelector(".minus").addEventListener("click", () => {
                if (item.qty > 1) item.qty--;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });

            // REMOVE
            div.querySelector(".remove-btn").addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });

            cartContainer.appendChild(div);
        });

        totalPriceEl.textContent = total;
    }

    renderCart();
});
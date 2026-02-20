document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".medicine-card button").forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.parentElement;
            const name = card.querySelector("h4").innerText;
            const price = card.querySelector("p").innerText;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.name === name);

            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({
                    name,
                    price,
                    qty: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            window.location.href = "cart.html";
        });
    });
});


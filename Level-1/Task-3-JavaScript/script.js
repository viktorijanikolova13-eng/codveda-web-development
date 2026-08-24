document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.getElementById("filterButton");
    const filterDropdown = document.getElementById("filterDropdown");
    const menuItems = document.querySelectorAll(".menu-item");

    filterButton.addEventListener("click", function () {
        filterDropdown.classList.toggle("show");
    });

    const categories = document.querySelectorAll(".filter-dropdown div");

    categories.forEach(function (category) {
        category.addEventListener("click", function () {
            const selectedCategory = category.dataset.category;

            menuItems.forEach(function (item) {
                if (selectedCategory === "all" || item.classList.contains(selectedCategory)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            filterButton.textContent = category.textContent + " ▼";
            filterDropdown.classList.remove("show");
        });
    });

    const modal = document.getElementById("pizzaModal");
    const detailsButtons = document.querySelectorAll(".details-btn");
    const closeButton = document.querySelector(".close");

    const modalName = document.getElementById("modalName");
    const modalIngredients = document.getElementById("modalIngredients");
    const modalPrice = document.getElementById("modalPrice");

    detailsButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            modalName.textContent = button.dataset.name;
            modalIngredients.textContent = button.dataset.ingredients;
            modalPrice.textContent = button.dataset.price;
            modal.style.display = "flex";
        });
    });

    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    const minusButton = document.getElementById("minus");
    const plusButton = document.getElementById("plus");
    const guestCount = document.getElementById("guestCount");

    let guests = 1;

    plusButton.addEventListener("click", function () {
        guests++;
        guestCount.textContent = guests;
    });

    minusButton.addEventListener("click", function () {
        if (guests > 1) {
            guests--;
            guestCount.textContent = guests;
        }
    });

    const reservationForm = document.getElementById("reservationForm");
    const nameInput = document.getElementById("name");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const formMessage = document.getElementById("formMessage");

    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (
            nameInput.value.trim() === "" ||
            dateInput.value === "" ||
            timeInput.value === ""
        ) {
            formMessage.textContent = "Please fill in all the fields.";
            formMessage.style.color = "red";
        } else {
            formMessage.textContent = "Your table has been reserved successfully!";
            formMessage.style.color = "#36783d";

            reservationForm.reset();
            guests = 1;
            guestCount.textContent = guests;
        }
    });
});
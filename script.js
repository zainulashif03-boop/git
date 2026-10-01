// ==============================
// HOTEL BOOKING JAVASCRIPT
// ==============================

const modal = document.getElementById("bookingModal");
const hotelName = document.getElementById("hotelName");


// Open booking modal
function openBooking(hotel = "LUXORA Premium Hotel") {

    hotelName.value = hotel;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


// Close booking modal
function closeBooking() {

    modal.classList.remove("show");

    document.body.style.overflow = "auto";
}


// Close when clicking outside modal
modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeBooking();
    }

});


// Favorite button
function toggleFavorite(button) {

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
        button.innerHTML = "♥";
    } else {
        button.innerHTML = "♡";
    }
}


// Hotel search
function searchHotels() {

    const destination =
        document.getElementById("destination").value.trim();

    const checkin =
        document.getElementById("checkin").value;

    const checkout =
        document.getElementById("checkout").value;

    const guests =
        document.getElementById("guests").value;


    if (!destination) {

        alert("Please enter a destination.");

        return;
    }


    if (!checkin || !checkout) {

        alert("Please select your check-in and check-out dates.");

        return;
    }


    if (new Date(checkout) <= new Date(checkin)) {

        alert("Check-out must be after check-in.");

        return;
    }


    alert(
        `Searching luxury hotels in ${destination}\n` +
        `${guests} guest(s)\n` +
        `${checkin} → ${checkout}`
    );

    document
        .getElementById("hotels")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// Booking form
document
    .getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("fullName").value;

        const email =
            document.getElementById("email").value;

        const checkin =
            document.getElementById("modalCheckin").value;

        const checkout =
            document.getElementById("modalCheckout").value;


        if (new Date(checkout) <= new Date(checkin)) {

            alert("Check-out must be after check-in.");

            return;
        }


        alert(
            `Thank you, ${name}!\n\n` +
            `Your reservation request for ${hotelName.value} ` +
            `has been received.\n\n` +
            `Confirmation will be sent to ${email}.`
        );


        this.reset();

        closeBooking();
    });


// Mobile menu
function toggleMenu() {

    const nav = document.querySelector(".navbar nav");

    if (nav.style.display === "flex") {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";
        nav.style.top = "90px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.padding = "25px";
        nav.style.background = "#111";

        nav.style.flexDirection = "column";
        nav.style.gap = "20px";
    }
}


// Set minimum dates
const today = new Date().toISOString().split("T")[0];

document.getElementById("checkin").min = today;
document.getElementById("checkout").min = today;
document.getElementById("modalCheckin").min = today;
document.getElementById("modalCheckout").min = today;


// Automatically update checkout minimum date
document
    .getElementById("checkin")
    .addEventListener("change", function() {

        document.getElementById("checkout").min = this.value;

    });


document
    .getElementById("modalCheckin")
    .addEventListener("change", function() {

        document.getElementById("modalCheckout").min = this.value;

    });

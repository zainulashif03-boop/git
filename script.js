
// ==========================================
// PREMIUM KSRTC BUS BOOKING JAVASCRIPT
// ==========================================


// Global booking information

let selectedBus = "";
let selectedPrice = 0;
let selectedSeat = "";

let tripType = "oneway";


// ==========================================
// SET TRIP TYPE
// ==========================================

function setTripType(type, button) {

    tripType = type;

    document
        .querySelectorAll(".trip-tabs button")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    button.classList.add("active");

}


// ==========================================
// SWAP CITIES
// ==========================================

function swapCities() {

    const from = document.getElementById("from");
    const to = document.getElementById("to");

    const temp = from.value;

    from.value = to.value;
    to.value = temp;

}


// ==========================================
// SEARCH BUSES
// ==========================================

function searchBuses() {

    const from =
        document.getElementById("from").value;

    const to =
        document.getElementById("to").value;

    const date =
        document.getElementById("travelDate").value;

    const passengers =
        document.getElementById("passengers").value;


    if (!from || !to) {

        alert(
            "Please select your departure and destination."
        );

        return;
    }


    if (from === to) {

        alert(
            "Departure and destination cannot be the same."
        );

        return;
    }


    if (!date) {

        alert(
            "Please select your travel date."
        );

        return;
    }


    alert(
        `Searching buses\n\n` +
        `${from} → ${to}\n` +
        `Date: ${date}\n` +
        `Passengers: ${passengers}`
    );


    document
        .getElementById("results")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// QUICK ROUTE SELECTION
// ==========================================

function selectRoute(from, to) {

    document.getElementById("from").value = from;

    document.getElementById("to").value = to;

    document
        .querySelector(".search-card")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// OPEN SEAT SELECTION
// ==========================================

function openSeats(bus, price) {

    selectedBus = bus;

    selectedPrice = price;

    selectedSeat = "";


    document.getElementById("selectedBus")
        .textContent = bus;

    document.getElementById("seatNumber")
        .textContent = "None";

    document.getElementById("seatPrice")
        .textContent = "₹0";


    createSeats();


    openModal("seatModal");

}


// ==========================================
// CREATE BUS SEATS
// ==========================================

function createSeats() {

    const container =
        document.getElementById("seatContainer");

    container.innerHTML = "";


    const occupiedSeats = [
        3,
        7,
        11,
        15,
        20,
        23
    ];


    for (let i = 1; i <= 24; i++) {

        const seat =
            document.createElement("button");


        seat.className = "seat";

        seat.textContent = i;

        seat.dataset.seat = i;


        if (occupiedSeats.includes(i)) {

            seat.classList.add("occupied");

            seat.disabled = true;

        } else {

            seat.addEventListener(
                "click",
                function() {

                    selectSeat(this);

                }
            );

        }


        container.appendChild(seat);

    }

}


// ==========================================
// SELECT SEAT
// ==========================================

function selectSeat(button) {

    document
        .querySelectorAll(".seat")
        .forEach(seat => {

            seat.classList.remove("selected");

        });


    button.classList.add("selected");


    selectedSeat =
        button.dataset.seat;


    document.getElementById("seatNumber")
        .textContent =
        "Seat " + selectedSeat;


    document.getElementById("seatPrice")
        .textContent =
        "₹" + selectedPrice;

}


// ==========================================
// CONTINUE BOOKING
// ==========================================

function continueBooking() {

    if (!selectedSeat) {

        alert(
            "Please select a seat before continuing."
        );

        return;
    }


    closeModal("seatModal");


    document.getElementById("finalBus")
        .textContent = selectedBus;


    document.getElementById("finalSeat")
        .textContent =
        "Seat " + selectedSeat;


    document.getElementById("finalPrice")
        .textContent =
        "₹" + selectedPrice;


    openModal("passengerModal");

}


// ==========================================
// PASSENGER FORM
// ==========================================

document
    .getElementById("passengerForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "passengerName"
                ).value.trim();


            const mobile =
                document.getElementById(
                    "mobile"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            if (name.length < 3) {

                alert(
                    "Please enter a valid name."
                );

                return;
            }


            if (!/^[0-9]{10}$/.test(mobile)) {

                alert(
                    "Please enter a valid 10-digit mobile number."
                );

                return;
            }


            if (!email.includes("@")) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            const bookingId =
                "KS" +
                Math.floor(
                    100000 +
                    Math.random() * 900000
                );


            alert(
                `Booking Confirmed!\n\n` +

                `Booking ID: ${bookingId}\n` +

                `Passenger: ${name}\n` +

                `Bus: ${selectedBus}\n` +

                `Seat: ${selectedSeat}\n` +

                `Amount: ₹${selectedPrice}\n\n` +

                `A confirmation would be sent to ${email}.`
            );


            closeModal("passengerModal");


            this.reset();

        }
    );


// ==========================================
// LOGIN
// ==========================================

function openLogin() {

    openModal("loginModal");

}


document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            alert(
                "Demo login successful!"
            );

            closeModal("loginModal");

        }
    );


// ==========================================
// MODAL FUNCTIONS
// ==========================================

function openModal(id) {

    document
        .getElementById(id)
        .classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

    document.body.style.overflow = "auto";

}


// Close modal by clicking outside

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            function(event) {

                if (event.target === modal) {

                    closeModal(modal.id);

                }

            }
        );

    });


// ==========================================
// MOBILE MENU
// ==========================================

function toggleMenu() {

    const nav =
        document.getElementById("mainNav");


    if (
        nav.style.display === "flex"
    ) {

        nav.style.display = "none";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";

        nav.style.top = "82px";

        nav.style.left = "0";

        nav.style.width = "100%";

        nav.style.padding = "25px";

        nav.style.background = "#6e1015";

        nav.style.flexDirection = "column";

        nav.style.gap = "20px";

    }

}


// ==========================================
// SCROLL TO SEARCH
// ==========================================

function scrollToSearch() {

    document
        .querySelector(".search-card")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// SET TODAY AS MINIMUM DATE
// ==========================================

const today =
    new Date()
        .toISOString()
        .split("T")[0];


document
    .getElementById("travelDate")
    .min = today;

const darkBtn = document.getElementById("mode-btn");
const regions = document.querySelector(".regions");
const regionsList = document.getElementById("region__list");
let modeBtn = document.getElementById("mode-btn");

modeBtn.addEventListener("click", function () {
	if (document.body.className != "dark") {
		this.firstElementChild.src = "assets/images/mode.svg";
	} else {
		this.firstElementChild.src = "assets/images/light.svg";
	}
	document.body.classList.toggle("dark");
});

// Get the dropdown button and content
let dropdownBtn = document.querySelector(".dropbtn");
let dropdownContent = document.querySelector(".dropdown-content");

// Toggle the dropdown content when the button is clicked
dropdownBtn.addEventListener("click", function () {
	dropdownContent.classList.toggle("show");
});

// Close the dropdown if the user clicks outside of it
window.addEventListener("click", function (event) {
	if (!event.target.matches(".dropbtn")) {
		let dropdowns = document.querySelectorAll(".dropdown-content");
		dropdowns.forEach(function (dropdown) {
			if (dropdown.classList.contains("show")) {
				dropdown.classList.remove("show");
			}
		});
	}
});
// Tugmani tanlash
const backToTopButton = document.querySelector(".back-to-top");

// Tugmani ochish uchun funksiya
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		backToTopButton.classList.add("show");
	} else {
		backToTopButton.classList.remove("show");
	}
}

// Yuqoriga qaytish uchun funksiya
function backToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// Tugmani ko'rsatish
window.addEventListener("scroll", scrollFunction);
backToTopButton.addEventListener("click", backToTop);

const themeChanger = document.querySelector(".theme-changer");
themeChanger.addEventListener("click", function () {
	if (document.body.classList.contains("dark")) {
		this.firstElementChild.src = "assets/images/mode.svg";
		document.body.classList.remove("dark");
		localStorage.setItem("theme", "light");
	} else {
		this.firstElementChild.src = "assets/images/light.svg";
		document.body.classList.add("dark");
		localStorage.setItem("theme", "dark");
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const theme = localStorage.getItem("theme");

	if (theme === "dark") {
		document.body.classList.add("dark");
	} else {
		document.body.classList.remove("dark");
	}
});

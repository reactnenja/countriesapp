let countriesContainer = document.querySelector(".countries-container");
let countriesContainerUl = document.querySelector(".page-ul");
const filterByRegion = document.querySelector(".filter-by-region") || "Aisa";
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
let allCountriesData;
let params;
let newdata = [
	1,

	2,

	3,

	4,

	5,
];
let limit = 12;
fetch("https://restcountries.com/v3.1/all")
	.then(res => res.json())
	.then(data => {
		allCountriesData = data;
		fetchData(paginate(data, params[1] || limit, params[0] || 1));
	});

function getParams() {
	var idx = document.URL.indexOf("?");
	var params = new Array();
	if (idx != -1) {
		var pairs = document.URL.substring(idx + 1, document.URL.length).split("&");
		for (var i = 0; i < pairs.length; i++) {
			nameVal = pairs[i].split("=");
			params.push(nameVal[1]);
		}
	}
	return params;
}

params = getParams();

filterByRegion.addEventListener("change", e => {
	e.preventDefault();
	fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
		.then(res => res.json())
		.then(data => {
			renderCountries(paginate(data, params[1] || limit, params[0] || 1));
		});
});

function renderCountries(data) {
	countriesContainer.innerHTML = "";
	data.forEach(country => {
		const countryCard = document.createElement("a");
		countryCard.classList.add("country-card");
		countryCard.href = `/country.html?name=${country.name.common}`;
		countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
		countriesContainer.append(countryCard);
	});
	const countryCardUl = document.createElement("ul");
	countryCardUl.classList.add("country-card-ul");
	newdata.forEach(p => {
		countryCardUl.innerHTML += `
     		 <li class="page-item px-2"><a class="page-link" href="?page=${p}&limit=${limit}">${p}</a></li>
 			`;
		countriesContainer.appendChild(countryCardUl);
	});
}

searchInput.addEventListener("input", e => {
	const filteredCountries = allCountriesData.filter(country =>
		country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
	);
	countriesContainer.innerHTML = "";
	filteredCountries.forEach(country => {
		const countryCard = document.createElement("a");
		countryCard.classList.add("country-card");
		countryCard.href = `/country.html?name=${country.name.common}`;
		countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
		countriesContainer.append(countryCard);
	});
});

themeChanger.addEventListener("click", function () {
	if (document.body.className != "dark") {
		this.firstElementChild.src = "assets/images/light.svg";
	} else {
		this.firstElementChild.src = "assets/images/mode.svg";
	}
	document.body.classList.toggle("dark");
});

function fetchData(data) {
	let newdata = [
		1,

		2,

		3,

		4,

		5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	];
	countriesContainer.innerHTML = "";
	data.forEach(country => {
		const countryCard = document.createElement("a");
		countryCard.classList.add("country-card");
		countryCard.href = `/country.html?name=${country.name.common}`;
		countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `;
		countriesContainer.append(countryCard);
	});
	const countryCardUl = document.createElement("ul");
	countryCardUl.classList.add("country-card-ul");
	newdata.forEach(p => {
		countryCardUl.innerHTML += `
     		 <li class="page-item px-2"><a class="page-link" href="?page=${p}&limit=${limit}">${p}</a></li>
 			`;
		countriesContainer.appendChild(countryCardUl);
	});
}
function paginate(array, page_size, page_number) {
	return array.slice((page_number - 1) * page_size, page_number * page_size);
}

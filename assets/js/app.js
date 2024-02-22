let countriesContainer = document.querySelector(".countries-container");
let countriesContainerUl = document.querySelector(".page-ul");
const filterByRegion = document.querySelector(".filter-by-region") || "Aisa";
const filterByPopulation = document.querySelector(".filter-by-population");
const searchInput = document.querySelector(".search-container input");
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
	let idx = document.URL.indexOf("?");
	let params = new Array();
	if (idx != -1) {
		let pairs = document.URL.substring(idx + 1, document.URL.length).split("&");
		for (let i = 0; i < pairs.length; i++) {
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
              <p><b>Population: </b>${country.population.toLocaleString("ru-RU")}</p>
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
              <p><b>Population: </b>${country.population.toLocaleString("ru-RU")}</p>
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

const loading = document.getElementById("loadings-time");
const loadingDuration = 1400;
setTimeout(() => {
	loading.classList.add("none"); // "none" ni string ko'rinishida yozing
	// document.body.style.scrollBehavior = "none";
}, loadingDuration);

let filterByReg = document.querySelector(".filter-by-region-sort");
let api = "https://countries-restapi.vercel.app/all";

let fetchDatasort = async api => {
	try {
		const result = await fetch(api);
		const data = await result.json();
		filters(data?.data);
	} catch (error) {
		console.log(error);
	}
};
fetchDatasort(api);

function filters(data) {
	console.log(data);
	filterByReg.addEventListener("change", e => {
		let value = e.target.value;
		countMis = 0;
		countMus = 16;
		if (value === "population") {
			data.sort((a, b) => b?.population - a?.population);
		}
		if (value === "all") {
			fetchDatasort(api);
		}
		if (value === "region") {
			data.sort((a, b) => {
				let regionA = a.region.toLowerCase();
				let regionB = b.region.toLowerCase();
				if (regionA < regionB) {
					return -1;
				}
			});
		}
		if (value === "capital") {
			data.sort((a, b) => {
				let capitalA =
					Array.isArray(a.capital) && a.capital.length > 0 ? a.capital[0].toLowerCase() : "";
				let capitalB =
					Array.isArray(b.capital) && b.capital.length > 0 ? b.capital[0].toLowerCase() : "";
				if (capitalA < capitalB) {
					return -1;
				}
			});
		}
		if (value === "title") {
			data.sort((a, b) => {
				let regionA = a.name?.common?.toLowerCase();
				let regionB = b.name?.common?.toLowerCase();
				if (regionA < regionB) {
					return -1;
				}
			});
		}

		fetchData(data);
	});
}

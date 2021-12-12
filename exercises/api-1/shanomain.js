"use strict";

async function getCountriesAll() {
    return await fetch('https://restcountries.com/v3.1/all?fields=name,flags').then(r => r.json());
}

async function getUniversitiesForCountry(country) {
    return await fetch(`http://universities.hipolabs.com/search?country=${country}`).then(r => r.json());
}

async function showUniversitiesForCountry(country) {
    const container = document.getElementById('university-list');

    const heading = document.createElement('h1');
    heading.innerText = `Universities in ${country.name.common}`;

    const ul = document.createElement('ul');

    (await getUniversitiesForCountry(country.name.common)).forEach(u => {
        const li = document.createElement('li');
        li.innerText = u.name;
        ul.appendChild(li);
    });

    container.innerHTML = '';

    container.appendChild(heading);
    container.appendChild(ul);

    container.hidden = false;
}

function createCountrySection(country) {
    const countrySection = document.createElement('section');

    countrySection.classList.add('country');
    countrySection.onclick = async () => await showUniversitiesForCountry(country);

    const flagImg = document.createElement('img');
    flagImg.src = country.flags.png;

    const nameHeader = document.createElement('h1');
    nameHeader.innerText = country.name.common;

    countrySection.append(flagImg);
    countrySection.append(nameHeader);

    return countrySection;
}

window.onload = async function () {
    document.addEventListener('mouseup', function (e) {
        const container = document.getElementById('university-list');
        if (container.hidden === false && !container.contains(e.target)) {
            container.hidden = true;
        }
    });

    const wrapper = document.getElementById('countries');

    getCountriesAll().then(countries => countries.forEach(c => wrapper.appendChild(createCountrySection(c))));
}

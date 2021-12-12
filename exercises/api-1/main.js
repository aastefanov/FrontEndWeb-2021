"use strict";

async function getCountriesAll() {
    return await fetch('https://restcountries.com/v3.1/all?fields=name,flags').then(r => r.json());
}

async function getUniversitiesAll() {
    return await fetch(`http://universities.hipolabs.com/search`).then(r => r.json());
}

function groupUniversitiesByCountry(universities) {
    let universitiesByCountry = {};
    for (let x of universities) {
        if (x.country in universitiesByCountry) universitiesByCountry[x.country].push(x);
        else universitiesByCountry[x.country] = [x];
    }
    return universitiesByCountry;
}

async function getCountriesWithUniversities() {
    const [countries, universitiesByCountry] = await Promise.all([
        getCountriesAll(),
        getUniversitiesAll().then(groupUniversitiesByCountry)
    ]);

    return countries
        .filter(x => x.name.common in universitiesByCountry)
        .map(x => {
            Object.assign(x, {universities: universitiesByCountry[x.name.common]});
            return x;
        });
}

function showUniversitiesForCountry(country) {
    const container = document.getElementById('university-list');

    const heading = document.createElement('h1');
    heading.innerText = `Universities in ${country.name.common}`;

    const ul = document.createElement('ul');
    country.universities.forEach(u => {
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
    countrySection.onclick = () => showUniversitiesForCountry(country);

    const flagImg = document.createElement('img');
    flagImg.src = country.flags.png;

    const nameHeader = document.createElement('h1');
    nameHeader.innerText = `${country.name.common} (${country.universities.length})`;

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

    await getCountriesWithUniversities().forEach(c => wrapper.appendChild(createCountrySection(c)));
}

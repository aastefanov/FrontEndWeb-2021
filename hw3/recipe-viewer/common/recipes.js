"use strict";

export async function getRecipes() {
    return [...getRecipesLS(), ...await getRecipesApi()];
}

export function addRecipe(recipe) {
    return setRecipesLS([recipe, ...getRecipesLS()]);
}

export function clearRecipes() {
    return window.localStorage.removeItem('recipes');
}


async function getRecipesApi() {
    return (await fetch('https://api.npoint.io/51ed846bdd74ff693d7e').then(x => x.json()))["meals"];
}

function getRecipesLS() {
    return JSON.parse(window.localStorage.getItem('recipes') ?? "[]");
}


function setRecipesLS(recipes) {
    return window.localStorage.setItem('recipes', JSON.stringify(recipes));
}


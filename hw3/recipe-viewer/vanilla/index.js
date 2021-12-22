"use strict";

const element = tagName => document.createElement(tagName);

HTMLElement.prototype.set = function (attributes) {
    for (const a in attributes) this.setAttribute(a, attributes[a]);
    return this;
}

HTMLElement.prototype.setHTML = function (html) {
    this.innerHTML = html;
    return this;
}

HTMLElement.prototype.withAppended = function (nodes) {
    this.append(nodes);
    return this;
}

String.prototype.contains = function (other) {
    return this.toLowerCase().includes(other.toLowerCase());
}

const RecipesService = {
    getRecipesApi: async () => (await fetch('https://api.npoint.io/51ed846bdd74ff693d7e').then(x => x.json())).meals,

    getRecipesLS: () => JSON.parse(window.localStorage.getItem('recipes') ?? "[]"),

    async getRecipes() {
        return [...this.getRecipesLS(), ...await this.getRecipesApi()];
    },

    addRecipeToLS(recipe) {
        window.localStorage.setItem('recipes', JSON.stringify([recipe, ...this.getRecipesLS()]));
    }
};

const ModalService = {
    openModal(recipe) {
        document.getElementById('modal-h1').setHTML(recipe.name);
        document.getElementById('modal-img').set({src: recipe.image, alt: recipe.name});
        document.getElementById('modal-text').setHTML(recipe.instruction ?? '');

        const table = document.querySelector('#modal-table tbody').setHTML('');

        [...(recipe.ingredients ?? [])].map(x => element('tr')
            .withAppended(element('td').setHTML(x.name))
            .withAppended(element('td').setHTML(x.measure))
        )
            .forEach(x => table.append(x));

        this.showModal();
    },

    showModal() {
        document.getElementById('recipe-modal').hidden = false;
        document.getElementById('main').classList.add('behind-modal');
    },

    hideModal() {
        document.getElementById('recipe-modal').hidden = true;
        document.getElementById('main').classList.remove('behind-modal');
    }
}

const DOMService = {
    getRecipeList: () => document.getElementById('recipe-list'),
    showAddRecipeForm: () => document.getElementById('add-recipe-container').hidden = false,
    hideAddRecipeForm: () => document.getElementById('add-recipe-container').hidden = true,

    onAddRecipe() {
        const newRecipe = Object.fromEntries(
            Array.from(document.querySelectorAll('#inputs-add input')).map(x => [x.dataset.key, x.value]));
        if (Object.values(newRecipe).some(x => !x)) return;

        RecipesService.addRecipeToLS(newRecipe);
        this.getRecipeList().prepend(this.createRecipeLi(newRecipe));
        this.hideAddRecipeForm();
    },

    createRecipeLi(recipe) {
        const container1 = element('div'), container2 = element('div');
        const button = element('button').setHTML('See Recipe');
        button.onclick = () => ModalService.openModal(recipe);

        container1.append(
            element('img').set({src: recipe.image, alt: recipe.name}),
            element('span').setHTML(recipe.name));
        container2.append(element('span').setHTML(`${recipe.category}, ${recipe.region}`), button);

        const li = document.createElement('li');
        li.dataset.name = recipe.name;
        li.dataset.region = recipe.region;
        li.dataset.category = recipe.category;
        li.append(container1, container2);
        return li;
    },

    renderRecipes(recipes) {
        const recipeList = this.getRecipeList().setHTML('');
        for (const recipe of recipes) recipeList.append(this.createRecipeLi(recipe));
    },

    filter() {
        const inputs = Object.fromEntries(
            Array.from(document.querySelectorAll('#filters input')).map(x => [x.dataset.filter, x.value]));
        for (const li of this.getRecipeList().children) {
            if (Object.entries({...li.dataset}).every(([property, value]) => value.contains(inputs[property]))) {
                li.style.display = 'flex';
            } else {
                li.style.display = 'none';
            }
        }
    }
    ,
}

function addListeners() {
    document.getElementById('modal-close').onclick = () => ModalService.hideModal();
    document.querySelectorAll('#filters input').forEach(x => x.oninput = () => DOMService.filter());
    document.getElementById('btn-new-recipe').onclick = () => DOMService.showAddRecipeForm();
    document.getElementById('btn-add-recipe').onclick = () => DOMService.onAddRecipe();
}

async function onPageLoad() {
    addListeners();
    DOMService.renderRecipes(await RecipesService.getRecipes());
}

await onPageLoad();
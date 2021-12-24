import {element} from '../common/helpers';
import * as ModalService from './modal';


export function appendRecipe(recipe) {
    return getRecipeList().append(createRecipeLi(recipe));
}

export function prependRecipe(recipe) {
    return getRecipeList().prepend(createRecipeLi(recipe));
}


export function filter() {
    const inputs = Object.fromEntries(
        Array.from(document.querySelectorAll('#filters ui5-input')).map(x => [x.dataset.filter, x.value]));
    for (const li of getRecipeList().children) {
        if (Object.entries({...li.dataset}).every(([property, value]) => value.contains(inputs[property]))) {
            li.hidden = false;
        } else {
            li.hidden = true;
        }
    }
}

export function renderRecipes(recipes) {
    // getRecipeList().setHTML('');
    for (const recipe of recipes) appendRecipe(recipe);
    getRecipeList().removeAttribute('busy')
}


function createRecipeLi(recipe) {
    // const container1 = element('div'), container2 = element('div');
    // const button = element('ui5-button').setHTML('See Recipe');
    // button.onclick = () => ModalService.openModal(recipe);
    //
    // container1.append(
    //     element('img').set({src: recipe.image, alt: recipe.name}),
    //     element('span').setHTML(recipe.name));
    // container2.append(element('span').setHTML(`${recipe.category}, ${recipe.region}`), button);

    const li = document.createElement('ui5-li').setHTML(recipe.name)
        .set({
            image: recipe.image, description: `${recipe.category}, ${recipe.region}`,
            icon: 'icon-hint', 'icon-end': 'true'
        });
    li.dataset.name = recipe.name;
    li.dataset.region = recipe.region;
    li.dataset.category = recipe.category;

    li.onclick = () => ModalService.openModal(recipe);
    // li.append(container1, container2);
    return li;
}


function getRecipeList() {
    return document.getElementById('recipe-list');
}



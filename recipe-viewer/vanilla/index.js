"use strict";
import * as RecipesService from '../common/recipes';
import * as ModalService from './modal';
import * as DOMService from './dom';

const showAddRecipeForm = () => document.getElementById('add-recipe-container').hidden = false;
const hideAddRecipeForm = () => document.getElementById('add-recipe-container').hidden = true;

const onAddRecipe = function () {
    const newRecipe = Object.fromEntries(
        Array.from(document.querySelectorAll('#inputs-add input')).map(x => [x.dataset.key, x.value]));
    if (Object.values(newRecipe).some(x => !x)) return;

    RecipesService.addRecipe(newRecipe);
    DOMService.prependRecipe(newRecipe);
    hideAddRecipeForm();
};

function addListeners() {
    document.getElementById('modal-close').onclick = () => ModalService.hideModal();
    document.querySelectorAll('#filters input').forEach(x => x.oninput = () => DOMService.filter());
    document.getElementById('btn-new-recipe').onclick = () => showAddRecipeForm();
    document.getElementById('btn-add-recipe').onclick = () => onAddRecipe();
}

async function onPageLoad() {
    addListeners();
    DOMService.renderRecipes(await RecipesService.getRecipes());
}

await onPageLoad();
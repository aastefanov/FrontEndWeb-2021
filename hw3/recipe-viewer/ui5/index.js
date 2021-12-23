"use strict";

import '../common/helpers'

import * as DOMService from './dom';
import * as ModalService from './modal';
import * as RecipeService from "../common/recipes";

import '@ui5/webcomponents/dist/Button';
import '@ui5/webcomponents/dist/Dialog';
import '@ui5/webcomponents-fiori/dist/ShellBar';
import '@ui5/webcomponents/dist/Input';
import '@ui5/webcomponents/dist/List';
import '@ui5/webcomponents/dist/ListItem';
import '@ui5/webcomponents/dist/Popover';
import '@ui5/webcomponents-icons/dist/hint'
import '@ui5/webcomponents/dist/Table';
import '@ui5/webcomponents/dist/TableColumn';
import '@ui5/webcomponents/dist/TableRow';
import '@ui5/webcomponents/dist/TableCell';
import * as RecipesService from "../common/recipes";

const recipePopover = document.getElementById('add-recipe-container');


const showAddRecipeForm = (e) => recipePopover.showAt(e);
const hideAddRecipeForm = () => recipePopover.close();

const onAddRecipe = function () {
    const newRecipe = Object.fromEntries(
        Array.from(document.querySelectorAll('#inputs-add ui5-input')).map(x => [x.dataset.key, x.value]));
    if (Object.values(newRecipe).some(x => !x)) return;

    RecipesService.addRecipe(newRecipe);
    DOMService.prependRecipe(newRecipe);
    hideAddRecipeForm();
};

function addListeners() {
    const btnNewRecipe = document.getElementById('btn-new-recipe');
    document.getElementById('close-dialog').onclick = () => ModalService.hideModal();
    btnNewRecipe.onclick = () => showAddRecipeForm(btnNewRecipe);

    document.getElementById('btn-add-recipe').onclick = () => onAddRecipe();
    document.getElementById('btn-close-recipe').onclick = () => hideAddRecipeForm();
    document.getElementById('btn-clear-recipes').onclick = () => RecipesService.clearRecipes();
    document.querySelectorAll('#filters ui5-input').forEach(x => x.oninput = () => DOMService.filter());
}

async function onPageLoad() {
    addListeners();
    DOMService.renderRecipes(await RecipeService.getRecipes());
}

await onPageLoad();
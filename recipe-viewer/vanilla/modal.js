"use strict";

import {element} from '../common/helpers'

export function openModal(recipe) {
    document.getElementById('modal-h1').setHTML(recipe.name);
    document.getElementById('modal-img').set({src: recipe.image, alt: recipe.name});
    document.getElementById('modal-text').setHTML(recipe["instruction"] ?? '');

    const table = document.querySelector('#modal-table tbody').setHTML('');

    [...(recipe["ingredients"] ?? [])].map(x => element('tr')
        .withAppended(element('td').setHTML(x.name))
        .withAppended(element('td').setHTML(x.measure))
    )
        .forEach(x => table.append(x));

    showModal();
}

export function showModal() {
    document.getElementById('recipe-modal').hidden = false;
    document.getElementById('main').classList.add('behind-modal');
}

export function hideModal() {
    document.getElementById('recipe-modal').hidden = true;
    document.getElementById('main').classList.remove('behind-modal');
}
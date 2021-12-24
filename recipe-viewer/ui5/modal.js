"use strict";

import {element} from '../common/helpers'

const modal = document.getElementById('dialog');

export function openModal(recipe) {
    modal.set({'header-text': recipe.name});
    document.getElementById('modal-img').set({src: recipe.image, alt: recipe.name});
    document.getElementById('modal-text').setHTML(recipe["instruction"] ?? '');

    const table = document.getElementById('modal-table');
    table.querySelectorAll('ui5-table-row').forEach(x => x.remove());

    [...(recipe["ingredients"] ?? [])].map(x => element('ui5-table-row')
        .withAppended(element('ui5-table-cell').setHTML(x.name))
        .withAppended(element('ui5-table-cell').setHTML(x.measure))
    )
        .forEach(x => table.append(x));

    showModal();
}

export function showModal() {
    modal.show();
}

export function hideModal() {
    modal.close();
}
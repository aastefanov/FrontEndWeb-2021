"use strict";

export const element = tagName => document.createElement(tagName)

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
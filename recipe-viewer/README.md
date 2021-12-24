# Домашна работа 3 - Recipe Viewer

## Варианти
- Vanilla - със CSS стилове
- UI5 - използва UI5 Web Components

## Малко обяснения около JS
### Modules
Идеята беше UI5 и Vanilla модулите да имат еднакви интерфейси (contracts).

За жалост това трудно би се енфорснало с чист JS.
Въпреки това специфичните модули (DOM, Modal) експортват функции с еднакви имена и параметри.

- `common/helpers` - добавя функции и прототипи
- `common/recipes` - поддържа връзките с API и LocalStorage, не пипа DOM.
Така може и да се подмени сървиса, от който се взимат рецепти
- `modal` - отговаря за диалоговия прозорец за показване на рецепта
- `dom` - занимава се с всички останали DOM манипулации

### Защо Node?
- необходимо беше да има някакъв HTTP сървър за module импортите
- спестява мъката с dependency management - UI5 уеб компонентите директно са вкарани като npm пакети

## Data Attributes
За да може лесно да се добавят филтри/полета са вкарани `data-*` атрибути по следния начин:
- списък с рецепти - имат атрибути, които се използват при филтриране - `data-name`, `data-region`, `data-category`.
- всеки `input` от филтрите има `data-filter`, който казва по кой атрибут се филтртира
- всеки `input` за нова рецепта има `data-key`, който казва кое поле от рецептата попълва

На база на тези атрибути се добавя нова рецепта и се филтрират съществуващите.
await onPageLoad();

async function onPageLoad() {


    const recipes = await fetch('https://api.npoint.io/51ed846bdd74ff693d7e').then(x => x.json());


    const lsRecipes = [...JSON.parse(window.localStorage.getItem('recipes') ?? "[]")];
    recipes.meals = [...lsRecipes, ...recipes.meals];
    // recipeList.innerText = JSON.stringify(recipes);


    document.getElementById('modal-close').onclick = () => closeModal();

    document.getElementById('input-filter-name').oninput = () => applyFilters();
    document.getElementById('input-filter-region').oninput = () => applyFilters();
    document.getElementById('input-filter-category').oninput = () => applyFilters();

    document.getElementById('btn-new-recipe').onclick =
        () => document.getElementById('add-recipe-container').hidden = false;

    document.getElementById('btn-add-recipe').onclick = () => addRecipeToLS();

    renderRecipes(recipes);
}

function addRecipeToLS() {
    const name = document.getElementById('add-recipe-name').value;
    const region = document.getElementById('add-recipe-region').value;
    const category = document.getElementById('add-recipe-category').value;

    if (name == "" || region == "" || category == "") {
        return;
    }

    const newRecipe = {name: name, region: region, category: category};

    let recipes = [...JSON.parse(window.localStorage.getItem('recipes') ?? "[]")];

    window.localStorage.setItem('recipes', JSON.stringify([newRecipe, ...recipes]));

    const recipeList = document.getElementById('recipe-list');
    recipeList.prepend(createRecipeLi(newRecipe));
}

function createRecipeLi(recipe) {
    const li = document.createElement('li');
    li.dataset.name = recipe.name;
    li.dataset.region = recipe.region;
    li.dataset.category = recipe.category;
    // li.innerText = JSON.stringify(recipe);

    const container1 = document.createElement('div');

    const icon = document.createElement('img');
    icon.src = recipe.image;
    icon.alt = recipe.name;
    container1.append(icon);


    const name = document.createElement('span');
    name.innerText = recipe.name;
    container1.append(name);

    li.append(container1);

    const container2 = document.createElement('div');
    const data = document.createElement('span');
    data.innerText = `${recipe.category}, ${recipe.region}`;
    const button = document.createElement('button');
    button.innerText = 'See Recipe';

    button.onclick = () => displayModal(recipe);

    container2.append(data);
    container2.append(button);

    li.append(container2);
    return li;
}

function renderRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    for (let recipe of recipes.meals) {
        // console.log(recipe)
        const li = createRecipeLi(recipe);

        recipeList.append(li);
    }
}

function applyFilters() {
    const filterName = document.getElementById('input-filter-name').value;
    const filterRegion = document.getElementById('input-filter-region').value;
    const filterCategory = document.getElementById('input-filter-category').value;

    // if (filterName == "" && filterRegion == "" && filterCategory == "") return;

    const recipes = document.getElementById('recipe-list');

    for (let li of recipes.children) {
        if (
            li.dataset.name.toLowerCase().includes(filterName.toLowerCase()) &&
            li.dataset.region.toLowerCase().includes(filterRegion.toLowerCase()) &&
            li.dataset.category.toLowerCase().includes(filterCategory.toLowerCase())
        ) {
            li.style.display = 'flex';
        } else {
            li.style.display = 'none';
        }
    }
}

function displayModal(recipe) {
    const modal = document.getElementById('recipe-modal')
    const main = document.getElementById('main');

    modal.querySelector("#modal-h1").innerText = recipe.name ?? '';
    modal.querySelector('#modal-img').src = recipe.image ?? '';
    modal.querySelector('#modal-text').innerText = recipe.instruction ?? '';

    const table = modal.querySelector('#modal-table tbody');
    table.innerHTML = '';
    for (let ingredient of recipe.ingredients ?? []) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${ingredient.name}</td><td>${ingredient.measure}</td>`;
        table.append(tr);
    }

    modal.hidden = false;
    main.classList.add('behind-modal')
}

function closeModal() {
    const modal = document.getElementById('recipe-modal')
    const main = document.getElementById('main');

    modal.hidden = true;
    main.classList.remove('behind-modal');
}
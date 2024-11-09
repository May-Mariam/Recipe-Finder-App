const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

// Search for recipes by ingredient
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `
    })
    resultsList.innerHTML = html;
}

// Get a random recipe
// Recipes array for demo purposes
const recipes = [
    { title: "Pasta Salad", ingredients: ["pasta", "tomatoes", "cheese"], description: "A simple and delicious pasta salad." },
    { title: "Avocado Toast", ingredients: ["avocado", "bread"], description: "Quick and tasty avocado on toast." },
    { title: "Fruit Smoothie", ingredients: ["banana", "milk", "berries"], description: "Healthy and refreshing smoothie." },
  ];


function getRandomRecipe() {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    document.getElementById("recipe-day").innerHTML = `<p>${randomRecipe.title}: ${randomRecipe.description}</p>`;
  }
  
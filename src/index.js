//On page load
document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${RECIPE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      displayCard(data.results)
    })

  //Event Listeners
  const searchForm = document.querySelector("#searchBar")
  searchForm.addEventListener("search", searchRecipe)

  const likedBtn = document.querySelector("#likedRecipes")
  likedBtn.addEventListener("click", () => {
    document.querySelector("#results").replaceChildren()
    fetch(`http://localhost:3000/likes`)
      .then(response => response.json())
      .then(data => displayCard(data))
  })
})

//Search Bar Function
function searchRecipe(event) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${event.target.value}&addRecipeInformation=true&apiKey=${RECIPE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      displayCard(data.results)
      event.target.value = ''
    })
}

//Displays all the cards
function displayCard(recipes) {
  //Clears previous cards
  document.querySelector("#results").replaceChildren()

  //Get new cards and grab current liked
  fetch(`http://localhost:3000/likes`)
    .then(response => response.json())
    .then(likeRes => {
      recipes.forEach((recipe) => {
        const like = likeRes.find(likeRecipe => likeRecipe.sourceUrl === recipe.sourceUrl)
        recipe.like = like ? '♥' : "Like"
        createCard(recipe)
      })
    })
}

//Create card for recipes
function createCard(recipe) {
  const card = document.createElement("div")
  card.className = "col d-flex align-items-stretch"
  card.innerHTML = `
    <div class="card shadow-sm">
      <img src="${recipe.image}" class="card-img-top" alt="Recipe image"/>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${recipe.title}</h5>
        <p class="card-text">
          ${recipe.summary}
        </p>
        <div class="justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" id="viewBtn" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#viewModal">Read More</button>
            <button type="button" id="likeBtn" class="btn btn-sm btn-outline-secondary">${recipe.like}</button>
          </div>
        </div>
      </div>
    </div>`

  //Event Listener for buttons
  card.querySelector("#viewBtn").addEventListener("click", () => viewRecipe(recipe.sourceUrl))
  card.querySelector("#likeBtn").addEventListener("click", (event) => likedRecipe(event, recipe))

  document.querySelector("#results").append(card)
}

//View Recipe Function
function viewRecipe(recipe) {
  const content = document.querySelector("#viewModalDialog")

  //Check if a recipe was displayed before
  if (content.firstChild) {
    content.removeChild(content.firstChild)
  }

  //Gets recipe information
  fetch(`https://api.spoonacular.com/recipes/extract?url=${recipe}&apiKey=${RECIPE_API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const recipeInfo = document.createElement("div")
      recipeInfo.className = "modal-content"
      recipeInfo.innerHTML = `
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">${data.title}</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
          <img class="d-block w-100" src="${data.image}"/>
          <br>
          <p>
            <b>Ingredients:</b>
            <ul></ul>
            <br>
            <b>Instructions:</b>
            ${data.instructions}
          </p>
        </div>`

      //Get ingredients list
      data.extendedIngredients.forEach((item) => {
        const ingredient = document.createElement("li")
        ingredient.innerText = item.original
        recipeInfo.querySelector("ul").appendChild(ingredient)
      })

      content.append(recipeInfo)
    })
}

//Like Recipe Button
function likedRecipe(event, recipe) {
  const HEART = '♥'

  if (event.target.innerText === HEART) {
    //Get list of like recipes
    fetch(`http://localhost:3000/likes/`)
      .then(response => response.json())
      .then(data => {
        const foundRecipe = data.find(item => item.sourceUrl === recipe.sourceUrl)

        //Delete recipe from likes
        fetch(`http://localhost:3000/likes/${foundRecipe.id}`, {
          method: "DELETE",
          header: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(recipe)
        }).then(res => res.json())
          .then(data => {
            event.target.innerText = "Like"
          })
      })
  }
  else {
    fetch(`http://localhost:3000/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        sourceUrl: recipe.sourceUrl
      })
    }).then(response => response.json())
      .then(data => {
        event.target.innerText = HEART
      })
  }
}
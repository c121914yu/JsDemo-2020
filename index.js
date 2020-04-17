// 获取节点
const submit = document.getElementById("submit")
const search = document.getElementById("search")
const random = document.getElementById("random")

const resultHeading = document.getElementById("result-heading")
const meals = document.getElementById("meals")
const singleMeal = document.getElementById("single-meal")

// 搜索
submit.onsubmit = (e) => {
  e.preventDefault()
  meals.innerHTML = ""
  singleMeal.innerHTML = ""

  // 获取输入内容
  const content = search.value
  if (content.trim()) {
    //https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${content}`)
      .then(res => res.json())
      .then(data => {
        // 设置result heading
        resultHeading.innerHTML = `<h2>${content}查询结果为： </h2>`
        if (!data.meals)
          resultHeading.innerHTML = '<p>没有查询到相关实物，重新输入搜索</p>'
        else {
          meals.innerHTML = data.meals.map(meal => `
            <div class="meal">
              <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
              <div class="meal-info" onclick="getMealInfo(${meal.idMeal})">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `).join("")
        }
        search.value = ""
      })
  } else
    alert("输入内容为空")
}

// 随机获取
random.onclick = (e) => {
  e.preventDefault()
  meals.innerHTML = ""
  singleMeal.innerHTML = ""
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      addMealDom(data.meals[0])
    })
}

function getMealInfo(id) {
  // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      addMealDom(data.meals[0])
    })
}

function addMealDom(meal) {
  console.log(meal)
  const ingredients = []
  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      )
    } else
      break
  }

  singleMeal.innerHTML =
    `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src='${meal.strMealThumb}' alt='${meal.strMeal}'></img>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(item => `
            <li>${item}</li>
          `).join("")}
        </ul>
      </div>
    </div>
  `
}
// Search for meals, filters main ingredients, categories, and name

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', searchMealByName);
    document.getElementById('listByFirstLetterButton').addEventListener('click', listMealsByFirstLetter);

    function searchMealByName() {
        const name = document.getElementById('searchMealByName').value;
        
        if (!name) {
            alert('Please enter a meal name.');
            return;
        }

        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayResults(data.meals))
            .catch(error => console.error('Error fetching data:', error));
    }

    // list meals by first letter 
    function listMealsByFirstLetter() {
        const firstLetter = document.getElementById('firstLetterInput').value.trim().toLowerCase();

        if (!firstLetter || firstLetter.length !== 1 || !/[a-z]/.test(firstLetter)) {
            alert('Please enter a valid single letter.');
            return;
        }

        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayResults(data.meals))
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayResults(meals) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ""; // Clear previous results
        resultsDiv.className ='row';

        if (meals) {
            // resultsDiv.innerHTML = "<p>No meals found matching the criteria.</p>";
            // return;
            meals.forEach(meal => {
                const mealColumn = document.createElement('div');
                mealColumn.className = 'column';
                mealColumn.style.backgroundColor = "#f8f8f8";
                mealColumn.innerHTML += `
                    <h3>${meal.strMeal}</h3>
                    <img src="${meal.strMealThumb}" alt="Meal Image" style="width: 100%; max-width: 400px;">
                    <p>${meal.strInstructions}</p>
                `;
                resultsDiv.appendChild(mealColumn);
            });
        } else {
            resultsDiv.innerHTML="<p>No meals found</p>";
            }
            gridView();
        }
     // Initial fetch for categories, areas, and ingredients
     fetchList('c');
     fetchList('a');
     fetchList('i');
});

function fetchList(type) {
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`)
        .then(response => response.json())
        .then(data => displayList(data, type))
        .catch(error => console.error('Error fetching list:', error));
}

function displayList(data, type) {
    const listElement = document.getElementById(`${type}List`);
    if (listElement) {
        const items = data.meals.map(item => `<li>${item['str' + type[0].toUpperCase() + type.slice(1)]}</li>`).join('');
        listElement.innerHTML = items;
    } else {
        console.log("Error: Not found.");
    }
}


// Random Meal Generator 
// API Endpoints
const apiBase = "https://www.themealdb.com/api/json/v1/1/";
const searchMealApi = `${apiBase}search.php?s=`;
const randomMealApi = `${apiBase}random.php`;

// Elements
const mealDisplayDiv = document.getElementById('mealDisplay');

// Utility functions
function fetchApi(url) {
    return fetch(url).then(response => response.json());
}

function displayMeal(meal) {
    const mealDisplayDiv = document.getElementById('mealDisplay');
    mealDisplayDiv.innerHTML = "";

    if (meal) {
        const mealColumn = document.createElement('div');
        mealColumn.className = 'column';
        mealColumn.style.backgroundColor = "#f8f8f8";
        mealDisplayDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="Meal Image" style="width: 100%; max-width: 400px;">
            <p>${meal.strInstructions}</p>
        `;
        mealDisplayDiv.appendChild(mealColumn);
    } else {
        mealDisplayDiv.innerHTML = '<p>Meal not found.</p>';
    }
    listView()
}

// Event listeners
document.getElementById('randomMeal').addEventListener('click', fetchRandomMeal);

// Fetching and displaying data
function fetchRandomMeal() {
    fetchApi(randomMealApi).then(data => 
        {
            displayMeal(data.meals[0])
            console.log(data.meals[0])
        }
        
    );

}

function fetchList(type) {
    fetchApi(`${apiBase}list.php?${type}=list`).then(data => {
        displayList(data, type);
    });
}

function displayList(data, type) {
    const listElement = document.getElementById(`${type}List`);
    const items = data.meals.map(item => `<li>${item['str' + type[0].toUpperCase() + type.slice(1)]}</li>`).join('');
    listElement.innerHTML = items;
}

// Initial fetch for categories, areas, and ingredients
document.addEventListener('DOMContentLoaded', () => {
    ['c', 'a', 'i'].forEach(fetchList);
});

function clearInputAndPage() {
    //clear input
    document.getElementById('searchMealByName').value = '';
    document.getElementById('firstLetterInput').value = '';

    // clear content of the results 
    document.getElementById('results').innerHTML = '';
}








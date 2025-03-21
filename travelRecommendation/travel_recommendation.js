function search() {
    const keyword = document.getElementById('search').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];
            if (keyword.includes('beach')) {
                results = data.beaches;
            } else if (keyword.includes('temple')) {
                results = data.temples;
            } else {
                results = data.countries.flatMap(country => 
                    country.cities.filter(city => city.name.toLowerCase().includes(keyword))
                );
            }
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function reset() {
    document.getElementById('search').value = '';
    document.getElementById('results').innerHTML = '';
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.description}</p>
        `;
        resultsDiv.appendChild(resultItem);
    });
}

// Ensure the results are displayed right below the search box
const searchContainer = document.getElementById('search-container');
const resultsDiv = document.createElement('div');
resultsDiv.id = 'results';
searchContainer.appendChild(resultsDiv);

const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);


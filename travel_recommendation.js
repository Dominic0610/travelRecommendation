async function showData() {
    const searchText = document.getElementById('search').value.toLowerCase();

    const searchResultsDiv = document.getElementById("searchResultsDiv");
    searchResultsDiv.innerHTML = "";

    const response = await fetch('./travel_recommendation_api.json', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json();

    const table = document.createElement("table");
    let jsonData;
    if (searchText === 'beach' || searchText === 'beaches') {
        jsonData = data.beaches;
    } else if (searchText === 'temple' || searchText === 'temples') {
        jsonData = data.temples;
    } else if (searchText === 'country' || searchText === 'countries') {
        jsonData = data.countries;
        table.style.color = 'white';
        table.style.fontSize = '16px';
        for (let i = 0; i < jsonData.length; i++) {
            let cityData = jsonData[i].cities;
            for (let j = 0; j < cityData.length; j++) {
                let tr = table.insertRow();
                let td = tr.insertCell();
                let img = document.createElement('img');
                img.setAttribute('src', `./images/${cityData[j].imageUrl}`);
                img.setAttribute('alt', cityData[j].name);
                img.setAttribute('width', '1000px');
                td.appendChild(img);

                tr = table.insertRow();
                tr.style.fontWeight = 'bold';
                td = tr.insertCell();
                td.appendChild(document.createTextNode(`${cityData[j].name}`));

                tr = table.insertRow();
                tr.style.fontWeight = 'normal';
                td = tr.insertCell();
                td.appendChild(document.createTextNode(`${cityData[j].description}`));

                tr = table.insertRow();
                tr.style.height = '60px';
                td = tr.insertCell();
                let btn = document.createElement('input');
                btn.setAttribute('type', 'button');
                btn.setAttribute('value', 'Visit');
                td.appendChild(btn);
            }
        }
        searchResultsDiv.appendChild(table);
        return;
    } else {
        return;
    }

    table.style.color = 'white';
    table.style.fontSize = '16px';
    for (let i = 0; i < jsonData.length; i++) {
        let tr = table.insertRow();
        let td = tr.insertCell();
        let img = document.createElement('img');
        img.setAttribute('src', `./images/${jsonData[i].imageUrl}`);
        img.setAttribute('alt', jsonData[i].name);
        img.setAttribute('width', '1000px');
        td.appendChild(img);

        tr = table.insertRow();
        tr.style.fontWeight = 'bold';
        td = tr.insertCell();
        td.appendChild(document.createTextNode(`${jsonData[i].name}`));

        tr = table.insertRow();
        tr.style.fontWeight = 'normal';
        td = tr.insertCell();
        td.appendChild(document.createTextNode(`${jsonData[i].description}`));

        tr = table.insertRow();
        tr.style.height = '60px';
        td = tr.insertCell();
        let btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'Visit');
        td.appendChild(btn);
    }

    searchResultsDiv.appendChild(table);
}

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", showData);

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener("click", function () {
    const searchResultsDiv = document.getElementById("searchResultsDiv");
    searchResultsDiv.innerHTML = "";
});

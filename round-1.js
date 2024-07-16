// https://swapi.dev/

// PLANET data structure
/* {
      "name": "Tatooine",
      "rotation_period": "23",
      "orbital_period": "304",
      "diameter": "10465",
      "climate": "arid",
      "terrain": "desert",
      "population": "200000",
      "films": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/4/",
        "https://swapi.dev/api/films/5/",
        "https://swapi.dev/api/films/6/"
      ],
      "url": "https://swapi.dev/api/planets/1/"
    }
    
// FILM data structure
   {
      "title": "A New Hope",
			"episode_id": 4,
			"opening_crawl": "It is a period of civil war...",
			"director": "George Lucas",
			"producer": "Gary Kurtz, Rick McCallum",
			"release_date": "1977-05-25",
      "url": "https://swapi.dev/api/films/1/" 
   }
*/

var planets;
var films;

// get a list of planets
var hasFetchedFilms = false;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://swapi.py4e.com/api/planets", true);
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.responseText) {
        var jsonResponse = JSON.parse(xhr.responseText);

        planets = [];

        // save planets to top level array
        for (var i = 0; i < jsonResponse.results.length; i++) {
            planets.push(jsonResponse.results[i]);
        }
    }
};

// wait for response, then show planets on page
setTimeout(() => {
    console.log(planets);
    for (var i = 0; i < planets.length; i++) {
        // add planets to html list
        let div = document.createElement("div");
        div.append(planets[i].name);
        document.querySelector(".planet-list").append(div);

        // get list of films
        if (hasFetchedFilms === false) {
            var xhr = new XMLHttpRequest();

            // make sure it only fires once
            hasFetchedFilms = true;

            // make request
            xhr.open("GET", "https://swapi.py4e.com/api/films", true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.responseText) {
                    var jsonResponse = JSON.parse(xhr.responseText);
                    films = [];

                    // push films to top level array
                    for (var i = 0; i < jsonResponse.results.length; i++) {
                        films.push(jsonResponse.results[i]);
                    }
                }
            };
        }
    }

    // match film to planet
    setTimeout(() => {
        // iterate through planets
        for (var i = 0; i < planets.length; i++) {
            let firstFilmAppereanceUrl = planets[i].films[0];

            // iterate through films to find matching film
            for (let i = 0; i < films.length; i++) {
                if (films[i].url == firstFilmAppereanceUrl) {
                    // match found, add to HTML
                    let firstFilmDiv = document.createElement("div");
                    firstFilmDiv.append(films[i].title);
                    document.querySelector(".film-list").append(firstFilmDiv);
                }
            }
        }
    }, 900);
}, 750);

class SwapiService {
    async fetchPlanets() {
        try {
            const response = await fetch("https://swapi.py4e.com/api/planets");
            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error(error);
        }
    }

    async fetchFilms() {
        try {
            const response = await fetch("https://swapi.py4e.com/api/films");
            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            return data.results;
        } catch (error) {
            throw new Error(error);
        }
    }
}

class View {
    constructor() {
        this.swapiService = new SwapiService();
        this.planets = null;
    }
    renderPlanets() {
        this.swapiService.fetchPlanets().then((planets) => {
            this.planets = planets;
            for (const planet of planets) {
                let div = document.createElement("div");
                div.append(planet.name);
                document.querySelector(".planet-list").append(div);
            }
        });
    }

    renderFilms() {
        this.swapiService.fetchFilms().then((films) => {
            for (var i = 0; i < this.planets.length; i++) {
                let firstFilmAppereanceUrl = this.planets[i].films[0];
                console.log(films);

                // iterate through films to find matching film
                for (let i = 0; i < films.length; i++) {
                    if (films[i].url == firstFilmAppereanceUrl) {
                        // match found, add to HTML
                        let firstFilmDiv = document.createElement("div");
                        firstFilmDiv.append(films[i].title);
                        document
                            .querySelector(".film-list")
                            .append(firstFilmDiv);
                    }
                }
            }
        });
    }

    render() {
        this.renderPlanets();
        this.renderFilms();
    }
}

const view = new View();
view.render();

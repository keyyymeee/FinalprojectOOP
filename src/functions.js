const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");
        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        div.setAttribute("id", "conditions");
        let country = document.createElement("h1");
        let countryNode = document.createTextNode(data.sys.country);
        country.appendChild(countryNode);

        let temp = document.createElement("div");
        let tempNode = document.createTextNode("\t"+data.main.temp + " °C ");
        temp.appendChild(tempNode);

        let desc = document.createElement("div");
        let descNode = document.createTextNode("| \t   "+data.weather[0].description);
        desc.appendChild(descNode);

        let rise = document.createElement("div");
        let riseNode = document.createTextNode("| \t   "+data.sys.sunrise);
        rise.appendChild(riseNode)

        div.appendChild(city);
        div.appendChild(country);
        div.appendChild(temp);
        div.appendChild(desc);
        div.appendChild(rise);
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))

}


document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        }else{
            console.log("You must provide a city");
        }
    })
})

function getWeather() {
    const city = document.getElementById("city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IE&appid=9fd7a449d055dba26a982a3220f32aa2&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weather = data.weather[0].main;
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const description = data.weather[0].description;
        const weatherInfo = `
          <h2>Current Weather in ${city}</h2>
          <p><strong>Weather:</strong> ${weather} (${description})</p>
          <p><strong>Temperature:</strong> ${temp} &deg;C</p>
          <p><strong>Feels like:</strong> ${feelsLike} &deg;C</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
          <p><strong>Wind speed:</strong> ${windSpeed} km/h</p>
        `;
        document.getElementById("weather").innerHTML = weatherInfo;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const dishes = ["Boxty Breakfast", "Coddled pork with cider", "Corned Beef and Cabbage", "Crispy Sausages and Greens", "Ham hock colcannon"];
  const recipeList = document.getElementById("recipe-list");
  
  for (const dish of dishes) {
    const url = apiUrl + encodeURIComponent(dish);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
          const recipe = meal.strInstructions;
          const source = meal.strSource || meal.strYoutube;
          const image = meal.strMealThumb;
  
          const li = document.createElement("li");
          const h2 = document.createElement("h2");
          const p = document.createElement("p");
          const a = document.createElement("a");
          const img = document.createElement("img");
  
          h2.textContent = dish;
          p.textContent = recipe;
          a.textContent = "Source";
          a.href = source;
          img.src = image;
          img.alt = dish;
  
          li.appendChild(h2);
          li.appendChild(img);
          li.appendChild(p);
          li.appendChild(a);
  
          recipeList.appendChild(li);
        } else {
          const li = document.createElement("li");
          const p = document.createElement("p");
          p.textContent = `No recipe found for "${dish}".`;
  
          li.appendChild(p);
          recipeList.appendChild(li);
        }
      })
      .catch(error => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = `Error retrieving recipe for "${dish}": ${error}`;
  
        li.appendChild(p);
        recipeList.appendChild(li);
      });
  }
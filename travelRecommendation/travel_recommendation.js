const btnSearch = document.getElementById("btn-search");
const btnReset = document.getElementById("btn-reset");
const resultDiv = document.getElementById("main-content");

const dashboardAwal = resultDiv.innerHTML;

function searchCondition() {
  const input = document
    .getElementById("search-bar")
    .value.toLowerCase()
    .trim();
  const resultDiv = document.getElementById("main-content");
  resultDiv.innerHTML = "";

  if (input == "") {
    resultDiv.innerHTML = `<p>please enter a keyword</p>`;
    return;
  }

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let results = [];

      if (input.includes("beach")) {
        results = data.beaches;
      } else if (input.includes("temple")) {
        results = data.temples;
      } else if (
        input.includes("japan") ||
        input.includes("australia") ||
        input.includes("brazil")
      ) {
        const country = data.countries.find((c) =>
          c.name.toLowerCase().includes(input),
        );
        if (country) {
          results = country.cities;
        }
      }

      if (results.length > 0) {
        let cardImg = "";
        results.forEach((item) => {
          cardImg += `<div>
                <img class="condition-image" src="${item.imageUrl}" />
                <h2>${item.name}</h2>
                <p>${item.description}</p>
             </div>`;
        });

        resultDiv.innerHTML = cardImg;
      } else {
        resultDiv.innerHTML = "<h2>Not Found...</h2>";
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      resultDiv.innerHTML = "An error oCcured while fetching data";
    });
}

btnSearch.addEventListener("click", searchCondition);

function clearCondition() {
  const resultDiv = document.getElementById("main-content");
  const input = document.getElementById("search-bar");
  input.value = "";
  resultDiv.innerHTML = dashboardAwal;
}

btnReset.addEventListener("click", clearCondition);

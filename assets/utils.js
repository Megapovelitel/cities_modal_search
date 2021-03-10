async function getCities(url, method) {
  const cities_init = await $.ajax({
    url: url,
    type: method,
  });

  return getDistinctCities(cities_init);
}

function getDistinctCities(arr) {
  return [...new Map(arr.map((item) => [item.city, item])).values()];
}

function filterAndSortCities(arr) {
  return arr
    .filter((item) => item.population >= 100000)
    .sort((a, b) => a.city.localeCompare(b.city));
}

function filterCitiesToShow(arr, input) {
  if (!input) return arr;

  return arr.filter((item) =>
    item.city.toLowerCase().startsWith(input.toLowerCase())
  );
}

function getCitiesToDisplay(arr) {
  let result = [];
  let lastLetter = "";
  let lastIndex = 0;

  for (let i in arr) {
    if (lastLetter !== arr[i].city[0]) {
      lastLetter = arr[i].city[0];
      result.push({ letter: lastLetter, cities: [arr[i]] });
      lastIndex = result.length - 1;
    } else {
      result[lastIndex]["cities"].push(arr[i]);
    }
  }

  return result;
}

function displayCities(cities, parentNode) {
  if (cities.length === 0) {
    $("<h1>", {
      class: "zero-msg",
      text: "Ничего не найдено",
    }).appendTo(parentNode);
    return;
  }

  for (let i in cities) {
    $("<div>", { class: "myDiv" })
      .append(
        $("<h1>", {
          class: "alph-letter",
          text: cities[i].letter.toUpperCase(),
        })
      )
      .append(
        $("<ul>").append(
          cities[i].cities.map((item) =>
            $("<li/>", { text: item.city })
              .attr("data-cityid", item.id)
              .on("click", function () {
                console.log(
                  "City id: " +
                    $(this).data("cityid") +
                    `\nCity: ${this.innerHTML}`
                );
              })
          )
        )
      )
      .appendTo(parentNode);
  }
}

function foo(id, city) {
  console.log(this);
}

export default {
  filterAndSortCities,
  getCities,
  filterCitiesToShow,
  getCitiesToDisplay,
  displayCities,
};

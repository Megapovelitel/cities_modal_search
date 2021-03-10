import utils from "./utils.js";

$(document).ready(function () {
  const $input = $("#search");
  const $form = $("form");
  const $main = $("main");

  const citiesInitial = utils.getCities("../db/cities.json", "get");

  citiesInitial.then((data) => {
    const citiesInit = utils.filterAndSortCities(data);
    const initialShow = utils.getCitiesToDisplay(citiesInit);
    utils.displayCities(initialShow, $main);

    $form.submit((e) => {
      e.preventDefault();
      $(".myDiv").remove();
      $(".zero-msg").remove();

      const cities = utils.filterCitiesToShow(citiesInit, $input.val());
      const citiesToDisplay = utils.getCitiesToDisplay(cities);
      utils.displayCities(citiesToDisplay, $main);
    });
  });
});

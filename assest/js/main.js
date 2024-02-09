function populateStates() {
  $.ajax({
    url: "	https://data.covid19india.org/v4/min/data.min.json",
    method: "GET",
    success: function (data) {
      const states = Object.keys(data);
      const stateSelect = $("#stateSelect");
      stateSelect.empty();
      stateSelect.append(`<option value="" selected disabled>Select State</option>`);
      states.forEach(state => {
        stateSelect.append(`<option value="${state}">${state}</option>`);
      });
    }
  });
}

function populateCities(state) {
  $.ajax({
    url: `	https://data.covid19india.org/v4/min/data.min.json`,
    method: "GET",
    success: function (data) {
      const cities = Object.keys(data[state].districts);
      const citySelect = $("#citySelect");
      citySelect.empty();
      citySelect.append(`<option value="" selected disabled>Select City</option>`);
      cities.forEach(city => {
        citySelect.append(`<option value="${city}">${city}</option>`);
      });
    }
  });
}


function fetchCovidStats(state, city) {
  $.ajax({
    url: `	https://data.covid19india.org/v4/min/data.min.json`,
    method: "GET",
    success: function (data) {
      const stats = data[state].districts[city].total;
      $("#tested").text(stats.tested);
      $("#dailyConfirmed").text(stats.confirmed);
      $("#dailyDeceased").text(stats.deceased);
      $("#dailyRecovered").text(stats.recovered);
    }
  });
}

$(document).ready(function () {
  populateStates();

  $("#stateSelect").change(function () {
    const selectedState = $(this).val();
    if (selectedState) {
      populateCities(selectedState);
    }
  });

  $("#citySelect").change(function () {
    const selectedState = $("#stateSelect").val();
    const selectedCity = $(this).val();
    if (selectedState && selectedCity) {
      fetchCovidStats(selectedState, selectedCity);
    }
  });
});
  function fetchStatesData() {
    $.ajax({
      url: "https://data.covid19india.org/v4/min/data.min.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        var states = Object.keys(data);
        var stateOptions = "<option value=''>Select State</option>";
        states.forEach(function (state) {
          stateOptions += "<option value='" + state + "'>" + state + "</option>";
        });
        $("#stateSelect").html(stateOptions);
      },
    });
  }

  function fetchCitiesData(state) {
    $.ajax({
      url: "https://data.covid19india.org/v4/min/data.min.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        var cities = Object.keys(data[state].districts);
        var cityOptions = "<option value=''>Select City</option>";
        cities.forEach(function (city) {
          cityOptions += "<option value='" + city + "'>" + city + "</option>";
        });
        $("#citySelect").html(cityOptions);
      },
    });
  }

  function fetchDailyData(state, city) {
    $.ajax({
      url: "https://data.covid19india.org/v4/min/data.min.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        var dailyData;
        if (city) {
          dailyData = data[state].districts[city];
          $("#cityData").
            text(
              "Tested: " + dailyData.total.tested +
              ", Confirmed: " + dailyData.total.confirmed +
              ", Deceased: " + dailyData.total.deceased +
              ", Recovered: " + dailyData.total.recovered);
        }
        else {
          dailyData = data[state];
          $("#stateData").
            text(
              "Tested: " + dailyData.total.tested +
              ", Confirmed: " + dailyData.total.confirmed +
              ", Deceased: " + dailyData.total.deceased +
              ", Recovered: " + dailyData.total.recovered);
        }

      }

    });
  }

  fetchStatesData();

  $("#stateSelect").change(function () {
    var selectedState = $(this).val();
    if (selectedState) {
      fetchCitiesData(selectedState);
      fetchDailyData(selectedState, null);
    }
  });

  $("#citySelect").change(function () {
    var selectedState = $("#stateSelect").val();
    var selectedCity = $(this).val();
    if (selectedState && selectedCity) {
      fetchDailyData(selectedState, selectedCity);
    }
  });
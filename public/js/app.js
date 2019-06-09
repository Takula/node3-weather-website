"use strict";
var searchForm = document.getElementById('weatherForm');
searchForm.addEventListener('submit', function ($event) {
    $event.preventDefault();
    var searchInput = document.getElementById('searchInput');
    var location = searchInput.value;
    var errorMessage = document.querySelector('#error-message');
    var successMessage = document.querySelector('#success-message');
    errorMessage.textContent = 'Loading...';
    successMessage.textContent = '';
    fetch("http://localhost:3000/weather?address=" + location).then(function (response) {
        response.json().then(function (data) {
            if (data.error) {
                return errorMessage.textContent = data.error;
            }
            errorMessage.textContent = '';
            successMessage.innerHTML = "\n            Location : " + data.location + ". <br /> <br />\n            Forecast : " + data.forecast;
        });
    });
});

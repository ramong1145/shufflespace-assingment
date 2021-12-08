exports.getRandomFoodImage = function() {
    fetch('https://foodish-api.herokuapp.com/api/', {
        method: 'GET'
    }).then(data => {
        return data.json();
    })
}

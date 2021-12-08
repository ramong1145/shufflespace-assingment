exports.getRandomFoodImage = async function() {
    fetch('https://foodish-api.herokuapp.com/api/', {
        method: 'GET'
    }).then(data => {
        console.log(`data: ${data}`);
        return data.json();
    })
}

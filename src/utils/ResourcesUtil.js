exports.fetchFoodImage = async function() {
    const response = await fetch('https://foodish-api.herokuapp.com/api/', {
        method: 'GET'
    })
    response.json().then(data => {
        console.log(data.image)
        return data.image;
    })
}

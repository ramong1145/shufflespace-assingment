import React, { useState, useEffect } from 'react'
import { fetchFoodImage } from '../utils/ResourcesUtil';
import RecipeCard from './RecipeCard';
import { useSelector } from 'react-redux'

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    let serviceProviders = useSelector(state => state);
    const token = serviceProviders.setTokenReducer.token

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:5001/recipe/search`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                mode: 'cors',
            })
            response.json().then(data => {
                setRecipes(data.Result)
            })
        })()
    }, [recipes]);

    function handleOnDelete(id) {
        (async () => {
            const response = await fetch(`http://localhost:5001/recipe/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                    'x-access-token': token
                },
                mode: 'cors'
            })
            response.json().then(data => {
                if(data.StatusCode == 200) {
                    setRecipes(
                        recipes.filter(i => {
                            return i.id !== id
                        })
                    )
                }
            })
        })()
    }

    function handleOnSave(id, item) {
        (async () => {
            const response = await fetch(`http://localhost:5001/recipe/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json', 
                    'x-access-token': token
                },
                body : JSON.stringify(item)
            })
            response.json().then(data => {
                if(data.Result.modifiedCount > 0) {
                    const index = recipes.findIndex(i => i.id == id);
                    recipes[index].title = item.title;
                    recipes[index].description = item.description;
                    recipes[index].duration = item.duration;
                }
            })
        })()
    }

    return (
        <div>
            <div className='dashboard'>
                {recipes.map(r => {
                    return(
                        <RecipeCard
                            key={r.id}
                            id={r.id}
                            title={r.title}
                            description={r.description}
                            duration={r.duration}
                            onClose={handleOnDelete}
                            onSave={handleOnSave}
                            image={"https://foodish-api.herokuapp.com/images/samosa/samosa10.jpg"}
                        />
                    )
                })}
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import { fetchFoodImage } from '../utils/ResourcesUtil';
import RecipeCard from './RecipeCard';
import { useSelector } from 'react-redux'

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    let serviceProviders = useSelector(state => state);
    console.log(serviceProviders);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:5001/recipe/search`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem('token').replace(/['"]+/g, '')}`
                },
                mode: 'cors',
            })
            response.json().then(data => {
                setRecipes(data.Result)
            })
        })()
    }, []);

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
                            image={"https://foodish-api.herokuapp.com/images/samosa/samosa10.jpg"}
                        />
                    )
                })}
            </div>
        </div>
    )
}

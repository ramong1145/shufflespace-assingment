import React, { useState, useEffect } from 'react'
import { getRandomFoodImage } from '../utils/ResourcesUtil';
import RecipeCard from './RecipeCard';

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5001/recipe/search/${localStorage.getItem('token')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => setRecipes(data.json));
    }, []);

    return (
        <div>
            <h1> Dashboard page </h1>
            {recipes.map(r => {
                <RecipeCard
                    key={r.id}
                    title={r.title}
                    description={r.description}
                    duration={r.duration}
                    image={getRandomFoodImage()}
                />
            })}
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard';

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("https://api.spoonacular.com/recipes/random?number=1&apiKey=bee6ce5e867c4533ba36913d9e45d114")
        .then((response) => response.json()) 
        .then((data) => {
            setRecipes(data.recipes);
        });
    }, [])

    return (
        <div>
            <h1> Dashboard page </h1>
            {recipes.map(r => 
                <RecipeCard
                    key={r.id}
                    altName={r.title}
                    image={r.image}
                    name={r.title}
                    summary={r.summary}
                />)}
        </div>
    )
}

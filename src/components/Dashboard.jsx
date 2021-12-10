import React, { useState, useEffect } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { fetchFoodImage } from '../utils/ResourcesUtil';
import RecipeCard from './RecipeCard';
import { useSelector } from 'react-redux'
const jwt = require('jsonwebtoken');

export default function Dashboard() {
    const [recipes, setRecipes] = useState([]);
    let serviceProviders = useSelector(state => state);
    const token = serviceProviders.setTokenReducer.token;
    const [displayForm, setDisplayForm] = useState(false);
      
    const defaultValues = {
        id: '0001-0001-0001-0001-0001',
        title: 'Type here your dish name',
        description: 'give it a juicy description',
        duration: '0'
    }

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
    }, []);

    function handleOnDelete(id) {
        if(id === defaultValues.id) {
            setDisplayForm(false)
            return;
        }
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
                if(data.StatusCode === 200) {
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
                    const index = recipes.findIndex(i => i.id === id);
                    recipes[index].title = item.title;
                    recipes[index].description = item.description;
                    recipes[index].duration = item.duration;
                }
            })
        })()
    }

    function handleCreate(id, data) {
        (async () => {
            const decoded = jwt.decode(token);
            const response = await fetch(`http://localhost:5001/recipe/post`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                    'x-access-token': token
                },
                body : JSON.stringify({...data, creator: decoded.email_id})
            })
            response.json().then(data => {
                if(data.StatusCode === 200) {
                    recipes.push(data.Result);
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
            {displayForm && <RecipeCard 
                mode='edit' 
                onSave={handleCreate} 
                onDelete={handleOnDelete}
                image={"https://foodish-api.herokuapp.com/images/samosa/samosa10.jpg"}
                title={defaultValues.title}
                id={defaultValues.id}
                description={defaultValues.description}
                duration={defaultValues.duration}
            />}
            <Fab color='primary' style={{position:'absolute', bottom:16, right:16}} onClick={() => setDisplayForm(true)}>
                <AddIcon />
            </Fab>
        </div>
    )
}

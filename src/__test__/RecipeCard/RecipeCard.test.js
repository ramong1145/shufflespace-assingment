import React from 'react';
import renderer from 'react-test-renderer'
import RecipeCard from '../../components/RecipeCard';

describe('Options panel appears when hovered', () => {
    const card = renderer.create(
        <RecipeCard 
            id='00000001'
            title='testing recipe'
            description= 'testing a new recipe'
            duration='90'
        />
    )
    let tree = card.toJSON();
    tree.props.onMouseEnter();
    expect(tree.toJSON()).toMatchSnapshot();
})
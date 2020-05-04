import React from 'react';
import { useState, useEffect } from 'react';
import Search from '../Search/Search';
import RecipeList from '../RecipeList/RecipeList';
import Footer from '../Footer/Footer';

function Recipes() {
	const savedRecipes = JSON.parse(localStorage.getItem('recipes'));
	const recipesState =
		savedRecipes && savedRecipes.length > 0 ? savedRecipes : [];
	const savedString = localStorage.getItem('savedString');
	const searchStringState = savedString ? savedString : 'chicken';
	const [recipes, setRecipes] = useState(recipesState);
	const [searchString, setSearchString] = useState(searchStringState);

	useEffect(() => {
		getRecipes(searchString);
	}, []);

	async function getRecipes(searchString) {
		const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchString}`;
		await fetch(url)
			.then((response) => response.json())
			.then((result) => {
				if (result.meals && result.meals.length > 0) {
					setRecipes(result.meals);
					localStorage.setItem('recipes', JSON.stringify(result.meals));
					localStorage.setItem('savedString', searchString);
					console.log(searchString);
					setSearchString('');
				} else {
					alert('Recipe not found');
					setSearchString('');
				}
			})
			.catch(console.error);
	}

	function handleChange(event) {
		setSearchString(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		getRecipes(searchString);
	}

	return (
		<div className='mb-5'>
			<Search
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				searchString={searchString}
			/>
			<RecipeList recipes={recipes} />
			{recipes.length > 0 ? <Footer /> : null}
		</div>
	);
}

export default Recipes;

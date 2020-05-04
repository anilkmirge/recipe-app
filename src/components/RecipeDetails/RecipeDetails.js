import React, {Component} from 'react';

import VideoModal from './Modals';
import './RecipeDetails.css';
import Footer from '../Footer/Footer';

class RecipeDetails extends Component {
    state = {
        mealItem: {},
        ingredients: [],
        instructions: []
    };

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    setIngredients(recipe) {
        const ingredients = [];

        let i = 1;
        while (recipe['strIngredient' + i]) {
            const ingredient = recipe['strIngredient' + i];
            const measure = recipe['strMeasure' + i];
            ingredients.push(measure + ' ' + ingredient + '.');
            i++;
        }
        return ingredients;
    }

    setInstructions(recipe) {
        const instructions = [];
        const splitInstructions = recipe['strInstructions'].split('.');
        splitInstructions.map((ins) => {
            return ins !== '' ? instructions.push(ins + '\n') : '';
        });
        return instructions;
    }

    componentDidMount = async () => {
        const recipeId = this.props.match.params.recipeId;

        const url = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const response = await url.json();
        const meal = response.meals[0];
        const ingredients = this.setIngredients(meal);
        const instructions = this.setInstructions(meal);
        this.setState({
            mealItem: meal,
            ingredients: ingredients,
            instructions: instructions
        });
    };

    render() {
        const {strMealThumb, strMeal, strYoutube} = this.state.mealItem;
       
        return (
            <>
            <div className='container mb-5 recipe-details'>
                <div className='row'>
                    <section className='col-md-8  col-12'>
                      
                        <img
                            className='img-thumbnail img-fluid w-75 h-75 p-2 d-block mb-2 mt-5'
                            src={strMealThumb}
                            alt={strMeal}
                        />
                        {strYoutube ? (
                            <VideoModal strYoutube={strYoutube} />
                        ) : (
                            <p className='btn btn-danger'>Video not available</p>
                        )}

                        
                    </section>

                    <section className='col-md-4 col-12 shadow-lg p-3 mb-5 bg-white rounded mt-5' id='background-color'>
                        <h3>Ingredients<strong> :</strong> </h3>
                        <ul>
                            {this.state.ingredients.map((ing, index) => {
                                return <li key={index}>{ing}</li>;
                            })}
                        </ul>
                    </section>

                    <section className='col-md-12 shadow p-3 mb-5 bg-white rounded'>
                        <h2 className='text-center' id='name'>
                            {strMeal}
                        </h2>
                        <h4>Instructions: </h4>
                        <ul>
                            {this.state.instructions.map((ins, index) => {
                                return (
                                    <li className='instruction' key={index}>
                                        {ins}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </div>
                
            </div>
            {this.state.mealItem.strMeal ? <Footer /> : null}
            </>
        );
    }
}

export default RecipeDetails;

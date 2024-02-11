import React from 'react'
import { addToFavorites, removeFromFavorites, selectFavorites } from '../../redux/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import Unfilledheart from '../../assets/Unfilled-heart-svg';
import FilledHerat from '../../assets/Filled-heart-svg';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector(selectFavorites);

    const handleFavoriteClick = (meal) => {
        if (favorites.find((favMeal) => favMeal.idMeal === meal.idMeal)) {
            dispatch(removeFromFavorites(meal));
        } else {
            dispatch(addToFavorites(meal));
        }
    };


    const extractIngredients = (meal) => {
        const ingredientKeys = Object.keys(meal)?.filter(key => key.startsWith('strIngredient'));
        const ingredients = ingredientKeys?.map(key => meal[key])
            .filter(ingredient => ingredient?.trim() !== '');
        const filteredIngredients = ingredients?.filter(ingredient => ingredient !== null && ingredient?.trim() !== '');
        return filteredIngredients;
    };

    return (
        <div>


            {favorites.length ? (
                <>
                    <h2 className="text-3xl text-center mt-8 font-bold tracking-tight text-indigo-500 sm:text-4xl">
                        My favorites list
                    </h2>
                    <div className="mt-6 overflow-y-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Image</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Name</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Category</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Ingredients</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Area</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Remove From favourite</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">

                                {favorites?.map((meal, index) => {
                                    return (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                                <div className="h-10 w-10">
                                                    <img
                                                        className="h-full w-full rounded-full object-cover object-center"
                                                        src={meal?.strMealThumb}
                                                        alt="strMealThumb"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                                    {meal?.strMeal || '--'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{meal?.strCategory || '--'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 flex-wrap max-h-14 overflow-y-auto">
                                                    {extractIngredients(meal).map((ingredient, Index) => (
                                                        <span key={Index} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-violet-700">
                                                            {ingredient}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{meal?.strArea || '--'}</td>
                                            <td className='px-6 py-4'>
                                                <button onClick={() => handleFavoriteClick(meal)} className='w-[30px]'>
                                                    {favorites.find((favMeal) => favMeal.idMeal === meal.idMeal) ? <FilledHerat /> : <Unfilledheart />}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>
                </>

            ) : (
                < div className='flex flex-col gap-10 items-center justify-center mt-32'>
                    <h2 className="text-3xl font-bold tracking-tight text-indigo-500 sm:text-4xl">
                        Your favorites list is Empty
                    </h2>
                    <button className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => { navigate('/mealList') }} >
                        Check All Meals
                    </button>
                </div>
            )}


        </div>
    )
}

export default Dashboard
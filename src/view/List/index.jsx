import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectFavorites } from '../../redux/favoritesSlice';
import Unfilledheart from '../../assets/Unfilled-heart-svg';
import FilledHerat from '../../assets/Filled-heart-svg';
import { useNavigate } from 'react-router-dom';

function MealList() {
    const navigate = useNavigate()
    const [mealData, setMealData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [mealsPerPage] = useState(10);

    const [filteredMeals, setFilteredMeals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [areasList, setAreasList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);

    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;

    const currentMeals = filteredMeals?.slice(indexOfFirstMeal, indexOfLastMeal);



    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);


    const handleFavoriteClick = (meal) => {
        if (favorites.find((favMeal) => favMeal.idMeal === meal.idMeal)) {
            dispatch(removeFromFavorites(meal));
        } else {
            dispatch(addToFavorites(meal));
        }
    };



    useEffect(() => {
        const fetchAreasAndCategories = async () => {
            try {
                const areasResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
                const categoriesResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

                const areasData = await areasResponse.json();
                const categoriesData = await categoriesResponse.json();

                setAreasList(areasData.meals || []);
                setCategoriesList(categoriesData.meals || []);
            } catch (error) {
                console.error('Error fetching areas and categories:', error);
            }
        };

        fetchAreasAndCategories();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearchTerm}`);
                const data = await response.json();
                setMealData(data);
                setFilteredMeals(data.meals);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [debouncedSearchTerm]);

    useEffect(() => {
        let filteredMeals = mealData.meals;

        if (selectedCategory) {
            filteredMeals = filteredMeals.filter((meal) => meal.strCategory === selectedCategory);
        }

        if (selectedArea) {
            filteredMeals = filteredMeals.filter((meal) => meal.strArea === selectedArea);
        }
        setCurrentPage(1)
        setFilteredMeals(filteredMeals);
    }, [selectedCategory, selectedArea, mealData]);





    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1)
        }, 1000);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    const extractIngredients = (meal) => {
        const ingredientKeys = Object.keys(meal)?.filter(key => key.startsWith('strIngredient'));
        const ingredients = ingredientKeys?.map(key => meal[key])
            .filter(ingredient => ingredient?.trim() !== '');
        const filteredIngredients = ingredients?.filter(ingredient => ingredient !== null && ingredient?.trim() !== '');
        return filteredIngredients;
    };



    if (isLoading) {
        return <div className='flex justify-center items-center mt-60'>
            <span class="relative flex h-7 w-7">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-7 w-7 bg-sky-500"></span>
            </span>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }



    return (
        <div className='mt-10'>
            <div className="flex gap-4 flex-wrap  ml-5" >
                <div className='max-w-[400px]'>
                    <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
                        Search meals:
                    </label>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search meals..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-4 py-2 border rounded"
                    />
                </div>

                <div >
                    <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Category:
                    </label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border rounded"
                    >
                        <option value="">All Categories</option>
                        {categoriesList.map((category) => (
                            <option key={category.strCategory} value={category.strCategory}>
                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div >
                    <label htmlFor="area-select" className="block text-sm font-medium text-gray-700 mb-2 ">
                        Select Area:
                    </label>
                    <select
                        id="area-select"
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="px-4 py-2 border rounded"
                    >
                        <option value="">All Areas</option>
                        {areasList.map((area) => (
                            <option key={area.strArea} value={area.strArea}>
                                {area.strArea}
                            </option>
                        ))}
                    </select>
                </div>

                <button className='h-10 mt-7 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => { navigate('/dashboard') }} >
                    Check my favorites list
                </button>
            </div>

            {
                currentMeals?.length ? (
                    <div className="overflow-y-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Image</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Name</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Category</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Ingredients</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Meal Area</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">My favourite</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">

                                {currentMeals?.map((meal, index) => {
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
                ) : (
                    < div className='flex flex-col gap-10 items-center justify-center mt-32'>
                        <h2 className="text-3xl font-bold tracking-tight text-indigo-500 sm:text-4xl">
                            Data not found
                        </h2>
                        <button className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={() => window.location.reload()} >
                            refresh page
                        </button>
                    </div>
                )
            }


            <div className="flex justify-center mt-4">
                <ul className="flex gap-2">
                    {Array.from({ length: Math.ceil(filteredMeals?.length / mealsPerPage) }, (_, i) => i + 1).map((page) => (
                        <li
                            key={page}
                            onClick={() => paginate(page)}
                            className={`cursor-pointer px-3 py-2 border ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {page}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default MealList
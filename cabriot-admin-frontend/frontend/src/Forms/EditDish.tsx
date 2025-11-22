import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import MultiSelectDropDown from '../components/Forms/SelectGroup/MultiSelectDropDown';


const baseUrl = "https://admindashboard-fr4p.onrender.com";


interface fileid {
    ID: string
}


export default function Editkitchen({ ID }: fileid) {
    const [form, setForm] = useState(true);
    const [dietary, setDietary] = useState([]);
    const [cuisine, setCuisine] = useState([]);
    const [meal, setMeal] = useState([]);
    const [Deletpopup, setDeletpopup] = useState(false);
    const [dietaryData, setDietaryData] = useState([]);
    const [cuisineData, setCuisineData] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [mealNames, setMealNames] = useState([]);
    const [ExistingCuisineNames, setExistingCuisineNames] = useState([]);
    const [ExistingMealNames, setExistingMealNames] = useState([]);


    const [formData, setFormData] = useState({
        dish_name: "",
        dish_image: null,
        dish_description: "",
        dish_base_price: "",
        dish_weight: "",
        dish_availability_status: "available",
        dish_calories: "",
        dish_protein: "",
        dish_carbohydrates: "",
        dish_fat: "",
        dish_fiber: "",
        dietary_choices: [],
        cuisine_choices: [],
        meal_choices: []
    });

    console.log("DishID", ID);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const dietaryChoicesResponse = await axios.get(`${baseUrl}/api/dietary`);
                const cuisineChoicesResponse = await axios.get(`${baseUrl}/api/cusisine`);
                const mealChoicesResponse = await axios.get(`${baseUrl}/api/mealchioce`);
                const dishInfoResponse = await axios.get(`${baseUrl}/api/dishinfo/${ID}`);

                setDietary(dietaryChoicesResponse.data);
                setCuisine(cuisineChoicesResponse.data);
                setMeal(mealChoicesResponse.data);

                const names = meal.map(meal => meal.name); // Extracting only the names from the meal objects
                setMealNames(names);

                setFormData({
                    dish_name: dishInfoResponse.data.dish_name,
                    dish_image: dishInfoResponse.data.dish_image,
                    dish_description: dishInfoResponse.data.dish_description,
                    dish_base_price: dishInfoResponse.data.dish_base_price,
                    dish_weight: dishInfoResponse.data.dish_weight,
                    dish_availability_status: dishInfoResponse.data.dish_availability_status,
                    dish_calories: dishInfoResponse.data.dish_calories,
                    dish_protein: dishInfoResponse.data.dish_protein,
                    dish_carbohydrates: dishInfoResponse.data.dish_carbohydrates,
                    dish_fat: dishInfoResponse.data.dish_fat,
                    dish_fiber: dishInfoResponse.data.dish_fiber,
                    dietary_choices: dishInfoResponse.data.dietary_choices,
                    cuisine_choices: dishInfoResponse.data.cuisine_choices,
                    meal_choices: dishInfoResponse.data.meal_choices
                });

                const MealIDs = dishInfoResponse.data.meal_choices.map(choice => choice);
                const CusineIDs = dishInfoResponse.data.cuisine_choices.map(choice => choice);


                const existingCuisineNames = cuisineChoicesResponse.data.filter(cuisine => CusineIDs.includes(cuisine.id))
                    .map(cuisine => cuisine.name);

                const existingmealNames = mealChoicesResponse.data.filter(meal => MealIDs.includes(meal.id))
                    .map(meal => meal.name);


                setExistingCuisineNames(existingCuisineNames);
                setExistingMealNames(existingmealNames);
                // console.log("existingCuisineNames", existingCuisineNames);
                // console.log("existingmealNames", existingmealNames);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [ID]);


    const handleCuisineChange = (cities: string[]) => {
        // console.log("selected cuisine: ", cities);
        // console.log("ExistingCuisineNames", ExistingCuisineNames);
        const duplicateIndices = cuisineData
            .map((value, index) => (cities.includes(value) ? index+1 : -1))
            .filter(index => index !== -1);

        // console.log("selected cuisine Id", duplicateIndices);
          setFormData(prevData => ({
          ...prevData,
          cuisine_choices: duplicateIndices, 
        }));
      };
    
    
      const handleMealChange = (meals: string[]) => {
        // console.log("selected meal: ", meals);
        // console.log("ExistingMealNames", ExistingMealNames);
        const duplicateIndices = mealData
            .map((value, index) => (meals.includes(value) ? index+1 : -1))
            .filter(index => index !== -1);

            // console.log("selected meal Id", duplicateIndices);
          setFormData(prevData => ({
          ...prevData,
          meal_choices: duplicateIndices, 
        }));
      };




    useEffect(() => {
        setDietaryData(['Veg', 'Non-veg', 'Vegan']);
    }, []);


    useEffect(() => {
        setCuisineData(['South Indian', 'North Indian', 'Chinese']);
    }, []);


    useEffect(() => {
        setMealData(['BreakFast','Lunch', 'Dinner']);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSelect = (e, type) => {
        const selectedOption = e.target.value;
        if (selectedOption && !formData[type].includes(selectedOption)) {
            setFormData({
                ...formData,
                [type]: [...formData[type], selectedOption],
            });
        }
    };


    const handleDietarySelect = (e, type) => {
        const selectedOption = e.target.value;
        if (selectedOption) {
            setFormData({
                ...formData,
                [type]: [selectedOption], // Replace the existing value with the new one
            });
        }
    };


    const handleRemove = (index, type) => {
        const updatedOptions = [...formData[type]];
        updatedOptions.splice(index, 1);
        setFormData({
            ...formData,
            [type]: updatedOptions,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${baseUrl}/api/dishinfo/${ID}`, formData);
            setDeletpopup(true)
            setFormData({
                dish_name: "",
                dish_image: null,
                dish_description: "",
                dish_base_price: "",
                dish_weight: "",
                dish_availability_status: "available",
                dish_calories: "",
                dish_protein: "",
                dish_carbohydrates: "",
                dish_fat: "",
                dish_fiber: "",
                dietary_choices: [],
                cuisine_choices: [],
                meal_choices: []
            });
        } catch (error) {
            console.error('Error updating dish:', error);


        }

        // console.log(formData)
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setDeletpopup(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [Deletpopup]);

    return (
        <>
            {Deletpopup && (

                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md">
                        <p className="text-lg font-bold mb-4">Success!</p>
                        <p>Dish Update successfully!</p>
                        <button
                            onClick={() => {
                                setDeletpopup(false);
                            }}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Edit General Information
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div className="">
                                    <label className="mb-3 block text-black dark:text-white min-w-max pt-3">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                                    />
                                </div>
                                <div className="">
                                    <label className="mb-3 block text-black dark:text-white pt-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="dish_name"
                                        required
                                        value={formData.dish_name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="">
                                    <label className="mb-3 block text-black dark:text-white pt-5">
                                        Description
                                    </label>
                                    <textarea
                                        name="dish_description"
                                        value={formData.dish_description}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="">
                                    <label className="mb-3 mt-2 block text-black dark:text-white min-w-max">
                                        Weight (gms)
                                    </label>
                                    <input
                                        type="number"
                                        name="dish_weight"
                                        value={formData.dish_weight}
                                        required
                                        onChange={handleChange}
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="">
                                    <label className="mb-3 block text-black dark:text-white min-w-max pt-2">
                                        Base Price (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="dish_base_price"
                                        value={formData.dish_base_price}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="status flex gap-6">
                                    <div className="">
                                        <label className="mb-3 block text-black dark:text-white min-w-max ">
                                            Available
                                        </label>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={formData.dish_availability_status === "available"}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        dish_availability_status: e.target.checked ? "available" : "unavailable",
                                                    })
                                                }
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Edit Category
                                </h3>
                            </div>

                            <div className="flex flex-col gap-5.5 p-6.5">
                                <label className="mb-3 block text-black dark:text-white pt-2 min-w-max">
                                    Dietary Type
                                </label>
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                    <select
                                        value={formData.dietary_choices.length > 0 ? formData.dietary_choices[0] : ""}
                                        onChange={(e) => handleDietarySelect(e, "dietary_choices")}
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  'text-black dark:text-white' : ''
                                            }`}
                                    >
                                        <option value="" className="text-body dark:text-bodydark">Select dietary choice</option>
                                        {dietary.map((item) => (
                                            <option value={item.id} className="text-body dark:text-bodydark">{item.name}</option>
                                        ))}

                                    </select>

                                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                        <svg
                                            className="fill-current"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.8">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                    fill=""
                                                ></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col mb-5 gap-5.5 px-6.5">
                                <div>
                                    <label htmlFor="stateDropdown" className="mb-3 block text-black dark:text-white">
                                        Cuisine Type
                                    </label>

                                    <MultiSelectDropDown
                                        id="multiSelect1"
                                        options={cuisineData}
                                        selectedCities={ExistingCuisineNames || []}
                                        onChange={handleCuisineChange}
                                    />

                                </div>
                            </div>

                            <div className="flex flex-col mb-5 mt-5 gap-5.5 px-6.5">
                                <div>
                                    <label htmlFor="stateDropdown" className="mb-3 block text-black dark:text-white">
                                        Meal Type
                                    </label>

                                    <MultiSelectDropDown
                                        id="multiSelect"
                                        options={mealData}
                                        selectedCities={ExistingMealNames}
                                        onChange={handleMealChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-9">
                            {/* <!-- Textarea Fields --> */}
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        Edit Nutrition Information
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5.5 p-6.5">
                                    <div className="">
                                        <label className="mb-3 block text-black dark:text-white pt-2 min-w-max">
                                            Calories
                                        </label>
                                        <input
                                            type="number"
                                            name="dish_calories"
                                            value={formData.dish_calories}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="">
                                        <label className="mb-3 block text-black dark:text-white pt-2 min-w-max">
                                            Protein (gms)
                                        </label>
                                        <input
                                            type="number"
                                            name="dish_protein"
                                            value={formData.dish_protein}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-black dark:text-white pt-2 min-w-max">
                                            Carbohydrates (gms)
                                        </label>
                                        <input
                                            type="number"
                                            name="dish_carbohydrates"
                                            value={formData.dish_carbohydrates}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-3 block text-black dark:text-white pt-2 min-w-max">
                                            Fat (gms)
                                        </label>
                                        <input
                                            type="number"
                                            name="dish_fat"
                                            value={formData.dish_fat}
                                            onChange={handleChange}

                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                    <div className="">
                                        <label className="mb-3 block text-black dark:text-white pt-2 min-w-max">
                                            Fiber
                                        </label>
                                        <input
                                            type="number"
                                            name="dish_fiber"
                                            value={formData.dish_fiber}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

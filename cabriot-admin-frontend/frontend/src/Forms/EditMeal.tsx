import axios from 'axios';
import { useEffect, useState } from 'react';
import MultiSelectDropDown from '../components/Forms/SelectGroup/MultiSelectDropDown';
import MealList from '../components/Tables/MealDataTable';
import { Icon } from '@chakra-ui/react';
import MealSearchBar from '../components/SearchBar/MealSearchBar'
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";


const baseUrl = "https://admindashboard-fr4p.onrender.com";


interface fileid {
    ID: string
}

interface DishesMealsFormData {
    id: number;
    dish_name: string;
    meal_qty: number;
    selected_dishes: number;
}


export default function EditMeal({ ID }: fileid) {
    const [form, setForm] = useState(true);
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [dietary, setDietary] = useState([]);
    const [cuisine, setCuisine] = useState([]);
    const [meal, setMeal] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [addedDishes, setAddedDishes] = useState([]);
    const [edit, setedit] = useState(false);
    const [quantities, setQuantities] = useState(Array(addedDishes.length).fill(0));
    const [dietaryData, setDietaryData] = useState([]);
    const [cuisineData, setCuisineData] = useState([]);
    const [mealData, setMealData] = useState([]);
    const [dishQuantities, setDishQuantities] = useState({});
    const [showKitchenUpdatedPopup, setKitchenUpdateShowPopup] = useState(false);
    const [showErrorPopup, setshowErrorPopup] = useState(false);
    const [ExistingCuisineNames, setExistingCuisineNames] = useState([]);
    const [ExistingMealNames, setExistingMealNames] = useState([]);
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
        meal_name: "",
        meal_description: "",
        meal_base_price: "",
        meal_weight: "",
        meal_availability_status: "available",
        meal_qty: [],
        dietary_choices: [],
        meal_image: null,
        selected_dishes: [],
        cuisine_choices: [],
        meal_choices: [],
    });


    const [dishesMealsformData, setDishesMealsFormData] = useState<DishesMealsFormData[]>([
        {
          id: 0,
          dish_name: "",
          meal_qty: 0,
          selected_dishes: 0
        }
      ]);



    const handleDietarySelect = (e, type) => {
        const selectedOption = e.target.value;
        if (selectedOption) {
            setFormData({
                ...formData,
                [type]: [selectedOption],
            });
        }
    };

    const handleCuisineChange = (cities: string[]) => {
        const indexedCuisineChoices = cities.map((_, index) => (index + 1).toString());
        setFormData(prevData => ({
            ...prevData,
            cuisine_choices: indexedCuisineChoices
        }));
    };

    const handleMealChange = (meals: string[]) => {
        const indexedMealChoices = meals.map((_, index) => (index + 1).toString());
        setFormData(prevData => ({
            ...prevData,
            meal_choices: indexedMealChoices
        }));
    };


    useEffect(() => {
        setCuisineData(['North Indian', 'South  Indian']);
    }, []);

    useEffect(() => {
        setMealData(['Lunch', 'Dinner', 'BreakFast']);
    }, []);


    useEffect(() => {
        setQuantities(Array(addedDishes.length).fill(0));
    }, [addedDishes]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const dietaryChoicesResponse = await axios.get(`${baseUrl}/api/dietary`);
            const cuisineChoicesResponse = await axios.get(`${baseUrl}/api/cusisine`);
            const mealChoicesResponse = await axios.get(`${baseUrl}/api/mealchioce`);
            const dishinfo = await axios.get(`${baseUrl}/api/dishinfo`);
    
            setDietary(dietaryChoicesResponse.data);
    
            setCuisine(cuisineChoicesResponse.data);
            const CuisineList = cuisineChoicesResponse.data.map(item => item.name);
            setCuisineData(CuisineList)
    
            setMeal(mealChoicesResponse.data);
            const MealList = mealChoicesResponse.data.map(item => item.name);
            setMealData(MealList);

            const allDishesData = dishinfo.data.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
            setSelectedDishes(allDishesData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
    }, []);
    

    // const handleAddDish = (dish) => {
    //     const { dish_id } = dish;
    //     const updatedFormData = {
    //         ...formData,
    //         selected_dishes: [...formData.selected_dishes, dish_id]
    //     };
    //     setFormData(updatedFormData);
    //     setAddedDishes([...addedDishes, dish]); // Store the entire dish data in addedDishes
    //     setSearchTerm('');
    // };

    // const handleRemoveDish = (index) => {
    //     const dishToRemove = addedDishes[index];
    //     const updatedDishQuantities = { ...dishQuantities };
    //     delete updatedDishQuantities[dishToRemove.dish_id];
    //     setDishQuantities(updatedDishQuantities);
    //     setAddedDishes(addedDishes.filter((_, i) => i !== index));
    // };

    // const handleSearchChange = (index, value) => {
    //     const updatedSearchTerms = [...searchTerms];
    //     updatedSearchTerms[index] = value;
    //     setSearchTerms(updatedSearchTerms);
    // };

    // const handleSelect = (e, type) => {
    //     const selectedOption = e.target.value;
    //     if (selectedOption && !formData[type].includes(selectedOption)) {
    //         setFormData({
    //             ...formData,
    //             [type]: [...formData[type], selectedOption],
    //         });
    //     }
    // };

    // const handleRemove = (index, type) => {
    //     const updatedOptions = [...formData[type]];
    //     updatedOptions.splice(index, 1);
    //     setFormData({
    //         ...formData,
    //         [type]: updatedOptions,
    //     });
    // };

    // const handleQuantityChange = (dishId, quantity) => {
    //     setDishQuantities((prevQuantities) => ({
    //         ...prevQuantities,
    //         [dishId]: quantity,
    //     }));
    // };

    // const handleMenuItemChange = (e, index) => {
    //     const { value } = e.target;
    //     const updatedItems = [...menuItems];
    //     updatedItems[index].name = value;
    //     setMenuItems(updatedItems);
    // };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const cuisineChoicesResponse = await axios.get(`${baseUrl}/api/cusisine`);
                const mealChoicesResponse = await axios.get(`${baseUrl}/api/mealchioce`);
                const response = await axios.get(`${baseUrl}/api/mealinfo/update/${ID}`);
                const mealData = response.data;

                
                const selectedDishesData = mealData.selected_dishes.map(dish => {
                    const { dish_id, dish_name } = dish;
                    return { dish_id, dish_name };
                });

                const selectedDishesQty = mealData.meal_qty.map(dish => {
                    const { dish_id, dish_name } = dish;
                    return { dish_id, dish_name };
                });

                const extractedMealQty = mealData.meal_qty.map(qtyArr => {
                    return qtyArr.map(qty => parseInt(qty));
                  });

                const extractedIds = selectedDishesData.map(item => item.dish_id);
                
                const extractMealQty = (dishId) => {
                    const qtyArray = extractedMealQty.find(item => item[0] === dishId);
                    if (qtyArray) {
                        return qtyArray[1];
                    } else {
                        return null;
                    }
                };

                const extractedDishData = selectedDishesData.map(dish => {
                    const { dish_id, dish_name } = dish;
                    const qty = extractMealQty(dish_id);
                    return { dish_id, dish_name, qty };
                });
                
                // console.log("lists:", extractedDishData);
                const updatedRows = extractedDishData.map((item, index) => {
                    // console.log("item:", item);
                    const { dish_id, dish_name, qty } = item;
                    return {
                        id: dish_id,
                        selected_dishes: dish_id,
                        dish_name: dish_name,
                        meal_qty: qty
                    };
                });
                setRows(updatedRows);


                const MealIDs = mealData.meal_choices.map(choice => choice);
                const CusineIDs = mealData.cuisine_choices.map(choice => choice);

                const existingCuisineNames = cuisineChoicesResponse.data.filter(cuisine => CusineIDs.includes(cuisine.id))
                    .map(cuisine => cuisine.name);

                const existingmealNames = mealChoicesResponse.data.filter(meal => MealIDs.includes(meal.id))
                    .map(meal => meal.name);

                setExistingCuisineNames(existingCuisineNames);
                setExistingMealNames(existingmealNames);


                // console.log("All MEal Data", mealData)
                setFormData({
                    meal_name: mealData.meal_name,
                    meal_description: mealData.meal_description,
                    meal_base_price: mealData.meal_base_price,
                    meal_weight: mealData.meal_weight,
                    meal_availability_status: mealData.meal_availability_status,
                    meal_qty: mealData.meal_qty,
                    dietary_choices: mealData.dietary_choices,
                    meal_image: mealData.meal_image,
                    selected_dishes: extractedIds,
                    cuisine_choices: mealData.cuisine_choices,
                    meal_choices: mealData.meal_choices,
                });

                // console.log("Meal dietary:", mealData.dietary_choices);
            } catch (error) {
                console.error("Error fetching meal data:", error);
                // Handle error case here
            }
        };

        fetchMealData();
    }, [ID]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`${baseUrl}/api/mealinfo/${ID}`, formData);
            // console.log("Meal Updated Response:", res);
            setFormData({
                meal_name: "",
                meal_description: "",
                meal_base_price: "",
                meal_weight: "",
                meal_availability_status: "available",
                meal_qty: [],
                dietary_choices: [],
                meal_image: null,
                selected_dishes: [],
                cuisine_choices: [],
                meal_choices: [],
            });
            setAddedDishes([]);
            setDishQuantities({});
            setSearchTerm('');
            setForm(true);
            setKitchenUpdateShowPopup(true)
        } catch (error) {
            console.error("Error adding meal information:", error);
            setshowErrorPopup(true)
        }
    };




    const handleSearchbarChange = (
        dish_name: string,
        meal_qty: number[],
        selected_dishes: number[],
      ) => {
        // console.log(dish_name, meal_qty, selected_dishes);
        const newMealQtyEntry = [selected_dishes[0], meal_qty[0]];
        setFormData(prevData => ({
          ...prevData,
          selected_dishes: [...prevData.selected_dishes, ...selected_dishes],
        //   meal_qty: [...prevData.meal_qty, ...meal_qty],
        meal_qty: [...prevData.meal_qty, newMealQtyEntry],
          
        }));
      
        setDishesMealsFormData((prevData) => {
          if (!prevData.length) {
            return [
              {
                id: 1,
                dish_name,
                meal_qty,
                selected_dishes
              }
            ];
          }
      
            const lastFormData = prevData[prevData.length - 1];
            const updatedFormData = {
              id: lastFormData.id + 1,
              dish_name,
              meal_qty,
              selected_dishes
              
            };
      
            return [...prevData, updatedFormData];
          });
      
          const newRow = {
            id: rows.length + 1,
            dish_name,
            meal_qty,
            selected_dishes
          };
      
          setRows((prevRows) => [...prevRows, newRow]);
    };



    const handleSearchbarDeleteChange = (
        idToRemove: number
    ) => {
        const updatedSelectedDishes = formData.selected_dishes.filter(id => id !== idToRemove);
        const updatedMealQty = formData.meal_qty.filter(([id, _]) => parseInt(id) !== idToRemove);

        setFormData(prevState => ({
            ...prevState,
            selected_dishes: updatedSelectedDishes,
            meal_qty: updatedMealQty
        }));
    
        setDishesMealsFormData(prevData => prevData.filter(data => data.id !== idToRemove));
        setRows(prevRows => prevRows.filter(row => row.id !== idToRemove));
    };





    // const handleDeleteRow = (idToRemove) => {
    //     console.log("ID to remove", idToRemove);
    //     setDishesMealsFormData((prevData) =>
    //         prevData.filter((data) => data.id !== idToRemove)
    //     );
    //     setRows(prevRows => prevRows.filter(row => row.idToRemove !== idToRemove));
    //     console.log("Rows after delete", rows);
    //     console.log("rows length", rows.length);    
    // };
    
    const handleDeleteRow = (idToRemove) => {
        // console.log("ID to remove", idToRemove);
        setDishesMealsFormData(prevData => prevData.filter(data => data.id !== idToRemove));

        setRows(prevRows => prevRows.filter(row => row.id !== idToRemove));
        // console.log("Rows after delete", rows);
        // console.log("rows length", rows.length);
    };

    return (
        <>
            {!form ? (
                <>
                    <MealList />
                </>
                ) : (
                <>
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
                                                name="meal_name"
                                                value={formData.meal_name}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                        <div className="">
                                            <label className="mb-3 block text-black dark:text-white pt-5">
                                                Description
                                            </label>
                                            <textarea
                                                name="meal_description"
                                                value={formData.meal_description}
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
                                                name="meal_weight"
                                                value={formData.meal_weight}
                                                onChange={handleChange}
                                                required
                                                placeholder="Weight(in gm.)"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                        <div className="">
                                            <label className="mb-3 block text-black dark:text-white min-w-max pt-2">
                                                Base Price (₹)
                                            </label>
                                            <input
                                                type="number"
                                                name="meal_base_price"
                                                value={formData.meal_base_price}
                                                required
                                                onChange={handleChange}
                                                placeholder="Base Price"
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                        <div className="status flex gap-6">
                                            <div className="">
                                                <label className="mb-3 block text-black dark:text-white min-w-max ">
                                                    Avaliable
                                                </label>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.meal_availability_status === "available"}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                meal_availability_status: e.target.checked ? "available" : "unavailable",
                                                            })
                                                        }
                                                    />
                                                    <span className="slider round"></span>
                                                </label>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {!showKitchenUpdatedPopup && (
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                Edit Category
                                            </h3>
                                        </div>


                                        <div className="flex flex-col gap-5.5 p-6.5">
                                            <label className=" block text-black dark:text-white pt-2 min-w-max">
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
                                                    id="multiSelect"
                                                    options={cuisineData} // Pass cuisine data to the options prop
                                                    selectedCities={ExistingCuisineNames}
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
                                                    selectedCities={ExistingMealNames}
                                                    options={mealData} // Pass cuisine data to the options prop

                                                    onChange={handleMealChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-9">
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-black dark:text-white">
                                            Edit Dishes
                                        </h3>
                                        </div>

                                        {!showKitchenUpdatedPopup && ( 
                                            <MealSearchBar handleSearchbarChange={handleSearchbarChange} dishNames={selectedDishes} />
                                        )}

                                        <div className="mt-5 p-4">
                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">Dish</th>
                                                    {/* <th scope="col" className="px-6 py-3">Price</th> */}
                                                    <th scope="col" className="px-6 py-3">Quantity</th>
                                                    <th scope="col" className="px-6 py-3">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {rows.map((row, index) => (
                                                    <tr key={row.id}>
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        {row.dish_name !=" " ? row.dish_name : row.dishesName} {row.dish_name !=" " ? row.meal_name : row.mealsName}
                                                        {/* {row.dish_name !=" " ? row.meal_name : row.mealsName} */}
                                                    </td>
                                                    {/* <td className="px-6 py-3 whitespace-nowrap">{row.menu_price}</td> */}
                                                    <td className="px-6 py-3 whitespace-nowrap">{row.meal_qty}</td>
                                                    
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <button className="hover:text-primary p-2" title="Edit Kitchen">
                                                        <Icon as={BiEdit} width="20px" height="20px" />
                                                        </button>
                                                        <button
                                                        className="hover:text-danger"
                                                        onClick={(event) => {
                                                            event.preventDefault(); // Prevent default form submission behavior
                                                            handleSearchbarDeleteChange(row.id);
                                                        }}
                                                
                                                        title="delete"
                                                        >
                                                        <Icon as={MdOutlineDeleteOutline} width="20px" height="20px" />
                                                        </button>
                                                    </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
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
            )
            }
            {showKitchenUpdatedPopup && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md">
                        <p className="text-lg font-bold mb-4">Success!</p>
                        <p>Meal Updated successfully!</p>
                        <button
                            onClick={() => {
                                setKitchenUpdateShowPopup(false);
                            }}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showErrorPopup && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md">
                        <p className="text-lg font-bold mb-4">Faild!</p>
                        <p>Meal Edit Faild!</p>
                        <button
                            onClick={() => {
                                setshowErrorPopup(false);
                            }}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </>

    );
}

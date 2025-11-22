import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Icon } from '@chakra-ui/react';
import '../css/kitchenpop.css';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import SearchBar from '../pages/Form/SearchBar';
import EditMenuMultiselector from '../components/Forms/SelectGroup/EditMenuMultiselector';
import EditSearchbar from './EditSearchbar';


const baseUrl = "https://admindashboard-fr4p.onrender.com";


interface FormData {
  kitchens: number[];
  kitchen_menus: number[];
}

interface DishesMealsFormData {
  id: number;
  dish_name: string;
  meal_name: string;
  menu_price: number;
  menu_qty: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export default function EditAddMenu({ ID }: FieldName) {
    
    // console.log("ID", ID);
    const [showMessage, setShowMessage] = useState(false);
    const [showKitchenAddedPopup, setKitchenAddedShowPopup] = useState(false);
    const [form, setForm] = useState(true);
    const [kitchens, setKitchens] = useState([]);
    const [selectedKitchen, setSelectedKitchen] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [meals, setMeals] = useState([]);
    const [mealplans, setMealPlans] = useState([]);
    const [selectedMealPlan, setSelectedMealPlan] = useState('');
    const [rows, setRows] = useState([]);
    const [dishesMeals, setDishesMeals] = useState([]);
    const [formData, setFormData] = useState<FormData>({
        kitchens: [], 
        kitchen_menus: []   
    });

    const [dishesMealsformData, setDishesMealsFormData] = useState<DishesMealsFormData[]>([
        {
        id: 0,
        dish_name: "",
        meal_name: "",
        menu_price: 0,
        menu_qty: 0,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
        }
    ]);

  
    const submitNewMenu = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {

          const filteredFormData = dishesMealsformData.filter(form => form.id !== 0);
    
          const resp = await axios.post(`${baseUrl}/api/menu`, filteredFormData);
          setDishesMealsFormData([
            {
              id: 0,
              dish_name: "",
              meal_name: "",
              menu_price: 0,
              menu_qty: 0,
              monday: true,
              tuesday: true,
              wednesday: true,
              thursday: true,
              friday: true,
              saturday: true,
              sunday: true,
            }
          ]);
        
          const menuIds = resp.data.menu_ids;
          
          setFormData({
            ...formData,
            kitchen_menus: menuIds,
          });
    
          const formDataToSend = {
            kitchens: selectedKitchen,
            kitchen_menus: menuIds,
          };
    
          const createKitchenMenus = await axios.post(`${baseUrl}/api/menu/kitchenmenu`, formDataToSend);
          setFormData({
            kitchens: [],
            kitchen_menus: []
          });
        
          setRows([]);
          setForm(true);
          setKitchenAddedShowPopup(true);
        } catch (error) {
          console.error('Error adding menu:', error);
        }
    };


    useEffect(() => {
        const fetchKitchens = async () => {
            try {              
                const response = await axios.get(`${baseUrl}/api/menu/kitchenmenu/${ID}`);
                // setRows(response.data)
                const kitchenNames = response.data.kitchens.map(kitchen => kitchen.kitchenName);
                // console.log("Selected Kitchens:", kitchenNames);
                
                setSelectedKitchen(kitchenNames);
                setDishesMeals(response.data);
            } catch (error) {
                console.error('Error fetching kitchens:', error);
            }
        };

        const fetchAllKitchens = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/kitchen`);
                setKitchens(response.data);
            } catch (error) {
                console.error('Error fetching in fetching all kitchens: ', error);
            }
        };

        const fetchMealPlans = async () => {
            try {
              const response = await axios.get(`${baseUrl}/api/dishinfo`);
              setMealPlans(response.data);
      
              setSelectedMealPlan(response.data.length > 0 ? 'Select the Meal-Plan' : 'Meal-Plan not found');
            } catch (error) {
              console.error('Error fetching Meal-Plan:', error);
            }
        };
      
        const fetchDishes = async () => {
            try {
                const dishResponse = await axios.get(`${baseUrl}/api/dishinfo`);
                const dishesData = dishResponse.data;
                const mealResponse = await axios.get(`${baseUrl}/api/mealinfo`);
                const mealsData = mealResponse.data;
        
                const allDishesData = dishesData.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
                const allMealsData = mealsData.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        
                setDishes(allDishesData);
                setMeals(allMealsData);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        fetchKitchens();
        fetchAllKitchens();
        fetchMealPlans();
        fetchDishes()
    }, []);


    const handleKitchenChange = (selectedKitchen) => {
        setSelectedKitchen(selectedKitchen);
        // console.log('Selected Kitchen: ', selectedKitchen);
        setFormData(prevData => ({
        ...prevData,
        kitchens: selectedKitchen
        }));
    };


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };


    const handleSearchbarChange = (
    dish_name: string,
    meal_name: string,
    menu_price: number,
    menu_qty: number,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
    ) => {
    setDishesMealsFormData((prevData) => {
        if (!prevData.length) {
        return [
            {
            id: 1,
            dish_name,
            meal_name,
            menu_price,
            menu_qty,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            },
        ];
        }

        const lastFormData = prevData[prevData.length - 1];
        const updatedFormData = {
            id: lastFormData.id + 1,
            dish_name,
            meal_name,
            menu_price,
            menu_qty,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
        };

        return [...prevData, updatedFormData];
        });

        const newRow = {
        id: rows.length + 1,
        dish_name,
        meal_name,
        menu_price,
        menu_qty,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        };

        setRows((prevRows) => [...prevRows, newRow]);
    };


    const handleDeleteRow = (idToRemove) => {
        setDishesMealsFormData((prevData) =>
        prevData.filter((data) => data.id !== idToRemove)
        );
        setRows((prevRows) => prevRows.filter((row) => row.id !== idToRemove));
    };



    return (
        <>
            <div>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12">
                    <div className="mb-4 lg:w-full">
                        <form onSubmit={submitNewMenu}>
                            <div className="flex flex-col lg:flex-row py-5 lg:justify-between lg:space-x-12">
                                <div className="mb-4 lg:w-full">
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Edit Kitchen</h3>
                                        </div>
                                        <div className="flex flex-col gap-5.5 pt-2 pb-5 px-6.5">
                                            <div className="relative z-20 mt-4 pb-2 bg-white dark:bg-form-input">
                                            <div>
                                                <label htmlFor="stateDropdown" className="mb-3 block text-black dark:text-white">
                                                Kitchen
                                                </label>
                                                
                                                <EditMenuMultiselector
                                                id="multiSelect"
                                                options={kitchens.map((kitchen) => kitchen.kitchenName)}
                                                selectedCities={selectedKitchen}
                                                onKitchenChange={handleKitchenChange}
                                                />
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-sm border my-10 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Edit Dishes & Meals</h3>
                                        </div>
                                        <SearchBar handleSearchbarChange={handleSearchbarChange} dishNames={dishes} mealNames={meals} />
                                        <div className="mt-5 p-4">
                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">Dish/Meal Name</th>
                                                    <th scope="col" className="px-6 py-3">Price</th>
                                                    <th scope="col" className="px-6 py-3">Quantity</th>
                                                    <th scope="col" className="px-6 py-3">Available Days</th>
                                                    <th scope="col" className="px-6 py-3">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                    {rows.map((row, index) => (
                                                        <tr key={index}>
                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                            {row.dish_name !=" " ? row.dish_name : row.dishesName} {row.dish_name !=" " ? row.meal_name : row.mealsName}
                                                            {/* {row.dish_name !=" " ? row.meal_name : row.mealsName} */}
                                                        </td>
                                                        <td className="px-6 py-3 whitespace-nowrap">{row.menu_price}</td>
                                                        <td className="px-6 py-3 whitespace-nowrap">{row.menu_qty}</td>
                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                            {row.monday ? 'M, ' : null}
                                                            {row.tuesday ? 'T, ' : null}
                                                            {row.wednesday ? 'W, ' : null}
                                                            {row.thursday ? 'Th, ' : null}
                                                            {row.friday ? 'F, ' : null}
                                                            {row.saturday ? 'Sa, ' : null}
                                                            {row.sunday ? 'Su, ' : null}
                                                        </td>
                                                        <td className="px-6 py-3 whitespace-nowrap">
                                                            <button className="hover:text-primary p-2" title="Edit Kitchen">
                                                            <Icon as={BiEdit} width="20px" height="20px" />
                                                            </button>
                                                            <button
                                                            className="hover:text-danger"
                                                            onClick={() => handleDeleteRow(row.id)}
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
                                    <div className="rounded-sm border my-10 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">Add Meal Plans</h3>
                                        </div>
                                        <div className="flex flex-col gap-5.5 pt-2 pb-5 px-6.5">
                                            <div className="relative z-20 mt-4 pb-2 bg-white dark:bg-form-input">
                                            <div>
                                                <label htmlFor="stateDropdown" className="mb-3 block text-black dark:text-white">
                                                Meal Plan
                                                </label>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                    type="submit"
                                    // disabled={!isFormReady}
                                    className="inline-flex w-full mb-4 mt-5 items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                    >
                                    Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showKitchenAddedPopup && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-md">
                    <p className="text-lg font-bold mb-4">Success!</p>
                    <p>Menu Updated successfully!</p>
                    <button
                    onClick={() => {
                        setKitchenAddedShowPopup(false);
                    }}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                    Close
                    </button>
                </div>
                </div>
            )}
        </>
    )
};

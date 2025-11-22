import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { Icon } from '@chakra-ui/react';
import '../../css/kitchenpop.css';
import MenuMultiSelect from '../../components/Forms/SelectGroup/MenuMultiSelect';
import SearchBar from './SearchBar';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoIosAddCircle } from 'react-icons/io';
import { BiEdit } from "react-icons/bi";
import MenuListTable from '../../components/Tables/MenuDataTable';
import { IoArrowBackCircleSharp } from "react-icons/io5";

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

const MenuFormElements = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showKitchenAddedPopup, setKitchenAddedShowPopup] = useState(false);
  const [form, setForm] = useState(true);
  const [kitchens, setKitchens] = useState([]);
  const [selectedKitchen, setSelectedKitchen] = useState();
  const [dishes, setDishes] = useState([]);
  const [meals, setMeals] = useState([]);
  const [mealplans, setMealPlans] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const [rows, setRows] = useState([]);
  const [hideAddKitchen, setHideAddKitchen] = useState(true);
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



  
  // Handle form submission logic here
  const submitNewMenu = async (e: FormEvent<HTMLFormElement>) => {

    if (!isFormReady) {
      setShowMessage(true);
      setForm(false);
    } else {
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
    }
  };
    

  

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/kitchen`);
        setKitchens(response.data);
        
        const allData= response.data
        setSelectedKitchen(response.data.length > 0 ? 'Select the kitchen' : 'Kitchen not found');
      } catch (error) {
        console.error('Error fetching kitchens:', error);
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
    fetchDishes();
    fetchMealPlans();
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


  const formDataLength = dishesMealsformData.length;
  const isFormReady =
  formDataLength > 1 &&
  selectedKitchen !== "Select the kitchen" &&
  selectedKitchen !== "Kitchen not found" &&
  selectedKitchen.length > 0

  const handleEditForm = (SetForm: boolean) => {
    setHideAddKitchen(SetForm)
  }


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Menu" pageTitle="Menu" />
      {form ? (
        <>
          {hideAddKitchen && (
            <div className="pb-5">
              <div className="flex justify-end p-3 mb-1 container bg-white rounded-lg">
                <div className="button flex items-center">
                  <button
                    type="button"
                    onClick={() => setForm(false)}
                    className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Icon as={IoIosAddCircle} width="23px" height="23px" color="inherit" />
                      <span>Add Menu</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
          <MenuListTable handleEditForm={handleEditForm} />
        </>
      ) : (
        <div>
          <div className="flex justify-between text-lg p-3 mb-1 container bg-white rounded-lg">
            <div>
              <h1 className="font-semibold text-slate-950 dark:text-white p-2">Fill Menu Details</h1>
            </div>
            <div className="button flex item-center justify-center items-center">
              <button
                type="button"
                onClick={() => setForm(true)}
                className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon as={IoArrowBackCircleSharp} width="23px" height="23px" color="inherit" />
                  <span>Back</span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12">
            <div className="mb-4 lg:w-full">
              <form onSubmit={submitNewMenu}>
                <div className="flex flex-col lg:flex-row py-5 lg:justify-between lg:space-x-12">
                  <div className="mb-4 lg:w-full">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Select Kitchen</h3>
                      </div>
                      <div className="flex flex-col gap-5.5 pt-2 pb-5 px-6.5">
                        <div className="relative z-20 mt-4 pb-2 bg-white dark:bg-form-input">
                          <div>
                            <label htmlFor="stateDropdown" className="mb-3 block text-black dark:text-white">
                              Kitchen
                            </label>
                            
                            <MenuMultiSelect
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
                        <h3 className="font-semibold text-gray-900 dark:text-white">Add Dishes & Meals</h3>
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
                    {!isFormReady && (
                      <p className='text-red-500'>Please complete the form before submitting.</p>
                    )}
                    <button
                      type="submit"
                      disabled={!isFormReady}
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
      )}
      {showKitchenAddedPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Success!</p>
            <p>Menu added successfully!</p>
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
    </DefaultLayout>
  );
};

export default MenuFormElements;

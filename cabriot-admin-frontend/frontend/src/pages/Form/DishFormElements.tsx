import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import '../../css/toggle.css';
import '../../css/uploadimage.css';
import DishesDataTable from '../../components/Tables/DishesDataTable';
import { FaTimes } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";

import { Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MultiSelectDropDown from '../../components/Forms/SelectGroup/MultiSelectDropDown';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const baseUrl = "https://admindashboard-fr4p.onrender.com";


interface FormData {
  dish_name: string;
  dish_image: File | null;
  dish_description: string;
  dish_base_price: string;
  dish_weight: string;
  dish_availability_status: "available" | "unavailable";
  dish_calories: string;
  dish_protein: string;
  dish_carbohydrates: string;
  dish_fat: string;
  dish_fiber: string;
  dietary_choices: number[];
  cuisine_choices: number[];
  meal_choices: number[];
}

type FileState = File | null;



const DishFormElements = () => {
  const [form, setForm] = useState(true);
  const [dietary, setDietary] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [meal, setMeal] = useState([]);
  const [dietaryData, setDietaryData] = useState([]);
  const [cuisineData, setCuisineData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [ExistingCuisineNames, setExistingCuisineNames] = useState([]);
  const [ExistingMealNames, setExistingMealNames] = useState([]);
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [hideAddKitchen, setHideAddKitchen] = useState(true);


  const [formData, setFormData] = useState<FormData>({
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
  const [showKitchenUpdatedPopup, setKitchenUpdateShowPopup] = useState(false);
  const [showErrorPopup, setshowErrorPopup] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dietaryChoicesResponse = await axios.get(`${baseUrl}/api/dietary`);
        const cuisineChoicesResponse = await axios.get(`${baseUrl}/api/cusisine`);
        const mealChoicesResponse = await axios.get(`${baseUrl}/api/mealchioce`);

        setDietary(dietaryChoicesResponse.data);
        const cuisines = cuisineChoicesResponse.data.map(cuisine => cuisine.name);
        setCuisineData(cuisines);
        setMeal(mealChoicesResponse.data.map(meal => meal.name));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
  }, [dietary, cuisine, meal]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,

      [name]: value
    });
  };


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
    const duplicateIndices = cuisineData
        .map((value, index) => (cities.includes(value) ? index+1 : -1))
        .filter(index => index !== -1);
      setFormData(prevData => ({
      ...prevData,
      cuisine_choices: duplicateIndices, 
    }));
  };


  const handleMealChange = (meals: string[]) => {
    const duplicateIndices = meal
        .map((value, index) => (meals.includes(value) ? index+1 : -1))
        .filter(index => index !== -1);
      setFormData(prevData => ({
      ...prevData,
      meal_choices: duplicateIndices, 
    }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      dish_image: file, // Store the file object
    });
  };


  useEffect(() => {
    setCuisineData(['North Indian', 'South Indian', 'Chinese']);
  }, []);

  useEffect(() => {
    setMealData(['Lunch', 'Dinner', 'BreakFast']);
  }, []);


  const handleSelect = (e, type) => {
    const selectedOption = e.target.value;
    if (selectedOption && !formData[type].includes(selectedOption)) {
      setFormData({
        ...formData,
        [type]: [...formData[type], selectedOption],
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


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0] )
    }
  };

  
  const submitDishesInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const imgData = new FormData();
      imgData.append('file', selectedFile);
      imgData.append('upload_preset', 'cabriot');
      imgData.append('cloud_name', 'djmhrkv5t');
  
      const response = await fetch("https://api.cloudinary.com/v1_1/djmhrkv5t/image/upload", {
        method: "POST",
        body: imgData
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }
  
      const data = await response.json();
      // console.log("Image upload Data", data.url);
  
      const dataToSend = {
        ...formData,
        DishImgUrl: data.url,
      };
  
      // console.log("Data to send", dataToSend);
  
      const res = await axios.post(`${baseUrl}/api/dishinfo`, dataToSend);
        
      setForm(true);
      setKitchenUpdateShowPopup(true);
  
    } catch (error) {
      console.error('Error adding kitchen:', error);
      // Handle errors appropriately
    }
  }

  const handleEditForm = (SetForm: boolean) => {
    setHideAddKitchen(SetForm)
  }
  


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dish" pageTitle="Dish" />
      {form ? (
        <>
          {hideAddKitchen &&(
            <div className="pb-5">
              <div className="flex justify-end p-3 container bg-white rounded-lg">
                <div className="button flex items-center">

                  <button
                    type="button"
                    onClick={() => setForm(false)}
                    className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                  >
                    <Icon as={IoIosAddCircle} width="23px" height="23px" color="inherit" />
                    <span>Add Dish</span>
                  </button>
                </div>

              </div>
            </div>
          )}
          <DishesDataTable handleEditForm={handleEditForm} />
        </>
      ) : (
        <>
          <div>
            <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
              <div>
                <h1 className="font-semibold text-slate-950 dark:text-white p-2">Fill Dish Details</h1>
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
                <form onSubmit={submitDishesInfo} enctype="multipart/form-data">
                  <div className="rounded-sm mt-t mb-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        General Information
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div className="">
                        <label className="mb-3 block text-black dark:text-white min-w-max pt-3">
                          Image
                        </label>
                        <input
                          type="file"
                          name="dish_image"
                          onChange={handleImageChange}
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
                          value={formData.dish_name}
                          onChange={handleChange}
                          required
                          placeholder="Name"
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
                          placeholder="Write description here..."
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
                          name="dish_base_price"
                          value={formData.dish_base_price}
                          onChange={handleChange}
                          required
                          placeholder="Base Price"
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

                  <div className="rounded-sm mt-t mb-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Category
                      </h3>
                    </div>



                    <div className="flex flex-col gap-5.5 p-6.5">
                      <label className=" block text-black dark:text-white pt-2 min-w-max">
                        Dietary Type
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          required
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
                          selectedCities={ExistingCuisineNames}
                          options={cuisineData} // Pass cuisine data to the options prop
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

                  <div className="rounded-sm mt-5 mb-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Nutrition Information
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
                          placeholder="Dish Calories"
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
                          placeholder="Dish Protein"
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
                          placeholder="Dish Carbohydrates"
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
                          placeholder="Dish Fat"
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
                          placeholder="Dish Fiber"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-5 inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Submit
                  </button>

                </form>
              </div>
            </div>
          </div>
        </>

      )}
      {showKitchenUpdatedPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Success!</p>
            <p>Dish Add successfully!</p>
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
            <p>Dish Add Faild!</p>
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
    </DefaultLayout >
  );
};

export default DishFormElements;

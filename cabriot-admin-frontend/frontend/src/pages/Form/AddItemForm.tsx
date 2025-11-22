import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import '../../css/toggle.css';
import '../../css/uploadimage.css';
import DishList from '../../components/Tables/DishesDataTable';
import { FaTimes } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";

import { Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const DishForm = () => {

  const [form, setForm] = useState(true);
  const [dietary, setDietary] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [meal, setMeal] = useState([]);

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
  const [showKitchenUpdatedPopup, setKitchenUpdateShowPopup] = useState(false);
  const [showErrorPopup, setshowErrorPopup] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const dietaryChoicesResponse = await axios.get('https://admindashboard-fr4p.onrender.com/api/dietary');
        const cuisineChoicesResponse = await axios.get('https://admindashboard-fr4p.onrender.com/api/cusisine');
        const mealChoicesResponse = await axios.get('https://admindashboard-fr4p.onrender.com/api/mealchioce');

        setDietary(dietaryChoicesResponse.data);
        setCuisine(cuisineChoicesResponse.data);
        setMeal(mealChoicesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error case here
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(dietary);
    console.log(cuisine);
    console.log(meal);
  }, [dietary, cuisine, meal]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowErrorPopup(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [showErrorPopup]);



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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://admindashboard-fr4p.onrender.com/api/dishinfo`, formData);

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
      setshowErrorPopup(true)
    } catch (error) {
      console.error('Error updating dish:', error);
      setshowErrorPopup(true)


    }
    console.log(formData)
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


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dish" pageTitle="Dish" />
      {form ? (
        <>
          <div className="pb-5">
            <div className="flex justify-end p-3 container bg-white rounded-lg">
              {/* <h2 className="text-2xl font-bold pt-2 text-black align-baseline flex">
                Dish
              </h2> */}
              <div className="button flex items-center">

                <button
                  type="button"
                  onClick={() => setForm(false)}
                  className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                >
                  <Icon as={IoIosAddCircle} width="23px" height="23px" color="inherit" />
                  <span>Add Dish</span>
                </button>
              </div>

            </div>
          </div>
          <DishList />
        </>
      ) : (
        <> {showErrorPopup && (
          <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                  fill="white"
                  stroke="white"
                ></path>
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                Dish Added SuccessFuly
              </h5>
              <p className="text-base leading-relaxed text-body">
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. */}
              </p>
            </div>
          </div>
        )}
          <div className="flex justify-end text-lg cursor-auto p-2">
            <h1 onClick={() => setForm(true)} className='cursor-pointer'>Back</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="">

              {/* <form onSubmit={handleSubmit}> */}
              <div className="flex flex-col gap-9">
                {/* <!-- Input Fields --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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

                {/* <!-- Toggle switch input --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Category
                    </h3>
                  </div>


                  <div className="flex flex-col gap-5.5 p-6.5">
                    <label className="mb-3 block text-black dark:text-white pt-2 min-w-max">
                      dietary_choices
                    </label>
                    <div className="form-group">
                      <select
                        id="dietary_choices"
                        name="dietary_choices"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.dietary_choices.length > 0 ? formData.dietary_choices[0] : ""}
                        onChange={(e) => handleDietarySelect(e, "dietary_choices")}
                      >
                        <option value="">Select dietary choice</option>
                        {dietary.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </select>


                    </div>
                  </div>

                  <div className="flex flex-col gap-5.5 p-6.5">
                    <label className="mb-3 block text-black dark:text-white pt-2 min-w-max">
                      Cuisine Type
                    </label>
                    <div className="form-group">
                      <select
                        multiple
                        id="cuisine_choices"
                        name="cuisine_choices"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.cuisine_choices}
                        onChange={(e) => handleSelect(e, "cuisine_choices")}
                      >

                        <option value="1">North Indian</option>
                        <option value="2">South Indian</option>

                      </select>

                      <div>
                        <div className="">
                          <label className="mb-3 block   text-black dark:text-white pt-5 min-w-max">
                            Selected Cuisine Type
                          </label>
                          {formData.cuisine_choices.map((cuisine, index) => (
                            <span key={index} className=" border-2 inline-flex items-center px-3 py-1 rounded-lg bg-gray-200 text-lg text-gray-800 dark:text-gray-200">
                              {cuisine == 1 ? "North Indian" : "South Indian"}
                              <FaTimes
                                onClick={() => handleRemove(index, "cuisine_choices")}
                                className="ml-2 cursor-pointer text-gray-600 hover:text-red-600"
                              />
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5.5 p-6.5">
                    <label className="mb-3 block text-black dark:text-white pt-5 min-w-max">
                      Meal Type
                    </label>
                    <div className="form-group">

                      <select
                        multiple
                        id="meal_choices"
                        name="meal_choices"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.meal_choices}
                        onChange={(e) => handleSelect(e, "meal_choices")}
                      >
                        <option value="1">Breakfast</option>
                        <option value="2">Lunch</option>

                      </select>

                      <div className="">
                        <label className="mb-3 block   text-black dark:text-white pt-5 min-w-max">
                          Selected Meal Type
                        </label>
                        <div>
                          {formData.meal_choices.map((meal, index) => (
                            <span key={index} className="border-2 inline-flex items-center px-3 py-1 rounded-lg text-lg text-gray-800 dark:text-gray-200">
                              {meal}
                              <FaTimes
                                onClick={() => handleRemove(index, "meal_choices")}
                                className="ml-2 text-gray-600 hover:text-red-600 focus:outline-none"
                              />
                            </span>
                          ))}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-9">
                  {/* <!-- Textarea Fields --> */}
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                          placeholder="dish_calories"
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
                          placeholder="dish_protein"
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
                          placeholder="dish_carbohydrates"
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
                          placeholder="dish_fat"
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
                          placeholder="dish_fiber"
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

      )
      }



    </DefaultLayout >
  );
};

export default DishForm;

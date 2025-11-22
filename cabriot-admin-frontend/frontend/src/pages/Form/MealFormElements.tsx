import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import '../../css/toggle.css';
import '../../css/uploadimage.css';
import { IoIosAddCircle } from "react-icons/io";
import { Icon } from '@chakra-ui/react';
import MealDataTable from '../../components/Tables/MealDataTable';
import MultiSelectDropDown from '../../components/Forms/SelectGroup/MultiSelectDropDown';
import {Cloudinary} from "@cloudinary/url-gen";
import MealSearchBar from '../../components/SearchBar/MealSearchBar';
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const baseUrl = "https://admindashboard-fr4p.onrender.com";
const cld = new Cloudinary({cloud: {cloudName: 'djmhrkv5t'}});


interface DishesMealsFormData {
  id: number;
  dish_name: string;
  meal_qty: number;
  selected_dishes: number;
}

type FileState = File | null;


const MealFormElements = () => {
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
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [hideAddKitchen, setHideAddKitchen] = useState(true);
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

        const allDishesData = dishinfo.data.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));

        setDietary(dietaryChoicesResponse.data);

        setCuisine(cuisineChoicesResponse.data);
        const CuisineList = cuisineChoicesResponse.data.map(item => item.name);
        setCuisineData(CuisineList)

        setMeal(mealChoicesResponse.data);
        const MealList = mealChoicesResponse.data.map(item => item.name);
        setMealData(MealList);

        setSelectedDishes(allDishesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);




  const handleQuantityChange = (dishId, quantity) => {
    setDishQuantities((prevQuantities) => ({
      ...prevQuantities,
      [dishId]: quantity,
    }));
  };

  const handleMenuItemChange = (e, index) => {
    const { value } = e.target;
    const updatedItems = [...menuItems];
    updatedItems[index].name = value;
    setMenuItems(updatedItems);
  };

  const handleAddDish = (dish) => {
    const { dish_id } = dish;
    const updatedFormData = {
      ...formData,
      selected_dishes: [...formData.selected_dishes, dish_id]
    };
    setFormData(updatedFormData);
    setAddedDishes([...addedDishes, dish]);
    setSearchTerm('');
  };

  const handleRemoveDish = (index) => {
    const dishToRemove = addedDishes[index];
    const updatedDishQuantities = { ...dishQuantities };
    delete updatedDishQuantities[dishToRemove.dish_id];
    setDishQuantities(updatedDishQuantities);
    setAddedDishes(addedDishes.filter((_, i) => i !== index));
  };

  const handleSearchChange = (index, value) => {
    const updatedSearchTerms = [...searchTerms];
    updatedSearchTerms[index] = value;
    setSearchTerms(updatedSearchTerms);
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
    const finalList = formData.selected_dishes.map((dish, index) => [dish, formData.meal_qty[index]]);
    formData.meal_qty = finalList;

    // console.log("Submit Form Data", formData);

    try {
      const res = await axios.post(`${baseUrl}/api/mealinfo`, formData);
      // console.log("Response ", res);
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
      setKitchenUpdateShowPopup(true)
      // console.log(formData);
    } catch (error) {
      console.error("Error adding meal information:", error);
      // console.log(formData);
      setshowErrorPopup(true);
    }
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
    const duplicateIndices = mealData
        .map((value, index) => (meals.includes(value) ? index+1 : -1))
        .filter(index => index !== -1);
      setFormData(prevData => ({
      ...prevData,
      meal_choices: duplicateIndices, 
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const submitMealsInfo = async (e: FormEvent<HTMLFormElement>) => {
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


      const finalList = formData.selected_dishes.map((dish, index) => [dish, formData.meal_qty[index]]);
      formData.meal_qty = finalList;
  
      const dataToSend = {
        ...formData,
        MealImgUrl: data.url,        
      };

  
      const res = await axios.post(`${baseUrl}/api/mealinfo`, dataToSend);
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
        
      setForm(true);
      setAddedDishes([]);
      setDishQuantities({});
      setSearchTerm('');
      setKitchenUpdateShowPopup(true)
  
    } catch (error) {
      console.error('Error adding kitchen:', error);
      setshowErrorPopup(true);
      // Handle errors appropriately
    }
  };
  

  const handleSearchbarChange = (
    dish_name: string,
    meal_qty: number[],
    selected_dishes: number[],
  ) => {
    // console.log(dish_name, meal_qty, selected_dishes);
    setFormData(prevData => ({
      ...prevData,
      selected_dishes: [...prevData.selected_dishes, ...selected_dishes],
      meal_qty: [...prevData.meal_qty, ...meal_qty],
      
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


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0] )
    }
  };


  const handleDeleteRow = (idToRemove) => {
    // console.log("ID to remove", idToRemove);
    setDishesMealsFormData((prevData) =>
      prevData.filter((data) => data.id !== idToRemove)
    );
    setRows((prevRows) => prevRows.filter((row) => row.id !== idToRemove));
  };

  const handleEditForm = (SetForm: boolean) => {
    setHideAddKitchen(SetForm)
  }


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Meal" pageTitle="Meal" />
      {form ? (
        <>
          { hideAddKitchen && (
            <div className="pb-5">
              <div className="flex justify-end p-3 container bg-white rounded-lg">
                <div className="button flex items-center">
                  <button
                    type="button"
                    onClick={() => setForm(false)}
                    className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                  >
                    <Icon as={IoIosAddCircle} width="23px" height="23px" color="inherit" />
                    <span>Add Meal</span>
                  </button>
                </div>

              </div>
            </div>
          )}
          <MealDataTable handleEditForm={handleEditForm} />
        </>
      ) : (
        <>
          <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
            <div>
              <h1 className="font-semibold text-slate-950 dark:text-white p-2">Fill Meal Details</h1>
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
          <form onSubmit={submitMealsInfo}>
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
                        name="meal_image"
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
                        name="meal_name"
                        required
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

                {/* <!-- Toggle switch input --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                        // value={formData.dietary_choices.length > 0 ? formData.dietary_choices[0] : ""}
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
                        // selectedCities={selectedCities}
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
                        options={mealData} // Pass cuisine data to the options prop
                        // selectedCities={}
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
                        Add Dishes
                      </h3>
                    </div>
                    <MealSearchBar handleSearchbarChange={handleSearchbarChange} dishNames={selectedDishes} />
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
                                <tr key={index}>
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
            <p>Meal Added successfully!</p>
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
            <p>Meal Adding Faild!</p>
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

export default MealFormElements;

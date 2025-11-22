import { useState, useEffect } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { Icon } from '@chakra-ui/react';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import EditMealPlan from "../../Forms/EditMealPlan";


const baseUrl = "https://admindashboard-fr4p.onrender.com";


interface EditFormProps {
    handleEditForm: (SetForm:boolean)=>void;
}

const MealPlanDataTable: React.FC<EditFormProps> = ({handleEditForm}) => {
    const [dishes, setDishes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showMeal, SetshowMeal] = useState(false)
    const [ID, SetID] = useState("")
    const [show, Setshow] = useState(false)
    const [mealData, setMealData] = useState({});
    const [cuisineData, setCuisineData] = useState({});
    const [DishData, setDishData] = useState({});
    const [Deletpopup, setDeletpopup] = useState(false);

    useEffect(() => {
        fetchDishes();
        fetchCuisineData();
        fetchMealsData();
        fetchDishData();
    }, []);


    const fetchDishes = async () => {
        try {
            // console.log('Fetching start..');
            const response = await axios.get(`${baseUrl}/api/mealplan`);
            const data = response.data;
            // console.log('MealPlan Data:', data);
            setDishes(data);

        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    };

    const fetchCuisineData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/cusisine`);
            const data = response.data;
            const cuisineObj = {};
            data.forEach(cuisine => {
                cuisineObj[cuisine.id] = cuisine.name;
            });
            setCuisineData(cuisineObj);
            // console.log('Cuisine data:', cuisineObj);

        } catch (error) {
            console.error('Error fetching cuisine data:', error);
        }
    };
    const fetchDishData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/mealplan`);
            const data = response.data;
            // console.log('Dish data:', data);
            const DishObj = {};
            data.forEach(dish => {
                DishObj[dish.dish_id] = dish.dish_name;
            });
            setDishData(DishObj);
        } catch (error) {
            console.error('Error fetching dish data:', error);
        }
    };

    const fetchMealsData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/mealchioce`);
            const data = response.data;
            const mealObj = {};
            data.forEach(meal => {
                mealObj[meal.id] = meal.name;
            });
            setMealData(mealObj);
        } catch (error) {
            console.error('Error fetching meal data:', error);
        }
    };



    // Logic to calculate the index of the last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    // Logic to calculate the index of the first item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Slice the array of dishes to display only the items for the current page
    const currentDishes = dishes.slice(indexOfFirstItem, indexOfLastItem);
    // console.log('Current Dishes:', currentDishes);

    // Conditionally render the paginator
    const showPaginator = dishes.length > itemsPerPage;

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDelete = async (id) => {
        try {
            // console.log('Deleting meal:', id);
            await axios.delete(`${baseUrl}/api/mealplan/${id}`);
            fetchDishes();
            fetchDishData();
            setDeletpopup(true)
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setDeletpopup(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [Deletpopup]);


    const handleEditFormChild = async () => {
        handleEditForm(false);
    };
    const handleEditHideFormChild = async () => {
        handleEditForm(true);
    };




    return (
        <>
            {Deletpopup && (

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
                            Meal-Plan Deleted Successfully
                        </h5>
                    </div>
                </div>
            )}
            {!show && <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Meal Plan Name
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Price
                                </th>
                                
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Dietary Type
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Cuisine Type
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Status
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>{currentDishes.map((packageItem, key) => (

                            <tr className="border-b border-[#eee] dark:border-strokedark" key={key}>
                                <td className="border-[#eee] py-5 px-4 pt-6 dark:border-strokedark flex items-center">
                                    <img src={packageItem.MealPlanImgUrl} className="h-12 w-12 mr-2 rounded-full" alt="User" />
                                    <span>{packageItem.meal_plan_name}</span>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                                    {parseFloat(packageItem.daily_price).toFixed(2)}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {packageItem.dietary_choices.map((dietary, index) => (
                                        <span key={index} className="inline-flex rounded-full bg-opacity-10 py-1 px-3 mt-1 text-sm font-medium bg-primary text-primary">
                                            {dietary.name}
                                        </span>
                                    ))}
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    {packageItem.cuisine_choices.map((cuisine, index) => (
                                        <span key={index} className="inline-flex rounded-full bg-opacity-10 py-1 px-3 mt-1 text-sm font-medium bg-primary text-primary">
                                            {cuisine.name}
                                        </span>
                                    ))}
                                </td>
                                
                            
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full capitalize bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.meal_plan_availability_status === 'available'
                                            ? 'bg-success text-success'
                                            : 'bg-danger text-danger' 
                                            }`}
                                    >
                                        {packageItem.meal_plan_availability_status}
                                    </p>

                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button
                                            className="hover:text-primary"
                                           // onClick={() => {handleEditFormChild(packageItem.meal_id)}} 
                                           onClick={
                                            () => {
                                                Setshow(true);
                                                SetID(packageItem.meal_plan_id);
                                                handleEditFormChild();
                                            }
                                          }
                                        >
                                            <Icon as={BiEdit} width="20px" height="20px" />
                                        </button>
                                        <button className="hover:text-primary" onClick={() => handleDelete(packageItem.meal_plan_id)}>
                                            <svg
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                    fill=""
                                                />
                                                <path
                                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                    fill=""
                                                />
                                            </svg>
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
                {showPaginator &&
                    <nav aria-label="Page navigation example">
                        <ul className="flex items-center -space-x-px h-8 text-sm">
                            {Array.from({ length: Math.ceil(dishes.length / itemsPerPage) }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${currentPage === index + 1 ? 'bg-blue-50 text-blue-600 border-blue-300' : 'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>}
            </div>
            }
            {show && 
                <>
                    <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
                        <div>
                        <h1 className="font-semibold text-slate-950 dark:text-white p-2">Update Meal Plan Details</h1>
                        </div>
                        <div className="button flex item-center justify-center items-center">
                        <button
                            type="button"
                            onClick={() => { Setshow(false); fetchDishes(); handleEditHideFormChild();}}
                            className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                        >
                            <div className="flex items-center justify-center gap-2">
                            <Icon as={IoArrowBackCircleSharp} width="23px" height="23px" color="inherit" />
                            <span>Back</span>
                            </div>
                        </button>
                        </div>
                    </div>

                    <EditMealPlan ID={ID} />
                </>  
            }
        </>
    );
};

export default MealPlanDataTable;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import MealPlanMenuDaysCheckbox from '../components/Checkboxes/MealPlanMenuDaysCheckbox';
import MealPlanMenusDishesMultiSelect from '../components/Forms/SelectGroup/MealPlanMenusDishesMultiSelect';
import MealPlanPriceCheckbox from '../components/Checkboxes/MealPlanPriceCheckbox';
import MultiSelectDropDown from '../components/Forms/SelectGroup/MultiSelectDropDown';
import MealPlanPricingCheckBox from '../components/Checkboxes/MealPlanPricingCkeckBox';
import EditMealPlanMenusDishesMultiSelect from '../components/Forms/SelectGroup/EditMealPlanMenusDishesMultiSelect'


const baseUrl = "https://admindashboard-fr4p.onrender.com";



interface fileid {
    ID: string
}

type FileState = File | null;


export default function EditMealPlan({ ID }: fileid) {

  const [form, setForm] = useState(true);
  const [dietary, setDietary] = useState([]);
  const [cuisineData, setCuisineData] = useState([]);
  const [showKitchenUpdatedPopup, setKitchenUpdateShowPopup] = useState(false);
  const [showErrorPopup, setshowErrorPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [hideAddKitchen, setHideAddKitchen] = useState(true);
  const [ExistingCuisineNames, setExistingCuisineNames] = useState([]);
  const [allMealData, setAllMealData] = useState([]);
  const [allDishesData, setAllDishesData] = useState([]);

  const [mondayBreakfastDish, setMondayBreakfastDish] = useState([]);
  const [mondayBreakfastMeal, setMondayBreakfastMeal] = useState([]);
  const [monday_breakfast_dish_option, setMonday_breakfast_dish_option] = useState([]);
  const [monday_breakfast_meal_option, setMonday_breakfast_meal_option] = useState([]);
  const [mondayLunchDish, setMondayLunchDish] = useState([]);
  const [mondayLunchMeal, setMondayLunchMeal] = useState([]);
  const [monday_lunch_dish_option, setMonday_lunch_dish_option] = useState([]);
  const [monday_lunch_meal_option, setMonday_lunch_meal_option] = useState([]);
  const [mondayDinnerDish, setMondayDinnerDish] = useState([]);
  const [mondayDinnerMeal, setMondayDinnerMeal] = useState([]);
  const [monday_dinner_dish_option, setMonday_dinner_dish_option] = useState([]);
  const [monday_dinner_meal_option, setMonday_dinner_meal_option] = useState([]);

  const [tuesdayBreakfastDish, setTuesdayBreakfastDish] = useState([]);
  const [tuesdayBreakfastMeal, setTuesdayBreakfastMeal] = useState([]);
  const [tuesday_breakfast_dish_option, setTuesday_breakfast_dish_option] = useState([]);
  const [tuesday_breakfast_meal_option, setTuesday_breakfast_meal_option] = useState([]);
  const [tuesdayLunchDish, setTuesdayLunchDish] = useState([]);
  const [tuesdayLunchMeal, setTuesdayLunchMeal] = useState([]);
  const [tuesday_lunch_dish_option, setTuesday_lunch_dish_option] = useState([]);
  const [tuesday_lunch_meal_option, setTuesday_lunch_meal_option] = useState([]);
  const [tuesdayDinnerDish, setTuesdayDinnerDish] = useState([]);
  const [tuesdayDinnerMeal, setTuesdayDinnerMeal] = useState([]);
  const [tuesday_dinner_dish_option, setTuesday_dinner_dish_option] = useState([]);
  const [tuesday_dinner_meal_option, setTuesday_dinner_meal_option] = useState([]);

  const [wednesdayBreakfastDish, setWednesdayBreakfastDish] = useState([]);
  const [wednesdayBreakfastMeal, setWednesdayBreakfastMeal] = useState([]);
  const [wednesday_breakfast_dish_option, setWednesday_breakfast_dish_option] = useState([]);
  const [wednesday_breakfast_meal_option, setWednesday_breakfast_meal_option] = useState([]);
  const [wednesdayLunchDish, setWednesdayLunchDish] = useState([]);
  const [wednesdayLunchMeal, setWednesdayLunchMeal] = useState([]);
  const [wednesday_lunch_dish_option, setWednesday_lunch_dish_option] = useState([]);
  const [wednesday_lunch_meal_option, setWednesday_lunch_meal_option] = useState([]);
  const [wednesdayDinnerDish, setWednesdayDinnerDish] = useState([]);
  const [wednesdayDinnerMeal, setWednesdayDinnerMeal] = useState([]);
  const [wednesday_dinner_dish_option, setWednesday_dinner_dish_option] = useState([]);
  const [wednesday_dinner_meal_option, setWednesday_dinner_meal_option] = useState([]);

  const [thursdayBreakfastDish, setThursdayBreakfastDish] = useState([]);
  const [thursdayBreakfastMeal, setThursdayBreakfastMeal] = useState([]);
  const [thursday_breakfast_dish_option, setThursday_breakfast_dish_option] = useState([]);
  const [thursday_breakfast_meal_option, setThursday_breakfast_meal_option] = useState([]);
  const [thursdayLunchDish, setThursdayLunchDish] = useState([]);
  const [thursdayLunchMeal, setThursdayLunchMeal] = useState([]);
  const [thursday_lunch_dish_option, setThursday_lunch_dish_option] = useState([]);
  const [thursday_lunch_meal_option, setThursday_lunch_meal_option] = useState([]);
  const [thursdayDinnerDish, setThursdayDinnerDish] = useState([]);
  const [thursdayDinnerMeal, setThursdayDinnerMeal] = useState([]);
  const [thursday_dinner_dish_option, setThursday_dinner_dish_option] = useState([]);
  const [thursday_dinner_meal_option, setThursday_dinner_meal_option] = useState([]);

  const [fridayBreakfastDish, setFridayBreakfastDish] = useState([]);
  const [fridayBreakfastMeal, setFridayBreakfastMeal] = useState([]);
  const [friday_breakfast_dish_option, setFriday_breakfast_dish_option] = useState([]);
  const [friday_breakfast_meal_option, setFriday_breakfast_meal_option] = useState([]);
  const [fridayLunchDish, setFridayLunchDish] = useState([]);
  const [fridayLunchMeal, setFridayLunchMeal] = useState([]);
  const [friday_lunch_dish_option, setFriday_lunch_dish_option] = useState([]);
  const [friday_lunch_meal_option, setFriday_lunch_meal_option] = useState([]);
  const [fridayDinnerDish, setFridayDinnerDish] = useState([]);
  const [fridayDinnerMeal, setFridayDinnerMeal] = useState([]);
  const [friday_dinner_dish_option, setFriday_dinner_dish_option] = useState([]);
  const [friday_dinner_meal_option, setFriday_dinner_meal_option] = useState([]);

  const [saturdayBreakfastDish, setSaturdayBreakfastDish] = useState([]);
  const [saturdayBreakfastMeal, setSaturdayBreakfastMeal] = useState([]);
  const [saturday_breakfast_dish_option, setSaturday_breakfast_dish_option] = useState([]);
  const [saturday_breakfast_meal_option, setSaturday_breakfast_meal_option] = useState([]);
  const [saturdayLunchDish, setSaturdayLunchDish] = useState([]);
  const [saturdayLunchMeal, setSaturdayLunchMeal] = useState([]);
  const [saturday_lunch_dish_option, setSaturday_lunch_dish_option] = useState([]);
  const [saturday_lunch_meal_option, setSaturday_lunch_meal_option] = useState([]);
  const [saturdayDinnerDish, setSaturdayDinnerDish] = useState([]);
  const [saturdayDinnerMeal, setSaturdayDinnerMeal] = useState([]);
  const [saturday_dinner_dish_option, setSaturday_dinner_dish_option] = useState([]);
  const [saturday_dinner_meal_option, setSaturday_dinner_meal_option] = useState([]);

  const [sundayBreakfastDish, setSundayBreakfastDish] = useState([]);
  const [sundayBreakfastMeal, setSundayBreakfastMeal] = useState([]);
  const [sunday_breakfast_dish_option, setSunday_breakfast_dish_option] = useState([]);
  const [sunday_breakfast_meal_option, setSunday_breakfast_meal_option] = useState([]);
  const [sundayLunchDish, setSundayLunchDish] = useState([]);
  const [sundayLunchMeal, setSundayLunchMeal] = useState([]);
  const [sunday_lunch_dish_option, setSunday_lunch_dish_option] = useState([]);
  const [sunday_lunch_meal_option, setSunday_lunch_meal_option] = useState([]);
  const [sundayDinnerDish, setSundayDinnerDish] = useState([]);
  const [sundayDinnerMeal, setSundayDinnerMeal] = useState([]);
  const [sunday_dinner_dish_option, setSunday_dinner_dish_option] = useState([]);
  const [sunday_dinner_meal_option, setSunday_dinner_meal_option] = useState([]);

  

  const [daily_price, Set_daily_price] = useState(false);
  const [daily_breakfast_price, Set_daily_breakfast_price] = useState(false);
  const [daily_lunch_price, Set_daily_lunch_price] = useState(false);
  const [daily_dinner_price, Set_daily_dinner_price] = useState(false);

  const [weekly_price, Set_weekly_price] = useState(false);
  const [weekly_breakfast_price, Set_weekly_breakfast_price] = useState(false);
  const [weekly_lunch_price, Set_weekly_lunch_price] = useState(false);
  const [weekly_dinner_price, Set_weekly_dinner_price] = useState(false);

  const [monthly_price, Set_monthly_price] = useState(false);
  const [monthly_breakfast_price, Set_monthly_breakfast_price] = useState(false);
  const [monthly_lunch_price, Set_monthly_lunch_price] = useState(false);
  const [monthly_dinner_price, Set_monthly_dinner_price] = useState(false);

  const [is_friday_available, Set_is_friday_available] = useState(false);
  const [is_monday_available, Set_is_monday_available] = useState(false);
  const [is_saturday_available, Set_is_saturday_available] = useState(false);
  const [is_sunday_available, Set_is_sunday_available] = useState(false);
  const [is_thursday_available, Set_is_thursday_available] = useState(false);
  const [is_tuesday_available, Set_is_tuesday_available] = useState(false);
  const [is_wednesday_available, Set_is_wednesday_available] = useState(false);

  const [monday_breakfast_dish, Set_monday_breakfast_dish] = useState(false);
  const [monday_breakfast_meal, Set_monday_breakfast_meal] = useState(false);
  const [monday_lunch_dish, Set_monday_lunch_dish] = useState(false);
  const [monday_lunch_meal, Set_monday_lunch_meal] = useState(false);
  const [monday_dinner_dish, Set_monday_dinner_dish] = useState(false);
  const [monday_dinner_meal, Set_monday_dinner_meal] = useState(false);

  const [tuesday_breakfast_dish, Set_tuesday_breakfast_dish] = useState(false);
  const [tuesday_breakfast_meal, Set_tuesday_breakfast_meal] = useState(false);
  const [tuesday_lunch_dish, Set_tuesday_lunch_dish] = useState(false);
  const [tuesday_lunch_meal, Set_tuesday_lunch_meal] = useState(false);
  const [tuesday_dinner_dish, Set_tuesday_dinner_dish] = useState(false);
  const [tuesday_dinner_meal, Set_tuesday_dinner_meal] = useState(false);

  const [wednesday_breakfast_dish, Set_wednesday_breakfast_dish] = useState(false);
  const [wednesday_breakfast_meal, Set_wednesday_breakfast_meal] = useState(false);
  const [wednesday_lunch_dish, Set_wednesday_lunch_dish] = useState(false);
  const [wednesday_lunch_meal, Set_wednesday_lunch_meal] = useState(false);
  const [wednesday_dinner_dish, Set_wednesday_dinner_dish] = useState(false);
  const [wednesday_dinner_meal, Set_wednesday_dinner_meal] = useState(false);

  const [thursday_breakfast_dish, Set_thursday_breakfast_dish] = useState(false);
  const [thursday_breakfast_meal, Set_thursday_breakfast_meal] = useState(false);
  const [thursday_lunch_dish, Set_thursday_lunch_dish] = useState(false);
  const [thursday_lunch_meal, Set_thursday_lunch_meal] = useState(false);
  const [thursday_dinner_dish, Set_thursday_dinner_dish] = useState(false);
  const [thursday_dinner_meal, Set_thursday_dinner_meal] = useState(false);

  const [friday_breakfast_dish, Set_friday_breakfast_dish] = useState(false);
  const [friday_breakfast_meal, Set_friday_breakfast_meal] = useState(false);
  const [friday_lunch_dish, Set_friday_lunch_dish] = useState(false);
  const [friday_lunch_meal, Set_friday_lunch_meal] = useState(false);
  const [friday_dinner_dish, Set_friday_dinner_dish] = useState(false);
  const [friday_dinner_meal, Set_friday_dinner_meal] = useState(false);

  const [saturday_breakfast_dish, Set_saturday_breakfast_dish] = useState(false);
  const [saturday_breakfast_meal, Set_saturday_breakfast_meal] = useState(false);
  const [saturday_lunch_dish, Set_saturday_lunch_dish] = useState(false);
  const [saturday_lunch_meal, Set_saturday_lunch_meal] = useState(false);
  const [saturday_dinner_dish, Set_saturday_dinner_dish] = useState(false);
  const [saturday_dinner_meal, Set_saturday_dinner_meal] = useState(false);

  const [sunday_breakfast_dish, Set_sunday_breakfast_dish] = useState(false);
  const [sunday_breakfast_meal, Set_sunday_breakfast_meal] = useState(false);
  const [sunday_lunch_dish, Set_sunday_lunch_dish] = useState(false);
  const [sunday_lunch_meal, Set_sunday_lunch_meal] = useState(false);
  const [sunday_dinner_dish, Set_sunday_dinner_dish] = useState(false);
  const [sunday_dinner_meal, Set_sunday_dinner_meal] = useState(false);


  const [formData, setFormData] = useState({
    meal_plan_name: "",
    meal_plan_description: "",
    meal_plan_availability_status: "available",
    dietary_choices: [],
    cuisine_choices: [],

    daily_price: "",
    daily_breakfast_price: "",
    daily_lunch_price: "",
    daily_dinner_price: "",

    weekly_price: "",
    weekly_breakfast_price: "",
    weekly_lunch_price: "",
    weekly_dinner_price: "",

    monthly_price: "",
    monthly_breakfast_price: "",
    monthly_lunch_price: "",
    monthly_dinner_price: "",

    is_monday_available: true,
    monday_breakfast_dish: [],
    monday_breakfast_meal: [],
    monday_breakfast_dish_option:[],
    monday_breakfast_meal_option:[],
    monday_lunch_dish:[],
    monday_lunch_meal:[],
    monday_lunch_dish_option:[],
    monday_lunch_meal_option:[],
    monday_dinner_dish:[],
    monday_dinner_meal:[],
    monday_dinner_dish_option:[],
    monday_dinner_meal_option:[],

    is_tuesday_available: true,
    tuesday_breakfast_dish: [],
    tuesday_breakfast_meal: [],
    tuesday_breakfast_dish_option:[],
    tuesday_breakfast_meal_option:[],
    tuesday_lunch_dish:[],
    tuesday_lunch_meal:[],
    tuesday_lunch_dish_option:[],
    tuesday_lunch_meal_option:[],
    tuesday_dinner_dish:[],
    tuesday_dinner_meal:[],
    tuesday_dinner_dish_option:[],
    tuesday_dinner_meal_option:[],

    is_wednesday_available: true,
    wednesday_breakfast_dish: [],
    wednesday_breakfast_meal: [],
    wednesday_breakfast_dish_option:[],
    wednesday_breakfast_meal_option:[],
    wednesday_lunch_dish:[],
    wednesday_lunch_meal:[],
    wednesday_lunch_dish_option:[],
    wednesday_lunch_meal_option:[],
    wednesday_dinner_dish:[],
    wednesday_dinner_meal:[],
    wednesday_dinner_dish_option:[],
    wednesday_dinner_meal_option:[],

    is_thursday_available: true,
    thursday_breakfast_dish: [],
    thursday_breakfast_meal: [],
    thursday_breakfast_dish_option:[],
    thursday_breakfast_meal_option:[],
    thursday_lunch_dish:[],
    thursday_lunch_meal:[],
    thursday_lunch_dish_option:[],
    thursday_lunch_meal_option:[],
    thursday_dinner_dish:[],
    thursday_dinner_meal:[],
    thursday_dinner_dish_option:[],
    thursday_dinner_meal_option:[],

    is_friday_available: true,
    friday_breakfast_dish: [],
    friday_breakfast_meal: [],
    friday_breakfast_dish_option:[],
    friday_breakfast_meal_option:[],
    friday_lunch_dish:[],
    friday_lunch_meal:[],
    friday_lunch_dish_option:[],
    friday_lunch_meal_option:[],
    friday_dinner_dish:[],
    friday_dinner_meal:[],
    friday_dinner_dish_option:[],
    friday_dinner_meal_option:[],

    is_saturday_available: true,
    saturday_breakfast_dish: [],
    saturday_breakfast_meal: [],
    saturday_breakfast_dish_option:[],
    saturday_breakfast_meal_option:[],
    saturday_lunch_dish:[],
    saturday_lunch_meal:[],
    saturday_lunch_dish_option:[],
    saturday_lunch_meal_option:[],
    saturday_dinner_dish:[],
    saturday_dinner_meal:[],
    saturday_dinner_dish_option:[],
    saturday_dinner_meal_option:[],

    is_sunday_available: true,
    sunday_breakfast_dish: [],
    sunday_breakfast_meal: [],
    sunday_breakfast_dish_option:[],
    sunday_breakfast_meal_option:[],
    sunday_lunch_dish:[],
    sunday_lunch_meal:[],
    sunday_lunch_dish_option:[],
    sunday_lunch_meal_option:[],
    sunday_dinner_dish:[],
    sunday_dinner_meal:[],
    sunday_dinner_dish_option:[],
    sunday_dinner_meal_option:[],
    
  });



  useEffect(() => {
    const fetchData = async () => {
      try {

        const mealPlanData = await axios.get(`${baseUrl}/api/mealplan/${ID}`);
        console.log('fetched Form mealPlanData: ', mealPlanData.data);
        const existing_dietary_choices = mealPlanData.data
        const existingDietaryChoice = existing_dietary_choices.dietary_choices.map(dish => dish.id);

        const existingCuisineNames = mealPlanData.data.cuisine_choices.map(dish => dish.name);
        setExistingCuisineNames(existingCuisineNames);
        console.log('existind_dietary_choices', existingDietaryChoice);



        if(mealPlanData.data.daily_price !== null) Set_daily_price(true);
        if(mealPlanData.data.daily_breakfast_price !== null) Set_daily_breakfast_price(true);
        if(mealPlanData.data.daily_lunch_price !== null) Set_daily_lunch_price(true);
        if(mealPlanData.data.daily_dinner_price !== null) Set_daily_dinner_price(true);

        if(mealPlanData.data.weekly_price !== null) Set_weekly_price(true);
        if(mealPlanData.data.weekly_breakfast_price !== null) Set_weekly_breakfast_price(true);
        if(mealPlanData.data.weekly_lunch_price !== null) Set_weekly_lunch_price(true);
        if(mealPlanData.data.weekly_dinner_price !== null) Set_weekly_dinner_price(true);

        if(mealPlanData.data.monthly_price !== null) Set_monthly_price(true);
        if(mealPlanData.data.monthly_breakfast_price !== null) Set_monthly_breakfast_price(true);
        if(mealPlanData.data.monthly_lunch_price !== null) Set_monthly_lunch_price(true);
        if(mealPlanData.data.monthly_dinner_price !== null) Set_monthly_dinner_price(true);

        Set_is_monday_available(mealPlanData.data.is_monday_available);
        Set_is_tuesday_available(mealPlanData.data.is_tuesday_available);
        Set_is_wednesday_available(mealPlanData.data.is_wednesday_available);
        Set_is_thursday_available(mealPlanData.data.is_thursday_available);
        Set_is_friday_available(mealPlanData.data.is_friday_available);
        Set_is_saturday_available(mealPlanData.data.is_saturday_available);
        Set_is_sunday_available(mealPlanData.data.is_sunday_available);

        if(mealPlanData.data.monday_breakfast_dish.length > 0) Set_monday_breakfast_dish(true);
        const allFetched_monday_breakfast_dish = mealPlanData.data.monday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_monday_breakfast_dish_option = mealPlanData.data.monday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setMondayBreakfastDish(allFetched_monday_breakfast_dish);
        setMonday_breakfast_dish_option(allFetched_monday_breakfast_dish_option);

        
        if(mealPlanData.data.monday_breakfast_meal.length > 0) Set_monday_breakfast_meal(true);
        const allFetched_monday_breakfast_meal = mealPlanData.data.monday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_monday_breakfast_meal_option = mealPlanData.data.monday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setMondayBreakfastMeal(allFetched_monday_breakfast_meal);
        setMonday_breakfast_meal_option(allFetched_monday_breakfast_meal_option);

        if(mealPlanData.data.monday_lunch_dish.length > 0) Set_monday_lunch_dish(true);
        const allFetched_monday_lunch_dish = mealPlanData.data.monday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_monday_lunch_dish_option = mealPlanData.data.monday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setMondayLunchDish(allFetched_monday_lunch_dish);
        setMonday_lunch_dish_option(allFetched_monday_lunch_dish_option);

        if(mealPlanData.data.monday_lunch_meal.length > 0) Set_monday_lunch_meal(true);
        const allFetched_monday_lunch_meal = mealPlanData.data.monday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_monday_lunch_meal_option = mealPlanData.data.monday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setMondayLunchMeal(allFetched_monday_lunch_meal);
        setMonday_lunch_meal_option(allFetched_monday_lunch_meal_option);

        if(mealPlanData.data.monday_dinner_dish.length > 0) Set_monday_dinner_dish(true);
        const allFetched_monday_dinner_dish = mealPlanData.data.monday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_monday_dinner_dish_option = mealPlanData.data.monday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setMondayDinnerDish(allFetched_monday_dinner_dish);
        setMonday_dinner_dish_option(allFetched_monday_dinner_dish_option);

        if(mealPlanData.data.monday_dinner_meal.length > 0) Set_monday_dinner_meal(true);
        const allFetched_monday_dinner_meal = mealPlanData.data.monday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_monday_dinner_meal_option = mealPlanData.data.monday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setMondayDinnerMeal(allFetched_monday_dinner_meal);
        setMonday_dinner_meal_option(allFetched_monday_dinner_meal_option);


        if(mealPlanData.data.tuesday_breakfast_dish.length > 0) Set_tuesday_breakfast_dish(true);
        const allFetched_tuesday_breakfast_dish = mealPlanData.data.tuesday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_tuesday_breakfast_dish_option = mealPlanData.data.tuesday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setTuesdayBreakfastDish(allFetched_tuesday_breakfast_dish);
        setTuesday_breakfast_dish_option(allFetched_tuesday_breakfast_dish_option);

        if(mealPlanData.data.tuesday_breakfast_meal.length > 0) Set_tuesday_breakfast_meal(true);
        const allFetched_tuesday_breakfast_meal = mealPlanData.data.tuesday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_tuesday_breakfast_meal_option = mealPlanData.data.tuesday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setTuesdayBreakfastMeal(allFetched_tuesday_breakfast_meal);
        setTuesday_breakfast_meal_option(allFetched_tuesday_breakfast_meal_option);

        if(mealPlanData.data.tuesday_lunch_dish.length > 0) Set_tuesday_lunch_dish(true);
        const allFetched_tuesday_lunch_dish = mealPlanData.data.tuesday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_tuesday_lunch_dish_option = mealPlanData.data.tuesday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setTuesdayLunchDish(allFetched_tuesday_lunch_dish);
        setTuesday_lunch_dish_option(allFetched_tuesday_lunch_dish_option);

        if(mealPlanData.data.tuesday_lunch_meal.length > 0) Set_tuesday_lunch_meal(true);
        const allFetched_tuesday_lunch_meal = mealPlanData.data.tuesday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_tuesday_lunch_meal_option = mealPlanData.data.tuesday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setTuesdayLunchMeal(allFetched_tuesday_lunch_meal);
        setTuesday_lunch_meal_option(allFetched_tuesday_lunch_meal_option);

        if(mealPlanData.data.tuesday_dinner_dish.length > 0) Set_tuesday_dinner_dish(true);
        const allFetched_tuesday_dinner_dish = mealPlanData.data.tuesday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_tuesday_dinner_dish_option = mealPlanData.data.tuesday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setTuesdayDinnerDish(allFetched_tuesday_dinner_dish);
        setTuesday_dinner_dish_option(allFetched_tuesday_dinner_dish_option);

        if(mealPlanData.data.tuesday_dinner_meal.length > 0) Set_tuesday_dinner_meal(true);
        const allFetched_tuesday_dinner_meal = mealPlanData.data.tuesday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_tuesday_dinner_meal_option = mealPlanData.data.tuesday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setTuesdayDinnerMeal(allFetched_tuesday_dinner_meal);
        setTuesday_dinner_meal_option(allFetched_tuesday_dinner_meal_option);


        if(mealPlanData.data.wednesday_breakfast_dish.length > 0) Set_wednesday_breakfast_dish(true);
        const allFetched_wednesday_breakfast_dish = mealPlanData.data.wednesday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_wednesday_breakfast_dish_option = mealPlanData.data.wednesday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setWednesdayBreakfastDish(allFetched_wednesday_breakfast_dish);
        setWednesday_breakfast_dish_option(allFetched_wednesday_breakfast_dish_option);

        if(mealPlanData.data.wednesday_breakfast_meal.length > 0) Set_wednesday_breakfast_meal(true);
        const allFetched_wednesday_breakfast_meal = mealPlanData.data.wednesday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_wednesday_breakfast_meal_option = mealPlanData.data.wednesday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setWednesdayBreakfastMeal(allFetched_wednesday_breakfast_meal);
        setWednesday_breakfast_meal_option(allFetched_wednesday_breakfast_meal_option);

        if(mealPlanData.data.wednesday_lunch_dish.length > 0) Set_wednesday_lunch_dish(true);
        const allFetched_wednesday_lunch_dish = mealPlanData.data.wednesday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_wednesday_lunch_dish_option = mealPlanData.data.wednesday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setWednesdayLunchDish(allFetched_wednesday_lunch_dish);
        setWednesday_lunch_dish_option(allFetched_wednesday_lunch_dish_option);

        if(mealPlanData.data.wednesday_lunch_meal.length > 0) Set_wednesday_lunch_meal(true);
        const allFetched_wednesday_lunch_meal = mealPlanData.data.wednesday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_wednesday_lunch_meal_option = mealPlanData.data.wednesday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setWednesdayLunchMeal(allFetched_wednesday_lunch_meal);
        setWednesday_lunch_meal_option(allFetched_wednesday_lunch_meal_option);

        if(mealPlanData.data.wednesday_dinner_dish.length > 0) Set_wednesday_dinner_dish(true);
        const allFetched_wednesday_dinner_dish = mealPlanData.data.wednesday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_wednesday_dinner_dish_option = mealPlanData.data.wednesday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setWednesdayDinnerDish(allFetched_wednesday_dinner_dish);
        setWednesday_dinner_dish_option(allFetched_wednesday_dinner_dish_option);

        if(mealPlanData.data.wednesday_dinner_meal.length > 0) Set_wednesday_dinner_meal(true);
        const allFetched_wednesday_dinner_meal = mealPlanData.data.wednesday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_wednesday_dinner_meal_option = mealPlanData.data.wednesday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setWednesdayDinnerMeal(allFetched_wednesday_dinner_meal);
        setWednesday_dinner_meal_option(allFetched_wednesday_dinner_meal_option);


        if(mealPlanData.data.thursday_breakfast_dish.length > 0) Set_thursday_breakfast_dish(true);
        const allFetched_thursday_breakfast_dish = mealPlanData.data.thursday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_thursday_breakfast_dish_option = mealPlanData.data.thursday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setThursdayBreakfastDish(allFetched_thursday_breakfast_dish);
        setThursday_breakfast_dish_option(allFetched_thursday_breakfast_dish_option);


        if(mealPlanData.data.thursday_breakfast_meal.length > 0) Set_thursday_breakfast_meal(true);
        const allFetched_thursday_breakfast_meal = mealPlanData.data.thursday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_thursday_breakfast_meal_option = mealPlanData.data.thursday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setThursdayBreakfastMeal(allFetched_thursday_breakfast_meal);
        setThursday_breakfast_meal_option(allFetched_thursday_breakfast_meal_option);

        if(mealPlanData.data.thursday_lunch_dish.length > 0) Set_thursday_lunch_dish(true);
        const allFetched_thursday_lunch_dish = mealPlanData.data.thursday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_thursday_lunch_dish_option = mealPlanData.data.thursday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setThursdayLunchDish(allFetched_thursday_lunch_dish);
        setThursday_lunch_dish_option(allFetched_thursday_lunch_dish_option);

        if(mealPlanData.data.thursday_lunch_meal.length > 0) Set_thursday_lunch_meal(true);
        const allFetched_thursday_lunch_meal = mealPlanData.data.thursday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_thursday_lunch_meal_option = mealPlanData.data.thursday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setThursdayLunchMeal(allFetched_thursday_lunch_meal);
        setThursday_lunch_meal_option(allFetched_thursday_lunch_meal_option);

        if(mealPlanData.data.thursday_dinner_dish.length > 0) Set_thursday_dinner_dish(true);
        const allFetched_thursday_dinner_dish = mealPlanData.data.thursday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_thursday_dinner_dish_option = mealPlanData.data.thursday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setThursdayDinnerDish(allFetched_thursday_dinner_dish);
        setThursday_dinner_dish_option(allFetched_thursday_dinner_dish_option);

        if(mealPlanData.data.thursday_dinner_meal.length > 0) Set_thursday_dinner_meal(true);
        const allFetched_thursday_dinner_meal = mealPlanData.data.thursday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_thursday_dinner_meal_option = mealPlanData.data.thursday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setThursdayDinnerMeal(allFetched_thursday_dinner_meal);
        setThursday_dinner_meal_option(allFetched_thursday_dinner_meal_option);

        if(mealPlanData.data.friday_breakfast_dish.length > 0) Set_friday_breakfast_dish(true);
        const allFetched_friday_breakfast_dish = mealPlanData.data.friday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_friday_breakfast_dish_option = mealPlanData.data.friday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setFridayBreakfastDish(allFetched_friday_breakfast_dish);
        setFriday_breakfast_dish_option(allFetched_friday_breakfast_dish_option);

        if(mealPlanData.data.friday_breakfast_meal.length > 0) Set_friday_breakfast_meal(true);
        const allFetched_friday_breakfast_meal = mealPlanData.data.friday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_friday_breakfast_meal_option = mealPlanData.data.friday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setFridayBreakfastMeal(allFetched_friday_breakfast_meal);
        setFriday_breakfast_meal_option(allFetched_friday_breakfast_meal_option);

        if(mealPlanData.data.friday_lunch_dish.length > 0) Set_friday_lunch_dish(true);
        const allFetched_friday_lunch_dish = mealPlanData.data.friday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_friday_lunch_dish_option = mealPlanData.data.friday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setFridayLunchDish(allFetched_friday_lunch_dish);
        setFriday_lunch_dish_option(allFetched_friday_lunch_dish_option);

        if(mealPlanData.data.friday_lunch_meal.length > 0) Set_friday_lunch_meal(true);
        const allFetched_friday_lunch_meal = mealPlanData.data.friday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_friday_lunch_meal_option = mealPlanData.data.friday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setFridayLunchMeal(allFetched_friday_lunch_meal);
        setFriday_lunch_meal_option(allFetched_friday_lunch_meal_option);

        if(mealPlanData.data.friday_dinner_dish.length > 0) Set_friday_dinner_dish(true);
        const allFetched_friday_dinner_dish = mealPlanData.data.friday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_friday_dinner_dish_option = mealPlanData.data.friday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setFridayDinnerDish(allFetched_friday_dinner_dish);
        setFriday_dinner_dish_option(allFetched_friday_dinner_dish_option);

        if(mealPlanData.data.friday_dinner_meal.length > 0) Set_friday_dinner_meal(true);
        const allFetched_friday_dinner_meal = mealPlanData.data.friday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_friday_dinner_meal_option = mealPlanData.data.friday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setFridayDinnerMeal(allFetched_friday_dinner_meal);
        setFriday_dinner_meal_option(allFetched_friday_dinner_meal_option);


        if(mealPlanData.data.saturday_breakfast_dish.length > 0) Set_saturday_breakfast_dish(true);
        const allFetched_saturday_breakfast_dish = mealPlanData.data.saturday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_saturday_breakfast_dish_option = mealPlanData.data.saturday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setSaturdayBreakfastDish(allFetched_saturday_breakfast_dish);
        setSaturday_breakfast_dish_option(allFetched_saturday_breakfast_dish_option);

        if(mealPlanData.data.saturday_breakfast_meal.length > 0) Set_saturday_breakfast_meal(true);
        const allFetched_saturday_breakfast_meal = mealPlanData.data.saturday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_saturday_breakfast_meal_option = mealPlanData.data.saturday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setSaturdayBreakfastMeal(allFetched_saturday_breakfast_meal);
        setSaturday_breakfast_meal_option(allFetched_saturday_breakfast_meal_option);

        if(mealPlanData.data.saturday_lunch_dish.length > 0) Set_saturday_lunch_dish(true);
        const allFetched_saturday_lunch_dish = mealPlanData.data.saturday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_saturday_lunch_dish_option = mealPlanData.data.saturday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setSaturdayLunchDish(allFetched_saturday_lunch_dish);
        setSaturday_lunch_dish_option(allFetched_saturday_lunch_dish_option);

        if(mealPlanData.data.saturday_lunch_meal.length > 0) Set_saturday_lunch_meal(true);
        const allFetched_saturday_lunch_meal = mealPlanData.data.saturday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_saturday_lunch_meal_option = mealPlanData.data.saturday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setSaturdayLunchMeal(allFetched_saturday_lunch_meal);
        setSaturday_lunch_meal_option(allFetched_saturday_lunch_meal_option);

        if(mealPlanData.data.saturday_dinner_dish.length > 0) Set_saturday_dinner_dish(true);
        const allFetched_saturday_dinner_dish = mealPlanData.data.saturday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_saturday_dinner_dish_option = mealPlanData.data.saturday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setSaturdayDinnerDish(allFetched_saturday_dinner_dish);
        setSaturday_dinner_dish_option(allFetched_saturday_dinner_dish_option);

        if(mealPlanData.data.saturday_dinner_meal.length > 0) Set_saturday_dinner_meal(true);
        const allFetched_saturday_dinner_meal = mealPlanData.data.saturday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_saturday_dinner_meal_option = mealPlanData.data.saturday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setSaturdayDinnerMeal(allFetched_saturday_dinner_meal);
        setSaturday_dinner_meal_option(allFetched_saturday_dinner_meal_option);

        
        if(mealPlanData.data.sunday_breakfast_dish.length > 0) Set_sunday_breakfast_dish(true);
        const allFetched_sunday_breakfast_dish = mealPlanData.data.sunday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_sunday_breakfast_dish_option = mealPlanData.data.sunday_breakfast_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setSundayBreakfastDish(allFetched_sunday_breakfast_dish);
        setSunday_breakfast_dish_option(allFetched_sunday_breakfast_dish_option);

        if(mealPlanData.data.sunday_breakfast_meal.length > 0) Set_sunday_breakfast_meal(true);
        const allFetched_sunday_breakfast_meal = mealPlanData.data.sunday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_sunday_breakfast_meal_option = mealPlanData.data.sunday_breakfast_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setSundayBreakfastMeal(allFetched_sunday_breakfast_meal);
        setSunday_breakfast_meal_option(allFetched_sunday_breakfast_meal_option);

        if(mealPlanData.data.sunday_lunch_dish.length > 0) Set_sunday_lunch_dish(true);
        const allFetched_sunday_lunch_dish = mealPlanData.data.sunday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_sunday_lunch_dish_option = mealPlanData.data.sunday_lunch_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setSundayLunchDish(allFetched_sunday_lunch_dish);
        setSunday_lunch_dish_option(allFetched_sunday_lunch_dish_option);

        if(mealPlanData.data.sunday_lunch_meal.length > 0) Set_sunday_lunch_meal(true);
        const allFetched_sunday_lunch_meal = mealPlanData.data.sunday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_sunday_lunch_meal_option = mealPlanData.data.sunday_lunch_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setSundayLunchMeal(allFetched_sunday_lunch_meal);
        setSunday_lunch_meal_option(allFetched_sunday_lunch_meal_option);

        if(mealPlanData.data.sunday_dinner_dish.length > 0) Set_sunday_dinner_dish(true);
        const allFetched_sunday_dinner_dish = mealPlanData.data.sunday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allFetched_sunday_dinner_dish_option = mealPlanData.data.sunday_dinner_dish.map(dish => ({ id: dish.dish_id, name: dish.dish_name}));
        setSundayDinnerDish(allFetched_sunday_dinner_dish);
        setSunday_dinner_dish_option(allFetched_sunday_dinner_dish_option);

        if(mealPlanData.data.sunday_dinner_meal.length > 0) Set_sunday_dinner_meal(true);
        const allFetched_sunday_dinner_meal = mealPlanData.data.sunday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        const allFetched_sunday_dinner_meal_option = mealPlanData.data.sunday_dinner_meal.map(meal => ({ id: meal.meal_id, name: meal.meal_name}));
        setSundayDinnerMeal(allFetched_sunday_dinner_meal);
        setSunday_dinner_meal_option(allFetched_sunday_dinner_meal_option);



        setFormData({
          meal_plan_name: mealPlanData.data.meal_plan_name,
          meal_plan_description: mealPlanData.data.meal_plan_description,
          meal_plan_availability_status: mealPlanData.data.meal_plan_availability_status,
          dietary_choices: existingDietaryChoice,
          cuisine_choices: mealPlanData.data.cuisine_choices,
          daily_price: mealPlanData.data.daily_price,
          daily_breakfast_price: mealPlanData.data.daily_breakfast_price,
          daily_lunch_price: mealPlanData.data.daily_lunch_price,
          daily_dinner_price: mealPlanData.data.daily_dinner_price,
          weekly_price: mealPlanData.data.weekly_price,
          weekly_breakfast_price: mealPlanData.data.weekly_breakfast_price,
          weekly_lunch_price: mealPlanData.data.weekly_lunch_price,
          weekly_dinner_price: mealPlanData.data.weekly_dinner_price,
          monthly_price: mealPlanData.data.monthly_price,
          monthly_breakfast_price: mealPlanData.data.monthly_breakfast_price,
          monthly_lunch_price: mealPlanData.data.monthly_lunch_price,
          monthly_dinner_price: mealPlanData.data.monthly_dinner_price,

          is_monday_available: mealPlanData.data.is_monday_available,
          monday_breakfast_dish: mealPlanData.data.monday_breakfast_dish,
          monday_breakfast_meal: mealPlanData.data.monday_breakfast_meal,
          monday_breakfast_dish_option: mealPlanData.data.monday_breakfast_dish_option,
          monday_breakfast_meal_option: mealPlanData.data.monday_breakfast_meal_option,
          monday_lunch_dish: mealPlanData.data.monday_lunch_dish,
          monday_lunch_meal: mealPlanData.data.monday_lunch_meal,
          monday_lunch_dish_option: mealPlanData.data.monday_lunch_dish_option,
          monday_lunch_meal_option: mealPlanData.data.monday_lunch_meal_option,
          monday_dinner_dish: mealPlanData.data.monday_dinner_dish,
          monday_dinner_meal: mealPlanData.data.monday_dinner_meal,
          monday_dinner_dish_option: mealPlanData.data.monday_dinner_dish_option,
          monday_dinner_meal_option: mealPlanData.data.monday_dinner_meal_option,

          is_tuesday_available: mealPlanData.data.is_tuesday_available,
          tuesday_breakfast_dish: mealPlanData.data.tuesday_breakfast_dish,
          tuesday_breakfast_meal: mealPlanData.data.tuesday_breakfast_meal,
          tuesday_breakfast_dish_option: mealPlanData.data.tuesday_breakfast_dish_option,
          tuesday_breakfast_meal_option: mealPlanData.data.tuesday_breakfast_meal_option,
          tuesday_lunch_dish: mealPlanData.data.tuesday_lunch_dish,
          tuesday_lunch_meal: mealPlanData.data.tuesday_lunch_meal,
          tuesday_lunch_dish_option: mealPlanData.data.tuesday_lunch_dish_option,
          tuesday_lunch_meal_option: mealPlanData.data.tuesday_lunch_meal_option,
          tuesday_dinner_dish: mealPlanData.data.tuesday_dinner_dish,
          tuesday_dinner_meal: mealPlanData.data.tuesday_dinner_meal,
          tuesday_dinner_dish_option: mealPlanData.data.tuesday_dinner_dish_option,
          tuesday_dinner_meal_option: mealPlanData.data.tuesday_dinner_meal_option,

          is_wednesday_available: mealPlanData.data.is_wednesday_available,
          wednesday_breakfast_dish: mealPlanData.data.wednesday_breakfast_dish,
          wednesday_breakfast_meal: mealPlanData.data.wednesday_breakfast_meal,
          wednesday_breakfast_dish_option: mealPlanData.data.wednesday_breakfast_dish_option,
          wednesday_breakfast_meal_option: mealPlanData.data.wednesday_breakfast_meal_option,
          wednesday_lunch_dish: mealPlanData.data.wednesday_lunch_dish,
          wednesday_lunch_meal: mealPlanData.data.wednesday_lunch_meal,
          wednesday_lunch_dish_option: mealPlanData.data.wednesday_lunch_dish_option,
          wednesday_lunch_meal_option: mealPlanData.data.wednesday_lunch_meal_option,
          wednesday_dinner_dish: mealPlanData.data.wednesday_dinner_dish,
          wednesday_dinner_meal: mealPlanData.data.wednesday_dinner_meal,
          wednesday_dinner_dish_option: mealPlanData.data.wednesday_dinner_dish_option,
          wednesday_dinner_meal_option: mealPlanData.data.wednesday_dinner_meal_option,

          is_thursday_available: mealPlanData.data.is_thursday_available,
          thursday_breakfast_dish: mealPlanData.data.thursday_breakfast_dish,
          thursday_breakfast_meal: mealPlanData.data.thursday_breakfast_meal,
          thursday_breakfast_dish_option: mealPlanData.data.thursday_breakfast_dish_option,
          thursday_breakfast_meal_option: mealPlanData.data.thursday_breakfast_meal_option,
          thursday_lunch_dish: mealPlanData.data.thursday_lunch_dish,
          thursday_lunch_meal: mealPlanData.data.thursday_lunch_meal,
          thursday_lunch_dish_option: mealPlanData.data.thursday_lunch_dish_option,
          thursday_lunch_meal_option: mealPlanData.data.thursday_lunch_meal_option,
          thursday_dinner_dish: mealPlanData.data.thursday_dinner_dish,
          thursday_dinner_meal: mealPlanData.data.thursday_dinner_meal,
          thursday_dinner_dish_option: mealPlanData.data.thursday_dinner_dish_option,
          thursday_dinner_meal_option: mealPlanData.data.thursday_dinner_meal_option,
          
          is_friday_available: mealPlanData.data.is_friday_available,
          friday_breakfast_dish: mealPlanData.data.friday_breakfast_dish,
          friday_breakfast_meal: mealPlanData.data.friday_breakfast_meal,
          friday_breakfast_dish_option: mealPlanData.data.friday_breakfast_dish_option,
          friday_breakfast_meal_option: mealPlanData.data.friday_breakfast_meal_option,
          friday_lunch_dish: mealPlanData.data.friday_lunch_dish,
          friday_lunch_meal: mealPlanData.data.friday_lunch_meal,
          friday_lunch_dish_option: mealPlanData.data.friday_lunch_dish_option,
          friday_lunch_meal_option: mealPlanData.data.friday_lunch_meal_option,
          friday_dinner_dish: mealPlanData.data.friday_dinner_dish,
          friday_dinner_meal: mealPlanData.data.friday_dinner_meal,
          friday_dinner_dish_option: mealPlanData.data.friday_dinner_dish_option,
          friday_dinner_meal_option: mealPlanData.data.friday_dinner_meal_option,

          is_saturday_available: mealPlanData.data.is_saturday_available,
          saturday_breakfast_dish: mealPlanData.data.saturday_breakfast_dish,
          saturday_breakfast_meal: mealPlanData.data.saturday_breakfast_meal,
          saturday_breakfast_dish_option: mealPlanData.data.saturday_breakfast_dish_option,
          saturday_breakfast_meal_option: mealPlanData.data.saturday_breakfast_meal_option,
          saturday_lunch_dish: mealPlanData.data.saturday_lunch_dish,
          saturday_lunch_meal: mealPlanData.data.saturday_lunch_meal,
          saturday_lunch_dish_option: mealPlanData.data.saturday_lunch_dish_option,
          saturday_lunch_meal_option: mealPlanData.data.saturday_lunch_meal_option,
          saturday_dinner_dish: mealPlanData.data.saturday_dinner_dish,
          saturday_dinner_meal: mealPlanData.data.saturday_dinner_meal,
          saturday_dinner_dish_option: mealPlanData.data.saturday_dinner_dish_option,
          saturday_dinner_meal_option: mealPlanData.data.saturday_dinner_meal_option,

          is_sunday_available: mealPlanData.data.is_sunday_available,
          sunday_breakfast_dish: mealPlanData.data.sunday_breakfast_dish,
          sunday_breakfast_meal: mealPlanData.data.sunday_breakfast_meal,
          sunday_breakfast_dish_option: mealPlanData.data.sunday_breakfast_dish_option,
          sunday_breakfast_meal_option: mealPlanData.data.sunday_breakfast_meal_option,
          sunday_lunch_dish: mealPlanData.data.sunday_lunch_dish,
          sunday_lunch_meal: mealPlanData.data.sunday_lunch_meal,
          sunday_lunch_dish_option: mealPlanData.data.sunday_lunch_dish_option,
          sunday_lunch_meal_option: mealPlanData.data.sunday_lunch_meal_option,
          sunday_dinner_dish: mealPlanData.data.sunday_dinner_dish,
          sunday_dinner_meal: mealPlanData.data.sunday_dinner_meal,
          sunday_dinner_dish_option: mealPlanData.data.sunday_dinner_dish_option,
          sunday_dinner_meal_option: mealPlanData.data.sunday_dinner_meal_option,
        });


        console.log('dietary_choices', formData.dietary_choices)

        

    


        const dietaryChoicesResponse = await axios.get(`${baseUrl}/api/dietary`);
        const cuisineChoicesResponse = await axios.get(`${baseUrl}/api/cusisine`);
        const dishinfo = await axios.get(`${baseUrl}/api/dishinfo`);
        const mealinfo = await axios.get(`${baseUrl}/api/mealinfo`);

        const allDishesData = dishinfo.data.map(dish => ({ id: dish.dish_id, name: dish.dish_name }));
        const allMealData = mealinfo.data.map(meal => ({ id: meal.meal_id, name: meal.meal_name }));
        setAllMealData(allMealData);
        setAllDishesData(allDishesData);

        setDietary(dietaryChoicesResponse.data);
        const CuisineList = cuisineChoicesResponse.data.map(item => item.name);
        setCuisineData(CuisineList)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


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


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
  };


  const submitMealsInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      // console.log('formData befor submit: ', formData);
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

      const dataToSend = {
        ...formData,
        MealPlanImgUrl: data.url,        
      };

      const res = await axios.post(`${baseUrl}/api/mealplan`, dataToSend);
      setFormData({
        meal_plan_name: "",
        meal_plan_description: "",
        meal_plan_availability_status: "available",
        dietary_choices: [],
        cuisine_choices: [],
        daily_price: "",
        daily_breakfast_price: "",
        daily_lunch_price: "",
        daily_dinner_price: "",
    
        weekly_price: "",
        weekly_breakfast_price: "",
        weekly_lunch_price: "",
        weekly_dinner_price: "",
    
        monthly_price: "",
        monthly_breakfast_price: "",
        monthly_lunch_price: "",
        monthly_dinner_price: "",
    
        is_monday_available: true,
        monday_breakfast_dish: [],
        monday_breakfast_meal: [],
        monday_breakfast_dish_option:[],
        monday_breakfast_meal_option:[],
        monday_lunch_dish:[],
        monday_lunch_meal:[],
        monday_lunch_dish_option:[],
        monday_lunch_meal_option:[],
        monday_dinner_dish:[],
        monday_dinner_meal:[],
        monday_dinner_dish_option:[],
        monday_dinner_meal_option:[],
    
        is_tuesday_available: true,
        tuesday_breakfast_dish: [],
        tuesday_breakfast_meal: [],
        tuesday_breakfast_dish_option:[],
        tuesday_breakfast_meal_option:[],
        tuesday_lunch_dish:[],
        tuesday_lunch_meal:[],
        tuesday_lunch_dish_option:[],
        tuesday_lunch_meal_option:[],
        tuesday_dinner_dish:[],
        tuesday_dinner_meal:[],
        tuesday_dinner_dish_option:[],
        tuesday_dinner_meal_option:[],
    
        is_wednesday_available: true,
        wednesday_breakfast_dish: [],
        wednesday_breakfast_meal: [],
        wednesday_breakfast_dish_option:[],
        wednesday_breakfast_meal_option:[],
        wednesday_lunch_dish:[],
        wednesday_lunch_meal:[],
        wednesday_lunch_dish_option:[],
        wednesday_lunch_meal_option:[],
        wednesday_dinner_dish:[],
        wednesday_dinner_meal:[],
        wednesday_dinner_dish_option:[],
        wednesday_dinner_meal_option:[],
    
        is_thursday_available: true,
        thursday_breakfast_dish: [],
        thursday_breakfast_meal: [],
        thursday_breakfast_dish_option:[],
        thursday_breakfast_meal_option:[],
        thursday_lunch_dish:[],
        thursday_lunch_meal:[],
        thursday_lunch_dish_option:[],
        thursday_lunch_meal_option:[],
        thursday_dinner_dish:[],
        thursday_dinner_meal:[],
        thursday_dinner_dish_option:[],
        thursday_dinner_meal_option:[],
    
        is_friday_available: true,
        friday_breakfast_dish: [],
        friday_breakfast_meal: [],
        friday_breakfast_dish_option:[],
        friday_breakfast_meal_option:[],
        friday_lunch_dish:[],
        friday_lunch_meal:[],
        friday_lunch_dish_option:[],
        friday_lunch_meal_option:[],
        friday_dinner_dish:[],
        friday_dinner_meal:[],
        friday_dinner_dish_option:[],
        friday_dinner_meal_option:[],
    
        is_saturday_available: true,
        saturday_breakfast_dish: [],
        saturday_breakfast_meal: [],
        saturday_breakfast_dish_option:[],
        saturday_breakfast_meal_option:[],
        saturday_lunch_dish:[],
        saturday_lunch_meal:[],
        saturday_lunch_dish_option:[],
        saturday_lunch_meal_option:[],
        saturday_dinner_dish:[],
        saturday_dinner_meal:[],
        saturday_dinner_dish_option:[],
        saturday_dinner_meal_option:[],
    
        is_sunday_available: true,
        sunday_breakfast_dish: [],
        sunday_breakfast_meal: [],
        sunday_breakfast_dish_option:[],
        sunday_breakfast_meal_option:[],
        sunday_lunch_dish:[],
        sunday_lunch_meal:[],
        sunday_lunch_dish_option:[],
        sunday_lunch_meal_option:[],
        sunday_dinner_dish:[],
        sunday_dinner_meal:[],
        sunday_dinner_dish_option:[],
        sunday_dinner_meal_option:[],
      });

      Set_daily_breakfast_price(false);
      Set_daily_dinner_price(false);
      Set_daily_lunch_price(false);
      Set_daily_price(false);
      Set_weekly_breakfast_price(false);
      Set_weekly_dinner_price(false);
      Set_weekly_lunch_price(false);
      Set_weekly_price(false);
      Set_monthly_breakfast_price(false);
      Set_monthly_dinner_price(false);
      Set_monthly_lunch_price(false);
      Set_monthly_price(false);


      Set_is_friday_available(false);
      Set_is_monday_available(false);
      Set_is_saturday_available(false);
      Set_is_sunday_available(false);
      Set_is_thursday_available(false);
      Set_is_tuesday_available(false);
      Set_is_wednesday_available(false);

      Set_monday_breakfast_dish(false);
      Set_monday_breakfast_meal(false);
      Set_monday_lunch_dish(false);
      Set_monday_lunch_meal(false);
      Set_monday_dinner_dish(false);
      Set_monday_dinner_meal(false);

      Set_tuesday_breakfast_dish(false);
      Set_tuesday_breakfast_meal(false);
      Set_tuesday_lunch_dish(false);
      Set_tuesday_lunch_meal(false);
      Set_tuesday_dinner_dish(false);
      Set_tuesday_dinner_meal(false);

      Set_wednesday_breakfast_dish(false);
      Set_wednesday_breakfast_meal(false);
      Set_wednesday_lunch_dish(false);
      Set_wednesday_lunch_meal(false);
      Set_wednesday_dinner_dish(false);
      Set_wednesday_dinner_meal(false);

      Set_thursday_breakfast_dish(false);
      Set_thursday_breakfast_meal(false);
      Set_thursday_lunch_dish(false);
      Set_thursday_lunch_meal(false);
      Set_thursday_dinner_dish(false);
      Set_thursday_dinner_meal(false);

      Set_friday_breakfast_dish(false);
      Set_friday_breakfast_meal(false);
      Set_friday_lunch_dish(false);
      Set_friday_lunch_meal(false);
      Set_friday_dinner_dish(false);
      Set_friday_dinner_meal(false);

      Set_saturday_breakfast_dish(false);
      Set_saturday_breakfast_meal(false);
      Set_saturday_lunch_dish(false);
      Set_saturday_lunch_meal(false);
      Set_saturday_dinner_dish(false);

      Set_sunday_breakfast_dish(false);
      Set_sunday_breakfast_meal(false);
      Set_sunday_lunch_dish(false);
      Set_sunday_lunch_meal(false);
      Set_sunday_dinner_dish(false);
      Set_sunday_dinner_meal(false);

      
      setForm(true);
      setKitchenUpdateShowPopup(true)
  
    } catch (error) {
      console.error('Error adding kitchen:', error);
      setshowErrorPopup(true);
    }
  };
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0] )
    }
  };  


  const handleDishMealMultiSelectChange = (id: string, cities: string[], category: string[]) => {
    const mealIds: number[] = [];
    const dishIds: number[] = [];
    category.forEach((cat, index) => {
        if (cat === 'meal') {
            mealIds.push(Number(cities[index]));
        } else if (cat === 'dish') {
            dishIds.push(Number(cities[index]));
        }
    });
    const newId = id.replace("dish", "meal");

    setFormData(prevData => ({
        ...prevData,
        [id]: dishIds,
        [newId]: mealIds,
    }));
  };


  const handleEditForm = (SetForm: boolean) => {
    setHideAddKitchen(SetForm)
  }


  const handlePricingCheckBox=(id: string, PricingChecked: boolean,)=>{
    const functionName = `Set_${id}`;
    const setFunction = eval(functionName);
    setFunction(PricingChecked)

      if (!PricingChecked) {
        setFormData(prevData => ({
            ...prevData,
            [id]: ''
        }));
      }  
  }

  const handleMenuDaysCheckBox=(id: string, PricingChecked: boolean,)=>{
    const functionName = `Set_${id}`;
    const setFunction = eval(functionName);
    setFunction(PricingChecked)

      setFormData(prevData => ({
          ...prevData,
          [id]: PricingChecked  
      })); 
  }
  

  return (
      <>
          <form onSubmit={submitMealsInfo}>
          <div className="">
            <div className="flex flex-col gap-9">

              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    General Information
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div className="">
                    <label className="mb-3 block text-black dark:text-white min-w-max pt-2">
                      Image
                    </label>
                    <input
                      type="file"
                      name="meal_plan_image"
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
                      name="meal_plan_name"
                      required
                      value={formData.meal_plan_name}
                      onChange={handleChange}
                      placeholder='Name'
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="">
                    <label className="mb-3 block text-black dark:text-white pt-5">
                      Description
                    </label>
                    <textarea
                      name="meal_plan_description"
                      value={formData.meal_plan_description}
                      onChange={handleChange}
                      placeholder='Description'
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
                          checked={formData.meal_plan_availability_status === "available"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              meal_plan_availability_status: e.target.checked ? "available" : "unavailable",
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
                    Category
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
                      options={cuisineData}
                      selectedCities={ExistingCuisineNames}
                      onChange={handleCuisineChange}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Pricing
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8.5 p-6.5">
                  <div className='gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='daily_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={daily_price} onChange={handlePricingCheckBox} checkBoxId={"daily_price"} name={"Daily"} />
                        </label>
                      </div>
                      <div className='w-120'>
                        <input
                        type="number"
                        name="daily_price"
                        id='daily_price'
                        required
                        value={formData.daily_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!daily_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='daily_breakfast_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                        <MealPlanPricingCheckBox DaysDishValue={daily_breakfast_price} onChange={handlePricingCheckBox} checkBoxId={"daily_breakfast_price"} name={"BreakFast"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="daily_breakfast_price"
                        id='daily_breakfast_price'
                        required
                        value={formData.daily_breakfast_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!daily_breakfast_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='daily_lunch_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={daily_lunch_price} onChange={handlePricingCheckBox} checkBoxId={"daily_lunch_price"} name={"Lunch"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="daily_lunch_price"
                        id='daily_lunch_price'
                        required
                        value={formData.daily_lunch_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!daily_lunch_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='daily_dinner_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={daily_dinner_price} onChange={handlePricingCheckBox} checkBoxId={"daily_dinner_price"} name={"Dinner"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="daily_dinner_price"
                        id='daily_dinner_price'
                        required
                        value={formData.daily_dinner_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!daily_dinner_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className='gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='weekly_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={weekly_price} onChange={handlePricingCheckBox} checkBoxId={"weekly_price"} name={"Weekly"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="weekly_price"
                        id='weekly_price'
                        required
                        value={formData.weekly_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!weekly_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='weekly_breakfast_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={weekly_breakfast_price} onChange={handlePricingCheckBox} checkBoxId={"weekly_breakfast_price"} name={"BreakFast"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="weekly_breakfast_price"
                        id='weekly_breakfast_price'
                        required
                        value={formData.weekly_breakfast_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!weekly_breakfast_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='weekly_lunch_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={weekly_lunch_price} onChange={handlePricingCheckBox} checkBoxId={"weekly_lunch_price"} name={"Lunch"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="weekly_lunch_price"
                        id='weekly_lunch_price'
                        required
                        value={formData.weekly_lunch_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!weekly_lunch_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='weekly_dinner_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={weekly_dinner_price} onChange={handlePricingCheckBox} checkBoxId={"weekly_dinner_price"} name={"Dinner"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="weekly_dinner_price"
                        id='weekly_dinner_price'
                        required
                        value={formData.weekly_dinner_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!weekly_dinner_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    
                  </div>

                  <div className='gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='monthly_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={monthly_price} onChange={handlePricingCheckBox} checkBoxId={"monthly_price"} name={"Monthly"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="monthly_price"
                        id='monthly_price'
                        required
                        value={formData.monthly_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!monthly_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='monthly_breakfast_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={monthly_breakfast_price} onChange={handlePricingCheckBox} checkBoxId={"monthly_breakfast_price"} name={"BreakFast"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="monthly_breakfast_price"
                        id='monthly_breakfast_price'
                        required
                        value={formData.monthly_breakfast_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!monthly_breakfast_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='monthly_lunch_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={monthly_lunch_price} onChange={handlePricingCheckBox} checkBoxId={"monthly_lunch_price"} name={"Lunch"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="monthly_lunch_price"
                        id='monthly_lunch_price'
                        required
                        value={formData.monthly_lunch_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!monthly_lunch_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className='gap-3 flex space-evenly'>
                      <div className='w-25'>
                        <label htmlFor='monthly_dinner_price' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                          <MealPlanPricingCheckBox DaysDishValue={monthly_dinner_price}  onChange={handlePricingCheckBox} checkBoxId={"monthly_dinner_price"} name={"Dinner"} />
                        </label>
                      </div>
                      <div>
                        <input
                        type="number"
                        name="monthly_dinner_price"
                        id='monthly_dinner_price'
                        required
                        value={formData.monthly_dinner_price}
                        onChange={handleChange}
                        placeholder='Price'
                        disabled={!monthly_dinner_price}
                        className="rounded-lg w-32 border-[1.5px] border-stroke bg-transparent mt-4 py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Menu
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-8.5 p-6.5">

                    <div className=' w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                      <div className='gap-3 flex space-evenly'>
                        <div className='w-22'>
                          <label htmlFor='is_monday_available' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                            <MealPlanMenuDaysCheckbox checkboxDisabled={is_monday_available} onChange={handleMenuDaysCheckBox} checkBoxId={"is_monday_available"} name={"Monday"} />
                          </label>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly '>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='monday_breakfast_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_monday_available} DaysDishValue={monday_breakfast_dish} onChange={handlePricingCheckBox} checkBoxId={"monday_breakfast_dish"} name={"BreakFast"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="monday_breakfast_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={mondayBreakfastDish}
                              selectedMeals={mondayBreakfastMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_monday_available}
                              checkPriceCheckbox={monday_breakfast_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='monday_breakfast_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="monday_breakfast_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={monday_breakfast_dish_option}
                              selectedMeals={monday_breakfast_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_monday_available}
                              checkPriceCheckbox={monday_breakfast_dish}

                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='monday_lunch_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_monday_available} DaysDishValue={monday_lunch_dish} onChange={handlePricingCheckBox} checkBoxId={"monday_lunch_dish"} name={"Lunch"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="monday_lunch_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={mondayLunchDish}
                              selectedMeals={mondayLunchMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_monday_available}
                              checkPriceCheckbox={monday_lunch_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='monday_lunch_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="monday_lunch_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={monday_lunch_dish_option}
                              selectedMeals={monday_lunch_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_monday_available}
                              checkPriceCheckbox={monday_lunch_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='monday_dinner_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_monday_available} DaysDishValue={monday_dinner_dish} onChange={handlePricingCheckBox} checkBoxId={"monday_dinner_dish"} name={"Dinner"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="monday_dinner_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={mondayDinnerDish}
                              selectedMeals={mondayDinnerMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_monday_available}
                              checkPriceCheckbox={monday_dinner_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='monday_dinner_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="monday_dinner_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={monday_dinner_dish_option}
                              selectedMeals={monday_dinner_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_monday_available}
                              checkPriceCheckbox={monday_dinner_dish}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className=' w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                      <div className='gap-3 flex space-evenly'>
                        <div className='w-22'>
                          <label htmlFor='is_tuesday_available' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                            <MealPlanMenuDaysCheckbox checkboxDisabled={is_tuesday_available} onChange={handleMenuDaysCheckBox} checkBoxId={"is_tuesday_available"} name={"Tuesday"} />
                          </label>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='tuesday_breakfast_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_tuesday_available} DaysDishValue={tuesday_breakfast_dish} onChange={handlePricingCheckBox} checkBoxId={"tuesday_breakfast_dish"} name={"BreakFast"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="tuesday_breakfast_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={tuesdayBreakfastDish}
                              selectedMeals={tuesdayBreakfastMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_tuesday_available}
                              checkPriceCheckbox={tuesday_breakfast_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='tuesday_breakfast_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="tuesday_breakfast_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={tuesday_breakfast_dish_option}
                              selectedMeals={tuesday_breakfast_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_tuesday_available}
                              checkPriceCheckbox={tuesday_breakfast_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='tuesday_lunch_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_tuesday_available} DaysDishValue={tuesday_lunch_dish} onChange={handlePricingCheckBox} checkBoxId={"tuesday_lunch_dish"} name={"Lunch"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="tuesday_lunch_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={tuesdayLunchDish}
                              selectedMeals={tuesdayLunchMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_tuesday_available}
                              checkPriceCheckbox={tuesday_lunch_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='tuesday_lunch_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="tuesday_lunch_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={tuesday_lunch_dish_option}
                              selectedMeals={tuesday_lunch_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_tuesday_available}
                              checkPriceCheckbox={tuesday_lunch_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='tuesday_dinner_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_tuesday_available} DaysDishValue={tuesday_dinner_dish} onChange={handlePricingCheckBox} checkBoxId={"tuesday_dinner_dish"} name={"Dinner"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="tuesday_dinner_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={tuesdayDinnerDish}
                              selectedMeals={tuesdayDinnerMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_tuesday_available}
                              checkPriceCheckbox={tuesday_dinner_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='tuesday_dinner_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="tuesday_dinner_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={tuesday_dinner_dish_option}
                              selectedMeals={tuesday_dinner_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_tuesday_available}
                              checkPriceCheckbox={tuesday_dinner_dish}
                            />
                          </div>
                        </div>
                      </div>

                    </div>


                    <div className=' w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                      <div className='gap-3 flex space-evenly'>
                        <div className='w-25'>
                          <label htmlFor='is_wednesday_available' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                            <MealPlanMenuDaysCheckbox checkboxDisabled={is_wednesday_available} onChange={handleMenuDaysCheckBox} checkBoxId={"is_wednesday_available"} name={"Wednesday"} />
                          </label>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='wednesday_breakfast_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_wednesday_available} DaysDishValue={wednesday_breakfast_dish} onChange={handlePricingCheckBox} checkBoxId={"wednesday_breakfast_dish"} name={"BreakFast"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="wednesday_breakfast_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={wednesdayBreakfastDish}
                              selectedMeals={wednesdayBreakfastMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_wednesday_available}
                              checkPriceCheckbox={wednesday_breakfast_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='wednesday_breakfast_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="wednesday_breakfast_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={wednesday_breakfast_dish_option}
                              selectedMeals={wednesday_breakfast_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_wednesday_available}
                              checkPriceCheckbox={wednesday_breakfast_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='wednesday_lunch_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_wednesday_available} DaysDishValue={wednesday_lunch_dish} onChange={handlePricingCheckBox} checkBoxId={"wednesday_lunch_dish"} name={"Lunch"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="wednesday_lunch_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={wednesdayLunchDish}
                              selectedMeals={wednesdayLunchMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_wednesday_available}
                              checkPriceCheckbox={wednesday_lunch_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='wednesday_lunch_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="wednesday_lunch_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={wednesday_lunch_dish_option}
                              selectedMeals={wednesday_lunch_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_wednesday_available}
                              checkPriceCheckbox={wednesday_lunch_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='wednesday_dinner_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_wednesday_available} DaysDishValue={wednesday_dinner_dish} onChange={handlePricingCheckBox} checkBoxId={"wednesday_dinner_dish"} name={"Dinner"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="wednesday_dinner_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={wednesdayDinnerDish}
                              selectedMeals={wednesdayDinnerMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_wednesday_available}
                              checkPriceCheckbox={wednesday_dinner_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='wednesday_dinner_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="wednesday_dinner_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={wednesday_dinner_dish_option}
                              selectedMeals={wednesday_dinner_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_wednesday_available}
                              checkPriceCheckbox={wednesday_dinner_dish}
                            />
                          </div>
                        </div>
                      </div>
                      
                    </div>


                    <div className=' w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                      <div className='gap-3 flex space-evenly'>
                        <div className='w-25'>
                          <label htmlFor='is_thursday_available' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                            <MealPlanMenuDaysCheckbox checkboxDisabled={is_thursday_available} onChange={handleMenuDaysCheckBox} checkBoxId={"is_thursday_available"} name={"Thursday"} />
                          </label>
                        </div> 
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='thursday_breakfast_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_thursday_available} DaysDishValue={thursday_breakfast_dish} onChange={handlePricingCheckBox} checkBoxId={"thursday_breakfast_dish"} name={"BreakFast"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="thursday_breakfast_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={thursdayBreakfastDish}
                              selectedMeals={thursdayBreakfastMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_thursday_available}
                              checkPriceCheckbox={thursday_breakfast_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='thursday_breakfast_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="thursday_breakfast_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={thursday_breakfast_dish_option}
                              selectedMeals={thursday_breakfast_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_thursday_available}
                              checkPriceCheckbox={thursday_breakfast_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='thursday_lunch_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_thursday_available} DaysDishValue={thursday_lunch_dish} onChange={handlePricingCheckBox} checkBoxId={"thursday_lunch_dish"} name={"Lunch"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="thursday_lunch_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={thursdayLunchDish}
                              selectedMeals={thursdayLunchMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_thursday_available}
                              checkPriceCheckbox={thursday_lunch_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='thursday_lunch_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="thursday_lunch_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={thursday_lunch_dish_option}
                              selectedMeals={thursday_lunch_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_thursday_available}
                              checkPriceCheckbox={thursday_lunch_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='thursday_dinner_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_thursday_available} DaysDishValue={thursday_dinner_dish} onChange={handlePricingCheckBox} checkBoxId={"thursday_dinner_dish"} name={"Dinner"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="thursday_dinner_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={thursdayDinnerDish}
                              selectedMeals={thursdayDinnerMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_thursday_available}
                              checkPriceCheckbox={thursday_dinner_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='thursday_dinner_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="thursday_dinner_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={thursday_dinner_dish_option}
                              selectedMeals={thursday_dinner_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_thursday_available}
                              checkPriceCheckbox={thursday_dinner_dish}
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                    

                    <div className=' w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                      <div className='gap-3 flex space-evenly'>
                        <div className='w-20'>
                          <label htmlFor='is_friday_available' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                            <MealPlanMenuDaysCheckbox checkboxDisabled={is_friday_available} onChange={handleMenuDaysCheckBox} checkBoxId={"is_friday_available"} name={"Friday"} />
                          </label>
                        </div>
                        
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='friday_breakfast_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_friday_available} DaysDishValue={friday_breakfast_dish} onChange={handlePricingCheckBox} checkBoxId={"friday_breakfast_dish"} name={"BreakFast"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="friday_breakfast_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={fridayBreakfastDish}
                              selectedMeals={fridayBreakfastMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_friday_available}
                              checkPriceCheckbox={friday_breakfast_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='friday_breakfast_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="friday_breakfast_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={friday_breakfast_dish_option}
                              selectedMeals={friday_breakfast_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_friday_available}
                              checkPriceCheckbox={friday_breakfast_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='friday_lunch_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_friday_available} DaysDishValue={friday_lunch_dish} onChange={handlePricingCheckBox} checkBoxId={"friday_lunch_dish"} name={"Lunch"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="friday_lunch_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={fridayLunchDish}
                              selectedMeals={fridayLunchMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_friday_available}
                              checkPriceCheckbox={friday_lunch_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='friday_lunch_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="friday_lunch_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={friday_lunch_dish_option}
                              selectedMeals={friday_lunch_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_friday_available}
                              checkPriceCheckbox={friday_lunch_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='friday_dinner_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_friday_available} DaysDishValue={friday_dinner_dish} onChange={handlePricingCheckBox} checkBoxId={"friday_dinner_dish"} name={"Dinner"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="friday_dinner_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={fridayDinnerDish}
                              selectedMeals={fridayDinnerMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_friday_available}
                              checkPriceCheckbox={friday_dinner_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='friday_dinner_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="friday_dinner_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={friday_dinner_dish_option}
                              selectedMeals={friday_dinner_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_friday_available}
                              checkPriceCheckbox={friday_dinner_dish}
                            />
                          </div>
                        </div>
                      </div>
                      
                    </div>


                    <div className=' w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                      <div className='gap-3 flex space-evenly'>
                        <div className='w-20'>
                          <label htmlFor='is_saturday_available' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                            <MealPlanMenuDaysCheckbox checkboxDisabled={is_saturday_available} onChange={handleMenuDaysCheckBox} checkBoxId={"is_saturday_available"} name={"Saturday"} />
                          </label>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='saturday_breakfast_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_saturday_available} DaysDishValue={saturday_breakfast_dish} onChange={handlePricingCheckBox} checkBoxId={"saturday_breakfast_dish"} name={"BreakFast"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="saturday_breakfast_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={saturdayBreakfastDish}
                              selectedMeals={saturdayBreakfastMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_saturday_available}
                              checkPriceCheckbox={saturday_breakfast_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='saturday_breakfast_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="saturday_breakfast_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={saturday_breakfast_dish_option}
                              selectedMeals={saturday_breakfast_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_saturday_available}
                              checkPriceCheckbox={saturday_breakfast_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='saturday_lunch_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_saturday_available} DaysDishValue={saturday_lunch_dish} onChange={handlePricingCheckBox} checkBoxId={"saturday_lunch_dish"} name={"Lunch"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="saturday_lunch_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={saturdayLunchDish}
                              selectedMeals={saturdayLunchMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_saturday_available}
                              checkPriceCheckbox={saturday_lunch_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='saturday_lunch_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="saturday_lunch_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={saturday_lunch_dish_option}
                              selectedMeals={saturday_lunch_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_saturday_available}
                              checkPriceCheckbox={saturday_lunch_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='saturday_dinner_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_saturday_available} DaysDishValue={saturday_dinner_dish} onChange={handlePricingCheckBox} checkBoxId={"saturday_dinner_dish"} name={"Dinner"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="saturday_dinner_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={saturdayDinnerDish}
                              selectedMeals={saturdayDinnerMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_saturday_available}
                              checkPriceCheckbox={saturday_dinner_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='saturday_dinner_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="saturday_dinner_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={saturday_dinner_dish_option}
                              selectedMeals={saturday_dinner_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_saturday_available}
                              checkPriceCheckbox={saturday_dinner_dish}
                            />
                          </div>
                        </div>
                      </div>
                      
                    </div>


                    <div className=' w-full gap-3 rounded-lg border border-stroke px-5 pt-1 pb-4 item-center justify-center'>
                      <div className='gap-3 flex space-evenly'>
                        <div className='w-20'>
                          <label htmlFor='is_sunday_available' className="mb-3 mt-4 block text-black dark:text-white pt-2">
                            <MealPlanMenuDaysCheckbox checkboxDisabled={is_sunday_available} onChange={handleMenuDaysCheckBox} checkBoxId={"is_sunday_available"} name={"Sunday"} />
                          </label>
                        </div>
                        
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='sunday_breakfast_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_sunday_available} DaysDishValue={sunday_breakfast_dish} onChange={handlePricingCheckBox} checkBoxId={"sunday_breakfast_dish"} name={"BreakFast"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="sunday_breakfast_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={sundayBreakfastDish}
                              selectedMeals={sundayBreakfastMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_sunday_available}
                              checkPriceCheckbox={sunday_breakfast_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='sunday_breakfast_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="sunday_breakfast_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={sunday_breakfast_dish_option}
                              selectedMeals={sunday_breakfast_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_sunday_available}
                              checkPriceCheckbox={sunday_breakfast_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='sunday_lunch_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_sunday_available} DaysDishValue={sunday_lunch_dish} onChange={handlePricingCheckBox} checkBoxId={"sunday_lunch_dish"} name={"Lunch"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="sunday_lunch_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={sundayLunchDish}
                              selectedMeals={sundayLunchMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_sunday_available}
                              checkPriceCheckbox={sunday_lunch_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='sunday_lunch_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="sunday_lunch_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={sunday_lunch_dish_option}
                              selectedMeals={sunday_lunch_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_sunday_available}
                              checkPriceCheckbox={sunday_lunch_dish}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='gap-1 mb-3 lg:gap-5 flex flex-wrap justify-center md:justify-start space-evenly'>
                        <div className='gap-3 flex space-evenly'>
                          <div className='w-25'>
                            <label htmlFor='sunday_dinner_dish' className="mb-0 mt-4 block text-black dark:text-white pt-2">
                              <MealPlanPriceCheckbox checkboxDisabled={is_sunday_available} DaysDishValue={sunday_dinner_dish} onChange={handlePricingCheckBox} checkBoxId={"sunday_dinner_dish"} name={"Dinner"} />
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="sunday_dinner_dish"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={sundayDinnerDish}
                              selectedMeals={sundayDinnerMeal}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_sunday_available}
                              checkPriceCheckbox={sunday_dinner_dish}
                            />
                          </div>
                        </div>
                        <div className='gap-0 flex space-evenly'>
                          <div className='w-20 ml-8'>
                            <label htmlFor='sunday_dinner_dish_option' className="mb-3 mt-0 lg:mt-4 block text-black dark:text-white pt-1">
                            Options
                            </label>
                          </div>
                          <div>
                            <EditMealPlanMenusDishesMultiSelect
                              id="sunday_dinner_dish_option"
                              options={allMealData}
                              dishesData={allDishesData}
                              selectedDishes={sunday_dinner_dish_option}
                              selectedMeals={sunday_dinner_meal_option}
                              onChange={handleDishMealMultiSelectChange}
                              checkboxDisabled={is_sunday_available}
                              checkPriceCheckbox={sunday_dinner_dish}
                            />
                          </div>
                        </div>
                      </div>
                      
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

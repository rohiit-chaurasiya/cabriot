import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import DaysCheckbox from '../../components/Checkboxes/DaysCheckbox';


interface FormData {
    menu_price: number;
    meal_qty: number[];
    selected_dishes:number[];
}


interface SearchBarProps {
    dishNames: string[];
}

interface SearchBarProps {
    handleSearchbarChange: (dishes: string, meal_qty: number[], selected_dishes:number[]) => void;
}


const MealSearchBar: React.FC<SearchBarProps> = ({ dishNames, handleSearchbarChange }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [showModal, setShowModal] = React.useState(false);          
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDish, setSelectedDish] = useState<string>('');
  const [selectedDishId, setSelectedDishId] = useState<number[]>([0]);
  const [meal_qty, setMealQty] = useState<number[]>([]);


  const dropdownRef = useRef(null);
  const [menuData, setMenuData] = useState({
    dishes: "",
    menu_qty: 0,
  });

    const initialMenuData = {
        dishes: "",
        menu_price: 0,
        menu_qty: 0,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
    };

    // console.log('Get Selected Dish: ', dishNames);


    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
    };


    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        // console.log('Selected Dish: ', filteredDishes);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const filteredDishes = dishNames.filter(dish => 
        dish.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    

    const handleInputClick = () => {
    setShowDropdown(true);
    };

    const handleAddButtonClick = (dishId, selectedDishName) => {
        setSelectedDish(selectedDishName);
        setSelectedDishId([dishId]);

        // console.log('Selected Dish: ', selectedDishName);
        // console.log('Selected Dish ID: ', dishId);
        addDish(dishId);
        addDishName(selectedDishName);          
        setShowModal(true);
    };


    const addDish = (dishId: number) => {
        setMenuData((prevData) => ({
          ...prevData,
          dishes: [dishId],
        }));
    };

    const addDishName = (selectedDish: string) => {
        setMenuData((prevData) => ({
          ...prevData,
          dishNames: [...prevData.dishes, selectedDish],
        }));
    };

    const handleQtyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const qty = parseInt(e.target.value, 10);
    // console.log('Qty: ', qty);
    setMealQty([qty]);
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearchbarChange(selectedDish, meal_qty, selectedDishId);
        setSelectedDishId([]);
        setMealQty([]);

        setShowModal(false);
        setMenuData(initialMenuData);

    };



    const isFormReady = meal_qty[0] > 0;


  return (
    <div  ref={dropdownRef}>

        <div className="flex flex-col gap-5.5 pt-2 pb-5 px-6.5 ">
            <div className="relative z-20 mt-4 pb-2 bg-white dark:bg-form-input">
                <div className="max-w-lg mx-auto">
                    <div className="flex">
                        <div className="relative w-full">
                            <input type="search" onChange={(e) => setSearchInput(e.target.value)} onClick={handleInputClick} value={searchInput} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" placeholder="Search and add dish/meal" /> 
                            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="relative w-full">

                            {showDropdown && (
                                <div className="absolute w-full overflow mt-1 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
                                   
                                    {filteredDishes.length > 0 ? (
                                        <ul>
                                            {/* {filteredDishes.length > 0 && ( */}
                                            <>
                                                {filteredDishes.map((dish, index) => (
                                                    <li
                                                        key={dish.id} // Assuming dish.id is unique
                                                        className="flex justify-between items-center cursor-pointer hover:bg-black hover:bg-opacity-10 p-3"
                                                    >
                                                        <div className="left-content pl-3">{dish.name}</div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddButtonClick(dish.id, dish.name)}
                                                            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 lg:mr-3 ease-linear transition-all duration-150"
                                                        >
                                                            Add

                                                        </button>
                                                    </li>
                                                ))}
                                            </>
                                            {/* )}        */}
                                        </ul>
                                    ) : (
                                    <p className="p-3">No matching dishes/meals found.</p>
                                    )}

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showModal ? (
        <>
            <div className=" mt-12 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-4/5 lg:w-2/5 my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between px-5 pt-3 pb-2 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3lg font-semibold">
                            Selected Dish - <span className="text-blue-500"> {selectedDish}</span>
                            
                        </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                        {/* <div className="mb-4">
                            <label className="mb-2 block text-black dark:text-white">
                                Price
                            </label>
                            <input
                                type="number"
                                // value={menu_price}
                                onChange={handlePriceInputChange}
                                name="menu_price"
                                required
                                placeholder="Price"
                                
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary required"
                            />
                            
                        </div> */}
                        <div className="mb-4">
                            <label className="mb-2 block text-black dark:text-white">
                                Quantity
                            </label>
                            <input
                                type="number"
                                // value={menu_qty}
                                onChange={handleQtyInputChange}
                                name="menu_qty"
                                required
                                placeholder="Quantity"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary required"
                            />
                        </div>
                        
                    </div>
                    <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleSubmit} 
                            disabled={!isFormReady}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            </div>
          
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        
        ) : null}

    </div>
  );
};

export default MealSearchBar;

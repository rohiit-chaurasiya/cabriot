import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Icon } from '@chakra-ui/react';
import EditAddMenus from '../../Forms/EditAddMenus';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const baseUrl = "https://admindashboard-fr4p.onrender.com";


interface EditFormProps{
    handleEditForm: (SetForm: boolean) => void;
}

const ManuDataTable: React.FC<EditFormProps> = ({handleEditForm}) => {
    const [dishesMeals, setDishesMeals] = useState([]);
    const [show, Setshow] = useState(false)
    const [ID, SetID] = useState("")
    const [showKitchenDeletePopup, setKitchenDeleteShowPopup] = useState(false);
  

    useEffect(() => {
        fetchDishesMeals();
    }, []);

  
    const fetchDishesMeals = async () => {
        try {
        const response = await axios.get(`${baseUrl}/api/menu/kitchenmenu`);
        
        const sortedData = response.data.sort((a, b) => {
            const dateA = new Date(a.last_data_updated_time);
            const dateB = new Date(b.last_data_updated_time);
            return dateB - dateA;
        });

        setDishesMeals(sortedData);
        const handleSetData = () => {
            setDishesMeals(sortedData);
          };
        handleSetData()

        } catch (error) {
        console.error('Error fetching kitchens:', error);
        }
    };


    const handleDeleteRow = async (id) => {
        try {
            // console.log("ID", id);
            await axios.delete(`${baseUrl}/api/menu/kitchenmenu/${id}`);
            fetchDishesMeals();
            setKitchenDeleteShowPopup(true);
        } catch (error) {
            console.error('Error deleting kitchen:', error);
        }
    };


    const handleEditFormChild = async () => {
        handleEditForm(false);
      };

    const handleEditHideFormChild = async () => {
    handleEditForm(true);
    };


    return (
    <>
        {!show && <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[120px] py-4 px-2 font-medium text-black dark:text-white xl:pl-5">Kitchen</th>
                    <th className="min-w-[120px] py-4 px-2 font-medium text-black dark:text-white">Dishes/Meals</th>
                    <th className="min-w-[120px] py-4 px-2 font-medium text-black dark:text-white">Price</th>
                    <th className="min-w-[120px] py-4 px-2 font-medium text-black dark:text-white">Qty</th>
                    <th className="min-w-[120px] py-4  font-medium text-black dark:text-white">Available Days</th>
                    <th className="min-w-[120px] py-4 pl-11 font-medium text-black dark:text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dishesMeals.map((item, index) => (
                        <tr className="border-b border-[#eee] dark:border-strokedark" key={index}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-2 dark:border-strokedark xl:pl-5">
                                <ul>
                                    {item.kitchens.map((menu, menuIndex) => (
                                    <li key={menuIndex}>{menu.kitchenName}</li> // Assuming menu has a name field
                                    ))}
                                </ul>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                                <ul>
                                    {item.kitchen_menus.map((menus, kitchenIndex) => (
                                    <li key={kitchenIndex}>{menus.dish_name}{menus.meal_name}</li> // Assuming kitchen has a name field
                                    ))}
                                </ul>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                                <ul>
                                    {item.kitchen_menus.map((menus, kitchenIndex) => (
                                    <li key={kitchenIndex}>{menus.menu_price}</li> 
                                    ))}
                                </ul>
                            </td>

                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                                <ul>
                                    {item.kitchen_menus.map((menus, kitchenIndex) => (
                                    <li key={kitchenIndex}>{menus.menu_qty}</li> 
                                    ))}
                                </ul>
                            </td>

                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                                <ul>
                                    {item.kitchen_menus.map((menus, kitchenIndex) => (
                                    <li key={kitchenIndex}>
                                        {menus.monday ? 'M, ' : null}
                                        {menus.tuesday ? 'T, ' : null}
                                        {menus.wednesday ? 'W, ' : null}
                                        {menus.thursday ? 'Th, ' : null}
                                        {menus.friday ? 'F, ' : null}
                                        {menus.saturday ? 'Sa, ' : null}
                                        {menus.sunday ? 'Su, ' : null}
                                    </li> 
                                    ))}
                                </ul>
                            </td>
                            <td className="px-6 py-3 whitespace-nowrap">
                                <button className="hover:text-primary p-2"
                                    title="Edit Menu"
                                    onClick={
                                        () => {
                                            Setshow(true);
                                            SetID(item.id);
                                            handleEditFormChild();
                                        }
                                    }
                                >
                                    <Icon as={BiEdit} width="20px" height="20px" />
                                </button>
                                <button
                                    className="hover:text-danger"
                                    onClick={() => handleDeleteRow(item.id)}
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
        }
        {show && 
        <>
            <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
              <div>
                <h1 className="font-semibold text-slate-950 dark:text-white p-2">Update Menu Details</h1>
              </div>
              <div className="button flex item-center justify-center items-center">
                <button
                  type="button"
                  onClick={() => { Setshow(false); fetchDishesMeals(); handleEditHideFormChild();}}
                  className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon as={IoArrowBackCircleSharp} width="23px" height="23px" color="inherit" />
                    <span>Back</span>
                  </div>
                </button>
              </div>
            </div>
            <EditAddMenus ID={ID} />
        </>
        }

        {showKitchenDeletePopup && (
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md">
                <p className="text-lg font-bold mb-4">Success!</p>
                <p>Menu deleted successfully!</p>
                <button
                onClick={() => {
                    setKitchenDeleteShowPopup(false);
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
};

export default ManuDataTable;

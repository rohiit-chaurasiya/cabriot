import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Icon } from '@chakra-ui/react';
import Editkitchen from '../../Forms/EditKitchen';
import { IoArrowBackCircleSharp } from "react-icons/io5";


const baseUrl = "https://admindashboard-fr4p.onrender.com";

interface RectProps {
  width: number;
  height: number;
}

interface EditFormProps {
  handleEditForm: (SetForm: boolean) => void;
}


const Customtabel: React.FC<EditFormProps> = ({handleEditForm}) => {
  const [kitchens, setKitchens] = useState([]);
  const [view, setView] = useState(false);
  const [selectedID, setSelectedID] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [show, Setshow] = useState(false)
  const [ID, SetID] = useState("")
  const [showKitchenDeletePopup, setKitchenDeleteShowPopup] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showKitchenErrorPopup, setKitchenErrorShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    fetchKitchens();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
        setShowImage(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);
  
  const fetchKitchens = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/kitchen`);

        const sortedData = response.data.sort((a, b) => {
        const dateA = new Date(a.last_data_updated_time);
        const dateB = new Date(b.last_data_updated_time);
        return dateB - dateA; // Descending order, adjust if you need ascending order
      });
  
      setKitchens(sortedData);
    } 
    catch (error) {
      // setErrorMessage("Sorry, we encountered an issue while fetching kitchen information. Please try again later.");
      // setKitchenErrorShowPopup(true);
      console.error('Error fetching kitchens:', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      // console.log('id', id);
        await axios.delete(`${baseUrl}/api/kitchen/${id}`);
        const updatedKitchens = kitchens.filter((kitchen) => kitchen.id !== id);
        setKitchens(updatedKitchens);
        fetchKitchens();
        setKitchenDeleteShowPopup(true);
    } catch (error) {
        console.error('Error deleting kitchen:', error);
        setErrorMessage("Sorry, we couldn't delete the kitchen. Please try again later.");
        setKitchenErrorShowPopup(true);
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
      {!show && 
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 pl-11 font-medium text-black dark:text-white xl:pl-11">Name</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-5">Location</th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {kitchens.map((kitchen, index) => (
                  <tr className="border-b border-[#eee] dark:border-strokedark" key={kitchen.kitchen_id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-0 dark:border-strokedark xl:pl-3 flex items-center">
                          <img src={kitchen.kitchenUrl} className="h-12 w-12 mr-2 rounded-full" alt="User" />
                      <span>{kitchen.kitchenName}</span>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:pl-5"> {kitchen.kitchenCity} </td>
                    
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        kitchen.is_delivery_available === true
                          ? 'bg-success text-success'
                          : kitchen.is_delivery_available === false
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}>
                        {kitchen.is_delivery_available === true ? 'Available' : 'Unavailable'}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          title="Edit Kitchen"
                          onClick={
                            () => {
                                Setshow(true);
                                SetID(kitchen.kitchen_id);
                                handleEditFormChild();
                            }
                          }
                        >
                          <Icon as={BiEdit} width="20px" height="20px" />
                        </button>

                        <button onClick={() => handleDelete(kitchen.kitchen_id)} title="delete">
                          <Icon as={MdOutlineDeleteOutline} width="20px" height="20px" />
                        </button>
                      </div>
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
          {/* <h1 className='flex justify-end p-3 text-xl' onClick={() => { Setshow(false); fetchKitchens(); }}> Back </h1> */}
          <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
            <div>
              <h1 className="font-semibold text-slate-950 dark:text-white p-2">Update Kitchen Details</h1>
            </div>
            <div className="button flex item-center justify-center items-center">
              <button
                type="button"
                onClick={() => { Setshow(false); fetchKitchens(); handleEditHideFormChild();}}
                className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon as={IoArrowBackCircleSharp} width="23px" height="23px" color="inherit" />
                  <span>Back</span>
                </div>
              </button>
            </div>
            </div>
          <Editkitchen ID={ID} />
          {/* <h1>{ID}</h1> */}
        </>
      }

      {showKitchenDeletePopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Success!</p>
            <p>Kitchen deleted successfully!</p>
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
      {showKitchenErrorPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4 text-red-500 ">Failed!</p>
            <p>{errorMessage}</p>
            <button
              onClick={() => {
                setKitchenErrorShowPopup(false);
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

export default Customtabel;

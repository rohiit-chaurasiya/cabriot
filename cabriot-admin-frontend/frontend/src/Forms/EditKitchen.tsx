import axios from 'axios';
import { useEffect, useState } from 'react';
import MultiSelect from '../components/Forms/MultiSelect';


const baseUrl = "https://admindashboard-fr4p.onrender.com";


interface FieldName {
  ID: string;
}

type FileState = File | null;

export default function EditKitchen({ ID }: FieldName) {
  const [stateCityData, setStateCityData] = useState<any>({});
  const [showKitchenUpdatedPopup, setKitchenUpdateShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [showKitchenErrorPopup, setKitchenErrorShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [kitchenImgFileName, setKitchenImgFileName] = useState<string>("");
  const [formData, setFormData] = useState({
    kitchenName: '',
    kitchenDescription: '',
    kitchenAddress: '',
    kitchenState: '',
    kitchenCity: [],
    kitchenPinCode: '',
    kitchenLatitude: '',
    kitchenLongitude: '',
    is_delivery_available: false,
  });
  console.log("Edit Id: ",ID);


  useEffect(() => {
    const fetchKitchenData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/kitchen/${ID}`);
        const kitchenData = response.data;
        
        const urlParts = kitchenData.kitchenUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        console.log("Kitchen Data: ", filename);
        setKitchenImgFileName(filename);

        setFormData({
          ...kitchenData,
          kitchenState: kitchenData.kitchenState,
          kitchenCity: kitchenData.kitchenCity || [],
          is_delivery_available: kitchenData.is_delivery_available,
        });
        setStateCityData({
          'Karnataka': ['Bengaluru', 'Mangaluru', 'Udupi', 'Koramangala'],
          'Kerala': ['Thiruvananthapuram', 'Calicut', 'Kochi', 'Thrissur'],
        });
      } catch (error) {
        console.error('Error fetching kitchen data:', error);
        setErrorMessage("Sorry, we encountered an issue while fetching kitchen information. Please try again later.");
        setKitchenErrorShowPopup(true);
      }
    };
    fetchKitchenData();
  }, [ID]);




  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleCityChange = (cities: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      kitchenCity: cities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/api/kitchen/${ID}`, formData);

      setKitchenUpdateShowPopup(true);
    } catch (error) {
      console.error('Error updating kitchen:', error);
      setErrorMessage("Sorry, we couldn't delete the kitchen. Please try again later.");
      setKitchenErrorShowPopup(true);
    }
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      is_delivery_available: !formData.is_delivery_available,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0] )
    }
  };


  return (
    <>
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSubmit}>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit General Information
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>
              
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.kitchenName}
                  onChange={handleInputChange}
                  name="kitchenName"
                  required
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.kitchenDescription}
                  onChange={handleInputChange}
                  name="kitchenDescription"
                  required
                  placeholder="Description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="status flex gap-6">
                <div>
                  <label
                    htmlFor="checkboxLabelOne"
                    className="flex cursor-pointer select-none items-center pb-5"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelOne"
                        className="sr-only"
                        onChange={handleCheckboxChange}
                        checked={formData.is_delivery_available}
                      />
                      <div className="mr-4 flex h-5 w-5 items-center justify-center rounded border border-stroke">
                        {formData.is_delivery_available ? (
                          <span className="h-2.5 w-2.5 bg-primary rounded-sm"></span>
                        ) : null}
                      </div>
                    </div>
                    Open
                  </label>
                </div>
              </div>


              {!showKitchenUpdatedPopup && (<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Edit Address
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <div className="mb-4">
                      <label className="mb-3 block text-black dark:text-white">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.kitchenAddress}
                        required
                        onChange={handleInputChange}
                        name="kitchenAddress"
                        placeholder="Address"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <label htmlFor="stateDropdown" className="mb-3 block text-black dark:text-white">
                        State
                      </label>
                      <div className="relative inline-block w-full">
                        <select
                          id="stateDropdown"
                          value={formData.kitchenState}
                          onChange={handleInputChange}
                          name="kitchenState"
                          className="block appearance-none rounded-lg border-[1.5px] border-stroke w-full bg-white border  text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                          <option className="text-body dark:text-bodydark" value="" disabled hidden>
                            Select a state
                          </option>
                          {Object.keys(stateCityData).map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
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
                                fill="#637381"
                              ></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* City selection */}
                    {formData.kitchenState && (
                      <div className="relative z-20 mt-4 pb-2 bg-white dark:bg-form-input">
                        <label htmlFor="cityDropdown" className="mb-3 block text-black dark:text-white">
                          City
                        </label>

                        <MultiSelect
                          id="cityDropdown"
                          options={stateCityData[formData.kitchenState]}

                          selectedCities={formData.kitchenCity || []} // Use formData.kitchenCity directly
                          onCityChange={handleCityChange}
                        />
                      </div>
                    )}

                    <div className="mb-5">
                      <label className="mb-3 block text-black dark:text-white">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        value={formData.kitchenPinCode}
                        required
                        onChange={handleInputChange}
                        name="kitchenPinCode"
                        placeholder="Pin Code"
                        maxLength="6"
                        pattern="\d{6}"
                        title="Please enter a 6-digit PIN code"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="mb-3 block text-black dark:text-white">
                        Geo Location
                      </label>
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-6">
                        <div className="mb-4 lg:w-1/2">
                          <label className="mb-3 block text-black dark:text-white">
                            Latitude
                          </label>
                          <input
                            type="text"
                            value={formData.kitchenLatitude}
                            onChange={handleInputChange}
                            name="kitchenLatitude"
                            placeholder="Latitude"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="mb-4 lg:w-1/2">
                          <label className="mb-3 block text-black dark:text-white">
                            Longitude
                          </label>
                          <input
                            type="text"
                            value={formData.kitchenLongitude}
                            onChange={handleInputChange}
                            name="kitchenLongitude"
                            placeholder="Longitude"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
              {/* Include other fields as per your requirements */}
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {showKitchenUpdatedPopup && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md">
              <p className="text-lg font-bold mb-4">Success!</p>
              <p>Kitchen updated successfully!</p>
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
      </div>

    </>

  );
}

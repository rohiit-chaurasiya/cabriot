import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import KitchenDataTable from '../../components/Tables/KitchenDataTable';
import MultiSelect from '../../components/Forms/MultiSelect';
import { Icon } from '@chakra-ui/react';
import '../../css/kitchenpop.css';
import { IoIosAddCircle } from 'react-icons/io';
import {Cloudinary} from "@cloudinary/url-gen";
import { IoArrowBackCircleSharp } from "react-icons/io5";



const baseUrl = "https://admindashboard-fr4p.onrender.com";
const cld = new Cloudinary({cloud: {cloudName: 'djmhrkv5t'}});


interface FormData {
  kitchenName: string;
  // kitchenUrl: string;
  
  kitchenDescription: string;
  kitchenAddress: string;
  kitchenState: string;
  kitchenCity: string[];
  kitchenPinCode: string;
  kitchenLatitude: string;
  kitchenLongitude: string;
  is_delivery_available: boolean;
}

type FileState = File | null;


const KitchenFormElements = () => {
  const [form, setForm] = useState(true);
  const [kitchens, setKitchens] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedImgUrl, setSelectedImgUrl] = useState<string>('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [showKitchenAddedPopup, setKitchenAddedShowPopup] = useState(false);
  const [showKitchenErrorPopup, setKitchenErrorShowPopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileState>(null);
  const [kitchensImg, setKitchensImg] = useState([]);
  const [hideAddKitchen, setHideAddKitchen] = useState(true);
  


  const [stateCityData, setStateCityData] = useState<{ [key: string]: string[] }>({
    'Karnataka': [],
    'Kerala': [],
  });

  const [formData, setFormData] = useState<FormData>({
    kitchenName: '',
    // kitchenUrl: '',
    kitchenDescription: '',
    kitchenAddress: '',
    kitchenState: '',
    kitchenCity: [],
    kitchenPinCode: '',
    kitchenLatitude: '',
    kitchenLongitude: '',
    is_delivery_available: false,
  });


  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/kitchen`);
        setKitchens(response.data);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    const fetchKitchensImg = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/blob_datastore/`);
  
        const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a.last_data_updated_time);
          const dateB = new Date(b.last_data_updated_time);
          return dateB - dateA; // Descending order, adjust if you need ascending order
        });
  
        setKitchensImg(sortedData);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };
    fetchKitchensImg();
    fetchKitchens();
  }, []);


  useEffect(() => {
    setStateCityData({
      'Karnataka': ['Bengaluru', 'Mangaluru', 'Udupi', 'Koramangala'],
      'Kerala': ['Thiruvananthapuram', 'Calicut', 'Kochi', 'Thrissur'],
    });
  }, []);


  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCities([]);
    setFormData(prevData => ({
      ...prevData,
      kitchenState: state
    }));
  };

  const handleCityChange = (cities: string[]) => {
    setFormData(prevData => ({
      ...prevData,
      kitchenCity: cities
    }));
  };

  


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0] )
    }
  };


  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      is_delivery_available: !formData.is_delivery_available,
    });
  };


  const submitKitchenGeneralInfo = async (e: FormEvent<HTMLFormElement>) => {
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
      console.log('img data', data)
  
      const dataToSend = {
        ...formData,
        kitchenUrl: data.url,
      };

      const res = await axios.post(`${baseUrl}/api/kitchen`, dataToSend);
        setFormData({
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
      setForm(true);
      setKitchenAddedShowPopup(true);
    } catch (error) {
      console.error('Error adding kitchen:', error);
      setKitchenErrorShowPopup(true);
    }
  };

  

  

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/kitchen`);
        setKitchens(response.data);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    const fetchKitchensImg = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/blob_datastore/`);
  
        const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a.last_data_updated_time);
          const dateB = new Date(b.last_data_updated_time);
          return dateB - dateA; // Descending order, adjust if you need ascending order
        });
  
        setKitchensImg(sortedData);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    fetchKitchens();
    fetchKitchensImg();

  }, []);


  const handlePinCodeChange = (e) => {
    const pinCodeValue = e.target.value;
    const sanitizedPinCode = pinCodeValue.replace(/\D/g, '');
    const limitedPinCode = sanitizedPinCode.slice(0, 6);
    setFormData({
      ...formData,
      location: limitedPinCode,
    });
  };

  const handleEditForm = (SetForm: boolean) => {
    setHideAddKitchen(SetForm)
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Kitchen" pageTitle="Kitchen" />

      {form ? (
        <>
          {hideAddKitchen && (
          <div className="pb-5">
            <div className="flex justify-end p-3 container bg-white rounded-lg">
              <div className="button flex items-center">
                <button
                  type="button"
                  onClick={() => setForm(false)}
                  className="text-white flex gap-3 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon as={IoIosAddCircle} width="23px" height="23px" color="inherit" />
                    <span>Add Kitchen</span>
                  </div>
                </button>
              </div>

            </div>
          </div>
          )}
          <KitchenDataTable  handleEditForm={handleEditForm} />
        </>
      ) : (
        
        <div>
          <div className="flex justify-between text-lg p-3 mb-5 container bg-white rounded-lg">
            <div>
              <h1 className="font-semibold text-slate-950 dark:text-white p-2">Fill Kitchen Details</h1>
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
          {!showKitchenErrorPopup && (
          <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12">
            <div className="mb-4 lg:w-full">
              <form onSubmit={submitKitchenGeneralInfo}>
                <div className="rounded-sm border mb-5 py-5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke pb-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      General Information
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
                        onChange={handleChange}
                        name="kitchenName"
                        required
                        placeholder="Kitchen Name"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>


                    <div>
                      <label className="mb-3 block text-black dark:text-white">
                        Description
                      </label>
                      <textarea value={formData.kitchenDescription} onChange={handleChange} required placeholder="Write the description here..." name="kitchenDescription" rows={4} cols={40}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
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
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row py-5 lg:justify-between lg:space-x-12">
                  <div className="mb-4 lg:w-full">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Address
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
                              onChange={handleChange}
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
                                value={selectedState}
                                onChange={handleStateChange}
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


                          {/* <SelectGroupTwo /> */}
                          <div className="relative z-20 mt-4 pb-2 bg-white dark:bg-form-input">


                            {selectedState && (
                              <div>
                                <label htmlFor="stateDropdown" className="mb-3 block text-black dark:text-white">
                                  City
                                </label>
                                <MultiSelect
                                  id="multiSelect"
                                  options={stateCityData[selectedState]}
                                  selectedCities={selectedCities}
                                  onCityChange={handleCityChange}
                                />
                              </div>
                            )}

                          </div>

                          <div className="mb-5">
                            <label className="mb-3 block text-black dark:text-white">
                              Pin Code
                            </label>
                            <input
                              type="number"
                              value={formData.kitchenPinCode}
                              required
                              onChange={handleChange}
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
                                  onChange={handleChange}
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
                                  onChange={handleChange}
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
                    <button
                      type="submit"
                      className="inline-flex w-full mb-4 mt-5 items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Submit
                    </button>

                  </div>
                </div>
              </form>
            </div>
          </div>
          )}
        </div>
      )}
      {showKitchenAddedPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4">Success!</p>
            <p>Kitchen added successfully!</p>
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

      {showKitchenErrorPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-bold mb-4 text-red-500 ">Failed!</p>
            <p>Please complete all required fields.</p>
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
    </DefaultLayout>
  );
};

export default KitchenFormElements;

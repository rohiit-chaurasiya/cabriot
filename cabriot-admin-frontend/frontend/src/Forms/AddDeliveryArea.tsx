import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Kitchen {
  id: string;
  name: string;
}

const AddDeliveryArea: React.FC = () => {
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const [selectedKitchen, setSelectedKitchen] = useState<string>('');
  const [areaName, setAreaName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get<Kitchen[]>(
          'http://localhost:8000/api/kitchen',
        );
        setKitchens(response.data);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    fetchKitchens();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/delivery/', {
        kitchen: selectedKitchen,
        area_name: areaName,
      });
      setMessage('Delivery area added successfully!');
    } catch (error) {
      console.error('Error adding delivery area:', error);
      setMessage('Failed to add delivery area');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add Delivery
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label>Select Kitchen:</label>
              <select
                value={selectedKitchen}
                onChange={(e) => setSelectedKitchen(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select a kitchen</option>
                {kitchens.map((kitchen) => (
                  <option key={kitchen.id} value={kitchen.id}>
                    {kitchen.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Area Name:
              </label>
              <input
                type="text"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add Delivery Area
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDeliveryArea;

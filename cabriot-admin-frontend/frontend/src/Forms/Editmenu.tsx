import axios from 'axios';
import { useEffect, useState } from 'react';

interface FieldName {
  Name: string;
  Selection: string;
  Price: boolean;
  Calorie: boolean;
  Id: string;
}

export default function Editmenu({
  Name,
  Id,
  Selection,
  Price,
  Calorie,
}: FieldName) {
  const [kitchens, setKitchens] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    is_delivery_available: false, // Added state for delivery availability
    status: 'available',
  });

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get('https://admindashboard-fr4p.onrender.com/api/kitchen');
        setKitchens(response.data);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    fetchKitchens();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value; // Handle checkbox differently
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://admindashboard-fr4p.onrender.com/api/kitchen/${Id}`, formData);
      alert('Menu updated successfully!');
      setFormData({
        name: '',
        location: '',
        is_delivery_available: false,
        status: 'available',
      });
    } catch (error) {
      console.error('Error updating menu:', error);
      alert('Error updating menu. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <form onSubmit={handleSubmit}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Kitchen</h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Name Of The Kitchen
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                required
                placeholder="Name Of The Kitchen"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                The Kitchen location
              </label>
              <input
                type="text"
                value={formData.location}
                required
                onChange={handleInputChange}
                name="location"
                placeholder="Kitchen Location"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="status flex gap-6">
              <div>
                <label
                  htmlFor="isDeliveryAvailable"
                  className="flex cursor-pointer select-none items-center pb-5"
                >
                  <input
                    type="checkbox"
                    id="isDeliveryAvailable"
                    className="mr-4"
                    onChange={handleInputChange}
                    checked={formData.is_delivery_available}
                    name="is_delivery_available"
                  />
                  Is Delivery Available
                </label>
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
      </form>
    </div>
  );
}

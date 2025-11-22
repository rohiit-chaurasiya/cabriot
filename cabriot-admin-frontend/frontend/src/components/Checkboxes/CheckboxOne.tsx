import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CheckboxOne = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    is_delivery_available: false, // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/kitchen', formData);
      setFormData({
        name: '',
        location: '',
        is_delivery_available: false,
      });
      alert('Kitchen added successfully!');
    } catch (error) {
      console.error('Error adding kitchen:', error);
    }
  };

  return (
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
            onChange={() => {
              setIsChecked(!isChecked);
              setFormData({
                ...formData,
                is_delivery_available: !formData.is_delivery_available,
              });
            }}
            checked={formData.is_delivery_available}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-primary bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`}
            ></span>
          </div>
        </div>
        Is Avaliable
      </label>
      <Link
        to="#"
        className="inline-flex rounded-lg items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Button
      </Link>
    </div>
  );
};

export default CheckboxOne;

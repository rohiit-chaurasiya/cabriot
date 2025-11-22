import axios from 'axios';
import { useEffect, useState } from 'react';

interface MenuItem {
  id: string;
  menu: string;
  name: string;
  description: string;
  price: string;
  status: string;
  calories: string;
}

export default function EditMenuItem({
  id,
  menu: initialMenu,
  name: initialName,
  description: initialDescription,
  price: initialPrice,
  status: initialStatus,
  calories: initialCalories,
}: MenuItem) {
  const [menus, setMenus] = useState<any[]>([]);
  const [formData, setFormData] = useState<MenuItem>({
    id,
    menu: initialMenu,
    name: initialName,
    description: initialDescription,
    price: initialPrice,
    status: initialStatus,
    calories: initialCalories,
  });

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('https://admindashboard-fr4p.onrender.com/api/menu');
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value; // Handle checkbox differently
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`https://admindashboard-fr4p.onrender.com/api/menuitem/${id}`, formData);
      alert('Menu item updated successfully!');
    } catch (error) {
      console.error('Error updating menu item:', error);
      alert('Error updating menu item. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <form onSubmit={handleSubmit}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit Menu Item
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                required
                placeholder="Name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                placeholder="Description"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={handleInputChange}
                name="price"
                placeholder="Price"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Calories
              </label>
              <input
                type="text"
                value={formData.calories}
                onChange={handleInputChange}
                name="calories"
                placeholder="Calories"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Menu
              </label>
              <select
                value={formData.menu}
                onChange={handleInputChange}
                name="menu"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Menu</option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="status flex gap-6">
              <div>
                <label
                  htmlFor="status"
                  className="flex cursor-pointer select-none items-center pb-5"
                >
                  <input
                    type="checkbox"
                    id="status"
                    className="mr-4"
                    onChange={handleInputChange}
                    checked={formData.status === 'available'}
                    name="status"
                  />
                  Status
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

import { useEffect, useState } from 'react';
import axios from 'axios';

const TableTwo = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [kitchenNames, setKitchenNames] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('https://admindashboard-fr4p.onrender.com/api/menu/');
        setMenuItems(response.data);
        // Fetch kitchen names for all menu items
        const names = {};
        await Promise.all(
          response.data.map(async (menu) => {
            const kitchenName = await getKitchenName(menu.kitchen);
            names[menu.id] = kitchenName;
          }),
        );
        setKitchenNames(names);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const getKitchenName = async (kitchenId) => {
    try {
      const response = await axios.get(
        `https://admindashboard-fr4p.onrender.com/api/kitchen/${kitchenId}`,
      );
      return response.data.name;
    } catch (error) {
      console.error(`Error fetching kitchen name for ID ${kitchenId}:`, error);
      return 'Unknown Kitchen';
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://admindashboard-fr4p.onrender.com/api/menu/${id}`);
      // After successful deletion, update the menu items list
      const updatedMenuItems = menuItems.filter((menu) => menu.id !== id);
      setMenuItems(updatedMenuItems);
      alert('Menu item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top menus
        </h4>
      </div>

      <div className="overflow-auto">
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Menu Name</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Kitchen Name</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Description</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Date</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Available</p>
          </div>
        </div>

        {menuItems.map((menu, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <img src={menu.image} alt="menu" />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {menu.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {kitchenNames[menu.id]}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {menu.description}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {menu.created_at}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-meta-3">{menu.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableTwo;

import axios from 'axios';
import { useEffect, useState } from 'react';
import Editkitchen from '../../Forms/EditKitchen';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Icon } from '@chakra-ui/react';
import { AiTwotoneEye } from "react-icons/ai";

interface Menuid {
  ID: string;
}

const MenuTable = ({ ID }: Menuid) => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [editMenuView, setEditMenuView] = useState(false);
  const [kitchens, setKitchens] = useState({});

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          `https://admindashboard-fr4p.onrender.com/api/menu/${ID} `,
        );
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, [ID]); // Fetch menus when ID changes

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get('https://admindashboard-fr4p.onrender.com/api/kitchen');
        const kitchenData = response.data.reduce((acc, kitchen) => {
          acc[kitchen.id] = kitchen.name;
          return acc;
        }, {});
        setKitchens(kitchenData);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    fetchKitchens();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://admindashboard-fr4p.onrender.com/api/menu/${id}`);
      const updatedMenuItems = menus.filter((menu) => menu.id !== id);
      setMenus(updatedMenuItems);
      alert('Menu item deleted successfully!');
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleEditMenu = (menu) => {
    setSelectedMenu(menu);
    setEditMenuView(true);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* <div className="container flex justify-start p-2 ">
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-bold uppercase  xsm:text-base">
            Menu
          </h5>
        </div>
      </div> */}

      {!editMenuView && (
        <div className="flex flex-col">
          <div className="grid grid-cols-7 rounded-sm dark:bg-meta-4">
            <div className="p-1 text-center"><h5 className='font-semibold'>Item Image</h5></div>
            <div className="p-1 text-center"><h5 className='font-semibold'>Item Name</h5></div>
            <div className="p-1 text-center"><h5 className='font-semibold'>Price</h5></div>
            <div className="p-1 text-center"><h5 className='font-semibold'>Category</h5></div>
            <div className="p-1 text-center"><h5 className='font-semibold'>Calories</h5></div>
            <div className="p-1 text-center"><h5 className='font-semibold'>Status</h5></div>
            <div className="p-1 text-center"><h5 className='font-semibold'>Actions</h5></div>
          </div>
          <hr />
          <div className="grid grid-cols-7" key={menus.id}>
            <div className="p-2.5 text-center">{kitchens[menus.kitchen]}</div>
            <div className="p-2.5 text-center">{menus.name}</div>
            <div className="p-2.5 text-center">{menus.description}</div>
            <div></div>
            <div></div>
            <div className="p-2.5 text-center">
              {menus.status ? 'Available' : 'Not Available'}
            </div>
            <div className=" text-center">
              <button
                className="hover:text-primary"
                onClick={() => handleEditMenu(menus.id)}
              >
                <Icon as={AiTwotoneEye}  width="20px" height="20px" />
              </button>
  
              <button
                className="hover:text-primary"
                onClick={() => handleEditMenu(menus.id)}
              >
                <Icon as={BiEdit}  width="20px" height="20px" />
              </button>
              <button
                className="hover:text-primary"
                onClick={() => handleDelete(menus.id)}
              >
                <Icon as={MdOutlineDeleteOutline}  width="20px" height="20px" />
              </button>
            </div>
          </div>
        </div>
      )}

      {editMenuView && (
        <>
          <h1
            className="p-2 text-lg cursor-pointer"
            onClick={() => setEditMenuView(false)}
          >
            Back
          </h1>
          <Editkitchen
            Id={selectedMenu.id}
            MenuName=""
            Description=""
            KitchenName=""
            Status=""
          />
        </>
      )}
    </div>
  );
};

export default MenuTable;

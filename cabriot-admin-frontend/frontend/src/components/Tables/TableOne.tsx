import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MenuTable from './Menutable';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];
interface tabelId {
  ID: string;
}

const TableOne = ({ ID }: tabelId) => {
  const [kitchens, setKitchens] = useState([]);
  const [menu, setMenu] = useState([]);
  const [menuitem, setMenuitem] = useState([]);
  const [items, setitems] = useState([]);
  const [view, setview] = useState(false);
  const [showmenu, setshowmenu] = useState(false);

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const response = await axios.get(
          `https://admindashboard-fr4p.onrender.com/api/kitchen/${ID}`,
        );
        setKitchens(response.data);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      }
    };

    fetchKitchens();
  }, [ID]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const kitchenResponse = await axios.get(
          `https://admindashboard-fr4p.onrender.com/api/kitchen/${ID}`,
        );
        const kitchenData = kitchenResponse.data;

        // Exit early if kitchen data is not yet available
        if (!kitchenData) return;

        // Once kitchen data is available, fetch menu data
        const menuResponse = await axios.get(`https://admindashboard-fr4p.onrender.com/api/menu/`);

        // Filter menu items based on the kitchen ID
        const filteredMenu = menuResponse.data.filter(
          (item) => item.kitchen === kitchenData.id,
        );

        setMenu(filteredMenu);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu(); // Fetch menu data when component mounts or ID changes
  }, [ID]); // Run the effect whenever ID changes

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        if (menu.length === 0) return; // Exit if menu is empty

        const selectedMenu = menu[0]; // Assuming you want to select the first menu item

        const MenuResponse = await axios.get(
          `https://admindashboard-fr4p.onrender.com/api/menu/${selectedMenu.id}`,
        );

        const menuData = MenuResponse.data;

        // Exit early if menu data is not yet available
        if (!menuData) return;

        // Once menu data is available, fetch menu items
        const menuItemsResponse = await axios.get(
          `https://admindashboard-fr4p.onrender.com/api/menu/${selectedMenu.id}`,
        );

        const menuItemsData = menuItemsResponse.data;

        // Set the menu items state
        setitems(menuItemsData);
      } catch (error) {
        console.error('Error fetching menu item:', error);
      }
    };

    fetchMenuItem(); // Fetch menu item data when component mounts or menu changes
  }, [menu]);
  console.log(items);

  // console.log(menuitem);

  // @ts-ignore
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://admindashboard-fr4p.onrender.com/api/kitchen/${id}`);
      // After successful deletion, update the kitchens list
      const updatedKitchens = kitchens.filter((kitchen) => kitchen.id !== id);
      setKitchens(updatedKitchens);
      alert('Kitchen deleted successfully!');
      // Optionally, you can trigger a refresh or any other action here
      window.location.reload(); // This will refresh the page
      // Or you can show a message to the user indicating the deletion was successful
      // setMessage('Kitchen deleted successfully!');
    } catch (error) {
      console.error('Error deleting kitchen:', error);
      // Optionally, you can update the UI to show an error message
      // setError('Error deleting kitchen: ' + error.message);
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Kitechens
        </h4>


        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Location
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Menu
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>

                <tr >
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {kitchens.name}
                    </h5>

                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {kitchens.location}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {menu.map((menuItem) => (
                        <div key={menuItem.id}>
                          <h3
                            onClick={() => {
                              setitems(menuItem.id); // Set the selected menu item ID
                              setshowmenu(!showmenu);
                              // Set the view state to true
                            }}
                          >
                            {menuItem.name}
                          </h3>
                        </div>
                      ))}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${kitchens.states === 'Avaliable'
                        ? 'bg-success text-success'
                        : kitchens.states === 'UnAvaliable'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                        }`}
                    >
                      {kitchens.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">

                      <button
                        className="hover:text-primary"
                        // @ts-ignore
                        onClick={() => {
                          alert('The data is being deleted');
                          handleDelete(ID);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
      {view && (
        <div>
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Kitchen Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Location
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Menu
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Is delivery available
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {menu.map((menuItem) => (
            <div key={menuItem.id}>
              {menuItem.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5"
                >
                  <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      {item.name}
                    </h5>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      {item.price}
                    </h5>
                  </div>
                  <div className="p-2.5 text-center xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Menu
                    </h5>
                  </div>
                  <div className="hidden p-2.5 text-center sm:block xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Is delivery available
                    </h5>
                  </div>
                  <div className="hidden p-2.5 text-center sm:block xl:p-5">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Actions
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <>{showmenu && <MenuTable ID={items} />}</>
    </>
  );
};

export default TableOne;

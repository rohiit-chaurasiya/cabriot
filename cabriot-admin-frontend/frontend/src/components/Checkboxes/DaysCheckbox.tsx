import { useState } from 'react';

interface DaysCheckboxProps {
    menuData: any; // Change any to your specific type if possible
    handleDayCheckboxChange: (day: string, isChecked: boolean) => void;
}

const DaysCheckbox: React.FC<DaysCheckboxProps> = ({ menuData, handleDayCheckboxChange }) => {


    const [isMondayChecked, setIsMondayChecked] = useState<boolean>(true);
    const [isTuesdayChecked, setIsTuesdayChecked] = useState<boolean>(true);
    const [isWednesdayChecked, setIsWednesdayChecked] = useState<boolean>(true);
    const [isThursdayChecked, setIsThursdayChecked] = useState<boolean>(true);
    const [isFridayChecked, setIsFridayChecked] = useState<boolean>(true);
    const [isSaturdayChecked, setIsSaturdayChecked] = useState<boolean>(true);
    const [isSundayChecked, setIsSundayChecked] = useState<boolean>(true);

    const handleMondayCheckboxChange = () => {
        setIsMondayChecked(!isMondayChecked);
        handleDayCheckboxChange('Monday', !isMondayChecked);
    };
    
    const handleTuesdayCheckboxChange = () => {
        setIsTuesdayChecked(!isTuesdayChecked);
        handleDayCheckboxChange('Tuesday', !isTuesdayChecked);
    };
    
    const handleWednesdayCheckboxChange = () => {
        setIsWednesdayChecked(!isWednesdayChecked);
        handleDayCheckboxChange('Wednesday', !isWednesdayChecked);
    };
    
    const handleThursdayCheckboxChange = () => {
        setIsThursdayChecked(!isThursdayChecked);
        handleDayCheckboxChange('Thursday', !isThursdayChecked);
    };
    
    const handleFridayCheckboxChange = () => {
        setIsFridayChecked(!isFridayChecked);
        handleDayCheckboxChange('Friday', !isFridayChecked);
    };
    
    const handleSaturdayCheckboxChange = () => {
        setIsSaturdayChecked(!isSaturdayChecked);
        handleDayCheckboxChange('Saturday', !isSaturdayChecked);
    };
    
    const handleSundayCheckboxChange = () => {
        setIsSundayChecked(!isSundayChecked);
        handleDayCheckboxChange('Sunday', !isSundayChecked);
    };


  return (
    <div>
        <div className="flex gap-5 lg:gap-5">
            <div className="w-1/7">
                <label
                htmlFor="isMondayChecked"
                className="flex cursor-pointer select-none items-center"
                >
                <div className="relative">
                <input
                    type="checkbox"
                    id="isMondayChecked"
                    className="sr-only"
                    onChange={handleMondayCheckboxChange}
                />
                <div
                    className={`mr-1 flex h-5 w-5 items-center justify-center rounded border ${
                        isMondayChecked && 'border-primary bg-gray dark:bg-transparent'
                    }`}
                >
                    <span className={`opacity-0 ${isMondayChecked && '!opacity-100'}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                        strokeWidth="0.4"
                        ></path>
                    </svg>
                    </span>
                </div>
                </div>
                Mon
                </label>
            </div>
            <div className="w-1/7">
                <label
                htmlFor="isTuesdayChecked"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                <input
                    type="checkbox"
                    id="isTuesdayChecked"
                    className="sr-only"
                    onChange={handleTuesdayCheckboxChange}
                />
                <div
                    className={`mr-1 flex h-5 w-5 items-center justify-center rounded border ${
                        isTuesdayChecked && 'border-primary bg-gray dark:bg-transparent'
                    }`}
                >
                    <span className={`opacity-0 ${isTuesdayChecked && '!opacity-100'}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                        strokeWidth="0.4"
                        ></path>
                    </svg>
                    </span>
                </div>
                </div>
                Tue
                </label>
            </div>
            <div className="w-1/7">
                <label
                htmlFor="isWednesdayChecked"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                <input
                    type="checkbox"
                    id="isWednesdayChecked"
                    className="sr-only"
                    onChange={handleWednesdayCheckboxChange}
                />
                <div
                    className={`mr-1 flex h-5 w-5 items-center justify-center rounded border ${
                        isWednesdayChecked && 'border-primary bg-gray dark:bg-transparent'
                    }`}
                >
                    <span className={`opacity-0 ${isWednesdayChecked && '!opacity-100'}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                        strokeWidth="0.4"
                        ></path>
                    </svg>
                    </span>
                </div>
                </div>
                Wed
                </label>
            </div>
            <div className="w-1/7">
                <label
                htmlFor="isThursdayChecked"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                <input
                    type="checkbox"
                    id="isThursdayChecked"
                    className="sr-only"
                    onChange={handleThursdayCheckboxChange}
                />
                <div
                    className={`mr-1 flex h-5 w-5 items-center justify-center rounded border ${
                        isThursdayChecked && 'border-primary bg-gray dark:bg-transparent'
                    }`}
                >
                    <span className={`opacity-0 ${isThursdayChecked && '!opacity-100'}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                        strokeWidth="0.4"
                        ></path>
                    </svg>
                    </span>
                </div>
                </div>
                Thu
                </label>
            </div>
            <div className="w-1/7">
                <label
                htmlFor="isFridayChecked"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                <input
                    type="checkbox"
                    id="isFridayChecked"
                    className="sr-only"
                    onChange={handleFridayCheckboxChange}
                />
                <div
                    className={`mr-1 flex h-5 w-5 items-center justify-center rounded border ${
                        isFridayChecked && 'border-primary bg-gray dark:bg-transparent'
                    }`}
                >
                    <span className={`opacity-0 ${isFridayChecked && '!opacity-100'}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                        strokeWidth="0.4"
                        ></path>
                    </svg>
                    </span>
                </div>
                </div>
                Fri
                </label>
            </div>
            <div className="w-1/7">
                <label
                htmlFor="isSaturdayChecked"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                <input
                    type="checkbox"
                    id="isSaturdayChecked"
                    className="sr-only"
                    onChange={handleSaturdayCheckboxChange}
                />
                <div
                    className={`mr-1 flex h-5 w-5 items-center justify-center rounded border ${
                        isSaturdayChecked && 'border-primary bg-gray dark:bg-transparent'
                    }`}
                >
                    <span className={`opacity-0 ${isSaturdayChecked && '!opacity-100'}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                        strokeWidth="0.4"
                        ></path>
                    </svg>
                    </span>
                </div>
                </div>
                Sat
                </label>
            </div>
            <div className="w-1/7">
                <label
                htmlFor="isSundayChecked"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                <input
                    type="checkbox"
                    id="isSundayChecked"
                    className="sr-only"
                    onChange={handleSundayCheckboxChange}
                />
                <div
                    className={`mr-1 flex h-5 w-5 items-center justify-center rounded border ${
                        isSundayChecked && 'border-primary bg-gray dark:bg-transparent'
                    }`}
                >
                    <span className={`opacity-0 ${isSundayChecked && '!opacity-100'}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="#3056D3"
                        stroke="#3056D3"
                        strokeWidth="0.4"
                        ></path>
                    </svg>
                    </span>
                </div>
                </div>
                Sun
                </label>
            </div>
            
        </div>
        
    </div>
  );
};

export default DaysCheckbox;

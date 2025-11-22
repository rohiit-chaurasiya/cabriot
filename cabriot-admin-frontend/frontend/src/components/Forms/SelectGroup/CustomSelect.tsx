import React, { useState } from 'react';

const CustomSelect = ({ options, onChange, value, name, required }) => {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        Kitchen Name
      </label>
      <select
        value={value}
        onChange={handleInputChange}
        name={name}
        required={required}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="">Select Kitchen</option>
        {options.map((kitchen) => (
          <option key={kitchen.id} value={kitchen.name}>
            {kitchen.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;

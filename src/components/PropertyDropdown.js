import React, {useState, useEffect, useContext} from 'react';

import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import { Menu } from '@headlessui/react';

import { HouseContext } from './HouseContext';



const PropertyDropdown = () => {
  const { property, setProperty, properties} = useContext(HouseContext);

  const [isOpen, setIsOpen] = useState(false);

  // function when you select country, it puts arrow back up/
  function selectProperty(ctr) {
    setProperty(ctr)
    setIsOpen(!isOpen)
  }

  return (
    <Menu as="div" className="dropdown relative">
      {/* button style here */}
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiHome5Line className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{property}</div>
          <div className="text-[13px]">Select your property</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      {/* mapping the countries and setting country */}
      <Menu.Items className="dropdown-menu">
        {properties.map((property, index) => {
          return (
            <Menu.Item
              onClick={() => selectProperty(property)}
              className="cursor-pointer hover:text-violet-700 transition"
              as="li"
              key={index}
            >
              {property}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;


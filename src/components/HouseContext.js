import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../data";


export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('Location (any)')
  const [countries, setCountries] = useState([])

  const [property, setProperty] = useState('Property type (any)') 
  const [properties, setProperties] = useState([])
  
  const [price, setPrice] = useState('Price range (any)')

  const [loading, setLoading] = useState(false)


  // return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    })
    // remove dublicates
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)]

    // set countries state
    setCountries(uniqueCountries)
  },[])


// return arr properties
    useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    })
    // remove dublicates
    const uniqueProperties = ['Property (any)', ...new Set(allProperties)]

    // set countries state
    setProperties(uniqueProperties)
  },[])

  
  // handle click on Search icon
  const handleClick = () => {
    // set Loading
    setLoading(true);

    // create a fct that checks if the str includes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    }

    // get first value of price and parse it to nr
    const minPrice = parseInt(price.split(' ')[0])

    // get last value of price and parse it to nr
    const maxPrice = parseInt(price.split(' ')[2])

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // if all values are selected
      if (house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice) {
        return house;
      }

      // if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      // if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      // if property is not default
      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property;
      }

      // if price is not default
      if (isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // if country is default
      if (isDefault(country) && house.type === property && housePrice >=minPrice && housePrice <= maxPrice) {
        return house;
      }

      // if prperty is default
      if (house.country === country && isDefault(property) && housePrice >=minPrice && housePrice <= maxPrice) {
        return house;
      }

      // if price is default
      if (house.country === country && house.type === property && isDefault(price)) {
        return house;
      }
    })

    setTimeout(() => {
      return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
      setLoading(false);
    }, 1000)

  }

  return (
    <HouseContext.Provider
      value={{
        houses,
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        loading,
        handleClick
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;

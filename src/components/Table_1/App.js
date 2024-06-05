import React, { useState, useEffect } from 'react';
import '../Table_1/App.css';

function App() {
  const [selectedValues, setSelectedValues] = useState({
    fruit: 'Apple',
    color: 'Red',
    country: 'India',
    state: 'Karnataka',
    locality: 'Bangalore',
    buyer: false,
    seller: false
  });

  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem('tableData');
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    // Load selected values from local storage on page load
    const storedValues = JSON.parse(localStorage.getItem('selectedValues'));
    if (storedValues) {
      setSelectedValues(storedValues);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedValues(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    // Store selected values in local storage
    localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
    // Add selected values to table data array
    setTableData(prevData => [...prevData, selectedValues]);
    // Store table data in local storage
    localStorage.setItem('tableData', JSON.stringify([...tableData, selectedValues]));
  };

  const handleReset = () => {
    // Clear local storage and reset selected values
    localStorage.removeItem('selectedValues');
    setSelectedValues({
      country: 'India',
      state: 'Tamil Nadu',
      locality: 'Madurai',
      fruit: 'Banana',
      color: 'Green',
      buyer: false,
      seller: false
    });
    // Clear table data
    setTableData([]);
    localStorage.removeItem('tableData');
  };

  const indianStates = [
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
  ];

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    // Add more US states here
  ];

  const indianDistricts = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"],
    "Tamil Nadu": ["Chennai", "Madurai", "Coimbatore"]
  };

  const usCities = {
    "Alabama": ["Birmingham", "Montgomery", "Huntsville"],
    "Alaska": ["Anchorage", "Fairbanks", "Juneau"],
    "Arizona": ["Phoenix", "Tucson", "Mesa"],
    // Add more US cities here
  };

  const stateOptions = selectedValues.country === 'India' ? (
    indianStates.map(state => (
      <option key={state} value={state}>{state}</option>
    ))
  ) : (
    usStates.map(state => (
      <option key={state} value={state}>{state}</option>
    ))
  );

  const localityOptions = selectedValues.country === 'India' ? (
    selectedValues.state && indianDistricts[selectedValues.state] && indianDistricts[selectedValues.state].map(district => (
      <option key={district} value={district}>{district}</option>
    ))
  ) : (
    selectedValues.state && usCities[selectedValues.state] && usCities[selectedValues.state].map(city => (
      <option key={city} value={city}>{city}</option>
    ))
  );

  return (
    <div>
      <form>
        <label htmlFor="fruit">Fruit:</label>
        <select id="fruit" name="fruit" value={selectedValues.fruit} onChange={handleChange}>
          <option value="">Select a fruit</option>
          <option value="Apple">Apple</option>
          <option value="Banana">Banana</option>
          <option value="Cherry">Cherry</option>
        </select>

        <label htmlFor="color">Color:</label>
        <select id="color" name="color" value={selectedValues.color} onChange={handleChange}>
          <option value="">Select a color</option>
          <option value="Red">Red</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
        </select>
        
        <label htmlFor="country">Country:</label>
        <select id="country" name="country" value={selectedValues.country} onChange={handleChange}>
          <option value="">Select a country</option>
          <option value="India">India</option>
          <option value="US">US</option>
        </select>

        <label htmlFor="state">State:</label>
        <select id="state" name="state" value={selectedValues.state} onChange={handleChange}>
          <option value="">Select a state</option>
          {stateOptions}
        </select>

        <label htmlFor="locality">Locality:</label>
        <select id="locality" name="locality" value={selectedValues.locality} onChange={handleChange}>
          <option value="">Select a locality</option>
          {localityOptions}
        </select>

        <label htmlFor="buyer">Buyer:</label>
        <input type="checkbox" id="buyer" name="buyer" checked={selectedValues.buyer} onChange={handleChange} />
        
        <label htmlFor="seller">Seller:</label>
        <input type="checkbox" id="seller" name="seller" checked={selectedValues.seller} onChange={handleChange} />
        
        <button type="button" onClick={handleSubmit}>Filter</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>

      {/* Display selected values in a table */}
      <table border="1">
        <thead>
          <tr>
            <th>Country</th>
            <th>State</th>
            <th>Locality</th>
            <th>Fruit</th>
            <th>Color</th>
            <th>Buyer</th>
            <th>Seller</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.country}</td>
                <td>{rowData.state}</td>
                <td>{rowData.locality}</td>
                <td>{rowData.fruit}</td>
                <td>{rowData.color}</td>
                <td>{rowData.buyer ? 'Yes' : 'No'}</td>
                <td>{rowData.seller ? 'Yes' : 'No'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;


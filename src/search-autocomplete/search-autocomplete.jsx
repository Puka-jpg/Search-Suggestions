import React from "react";
import { useState, useEffect } from "react";
import Suggestions from "./suggestions";

function SearchComplete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event) {
    const querry = event.target.value.toLowerCase();
    setSearchParam(querry);
    if (querry.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(querry) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }

  function handleClick(event) {
    console.log(event.target.innerText);
    setShowDropDown(false);
    setSearchParam(event.target.innerText);
    setFilteredUsers([]);
  }

  async function fetchListofUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");

      const data = await response.json();

      console.log(data);
      if (data && data.users && data.users.length) {
        setUsers(data.users.map((userItem) => userItem.firstName));

        setError(null);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(`ERROR OCCURED:${error}`);
    }
  }

  useEffect(() => {
    fetchListofUsers();
  }, []);

  console.log(users, filteredUsers);

  return (
    <div className="search-autocomplete-container">
      {loading ? (
        <h1> Loading your data...</h1>
      ) : (
        <input
          name="search-complete"
          type="text"
          placeholder="Search Here"
          value={searchParam}
          onChange={handleChange}
        />
      )}

      {showDropDown && (
        <Suggestions handleClick={handleClick} data={filteredUsers} />
      )}
    </div>
  );
}

export default SearchComplete;

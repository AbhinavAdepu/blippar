import React, { useState, useEffect } from "react";
import { DebounceInput } from 'react-debounce-input'
import axios from 'axios'
import Highlighter from "./HightLighter";

const App = () => {
  const [filterList, setFilterList] = useState([]);
  const [ListArray, setListArray] = useState([]);
  const [textz, setTextz] = useState("");
  useEffect(() => {
    axios.get('https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words').then(response => {
      const result = (response.data).split(/[.\n-=/_]/);
      setListArray(result);
    })
  }, [])


  const doCityFilter = query => {
    setTextz(query);
    console.log(query.length)
    if ((query.length < 3)) return setFilterList([])
    setFilterList(ListArray.filter(
      city => city.toLowerCase().includes(query.toLowerCase())
    ))
  }

  return (
    <>
    <h1 className="mt-12" className="text-header">Coding Assignment : BlippAR(Abhinav Adepu)</h1>
  <h6 className="mt-12" className="text-header">(Applied Debounce 500ms)</h6>
    <div className="parent-container">
      <div className="container">
      <h3 className="mt-12">Search Below</h3>
      <form className="mt-3 mb-3">
        <DebounceInput
          className="px-2"
          placeholder="Type Keyword..."
          minLength={1}
          debounceTimeout={500}
          onChange={event => (doCityFilter(event.target.value))}
        />
      </form>

      <div>
        {filterList?.map((city, index) => (
          <p key={index}>
            <Highlighter text={city} highlight={textz}/>
          </p>
        ))}
        {filterList.length === 0 && <div>No Search Result Found!</div>}
      </div>
    </div>
    </div>
    </>
  )
}

export default App

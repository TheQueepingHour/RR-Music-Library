import './App.css';
import { useEffect, useState, Suspense } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { createResource as fetchData } from './helper'
import Spinner from './Spinner';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState(null)
  let [message, setMessage] = useState('Search for Music!')

  // useEffect(() => {
  //   if (searchTerm) {
  //     document.title=`${searchTerm} Music`
  //     const fetchData = async () => {
  //       const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
  //       const resData = await response.json()
  //       if(resData.results.length > 0) {
  //         setData(resData.results)
  //       } else {
  //         setMessage('Not Found')
  //       }
  //     }
  //     fetchData()
  // }
  // }, [searchTerm])

  useEffect(() => {
    if(searchTerm) {
      setData(fetchData(searchTerm))
    }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  const renderGallery = () => {
    if(data) {
      return(
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
    {renderGallery()}
    </div>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import '../App.scss';
import Header from './Header/Header';
import mockCompanyList from '../assets/mock/blocks.json'
import CompanyList from './CompanyList/CompanyList';
import { useDispatch, useSelector } from 'react-redux'
import { loadCompanies, getCompanies } from '../store/companySlice'
import SearchPanel from './SearchPanel/SearchPanel';
import { RootState } from '../store/store';

function App() {
  const dispatch = useDispatch()
  const [currentPage, setCurrentpage] = useState(0)
  const pressedButton = useSelector((state: RootState) => state.companyReducer.searchPressed)
  const searchedCompanies = useSelector((state: RootState) => state.companyReducer.searchedCompanies)
  const searchingStr = useSelector((state: RootState) => state.companyReducer.searchingStr)

  useEffect(() => {
    dispatch(loadCompanies(mockCompanyList))
  }, [dispatch])

  useEffect(() => {
    dispatch(getCompanies({ currentPage }))
  }, [currentPage, searchedCompanies, searchingStr])

  useEffect(() => {
    const app = document.querySelector('.App') as HTMLElement
    if (pressedButton !== 'selected') {
      app.addEventListener('scroll', scrollHandler)
    }
    return () => { app.removeEventListener('scroll', scrollHandler) }
  }, [pressedButton])

  const scrollHandler = (e: any) => {
    if (pressedButton === 'selected') return
    if (e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 150) {
      setCurrentpage((prev) => prev + 1)
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="body-container">
        <SearchPanel />
        <CompanyList />
      </div>

    </div>
  );
}

export default App;

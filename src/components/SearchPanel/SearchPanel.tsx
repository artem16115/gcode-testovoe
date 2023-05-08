import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './index.scss';
import classNames from 'classnames';
import searchIcon from '../../assets/icons/search.svg'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { changeSearchPressed, getSearchingCompanies, changeSearchingStr } from '../../store/companySlice';

const SearchPanel = () => {
    const pathname = window.location.pathname.substring(1)

    const [searchValue, setSearchValue] = useState('')
    const pressedButton = useSelector((state: RootState) => state.companyReducer.searchPressed)
    const dispatch = useDispatch()

    useEffect(() => {
        if (pathname !== '') setSearchValue(pathname)
    }, [pathname])

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            const timeOutId = setTimeout(() => {
                dispatch(getSearchingCompanies(searchValue))
                dispatch(changeSearchingStr(searchValue))
                window.history.replaceState({}, searchValue, `/${searchValue}`);
            }, 1000);
            return () => clearTimeout(timeOutId);
        }
    }, [searchValue]);

    return (
        <div className="search-panel">
            <div className="search-input-container" >
                <img className="search-icon" src={searchIcon} alt="search-icon" />
                <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search-input"
                    placeholder='Search by operation or DeFi company name'
                />
            </div>
            <div className="buttons">
                <button
                    className={classNames({ 'pressed': pressedButton === 'all', })}
                    onClick={() => {
                        dispatch(changeSearchPressed('all'))
                    }}
                >
                    all
                </button>
                <button
                    className={classNames({ 'pressed': pressedButton === 'selected', })}
                    onClick={() => {
                        dispatch(changeSearchPressed('selected'))
                    }}
                >
                    selected
                </button>
            </div>
        </div>
    );
}

export default SearchPanel;

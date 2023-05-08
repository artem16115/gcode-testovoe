import { createSlice, current } from '@reduxjs/toolkit'
import { ICompany } from '../components/Company/Company'

export interface CounterState {
    companies: ICompany[]
    viewCompanies: ICompany[]
    searchedCompanies: ICompany[] | []
    searchingStr: string
    searchPressed: 'all' | 'selected'
}

const initialState: CounterState = {
    companies: [],
    viewCompanies: [],
    searchedCompanies: [],
    searchingStr: '',
    searchPressed: 'all'
}

export const companyListSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        loadCompanies: (state, action) => {
            action.payload.forEach((element: ICompany) => {
                const newCompany = { ...element, selected: false }
                state.companies.push(newCompany)
            })
        },
        getCompanies: (state, action) => {
            const curPage = action.payload.currentPage * 20
            if (state.searchingStr.length) {
                for (let i = curPage; i < curPage + 20; i++) {
                    state.viewCompanies.push(state.searchedCompanies[i])
                }
            } else {
                for (let i = curPage; i < curPage + 20; i++) {
                    state.viewCompanies.push(state.companies[i])
                }
            }
        },
        selectCompany: (state, action) => {
            const index = state.companies.findIndex(company => company.id === action.payload.id)
            const indexView = state.viewCompanies.findIndex(company => company.id === action.payload.id)

            state.companies = [
                ...state.companies.slice(0, index),
                {
                    ...state.companies[index],
                    selected: !state.companies[index].selected,
                },
                ...state.companies.slice(index + 1),
            ]
            state.viewCompanies = [
                ...state.viewCompanies.slice(0, indexView),
                {
                    ...state.viewCompanies[indexView],
                    selected: !state.viewCompanies[indexView].selected,
                },
                ...state.viewCompanies.slice(indexView + 1),
            ]

        },
        changeSearchPressed: (state, action) => {
            state.searchPressed = action.payload
        },
        getSearchingCompanies: (state, action) => {
            const str = action.payload.toLowerCase()
            state.searchedCompanies = state.companies.filter(company => company.title.toLowerCase().includes(str) || company.description.toLowerCase().includes(str))
            state.viewCompanies = []
        },
        changeSearchingStr: (state, action) => {
            state.searchingStr = action.payload
        },
    },
})

export const {
    loadCompanies,
    selectCompany,
    getCompanies,
    changeSearchPressed,
    getSearchingCompanies,
    changeSearchingStr
} = companyListSlice.actions

export default companyListSlice.reducer
import React, { useEffect, useState } from 'react';
import './index.scss';
import { Company } from '../Company/Company';
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { ICompany } from '../Company/Company'

const CompanyList = () => {
    const [companies, setCompanies] = useState<ICompany[]>([])
    const viewCompanies = useSelector((state: RootState) => state.companyReducer.viewCompanies)
    const allCompanies = useSelector((state: RootState) => state.companyReducer.companies)
    const pressedButton = useSelector((state: RootState) => state.companyReducer.searchPressed)



    console.log(allCompanies, 'allCompanies')

    useEffect(() => {
        if (pressedButton === 'selected') {
            setCompanies([...viewCompanies.filter(company => !!company.selected)])
        } else {
            setCompanies([...viewCompanies])
        }
    }, [pressedButton, viewCompanies, allCompanies])

    return (
        <div className='company-list'>
            {companies.map(company => <Company {...company} key={company.id} />)}
        </div>

    );
}

export default CompanyList;

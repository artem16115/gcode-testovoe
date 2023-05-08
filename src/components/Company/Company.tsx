import React, { useEffect } from 'react';
import './index.scss';
import oneBlock from '../../assets/icons/one-block.svg'
import twoBlocks from '../../assets/icons/two-blocks.svg'
import threeBlock from '../../assets/icons/three-blocks.svg'
import moreThreeBlocks from '../../assets/icons/more-three-blocks.svg'
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux'
import { selectCompany } from '../../store/companySlice'
import { RootState } from '../../store/store';

export interface ICompany {
    address: string;
    blocksCount: number;
    description: string;
    id: string;
    title: string;
    selected?: boolean;
}

const viewCorrectIcon = (count: number) => {
    switch (count) {
        case 1:
            return oneBlock
        case 2:
            return twoBlocks
        case 3:
            return threeBlock
        default:
            return moreThreeBlocks
    }
}

export const Company = ({ id, address, title, description, blocksCount, selected }: ICompany) => {

    const searchingStr = useSelector((state: RootState) => state.companyReducer.searchingStr)

    const createUnderlineStr = (str: string) => {
        const myStr = str.toLowerCase()
        const searchStrCount = searchingStr.length
        if (myStr.includes(searchingStr.toLowerCase())) {
            const index = myStr.indexOf(searchingStr.toLowerCase())
            const staticStr = str.substring(index, index + searchStrCount)

            return <>
                {str.substring(0, index)}
                <span className='underlined'>
                    {staticStr}
                </span>
                {str.substring(index + searchStrCount)}
            </>
        }
        return str
    }

    const buttonClassNames = classNames({
        selected: selected
    })

    const dispatch = useDispatch()

    return (
        <div className="company-container">
            <div className="gradient-block" />
            <div className='icon-block'>
                <img alt="one-block" src={viewCorrectIcon(blocksCount)} className="icon" />
                <span className='blocks-count'>{`${blocksCount} block${blocksCount > 1 ? 's' : ''}`}</span>
            </div>
            <div className='description-container'>
                <span className='title'>{createUnderlineStr(title)}</span>
                <span className='description'>{createUnderlineStr(description)}</span>
            </div>
            <div className='buttons-container'>
                <button onClick={() => { }}>Details</button>
                <button onClick={() => dispatch(selectCompany({ id }))} className={buttonClassNames}>{selected ? 'Skip Selection' : 'Mark as Suitable'}</button>
            </div>
        </div>
    );
}

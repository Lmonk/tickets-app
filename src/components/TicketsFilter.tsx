import React, {useState} from 'react';
import i18n from 'i18next';
import { useDispatch, useSelector } from "react-redux";
import { filterOptionsSelector, updateActiveFilterIDs, activeFilterIDsSelector } from "../redux/tickets/ticketsSlice";
import filterOptionsHooks from "../hooks/filter.hooks";
import { IFilterOption } from '../models/filterOptions';

const getFilterName = (el: IFilterOption): string => {
  const { amount: count } = el;
  switch (el.amount) {
    case -1:
      return i18n.t(`transfer.all`)
    case 0:
      return i18n.t(`transfer.zero_transfer`)
    case 1:
      return i18n.t(`transfer.transfer`, {count})
    default: 
      return i18n.t(`transfer.transfers`, {count})
  }
}

const TicketsFilter = (): JSX.Element => {
  const dispatch = useDispatch();
  filterOptionsHooks.useGetFilterOptions();

  const filters = useSelector(filterOptionsSelector);
  const activeFilters = useSelector(activeFilterIDsSelector);

  return (
    <div className="filter-selector">
      <div className="title">{i18n.t('transfer.title')}</div>
      {
        filters.map((el) => {
          return (
            <div className="filter-option" key={el.id}>
              <label className={activeFilters.includes(el.amount) ? 'checked' : ''} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(updateActiveFilterIDs(el))
              }}>
                <div className="checkmark"></div>
                <div className="name">{getFilterName(el)}</div>
                <input type="checkbox" />
              </label>
            </div>
          )
        })
      }
    </div>
  );
};


export default TicketsFilter;
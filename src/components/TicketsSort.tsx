import React, {useState} from 'react';
import i18n from 'i18next';
import { useDispatch, useSelector } from "react-redux";
import { sortOptionsSelector, setActiveSortTypeID, activeSortTypeIDSelector } from "../redux/tickets/ticketsSlice";
import sortOptionsHooks from "../hooks/sort.hooks";

const TicketsSort = (): JSX.Element => {
  const dispatch = useDispatch();
  sortOptionsHooks.useGetSortOptions();

  const sortOptions = useSelector(sortOptionsSelector);
  const activeSelectedID = useSelector(activeSortTypeIDSelector);
  const isSelected = (id: string): boolean => id === activeSelectedID;
  return (
    <div className="sort-selector">
      {
        sortOptions.map((el) => {
          return <div className={`sort-option ${isSelected(el.id) ? 'selected' : ''}`} key={el.id} onClick={() => dispatch(setActiveSortTypeID(el.id))}>{i18n.t(el.id)}</div>
        })
      }
    </div>
  );
};

export default TicketsSort;

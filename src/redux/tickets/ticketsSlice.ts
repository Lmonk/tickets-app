import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ITicket } from "../../models/tickets";
import { ISortOption } from "../../models/sortOptions";
import { IFilterOption } from "../../models/filterOptions";
import { sortFastest, sortOptimal, sortCheapest } from "../../utils/sort";

interface ITicketsState {
  all: ITicket[];
  showAmount: number;
  sortOptions: ISortOption[];
  filterOptions: IFilterOption[];
  activeFilterIDs: number[];
  activeSortTypeID: string;
}

const initialState = {
  all: [],
  showAmount: 5,
  sortOptions: [],
  filterOptions: [],
  activeFilterIDs: [],
  activeSortTypeID: "cheapest",
} as ITicketsState;

const slice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<ITicket[]>) => ({
      ...state,
      all: action.payload,
    }),
    addShowAmount: (state, action: PayloadAction<number>) => ({
      ...state,
      showAmount: state.showAmount + action.payload,
    }),
    setSortOptions: (state, action: PayloadAction<ISortOption[]>) => ({
      ...state,
      sortOptions: action.payload,
    }),
    setFilterOptions: (state, action: PayloadAction<IFilterOption[]>) => ({
      ...state,
      filterOptions: action.payload,
    }),
    updateActiveFilterIDs: (state, action: PayloadAction<IFilterOption>) => {
      const amount = action.payload.amount;
      const isActive = state.activeFilterIDs.includes(amount);

      return {
        ...state,
        activeFilterIDs: isActive
          ? state.activeFilterIDs.filter((filter) => filter !== amount)
          : [...state.activeFilterIDs, amount],
      };
    },
    setActiveSortTypeID: (state, action: PayloadAction<string>) => ({
      ...state,
      activeSortTypeID: action.payload,
    }),
  },
});

export const ticketsSelector = (state: RootState) => state.tickets.all;
export const showAmountSelector = (state: RootState) =>
  state.tickets.showAmount;
export const sortOptionsSelector = (state: RootState): ISortOption[] =>
  state.tickets.sortOptions;
export const filterOptionsSelector = (state: RootState) =>
  state.tickets.filterOptions;
export const activeFilterIDsSelector = (state: RootState) =>
  state.tickets.activeFilterIDs;
export const activeSortTypeIDSelector = (state: RootState) =>
  state.tickets.activeSortTypeID;

export const ticketsToShowSelector = createSelector(
  [
    ticketsSelector,
    showAmountSelector,
    activeSortTypeIDSelector,
    activeFilterIDsSelector,
  ],
  (tickets, toShow, sortType, activeFilters) => {
    let result: ITicket[] = [];
    const tempResult = [...tickets];

    if (activeFilters.length > 0) {
      if (activeFilters.includes(-1)) {
        result = tempResult;
      } else {
        if (activeFilters.includes(0)) {
          result.push(...tempResult.filter((e) => e.route.length == 2));
        }

        if (activeFilters.includes(1)) {
          result.push(...tempResult.filter((e) => e.route.length == 3));
        }

        if (activeFilters.includes(2)) {
          result.push(...tempResult.filter((e) => e.route.length == 4));
        }

        if (activeFilters.includes(3)) {
          result.push(...tempResult.filter((e) => e.route.length == 5));
        }
      }
    } else {
      result = tempResult;
    }

    if (sortType) {
      switch (sortType) {
        case "fastest":
          result = sortFastest(result);
          break;
        case "optimal":
          result = sortOptimal(result);
          break;
        case "cheapest":
        default:
          result = sortCheapest(result);
          break;
      }
    }

    return result.slice(0, toShow);
  }
);

export const ticketsReducer = slice.reducer;
export const {
  setTickets,
  addShowAmount,
  setSortOptions,
  setFilterOptions,
  setActiveSortTypeID,
  updateActiveFilterIDs,
} = slice.actions;

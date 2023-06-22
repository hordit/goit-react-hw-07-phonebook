import { createSelector, createSlice } from '@reduxjs/toolkit';

import { addContact, deleteContact, fetchContacts } from './operations';

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.contacts.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteeredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const filteredcontacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredcontacts;
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

const pendingReducer = state => {
  state.isLoading = true;
};

const rejectedReducer = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const fetchContactsFulfilledReducer = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = payload;
};

const addContactFulfilledReducer = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(payload);
};

const deleteContactFulfilledReducer = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = state.items.filter(item => item.id !== payload.id);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, pendingReducer)
      .addCase(fetchContacts.fulfilled, fetchContactsFulfilledReducer)
      .addCase(fetchContacts.rejected, rejectedReducer)
      .addCase(addContact.pending, pendingReducer)
      .addCase(addContact.fulfilled, addContactFulfilledReducer)
      .addCase(addContact.rejected, rejectedReducer)
      .addCase(deleteContact.pending, pendingReducer)
      .addCase(deleteContact.fulfilled, deleteContactFulfilledReducer)
      .addCase(deleteContact.rejected, rejectedReducer),
});

export const contactsReducer = contactsSlice.reducer;
export const { setFilter } = contactsSlice.actions;

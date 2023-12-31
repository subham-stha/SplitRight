import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
    imageFile: {}
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
      setExpensesDetails(state,actions) {
        // debugger;
        const {file} = actions.payload
        return{//adding image file object on existing state
          ...state,
          imageFile:file,
        }
      },
    },
  })
export const { setExpensesDetails} = expensesSlice.actions;
export default expensesSlice.reducer;
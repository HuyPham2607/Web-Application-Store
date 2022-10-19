import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
        licensed: false,
        condition: false,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price;
        },
        DeleteProduct: (state, action) => {
            state.quantity -= 1;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload.id._id),
                1,
            );
            state.total = state.total - action.payload.id.price;
        },
        updateLicensed: (state) => {
            state.licensed = true;
        },
        updateLicensedfalse: (state) => {
            state.licensed = false;
        },
        Complete: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.condition = true;
        },
    },
});

export const { addProduct, DeleteProduct, Complete, updateLicensed, updateLicensedfalse } = cartSlice.actions;
export default cartSlice.reducer;

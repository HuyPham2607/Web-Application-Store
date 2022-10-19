import { createSlice } from '@reduxjs/toolkit';

export const ProductsSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductsSuccess: (state, action) => {
            state.isFetching = true;
            state.products = action.payload;
        },
        getProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        DeleteProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        DeleteProductsSuccess: (state, action) => {
            state.isFetching = true;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),
                1,
            );
        },

        DeleteProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        UpdateProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        UpdateProductsSuccess: (state, action) => {
            state.isFetching = true;
            state.products[state.products.findIndex((item) => item.id === action.payload)] = action.payload.user;
        },

        UpdateProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        AddProductsStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        AddProductsSuccess: (state, action) => {
            state.isFetching = true;
            state.products.push(action.payload);
        },

        AddProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    DeleteProductsStart,
    DeleteProductsSuccess,
    DeleteProductsFailure,
    UpdateProductsStart,
    UpdateProductsSuccess,
    UpdateProductsFailure,
    AddProductsStart,
    AddProductsSuccess,
    AddProductsFailure,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;

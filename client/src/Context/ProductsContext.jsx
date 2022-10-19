import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const ProductContext = createContext();

function ProductsContext({ children }) {
    const [data, setData] = useState([]);
    const [sizes, setSizes] = useState();
    const addItem = async (e, sizedata) => {
        setData([...data, e]);
        setSizes(sizedata);
    };

    const removeItem = async (e) => {
        const remove = data.filter((data) => data._id != e._id);
        setData(remove);
    };

    const ProductsData = { addItem, data, sizes, removeItem };
    return <ProductContext.Provider value={ProductsData}>{children}</ProductContext.Provider>;
}

export default ProductsContext;

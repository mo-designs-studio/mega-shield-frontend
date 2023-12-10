import { LoadData } from './';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '@/api/endpoints/products';

export const handleGetAllProducts: LoadData = async (_, getState) => {
    const { setProductsState } = getState!();
    const { response, error } = await getAllProducts();
    if (!error && response.status == 200) setProductsState(response.data?.products);
};

export const handlePostAddProduct: LoadData = async (payload, getState) => {
    const { productsState, setProductsState } = getState!();
    const { response, error } = await addProduct(payload);
    if (!error && response.status == 201) {
        const updatedState = [...productsState];
        updatedState.push(response.data.product);
        setProductsState(updatedState);
    }
};

export const handlePatchUpdateProduct: LoadData = async (payload, getState) => {
    const { productsState, setProductsState } = getState!();
    const { response, error } = await updateProduct(payload);
    if (!error && response.status == 200) {
        const willUpdatedIndex = productsState.findIndex((product: any) => product._id == payload.id);
        const updatedState = [...productsState];
        updatedState[willUpdatedIndex] = response.data.product;
        setProductsState(updatedState);
    }
};

export const handleDeleteProduct: LoadData = async (payload, getState) => {
    const { productsState, setProductsState } = getState!();
    const { response, error } = await deleteProduct(payload);
    if (!error && response.status == 200) {
        const updatedState = productsState.filter((product: any) => product._id != payload.id)
        setProductsState(updatedState);
    }
}

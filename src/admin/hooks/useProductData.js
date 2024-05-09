import { useDispatch, useSelector } from "react-redux";

import { useAlertMessage } from "../../ui/hooks/useAlertMessage.js";
import elMerkadeoAPI from "../../api/elMerkadeoAPI.js";
import { onAddImageProduct, onClearSearch, onEditDataProduct, onEditStateProduct, onSearchProduct } from "../../store/slices/productsAdminSlice.js";
import { onLoadedProducts, onAddedProduct, onSearchProductUser } from "../../store/slices/productsUserSlice.js";


export const useProductData = () => {

    const dispatch = useDispatch();
    const { startOpenAlert } = useAlertMessage();

    const { isAdminAuth } = useSelector( state => state.adminAuth );

    const gettProducts = async() => {
        try {
            const { data } = await elMerkadeoAPI.get('products/get-products');
            dispatch( onLoadedProducts( data.catalog ) );
        } catch (error) {
            console.log( error );
        }
    };

    const addProduct = async( form ) => {
        const urlImages = JSON.parse(localStorage.getItem('urlImages'))
        const newForm = { ...form, 'images': urlImages };
        try {
            const { data } = await elMerkadeoAPI.post('/products/add-product', newForm );
            dispatch( onAddedProduct( data.product ) );
            localStorage.removeItem('urlImages');
            startOpenAlert({
                title: 'El producto fue creado exitosamente',
                text: 'El producto ya está disponible en el catalogo',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un error al crear el nuevo producto',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }
    };

    const searchProduct = async( form ) => {
        try {
            const { data } = await elMerkadeoAPI.post('/products/search-product', form );
            if( !data.product.length ) {
                startOpenAlert({
                    title: 'No hay coincidencias para el término de búsqueda',
                    text: 'Intenta buscar con otro término',
                    button: true,
                });
                return false;
            }
            if ( isAdminAuth ) {
                dispatch( onSearchProduct( data.product ) );
                return true;
            }
            else {
                dispatch( onSearchProductUser( data.product) );
                return true;
            }
        } catch (error) {
            console.log( error );
                startOpenAlert({
                    title: 'No se pudo realizar la búsqueda',
                    text: 'Intenta más tarde',
                    button: true,
                });
                return false;
        }
    };

    const clearSearch = () => {
        dispatch( onClearSearch() );
    };

    const changeEditStateProduct = ( product, urlImages ) => {
        dispatch( onEditStateProduct( [product, urlImages] ) );
        return true;
    };

    const deleteImageDB = async( imagesUpdated, id ) => {
        try {
            await elMerkadeoAPI.put(`/products/delete-product-image/${ id }`, { imagesUpdated }); 
            startOpenAlert({
                title: 'La imagen se eliminó correctamente',
                text: 'El catálogo está actualizado',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'No se pudo realizar la eliminación de la imagén',
                text: 'Intenta más tarde',
                button: true,
            })
            return false;
        }
    };
    
    const addImageProduct = async( product, id ) => {
        try {
            const imagesArray = await JSON.parse( localStorage.getItem('urlImages') );
            const { data } = await elMerkadeoAPI.put(`/products/add-product-images/${ id }`, { imagesArray });
            localStorage.removeItem('urlImages');
            dispatch( onAddImageProduct([ product, data.product.images ]) );
            startOpenAlert({
                title: 'Las imágenes se aregaron exitosamente',
                text: 'Ya están disponibles en tu catálogo',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'No se pudo agregar la imagén',
                text: 'Intenta más tarde',
                button: true,
            })
            return false;
        }
    };

    const editDataProduct = ( product, urlImages ) => {
        dispatch( onEditDataProduct([ product, urlImages ]) );
        return true;
    };

    const saveEditDataProduct = async( form, id ) => {
        try {
            const { data } = await elMerkadeoAPI.put(`/products/edit-product-data/${ id }`, form );
            dispatch( onEditStateProduct([ [data.updatedProduct], data.updatedProduct.images ]) );
            startOpenAlert({
                title: 'El producto fue editado exitosamente',
                text: 'La información del producto está actualizada',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un error al editar la información del producto',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }
    };

    const soldOutProduct = async( id, products ) => {
        try {
            const { data } = await elMerkadeoAPI.put(`/products/soldout-product/${ id }`);
            const productUserUpdated = [...products, data.product]; 
            dispatch( onEditStateProduct([ [data.product], data.product.images ]) );
            dispatch( onLoadedProducts( productUserUpdated ) );
            startOpenAlert({
                title: `${ data.product.isSoldOut ? 'El producto se ha marcado como agotado' : 'El producto se ha reactivado' }`,
                text: `${ data.product.isSoldOut ? 'Ya no se podrá comprar' : 'Ya está disponible para venta' }`,
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un error al editar la información del producto',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }
    };

    return {
        gettProducts,
        addProduct,
        searchProduct,
        clearSearch,
        changeEditStateProduct,
        deleteImageDB,
        addImageProduct,
        editDataProduct,
        saveEditDataProduct,
        soldOutProduct,
    };
};
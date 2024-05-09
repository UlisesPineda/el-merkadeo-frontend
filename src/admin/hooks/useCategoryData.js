import { useDispatch } from "react-redux";
import elMerkadeoAPI from "../../api/elMerkadeoAPI.js";
import { useAlertMessage } from "../../ui/hooks/useAlertMessage.js";
import { onAddCategory, onDeleteCategory, onLoadedCategories } from "../../store/slices/categorySlice.js";

export const useCategoryData = () => {

    const { startOpenAlert } = useAlertMessage();
    const dispatch = useDispatch();

    const getCategories = async() => {
        try {
            const { data } = await elMerkadeoAPI.get('category/get-categories');
            if ( !data.categories.length ){
                return;
            }
            else {
                dispatch( onLoadedCategories( data.categories ) );
            }
        } catch (error) {
            console.log( error );
        }
    };

    const addCategory = async( form ) => {
        const image = JSON.parse(localStorage.getItem('urlImages'));
        const category = { ...form, image }
        try {
            const { data } = await elMerkadeoAPI.post('category/create-category', category );
            localStorage.removeItem('urlImages');
            dispatch( onAddCategory( data.category ) );
            startOpenAlert({
                title: 'Se creo la categoría exitosamente',
                text: 'Se agrego la categoría al catálogo',
                button: true,
            });
            return true;    
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un problema al crear la categoría',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }   
    };

    const deleteCategory = async( id, form ) => {
        try {
            await elMerkadeoAPI.delete(`category/delete-category/${ id }`);
            dispatch( onDeleteCategory( form ) );
            startOpenAlert({
                title: 'La categoría fue eliminada exitosamente',
                text: 'Las categorías están actualizadas',
                button: true,
            });
            return true;
        } catch (error) {
            startOpenAlert({
                title: 'Hubo un problema al eliminar la categoría',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }
    };

    return {
        getCategories,
        addCategory,
        deleteCategory,
    };
};
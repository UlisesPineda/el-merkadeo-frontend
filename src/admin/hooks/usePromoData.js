import { useDispatch } from "react-redux";

import { useAlertMessage } from "../../ui/hooks/useAlertMessage.js";
import elMerkadeoAPI from "../../api/elMerkadeoAPI.js";
import { onAddedPromo, onLoadedPromos } from "../../store/slices/promoSlice.js";

export const usePromoData = () => {

    const dispatch = useDispatch();
    const { startOpenAlert } = useAlertMessage();

    const getPromos = async() => {
        try {
            const { data } = await elMerkadeoAPI.get('promos/get-promos');
            if( !data.promos.length ){
                return;
            }
            else {
                dispatch( onLoadedPromos( data.promos ) );
            }
        } catch (error) {
            console.log( error );
        }
    };

    const addPromo = async( form ) => {
        const image = JSON.parse(localStorage.getItem('urlImages'));
        const promo = { ...form, image }
        try {
            const { data } = await elMerkadeoAPI.post('/promos/add-promo', promo);
            localStorage.removeItem('urlImages');
            dispatch( onAddedPromo( data.promo ) );
            startOpenAlert({
                title: 'La promoción fue creada exitosamente',
                text: 'La promoción ya se puede visualizar en el slide principal',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un error al crear la promoción',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }
    };

    const deletePromo = async( id, updatedPromos ) => {
        try {
            await elMerkadeoAPI.delete(`promos/delete-promo/${ id }`);
            dispatch( onLoadedPromos( updatedPromos ) );
            startOpenAlert({
                title: 'La promoción fue eliminada exitosamente',
                text: 'El slider de promociones ha sido actualizado',
                button: true,
            });
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un error al eliminar la promoción',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }
    };

    return {
        addPromo,
        getPromos,
        deletePromo,
    };
};
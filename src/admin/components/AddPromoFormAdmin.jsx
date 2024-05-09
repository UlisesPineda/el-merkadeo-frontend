import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
    promoProductContainer,
    formAddPromo,
    inputContainer,
    promoInfoContainer,
    promoContainer,
    title,
    subtitle,
    imageContainer,
    dataPromo,
    deleteButtonContainer,
    deleteButton,
} from './styles/AddPromoFormAdmin.module.css';
import { PromoContainer } from './PromoContainer';

export const AddPromoFormAdmin = ({ 
    handleAddpromo, 
    handleAddPromoChange, 
    handleDeletePromo,
    promoItem, 
    promoDescription,
    urlPromo,
    handleFiles,
    isMounted,
}) => {

    const { isLoadedPromos, promos } = useSelector( state => state.promo );

  return (
    <div
        className={ promoProductContainer }
    >
        <span
            className={ title }
        >
            Agregar Nueva Promoción (Slider Principal)
        </span>
        <form
            className={ formAddPromo }
            onSubmit={ handleAddpromo }
        >
            <div
                className={ inputContainer }
            >
                <label htmlFor='promoItem'>Nombre de la promoción:</label>
                <input 
                    type='text' 
                    name='promoItem' 
                    placeholder='Ingresa el nombre' 
                    id='promoItem'
                    onChange={ handleAddPromoChange }
                    value={ promoItem }
                />
            </div>
            <div
                className={ inputContainer }
            >
                <label htmlFor='promoDescription'>Descripción:</label>
                <input 
                    type='text' name='promoDescription' 
                    placeholder='Describe la promoción' 
                    id='promoDescription'
                    onChange={ handleAddPromoChange } 
                    value={ promoDescription }
                />
            </div>
            <div
                className={ inputContainer }
            >
                <label htmlFor='urlPromo'>Link de la promoción:</label>
                <input 
                    type='text' name='urlPromo' 
                    placeholder='Agrega el enlace a la promoción' 
                    id='urlPromo'
                    onChange={ handleAddPromoChange } 
                    value={ urlPromo }
                />
            </div>
            <div
                className={ inputContainer }
            >
                <label htmlFor='promoImage'>Imagen del slide:</label>
                <input type='file' id='promoImage' onChange={ handleFiles } key={ isMounted }/>
            </div>
            <div
                className={ inputContainer }
            >
                <button
                    type='submit'
                >
                    AGREGAR PROMOCIÓN

                </button>
            </div>
        </form>
        <div
            className={ promoInfoContainer }
        >
            <span
                className={ subtitle }
            >
                { promos.length ? 'Promociones Vigentes:' : 'Aún no hay promociones activas' }
            </span>
            {
                isLoadedPromos &&
                    promos.map( ( promo ) => {
                            return (
                                <PromoContainer 
                                    key={ promo._id }
                                    dataPromo={ dataPromo }
                                    deleteButton={ deleteButton }
                                    deleteButtonContainer={ deleteButtonContainer }
                                    imageContainer={ imageContainer }
                                    promoContainer={ promoContainer }
                                    handleDeletePromo={ handleDeletePromo }
                                    title={ promo.promoItem }
                                    description={ promo.promoDescription }
                                    imageUrl={ promo.image[0].url }
                                    dataId={ promo._id }
                                />
                            )
                        }
                    )
            }
        </div>
    </div>
  );
};

AddPromoFormAdmin.propTypes = {
    handleAddPromoChange: PropTypes.func.isRequired,
    handleAddpromo: PropTypes.func.isRequired,
    handleFiles: PropTypes.func.isRequired,
    handleDeletePromo: PropTypes.func.isRequired,
    promoDescription: PropTypes.string.isRequired,
    promoItem: PropTypes.string.isRequired,
    urlPromo: PropTypes.string.isRequired,
    isMounted: PropTypes.bool.isRequired,
};
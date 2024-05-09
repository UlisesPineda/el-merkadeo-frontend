import PropTypes from 'prop-types';

export const PromoContainer = ({ 
    promoContainer,
    imageContainer,
    dataPromo,
    deleteButtonContainer,
    handleDeletePromo,
    deleteButton,
    imageUrl,
    title,
    description,
    dataId,
}) => {
  return (
    <div
    className={ promoContainer }
    >
        <div
            className={ imageContainer }
        >
            <img src={ imageUrl } alt={ title } />
        </div>
        <div
            className={ dataPromo }
        >
            <p>{ title }</p>
        </div>
        <div
            className={ dataPromo }
        >
            <p>{ description }</p>
        </div>
        <div
            className={ deleteButtonContainer }
        >
            <button 
                className={ deleteButton }
                onClick={ handleDeletePromo }
                data-id={ dataId }
                title='Eliminar promoción'
            >
                X
            </button>
        </div>
    </div>
  );
};

PromoContainer.propTypes = {
    handleDeletePromo: PropTypes.func.isRequired,
    deleteButtonContainer: PropTypes.string.isRequired,
    imageContainer: PropTypes.string.isRequired,
    promoContainer: PropTypes.string.isRequired,
    deleteButton: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dataPromo: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    dataId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

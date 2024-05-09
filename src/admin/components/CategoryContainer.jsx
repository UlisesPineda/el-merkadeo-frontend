import PropTypes from 'prop-types';

export const CategoryContainer = ({
    categoryContainer,
    imageContainer,
    imageUrl,
    title,
    dataCategory,
    description,
    editButtonContainer,
    deleteButton,
    handleDeleteCatgory,
    dataId,
}) => {
  return (
    <div
    className={ categoryContainer }
    >
        <div
            className={ imageContainer }
        >
            <img src={ imageUrl } alt={ title } />
        </div>
        <div
            className={ dataCategory }
        >
            <p>{ title }</p>
        </div>
        <div
            className={ dataCategory }
        >
            <p>{ description }</p>
        </div>
        <div
            className={ editButtonContainer }
        >
            <button 
                className={ deleteButton }
                onClick={ handleDeleteCatgory }
                data-id={ dataId }
                title='Eliminar Categoría'
            >
                X
            </button>
        </div>
    </div>
  );
};

CategoryContainer.propTypes = {
    handleDeleteCatgory: PropTypes.func.isRequired,
    categoryContainer: PropTypes.string.isRequired,
    imageContainer: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dataCategory: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    editButtonContainer: PropTypes.string.isRequired,
    deleteButton: PropTypes.string.isRequired,
    dataId: PropTypes.string.isRequired,
};
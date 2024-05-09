import PropTypes from 'prop-types';

import {
    title,
    addCategoryContainer,
    formAddCategory,
    inputContainer,
    categoryInfoContainer,
    categoryContainer,
    dataCategory,
    imageContainer,
    editButtonContainer,
    deleteButton,
    subtitle,
} from './styles/AddCategoryFormAdmin.module.css';
import { CategoryContainer } from './CategoryContainer';
import { useSelector } from 'react-redux';

export const AddCategoryFormAdmin = ({ 
    handleAddCategory,  
    handleAddCategoryChange,
    handleDeleteCatgory,
    categoryTitle,
    categoryDescription,
    handleFiles,
    isMounted,
}) => {

    const {isLoadedCategories, categories } = useSelector( state => state.category );

  return (
    <div
        className={ addCategoryContainer }
    >
        <span
            className={ title }
        >
            Crear Nueva Categoría (Categoría de Producto)
        </span>
        <form
            className={ formAddCategory }
            onSubmit={ handleAddCategory }
        >
            <div
                className={ inputContainer }
            >
                <label htmlFor='categoryTitle'>Nombre de la categoría:</label>
                <input 
                    type='text' 
                    name='categoryTitle' 
                    placeholder='Ingresa la nueva categoría' 
                    id='categoryTitle'
                    onChange={ handleAddCategoryChange }
                    value={ categoryTitle }
                />
            </div>
            <div
                className={ inputContainer }
            >
                <label htmlFor='categoryDescription'>Descripción Corta:</label>
                <input 
                    type='text' name='categoryDescription' 
                    placeholder='Describe la categoría' 
                    id='categoryDescription'
                    onChange={ handleAddCategoryChange } 
                    value={ categoryDescription }
                />
            </div>
            <div
                className={ inputContainer }
            >
                <label htmlFor='categoryImage'>Imagen de la categoría:</label>
                <input type='file' id='categoryImage' onChange={ handleFiles } key={ isMounted }/>
            </div>
            <div
                className={ inputContainer }
            >
                <button
                    type='submit'
                >
                    AGREGAR CATEGORÍA

                </button>
            </div>
        </form>
        <div
            className={ categoryInfoContainer }
        >
            <span
                className={ subtitle }
            >
                Categorías Vigentes:
            </span>
            {
                isLoadedCategories && 
                    categories.map(
                        ( category ) => {
                            return (
                                <CategoryContainer 
                                    key={ category._id }
                                    categoryContainer={ categoryContainer }
                                    imageContainer={ imageContainer }
                                    dataCategory={ dataCategory }
                                    title={ category.categoryTitle }
                                    description={ category.categoryDescription }
                                    imageUrl={ category.image[0].url }
                                    dataId={ category._id }
                                    editButtonContainer={ editButtonContainer }
                                    deleteButton={ deleteButton }
                                    handleDeleteCatgory={ handleDeleteCatgory }
                                />            
                            )
                        }
                    )
            }
        </div>
    </div>
  );
};

AddCategoryFormAdmin.propTypes = {
    handleAddCategoryChange: PropTypes.func.isRequired,
    handleAddCategory: PropTypes.func.isRequired,
    handleFiles: PropTypes.func.isRequired,
    handleDeleteCatgory: PropTypes.func.isRequired,
    categoryDescription: PropTypes.string.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    isMounted: PropTypes.bool.isRequired,
};

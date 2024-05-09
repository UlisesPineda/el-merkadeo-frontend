import PropTypes from 'prop-types';

import {
  searchProductContainer,
  searchForm,
  resultsContainer,
  imageContainer,
  dataContainer,
  imageBox,
  data,
  imageButton,
  searchButton,
  addImageButton,
  searchItemForm,
  dataButton,
  dataContainerEdit,
  isNotSoldOutCss,
  isSoldOutCss,
  title,
  copy,
} from './styles/SearchProductFormAdmin.module.css';
import { DataContainerProduct } from './DataContainerProduct';

export const SearchProductFormAdmin = ({ 
  handleSoldoutProduct,
  handleEditDataProduct,
  handleSaveDataProduct,
  handleSearchProduct, 
  handleSearchChange, 
  handleClipBoard,
  handleAddImage,
  handleFiles,
  handleChange,
  productData,
  queryItem, 
  isLoadAdminProds,
  isMounted,
  adminProducts,
  handleClearSearch,
  handleDeleteImage,
  adminImages,
  isEdit,
  isEditData,
  textCopied,
}) => {
  return (
    <div
      className={ searchProductContainer }
    >
        <span
          className={ title }
        >
          Buscar y Editar Productos  
        </span>
        <form
          onSubmit={ handleSearchProduct }
          className={ searchForm }
        >
            <label htmlFor='queryItem'>Buscar producto:</label>
            <input 
              type="text" 
              name='queryItem' 
              placeholder='Buscar producto' 
              id='queryItem' 
              value={ queryItem }
              onChange={ handleSearchChange }
            />
            <button
              type='submit'
              className={ searchButton }
            >
              BUSCAR PRODUCTO            
            </button>
            <button
              type='button'
              className={ searchButton }
              onClick={ handleClearSearch }
            >
              Limpiar Búsqueda          
            </button>
        </form>
        <div
          className={`animationPage ${ resultsContainer }`}
        >
          {
            isLoadAdminProds && 
              adminProducts.map(
                ( container, i) => {
                  return (
                    <DataContainerProduct 
                      key={ adminProducts[i]._id }
                      data={ data }
                      dataButton={ dataButton }
                      dataContainer={ dataContainer }
                      dataContainerEdit={ dataContainerEdit }
                      addImageButton={ addImageButton }
                      searchItemForm={ searchItemForm }
                      imageBox={ imageBox }
                      imageButton={ imageButton }
                      imageContainer={ imageContainer }
                      category={ adminProducts[i].category }
                      color={ adminProducts[i].color }
                      description={ adminProducts[i].description }
                      item={ adminProducts[i].item }
                      urlProduct={ adminProducts[i].urlProduct }                 
                      price={ adminProducts[i].price }
                      quantity={ adminProducts[i].quantity }
                      size={ adminProducts[i].size }
                      images={ isEdit ? adminImages : adminProducts[i].images }
                      _id={ adminProducts[i]._id }
                      isSoldOut={ adminProducts[i].isSoldOut }
                      handleEditDataProduct={ handleEditDataProduct }
                      handleDeleteImage={ handleDeleteImage }
                      handleAddImage={ handleAddImage }
                      handleFiles={ handleFiles }
                      isMounted={ isMounted }
                      isEditData={ isEditData }
                      handleChange={ handleChange }
                      productData={ productData }
                      handleSaveDataProduct={ handleSaveDataProduct }
                      handleSoldoutProduct={ handleSoldoutProduct }
                      isNotSoldOutCss={ isNotSoldOutCss }
                      isSoldOutCss={ isSoldOutCss }   
                      copy={ copy }
                      handleClipBoard={ handleClipBoard }
                      textCopied={ textCopied }
                    />
                  )
                }
              )
          }
        </div>
    </div>
  );
};

SearchProductFormAdmin.propTypes = {
  handleEditDataProduct: PropTypes.func.isRequired,
  handleSaveDataProduct: PropTypes.func.isRequired,
  handleSoldoutProduct: PropTypes.func.isRequired,
  handleSearchProduct: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
  handleClipBoard: PropTypes.func.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
  handleAddImage: PropTypes.func.isRequired,
  handleFiles: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  productData: PropTypes.object,
  queryItem: PropTypes.string.isRequired,
  isNotSoldOutCss: PropTypes.string,
  isSoldOutCss: PropTypes.string,
  isLoadAdminProds: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isEditData: PropTypes.bool.isRequired,
  isMounted: PropTypes.bool.isRequired,
  textCopied: PropTypes.bool.isRequired,
  adminProducts: PropTypes.array,
  adminImages: PropTypes.array,
};

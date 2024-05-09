import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AddProductFormAdmin } from './AddProductFormAdmin';

export const DataContainerProduct = ({ 
    handleEditDataProduct,
    handleSaveDataProduct,
    handleDeleteImage,
    handleAddImage,
    handleFiles,
    handleChange,
    handleSoldoutProduct,
    handleClipBoard,
    dataContainer, 
    dataContainerEdit,
    copy,
    isMounted,
    isEditData,
    isSoldOut,
    isNotSoldOutCss,
    isSoldOutCss,  
    textCopied,
    data, 
    dataButton, 
    searchItemForm, 
    addImageButton, 
    imageContainer, 
    imageBox, 
    imageButton, 
    productData,
    item,
    urlProduct,
    description,
    price,
    quantity,
    category,
    color,
    size ,
    images,
    _id,
}) => {
  return (
    <>
        <h3> 
            { item } 
            <span
                className={ isSoldOut ? isSoldOutCss : isNotSoldOutCss }
            >
                { isSoldOut ? 'AGOTADO' : '' }
            </span> 
        </h3>
        <div
            className={ imageContainer }
          >
            {
                images.map(
                    ( imageObj, i ) => {
                        return (
                            <div
                                className={ imageBox }
                                key={ i }
                            >
                                <img src={ imageObj.url } alt={ item } />
                                <button 
                                    className={ imageButton } 
                                    title='Eliminar imagen'
                                    onClick={ handleDeleteImage }
                                    data-index={ i }
                                    data-id={ _id }
                                    data-ref={ imageObj.ref }
                                >
                                    X
                                </button>
                            </div>

                        )
                    }
                )
            }
        </div>
        <form
            className={ searchItemForm }
            onSubmit={ handleAddImage }
            data-id={ _id }
        >
            <label htmlFor="addImage">Agragar nueva(s) imagen(es):</label>
            <input type="file" multiple onChange={ handleFiles } key={ isMounted }/>
            <button 
                className={ addImageButton }
                type='submit'
            >
                Agregar Imagen
            </button>
        </form>
        <div
            className={`${ dataContainer } ${ isEditData ? dataContainerEdit : '' }`}
        >
            <div
                className={ data }
            >
                <p><span>Producto:</span></p>
                <p>{ item }</p>
            </div>
            <div
                className={ data }
            >
                <p><span>Descripción:</span></p>
                <p>{ description }</p>
            </div>
            <div
                className={ data }
            >
                <p><span>Precio:</span></p>
                <p>{ price }</p>
            </div>
            <div
                className={ data }
            >
                <p><span>Inventario:</span></p>
                <p>{ quantity }</p>
            </div>
            <div
                className={ data }
            >
                <p><span>Categoría:</span></p>
                <p>{ category }</p>
            </div>
            <div
                className={ data }
            >
                <p><span>Colores:</span></p>
                <p>{ color }</p>
            </div>
            <div
                className={ data }
            >
                <p><span>Tallas:</span></p>
                <p>{ size }</p>
            </div>
            <div
                className={ data }
            >
                <p><span>Link del producto:</span></p>
                <p>
                    { urlProduct }
                    <CopyToClipboard text={ urlProduct }>
                        <button 
                            className={ copy }
                            onClick={ handleClipBoard }
                            title={ textCopied ? 'Link copiado !!' : 'Copiar link del producto' }
                        >
                            { textCopied ? '¡ copiado !' : 'copiar link' }
                        </button>
                    </CopyToClipboard>
                </p>
            </div>
            <div>
                <button
                    className={ dataButton }
                    onClick={ handleEditDataProduct }
                    data-id={ _id }
                >
                    Editar Información
                </button>
            </div>
            <div>
                <button
                    className={ dataButton }
                    onClick={ handleSoldoutProduct }
                    data-id={ _id }
                >
                    { isSoldOut ? 'Reactivar producto' : 'Marcar como agotado' }
                </button>
            </div>
        </div>
        {
            isEditData && 
                <AddProductFormAdmin
                    handleChange={ handleChange }
                    item={ productData.item }
                    description={ productData.description }
                    price={ productData.price }
                    quantity={ productData.quantity }
                    category={ productData.category }
                    color={ productData.color }
                    size={ productData.size }
                    isEditData={ isEditData } 
                    handleSaveDataProduct={ handleSaveDataProduct }   
                />
        }
    </>
  );
};

DataContainerProduct.propTypes = {
    handleEditDataProduct: PropTypes.func.isRequired,
    handleSaveDataProduct: PropTypes.func.isRequired,
    handleDeleteImage: PropTypes.func.isRequired,
    handleAddImage: PropTypes.func.isRequired,
    handleFiles: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSoldoutProduct: PropTypes.func.isRequired,
    handleClipBoard: PropTypes.func.isRequired,
    isMounted: PropTypes.bool.isRequired,
    isEditData: PropTypes.bool.isRequired,
    isSoldOut: PropTypes.bool.isRequired,
    textCopied: PropTypes.bool.isRequired,
    isNotSoldOutCss: PropTypes.string,
    isSoldOutCss: PropTypes.string,  
    dataContainerEdit: PropTypes.string.isRequired,
    dataContainer: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
    copy: PropTypes.string.isRequired,
    dataButton: PropTypes.string.isRequired,
    searchItemForm: PropTypes.string.isRequired,
    addImageButton: PropTypes.string.isRequired,
    imageContainer: PropTypes.string.isRequired,
    imageButton: PropTypes.string.isRequired,
    imageBox: PropTypes.string.isRequired,
    item: PropTypes.string,
    urlProduct: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.string,
    category: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    _id: PropTypes.string,
    images: PropTypes.array,
    productData: PropTypes.object,
};

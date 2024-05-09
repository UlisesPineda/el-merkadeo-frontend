import PropTypes from 'prop-types';
import {
    addProductContainer,
    inputContainer,
    inputContainerEdit,
    formAddProduct,  
    titleEdit,
    title,
} from './styles/AddProductFormAdmin.module.css';

export const AddProductFormAdmin = ({ 
  handleAddProduct,
  handleSaveDataProduct,
  handleChange,
  handleFiles,
  item,
  description,
  price,
  quantity,
  category,
  color,
  size, 
  isMounted,
  isEditData,
}) => {
  return (
    <div
        className={ addProductContainer }
    >
        <span
          className={`${ title } ${ isEditData ? titleEdit : '' }`}
        >
          Agregar Nuevo Producto
        </span>
          <form
            className={ formAddProduct }
            onSubmit={ isEditData ? handleSaveDataProduct : handleAddProduct }
          >
            <div
              className={ inputContainer }
            >
              <label htmlFor='item'>Producto:</label>
              <input type='text' name='item' placeholder='Nombre del producto' id='item' value={ item } onChange={ handleChange } /> 
            </div>
            <div
              className={ inputContainer }
            >
              <label htmlFor='description'>Descripción:</label>
              <input type='text' name='description' placeholder='Descripción de producto' id='description' value={ description } onChange={ handleChange } />
            </div>
            <div
              className={ inputContainer }
            >
              <label htmlFor='price'>Precio:</label>
              <input type='text' name='price' placeholder='Ingresa el precio' id='price' value={ price } onChange={ handleChange } />
            </div>
            <div
              className={ inputContainer }
            >
              <label htmlFor='quantity'>Cantidad en inventario</label>
              <input type='text' name='quantity' placeholder='Cantidad en número' id='quantity' value={ quantity } onChange={ handleChange } />
            </div>
            <div
              className={ inputContainer }
            >
              <label htmlFor='category'>Categoría:</label>
              <input type='text' name='category' placeholder='Indica la categoría ej: "Blusas"' id='category' value={ category } onChange={ handleChange } />
            </div>
            <div
              className={ inputContainer }
            >
              <label htmlFor='color'>Colores:</label>
              <input type='text' name='color' placeholder='Separa cada color por una coma' id='color' value={ color } onChange={ handleChange } />
            </div>
            <div
              className={ inputContainer }
            >
              <label htmlFor='size'>Tallas:</label>
              <input type='text' name='size' placeholder='Separa cada talla por una coma' id='size' value={ size } onChange={ handleChange } />
            </div>
            <div
              className={`${ inputContainer } ${ isEditData ? inputContainerEdit : '' }`}
            >
              <label htmlFor='imagesProduct'>Imágenes del producto:</label>
              <input type='file' id='imagesProduct' multiple onChange={ handleFiles } key={ isMounted }/>
            </div>
            <div
              className={ inputContainer }
            >
              <button
                type='submit'
              >
                { isEditData ? 'Guardar cambios' : 'AGREGAR PRODUCTO' }
              </button>
            </div>
        </form>
    </div>
  );
};

AddProductFormAdmin.propTypes = {
    handleAddProduct: PropTypes.func,
    handleSaveDataProduct: PropTypes.func,
    handleChange: PropTypes.func.isRequired,
    handleFiles: PropTypes.func,
    item: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    isMounted: PropTypes.bool,
    isEditData: PropTypes.bool,
    isEditingData: PropTypes.bool,
};

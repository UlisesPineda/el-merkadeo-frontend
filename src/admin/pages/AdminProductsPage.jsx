import { useState } from 'react';
import { useSelector } from 'react-redux';

import { AddCategoryFormAdmin, AddProductFormAdmin, AddPromoFormAdmin, SearchProductFormAdmin } from '../components';
import { useAddCategoryForm, useAddPromoForm, useAdminAuth, useCategoryData, useEditDataForm, useLoadImages, useProductData, usePromoData, useSearchForm } from '../hooks';
import { useForm, useValidateForm } from '../../ui/hooks';
import { createURLitem } from '../helpers';

import {
  mainSection,
  container,
  sectionContainer,
} from './styles/AdminProductsPage.module.css'

export const AdminProductsPage = () => {

  const [textCopied, setTextCopied] = useState(false);

  const { 
    isLoadAdminProds, 
    adminProducts,
    adminImages,
    isEdit,
    isEditData,
  } = useSelector( state => state.productAdmin );
  const { 
    promos,
  } = useSelector( state => state.promo );
  const {
    categories,
  } = useSelector( state => state.category );
  const {
    totalProductsUser,
  } = useSelector( state => state.productsUser );

  const {
    addCategory,
    deleteCategory,
  } = useCategoryData();
  const { 
    addProduct, 
    searchProduct, 
    clearSearch, 
    changeEditStateProduct, 
    deleteImageDB,
    addImageProduct, 
    editDataProduct, 
    saveEditDataProduct,
    soldOutProduct,
  } = useProductData();
  const {
    addPromo,
    deletePromo,
  } = usePromoData();
  const { 
    uploadImages, 
    deleteImages, 
  } = useLoadImages();
  const { handleAddCategoryChange, addCategoryForm, resetAddCategoryForm } = useAddCategoryForm({
    categoryTitle: '',
    categoryDescription: '',
  });
  const { handleChange, form, resetForm } = useForm({
    item: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    color: '',
    size: '',
  });
  const { handleSearchChange, searchForm, resetSearchForm } = useSearchForm({
    queryItem: ''
  });
  const { editDataForm, handleEditDataChange, setEditDataForm, resetEditDataForm } = useEditDataForm({
    item: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    color: '',
    size: '',
  });
  const { handleAddPromoChange, addPromoForm, resetAddPromoForm } = useAddPromoForm({
    promoItem: '',
    promoDescription: '',
    urlPromo: '',
  });
  const { 
    validateEmptyInput, 
    validateAddProductForm,
    validateSearchProductForm,
    validateAddPromoForm,
    validateAddCategoryForm,
    getInputFiles, 
    validateInputFiles, 
    files, 
    disableButtonForm, 
    resetInputfile, 
    isMounted, 
  } = useValidateForm();
  const { validateAuthAdminSesion } = useAdminAuth();

  const handleAddProduct = async(e) => {
    e.preventDefault();
    const urlItem = createURLitem( form.item );
    validateEmptyInput( form ) &&
      validateAddProductForm( form ) &&
          validateInputFiles( files ) &&
            await validateAuthAdminSesion() &&
              disableButtonForm( 'Se está creando el producto', 'Espera un poco...', false ) &&
                await uploadImages( 'products-images', files, urlItem ) &&
                  await addProduct( form ) &&
                    resetForm() & resetInputfile();
  };

  const handleSearchProduct = async(e) => {
    e.preventDefault();
    validateEmptyInput( searchForm ) &&
      validateSearchProductForm( searchForm ) &&
        await validateAuthAdminSesion() &&
          await searchProduct( searchForm ) &&
            resetSearchForm();
  };
  const handleClearSearch = () => {
    clearSearch();
    resetEditDataForm();
  };

  const handleDeleteImage = async(e) => {
    const id = e.target.getAttribute('data-id');
    const imageToDelete = e.target.getAttribute('data-index');
    const imageRef = e.target.getAttribute('data-ref');
    const productSelected = adminProducts.filter( product => product._id === id );
    const imagesUpdated = 
      isEdit 
        ? adminImages.filter(( imgUrl, i ) => i !== Number(imageToDelete))
        : productSelected[0].images.filter(( imgUrl, i ) => i !== Number(imageToDelete));
    await validateAuthAdminSesion() &&
      disableButtonForm( 'Se está eliminado la imagen', 'Espera un poco...', false ) &&
        await deleteImages( imageRef ) &&
          await deleteImageDB( imagesUpdated, id ) &&
            changeEditStateProduct( productSelected, imagesUpdated );
  };

  const handleAddImage = async(e) => {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');
    const productSelected = adminProducts.filter( product => product._id === id );
    const urlItem = createURLitem( productSelected[0].item );
    validateInputFiles( files ) &&
      await validateAuthAdminSesion() &&
        disableButtonForm( 'Se están agregando las nuevas imágenes', 'Espera un poco...', false ) &&
          await uploadImages( 'products-images', files, urlItem ) &&
            await addImageProduct( productSelected, id ) &&
              resetInputfile();
  };
  
  const handleEditDataProduct = async(e) => {
    const id = e.target.getAttribute('data-id');
    const productSelected = adminProducts.filter( product => product._id === id );
    const imagesUpdated = isEdit ? adminImages : productSelected[0].images;
    await validateAuthAdminSesion() &&
      editDataProduct( productSelected, imagesUpdated ) &&
        setEditDataForm( productSelected[0] );
  };

  const handleSaveDataProduct = async(e) => {
    e.preventDefault();
    const id = adminProducts[0]._id;
    await validateAuthAdminSesion() &&
      validateAddProductForm( editDataForm ) &&
        saveEditDataProduct( editDataForm, id );    
  };

  const handleSoldoutProduct =  async(e) => {
    const id = e.target.getAttribute('data-id');
    const productsUser = totalProductsUser.filter( totalProducts => totalProducts._id !== id );
    await validateAuthAdminSesion() &&
      await soldOutProduct( id, productsUser );
  };
    
  const handleAddpromo = async(e) => {
    e.preventDefault();
    const urlItem = createURLitem( addPromoForm.promoItem );
    validateEmptyInput( addPromoForm ) &&
      validateAddPromoForm( addPromoForm ) &&
        validateInputFiles( files ) &&
          await validateAuthAdminSesion() &&
            disableButtonForm( 'Se está creando la nueva promoción', 'Espera un poco...', false ) &&
              await uploadImages( 'promo-images', files, urlItem ) &&
                await addPromo( addPromoForm ) &&
                  resetAddPromoForm() & resetInputfile();
  }; 

  const handleDeletePromo = async(e) => {
    const id = e.target.getAttribute('data-id');
    const promo = promos.filter( currentPromo => currentPromo._id === id );
    const imageRef = promo[0].image[0].ref;
    const updatedPromos = promos.filter( promosUpdated => promosUpdated._id !== id );
    await validateAuthAdminSesion() &&
      disableButtonForm( `Se está eliminado la promoción: ${ promo[0].promoItem }`, 'Espera un poco...', false ) &&
        await deleteImages( imageRef ) &&
          await deletePromo( id, updatedPromos );
  };

  const handleClipBoard = async() => {
    setTextCopied( true );
    setTimeout(() => {
      setTextCopied(false);
    }, 2000);
  };
  
  const handleAddCategory = async(e) => {
    e.preventDefault();
    const urlItem = createURLitem( addCategoryForm.categoryTitle );
    validateEmptyInput( addCategoryForm ) &&
      validateAddCategoryForm( addCategoryForm ) &&
        validateInputFiles( files ) &&
          await validateAuthAdminSesion() &&
            disableButtonForm( 'Se está creando la categoría', 'Espera un poco...', false ) &&
              await uploadImages( 'category-images', files, urlItem ) &&
                await addCategory( addCategoryForm ) &&
                resetAddCategoryForm() & resetInputfile();
  };

  const handleDeleteCatgory = async(e) => {
    const id = e.target.getAttribute('data-id');
    const category = categories.filter( currentCategory => currentCategory._id === id );
    const imageRef = category[0].image[0].ref;
    const updatedCategories = categories.filter( newCategories => newCategories._id !== id );
    await validateAuthAdminSesion() &&
      disableButtonForm( `Se está eliminado la categoría: ${ category[0].categoryTitle }`, 'Espera un poco...', false ) &&
        await deleteImages( imageRef ) &&
          await deleteCategory( id, updatedCategories );
  };


  return (
    <section
      className={`animationPage ${ mainSection }`}
    >
      <h2>Productos</h2>
      <div
        className={ container }
      >
        <div
          className={ sectionContainer }
        >
          <AddProductFormAdmin 
            handleAddProduct={ handleAddProduct } 
            handleFiles={ getInputFiles }
            isMounted={ isMounted }
            handleChange={ handleChange }
            item={ form.item }
            description={ form.description }
            price={ form.price }
            quantity={ form.quantity }
            category={ form.category }
            color={ form.color }
            size={ form.size }
          />
        </div>
        <div
          className={ sectionContainer }
        >
          <SearchProductFormAdmin 
            handleEditDataProduct={ handleEditDataProduct }
            handleSearchProduct={ handleSearchProduct } 
            handleSearchChange={ handleSearchChange }
            handleAddImage={ handleAddImage }
            handleClearSearch={ handleClearSearch }
            handleDeleteImage={ handleDeleteImage }
            handleFiles={ getInputFiles }
            handleChange={ handleEditDataChange }
            handleSaveDataProduct={ handleSaveDataProduct }
            queryItem={ searchForm.queryItem }
            isLoadAdminProds={ isLoadAdminProds }
            adminProducts={ adminProducts }
            adminImages={ adminImages }
            isMounted={ isMounted }
            isEdit={ isEdit }
            isEditData={ isEditData }
            productData={ editDataForm }
            handleSoldoutProduct={ handleSoldoutProduct }
            handleClipBoard={ handleClipBoard }
            textCopied={ textCopied }
          />
        </div>
        <div
          className={ sectionContainer }
        >
          <AddPromoFormAdmin 
            handleAddPromoChange={ handleAddPromoChange }
            handleDeletePromo={ handleDeletePromo }
            handleAddpromo={ handleAddpromo } 
            handleFiles={ getInputFiles }
            promoItem={ addPromoForm.promoItem }
            promoDescription={ addPromoForm.promoDescription }
            urlPromo={ addPromoForm.urlPromo }
            isMounted={ isMounted }
          />
        </div>
        <div
          className={ sectionContainer }
        >
          <AddCategoryFormAdmin
            categoryDescription={ addCategoryForm.categoryDescription }
            categoryTitle={ addCategoryForm.categoryTitle }
            handleAddCategory={ handleAddCategory }
            handleAddCategoryChange={ handleAddCategoryChange }
            handleFiles={ getInputFiles }
            isMounted={ isMounted }
            handleDeleteCatgory={ handleDeleteCatgory }
           />
        </div>
      </div>
    </section>
  );
};

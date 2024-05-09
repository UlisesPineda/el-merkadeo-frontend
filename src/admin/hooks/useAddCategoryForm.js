import { useState } from "react";

export const useAddCategoryForm = ( initForm ) => {

    const [addCategoryForm, setAddCategoryForm] = useState( initForm );

    const handleAddCategoryChange = ( { target } ) => {
        const { name, value } = target;
        setAddCategoryForm({
            ...addCategoryForm,
            [name]: value,
        });
    };

    const resetAddCategoryForm = () => {
        setAddCategoryForm( initForm );
    };

    return {
        addCategoryForm,

        handleAddCategoryChange,
        resetAddCategoryForm,
    };
};
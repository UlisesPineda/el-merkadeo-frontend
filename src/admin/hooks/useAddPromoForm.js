import { useState } from "react";

export const useAddPromoForm = ( initForm ) => {

    const [addPromoForm, setAddPromoForm] = useState( initForm );

    const handleAddPromoChange = ( { target } ) => {
        const { name, value } = target;
        setAddPromoForm({
            ...addPromoForm,
            [name]: value,
        });
    };

    const resetAddPromoForm = () => {
        setAddPromoForm( initForm );
    };

    return {
        addPromoForm,
        
        handleAddPromoChange,
        resetAddPromoForm,
    };
};
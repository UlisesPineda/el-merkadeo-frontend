import { useState } from "react";

export const useEditDataForm = ( initForm ) => {
    const [editDataForm, setEditDataForm] = useState( initForm );

    const handleEditDataChange = ( { target } ) => {
        const { name, value } = target;
        setEditDataForm({
            ...editDataForm,
            [name]: value,
        });
    };

    const resetEditDataForm = () => {
        setEditDataForm(initForm);
    }

    return {
        editDataForm,

        handleEditDataChange,
        resetEditDataForm,
        setEditDataForm,
    };
};
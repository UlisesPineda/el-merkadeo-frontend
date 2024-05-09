import { useState } from "react";

export const useAdminForm = ( initForm ) => {
    const [adminForm, setAdminForm] = useState( initForm );

    const handleAdminChange = ( { target } ) => {
        const { name, value } = target;
        setAdminForm({
            ...adminForm,
            [name]: value,
        });
    };

    const resetAdminForm = () => {
        setAdminForm( initForm );
    };

    return {
        adminForm,

        handleAdminChange,
        resetAdminForm,
    };
};
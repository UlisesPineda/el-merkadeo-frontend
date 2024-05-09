import { useState } from "react";

export const useForm = ( initForm ) => {

    const [form, setForm] = useState( initForm );

    const handleChange = ( { target } ) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const resetForm = () => {
        setForm(initForm);
    }

    return {
        form,

        handleChange,
        resetForm,
        setForm,
    };
};
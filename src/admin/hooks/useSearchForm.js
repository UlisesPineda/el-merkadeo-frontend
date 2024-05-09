import { useState } from "react";

export const useSearchForm = ( initForm ) => {
    const [searchForm, setSearchForm] = useState( initForm );

    const handleSearchChange = ( { target } ) => {
        const { name, value } = target;
        setSearchForm({
            ...searchForm,
            [name]: value,
        });
    };

    const resetSearchForm = () => {
        setSearchForm( initForm );
    };

    return {
        searchForm,
        setSearchForm,

        handleSearchChange,
        resetSearchForm,
    };
};
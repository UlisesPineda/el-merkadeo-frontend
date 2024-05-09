export const createElementsArray = ( text ) => {
    const elements = text.split(',');
    return elements.map( element => element.trim() );
};

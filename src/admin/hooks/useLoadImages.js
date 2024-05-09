import { deleteImageFirebase, uploadImagesFirebase } from "../../firebase/config.js";
import { useAlertMessage } from "../../ui/hooks/useAlertMessage.js";

export const useLoadImages = () => {

    const { startOpenAlert } = useAlertMessage();

    const uploadImages = async( folder, imagesArray, item ) => {
        try {
            const images = await uploadImagesFirebase( folder,imagesArray, item );
            localStorage.setItem('urlImages', JSON.stringify(images)); 
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'El formato de las imágenes es incorrecto',
                text: 'Las imágenes deben tener una medida máxima de 600 x 600 píxeles, un peso máximo de 1024 kb (1 mega) y formato jpg o png',
                button: true,
            });
            return false;
        }
    };

    const deleteImages = async( imageRef ) => {
        try {
            await deleteImageFirebase( imageRef );
            return true;
        } catch (error) {
            console.log( error );
            startOpenAlert({
                title: 'Hubo un error al eliminar la imagen',
                text: 'Intenta más tarde',
                button: true,
            });
            return false;
        }
    };

    return {
        uploadImages,
        deleteImages,
    };
};
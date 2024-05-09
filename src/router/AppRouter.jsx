import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { ElMerkadeoApp } from "../ElMerkadeoApp";
import { 
    AlertMessage,
    Layout, 
} from "../ui/components";
import { 
    ActivateAdminPage,
    CartPage,
    CategoryPage,
    ChangeAdminPasswordPage,
    ChangeUserPasswordPage,
    CookiesPage, 
    ItemPage, 
    LoadingPage, 
    LoginAdminPage, 
    LoginUserPage, 
    PrivacyPage, 
    SearchPage, 
    SettingsUserPage, 
    ShopPage,
    TermsPage
} from "../ui/pages";
import { 
    AdminLayuot 
} from "../admin/components";
import { 
    AdminDashboardPage, 
    AdminProductsPage, 
    AdminSettingsPage 
} from "../admin/pages";
import { useAdminAuth, useCategoryData, useProductData, usePromoData } from "../admin/hooks";
import { useUserAuth } from "../ui/hooks";

export const AppRouter = () => {

    const { checkAdminAuthToken } = useAdminAuth();
    const { checkUserAuthToken } = useUserAuth();
    const { getCategories } = useCategoryData();
    const { gettProducts } = useProductData();
    const { getPromos } = usePromoData();

    const { 
        isAlertMessage,
        titleMessage,
        textMessage,
    } = useSelector( state => state.alertMessage );
    const { isUserAuth } = useSelector( state => state.userAuth );
    const { isAdminAuth } = useSelector( state => state.adminAuth );
    const { isLoadedUserProds } = useSelector( state => state.productsUser );

    useEffect(() => {
        isUserAuth && checkUserAuthToken();
        isAdminAuth && checkAdminAuthToken();
        getPromos();
        gettProducts();
        getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        !isLoadedUserProds 
            ? 
            <LoadingPage />
            :
            !isAdminAuth
                ?
                <>
                    <Layout>
                        <Routes>
                            <Route path="/" element={ <ElMerkadeoApp /> } />
                            <Route path="/tienda" element={ <ShopPage /> } />
                            <Route path="/tienda/:category" element={ <CategoryPage /> } />
                            <Route path="/tienda/:category/:item" element={ <ItemPage /> } />
                            <Route path="/buscar" element={ <SearchPage /> } />
                            <Route path="/login" element={ <LoginUserPage /> } />
                            <Route path="/carrito" element={ <CartPage /> } />
                            <Route path="/login-admin" element={ <LoginAdminPage /> } />
                            <Route path="/activar-administrador/:token" element={ <ActivateAdminPage /> } />
                            <Route path="/terminos-y-condiciones" element={ <TermsPage /> } />
                            <Route path="/politica-de-cookies" element={ <CookiesPage /> } />
                            <Route path="/politica-de-privacidad" element={ <PrivacyPage /> } />
                            <Route path="/nuevo-password-administrador/:token" element={ <ChangeAdminPasswordPage /> } />
                            <Route path="/nuevo-password-usuario/:token" element={ <ChangeUserPasswordPage /> } />
                            <Route path="*" element={ <Navigate to="/" /> } />
                            {
                                isUserAuth && <Route path="/configuracion" element={ <SettingsUserPage /> } />
                            }
                        </Routes>
                    </Layout>
                    {
                        isAlertMessage && 
                        <AlertMessage 
                            titleMessage={ titleMessage } 
                            textMessage={ textMessage }
                        />
                    }
                </>
                :
                <>
                    <AdminLayuot>
                        <Routes>
                            <Route path="/admin/dashboard" element={ <AdminDashboardPage /> } />
                            <Route path="/admin/productos" element={ <AdminProductsPage /> } />
                            <Route path="/admin/configuracion" element={ <AdminSettingsPage /> } />
                            <Route path="/*" element={ <Navigate to="/admin/dashboard" /> } />
                        </Routes>
                    </AdminLayuot>
                    {
                        isAlertMessage && 
                        <AlertMessage 
                            titleMessage={ titleMessage } 
                            textMessage={ textMessage }
                        />
                    }
                </>
    );
};


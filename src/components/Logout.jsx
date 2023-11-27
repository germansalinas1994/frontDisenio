import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingModal from './LoadingModal';

function Logout() {
    const { logout, isLoading } = useAuth0();
    const { showLoadingModal, hideLoadingModal } = LoadingModal();

    useEffect(() => {
        // Mostrar el modal de carga
        if (isLoading) {
            showLoadingModal();
        } else {
            // Realizar el proceso de deslogueo
            logout({ returnTo: window.location.origin });
            hideLoadingModal();

        }
    }, [isLoading, logout, showLoadingModal, hideLoadingModal]);

    return null; // O un JSX adecuado si necesitas renderizar algo
}

export default Logout;

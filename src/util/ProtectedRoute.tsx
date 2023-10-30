import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/root.reducer';
import * as userActions from '../store/user/user.actions';
import { DecodedDataType } from './decodeJwt';
import styled from 'styled-components';

interface Props {
    requiredRoles?: string[];
    isAuthenticated: boolean;
    userRole: string;
    accountType: string;
    verifyUserAccess: () => Promise<DecodedDataType>;
    logoutUser: () => void;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({
    requiredRoles,
    isAuthenticated,
    userRole,
    accountType,
    verifyUserAccess,
    logoutUser,
    children
}) => {
    const [isLoading, setIsLoading] = useState(true);

    console.log(isLoading)

    useEffect(() => {
        if (!isAuthenticated) {
            verifyUserAccess().then(() => {
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, verifyUserAccess, isLoading]);

    if (isLoading) {
        
       return (
            <LoadingStyled>
                <p>Loading...</p>
            </LoadingStyled>
       )
    
    }

    if (!isAuthenticated) {
        logoutUser();
    }

    if (requiredRoles && requiredRoles.length) {
        const userRoles = [userRole, accountType];
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

        if (!hasRequiredRole) {
            return (
                <AccessDeniedStyled>
                    <p>Access denied</p>
                </AccessDeniedStyled>
            )
        }
    }

    return children as React.ReactElement;
};

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.isAuthenticated,
    userRole: state.userRole,
    accountType: state.accountType,
});

const ConnectedProtectedRoute = connect(mapStateToProps, {
    verifyUserAccess: userActions.verifyUserAccess,
    logoutUser: userActions.logoutUser
})(ProtectedRoute);

export default ConnectedProtectedRoute;


const LoadingStyled = styled.div`
    color: ${(pr) => pr.theme.color.white};

`

const AccessDeniedStyled = styled.div`
    color: ${(pr) => pr.theme.color.white};

`
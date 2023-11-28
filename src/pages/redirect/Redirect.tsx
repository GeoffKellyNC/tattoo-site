
import React, { useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { useNavigate } from 'react-router-dom'
import * as userActions from '../../store/user/user.actions'
import { UserData } from '../../store/user/user.reducer'
import RotatingSquareLoader from '../../loading/RotatingSquare'

interface RedirectProps {
    userData: UserData,
    getProfileImage: () => Promise<void>
    verifyUserAccess: () => Promise<boolean>,
    getLocationData: (lat: string, lng: string) => Promise<boolean>

}



const Redirect: React.FC<RedirectProps> = ({
    userData,
    getProfileImage,
    verifyUserAccess,
    getLocationData
}) => {
    const nav = useNavigate();


    const setLocation = useCallback((): Promise<void> => {
        const handleSuccess = async (position) => {
            const { latitude, longitude } = position.coords;
            await getLocationData(latitude, longitude);
        };
    
        const handleError = (error) => {
            console.error('Geolocation Error: ', error); //!REMOVE
        };

        return new Promise<void>((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        await handleSuccess(position);
                        resolve();
                    }, 
                    (error) => {
                        handleError(error);
                        resolve(); // Resolve even on error, no value needed
                    }
                );
            } else {
                console.log("GEOLOCATION NOT SUPPORTED!"); //!REMOVE
                resolve();
            }
        });
    }, [getLocationData]);
    

    const handleRedirect = useCallback(async () => {
        if (!userData.email_verified) {
            nav('/no-email-verify');
            return;
        }
        await getProfileImage();
        await setLocation(); // Wait for location to be set
        if (userData.unxid.length > 0 && (userData.account_type === 'client' || userData.account_type === 'artist')) {
            const allowed = await verifyUserAccess();
            if (!allowed) {
                nav('/pricing');
                return;
            }
            nav(`/user/client/:${userData.unxid}`);
            return;
        }
        nav('/');
    }, [getProfileImage, nav, setLocation, userData.account_type, userData.email_verified, userData.unxid, verifyUserAccess]);

    useEffect(() => {
        handleRedirect();
    }, [handleRedirect]);

    return (
        <RedirectStyled>
            <RotatingSquareLoader />
        </RedirectStyled>
    );
};

const mapStateToProps = (st: RootState) => ({
    userData: st.userData
})

const ConnectedRedirect = connect(mapStateToProps, {
    getProfileImage: userActions.getProfileImage,
    verifyUserAccess: userActions.verifyUserAccess,
    getLocationData: userActions.getLocationData
})(Redirect)

export default ConnectedRedirect

const RedirectStyled = styled.div`
    height: 100vh;
    width: 100vw;

`
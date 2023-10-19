import { connect } from "react-redux";
import { RootState } from "../store/root.reducer";
import * as userActions from "../store/user/user.actions";

interface Props {
    isAuthenticated: boolean;
    logoutUser: () => Promise<void>;
    children: React.ReactNode;
}

const ProtectedRoutes: React.FC<Props> = ({ isAuthenticated, children, logoutUser }) => {
    if (!isAuthenticated) {
        logoutUser();
        return null;
    }
    return children;
};

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.isAuthenticated // Adjust this path according to your state structure
});

export default connect(mapStateToProps, {
    logoutUser: userActions.logoutUser
})(ProtectedRoutes);

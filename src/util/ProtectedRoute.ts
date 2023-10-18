import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../store/root.reducer";

interface Props {
    isAuthenticated: boolean;
    children: React.ReactNode;
}

const ProtectedRoutes: React.FC<Props> = ({ isAuthenticated, children }) => {
    const navigate = useNavigate();
    if (!isAuthenticated) {
        navigate("/", { replace: true });
        return null;
    }
    return children;
};

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.isAuthenticated // Adjust this path according to your state structure
});

export default connect(mapStateToProps, null)(ProtectedRoutes);

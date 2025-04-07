import { useLocation } from "react-router-dom";


export const ResetPassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    console.log(code)
    return (
        <div>
            awijfiwoejfioewjf
        </div>
    )
}
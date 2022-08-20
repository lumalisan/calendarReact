import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from '../api';
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store";


export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth", { email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout('Invalid email or password'));
            // Se usa set timeout por que al ser una función sincrona debe acabar antes
            // que otro estado sea mutado, en este caso le dejamos 10ms para que el estado se pueda
            // consultar como que hay un error 
            setTimeout(() => {
                dispatch(clearErrorMessage());
            } , 10);
        }
    }

    const startRegister = async({ name, email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth/new", { name, email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            console.log(error);
            dispatch(onLogout(error.response.data?.msg || error.response.data?.errors.password?.msg || 'Error registering'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            } , 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem("token");
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get("/auth/renew")
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        // Properties
        errorMessage,
        status,
        user,

        // Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
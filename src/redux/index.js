import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import {Provider, useDispatch, useSelector} from "react-redux";
import api from "../shared/api";
import {useEffect} from "react";
import User from "../shared/components/User";

const userState = {
    data: {},
    loading: false,
    error: null,
}

const fetchUsers = () => async (dispatch) => {
    dispatch({ type: 'LOAD_USERS_START' });

    try {
        const response = await api.getMe();

        dispatch({
            type: 'LOAD_USERS_SUCCESS',
            payload: response,
        })
    } catch (e) {
        dispatch({
            type: 'LOAD_USERS_FAILURE',
            payload: e,
        })
    }
}

export function userReducer(state = userState, action) {
    switch (action.type) {
        case 'LOAD_USERS_START': {
            return {
                ...state,
                loading: true,
                error: null,
                data: {}
            }
        }
        case 'LOAD_USERS_SUCCESS': {
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload,
            }
        }
        case 'LOAD_USERS_FAILURE': {
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: {}
            }
        }
        default:
            return state;
    }
}

const currentUserSelector = state => state.user.data;

const rootReducer = combineReducers({
    user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function ReduxWay() {
    return (
        <Provider store={store}>
            <ReduxApp />
        </Provider>
    )
}

function ReduxApp() {
    const me = useSelector(currentUserSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

    return (
        <User name={me?.name}/>
    )
}

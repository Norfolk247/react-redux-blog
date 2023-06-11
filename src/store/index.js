import {combineReducers, createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from "../saga";

const postDefaultState = {
    posts: [],
    isLoading: true,
}

const postsReducer = (state=postDefaultState, action) => {
    switch (action.type) {
        case 'setPosts':
            return {...state,posts: action.payload}
        case 'setLoading':
            return {...state,isLoading: action.payload}
        default:
            return state
    }
}

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
    post: postsReducer,
})

export const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootWatcher)
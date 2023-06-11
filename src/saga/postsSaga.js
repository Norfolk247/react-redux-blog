import {getAllPosts} from "../api";
import {put,call,takeEvery} from "redux-saga/effects";

const delay = () => new Promise(resolve => setTimeout(resolve,500))
function* postsWorker() {
    yield put({type: 'setLoading',payload: true})
    yield delay()
    const posts = yield call(getAllPosts)
    yield put({type: 'setPosts',payload: posts})
    yield put({type: 'setLoading',payload: false})
}
export function* postsWatcher() {
    yield takeEvery('fetchPosts',postsWorker)
}
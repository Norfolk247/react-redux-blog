import {all} from 'redux-saga/effects'
import {postsWatcher} from "./postsSaga";

export function* rootWatcher() {
    yield all([postsWatcher()])
}
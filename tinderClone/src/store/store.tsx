
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import ViewReducer from './reducers/ViewReducer';
import LikeReducer from './reducers/LikeReducer';
import MatchReducer from './reducers/MatchReducer';
import ChatReducer from './reducers/ChatReducer';
import ReportReducer from './reducers/ReportReducer';
import BlockReducer from './reducers/BlockReducer';

export const HOST_URL= "http://192.168.0.102:8080";
const initialState= {};

const rootReducer = combineReducers({
    USERS: userReducer,
    VIEWS: ViewReducer,
    LIKES: LikeReducer,
    MATCHES: MatchReducer,
    CHATS: ChatReducer,
    REPORTS: ReportReducer,
    BLOCKS: BlockReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
   
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { combineReducers, createStore, applyMiddleware } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { counterReducer } from "./reducer/gitReducer"; //reducers
import { gitEpic } from "./epic/gitEpic"; //epics

const rootEpic = combineEpics(
  gitEpic.User_Login,
  gitEpic.User_Logout,
  gitEpic.User_Register,
  gitEpic.User_ProfileByID,
  gitEpic.User_ViewPage,
);

const rootReducer = combineReducers({ counterReducer });
const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);
export default createStoreWithMiddleware(rootReducer);

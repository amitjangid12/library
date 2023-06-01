import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"
import saga from "./saga";

const sagaMiddleWare = createSagaMiddleware()
const store = configureStore(
    {
        reducer: rootReducer,
        middleware: () => [sagaMiddleWare]
    }
)

sagaMiddleWare.run(saga)
export default store;
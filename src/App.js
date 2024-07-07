import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ChatComponent from './components/ChatComponent';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Body from './components/Body';
import { Provider } from "react-redux";
import store from "./utils/store";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <LogIn />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "chat",
                element: <ChatComponent />,
            },
        ],
    },
]);

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={appRouter} />
        </Provider>
    );
}

export default App;

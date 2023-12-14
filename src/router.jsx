import {
    createBrowserRouter,
    RouterProvider,
    redirect,
} from "react-router-dom"
import MainPage from "./routes/MainPage"
import CreatePage from "./routes/CreatePage"
import UpdatePage from "./routes/UpdatePage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/update/:status",
        element: <UpdatePage />,
    },
    {
        path: "/create",
        element: <CreatePage />,
    },
    {
        path: "*",
        loader: () => redirect("/"),
    },
]);

function Route() {
    return <RouterProvider router={router} />
}

export default Route

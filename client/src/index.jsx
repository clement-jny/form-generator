import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { HomePage } from "./home/homePage";
import { CreatePage } from "./create/createPage";
import { TryPage } from "./try/tryPage";
import { HistoryPage } from "./history/historyPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/start",
		element: <p>aa</p>
	},
	{
		path: "/create",
		element: <CreatePage />
	},
	{
		path: "/try",
		element: <TryPage />
	},
	{
		path: "/history",
		element: <HistoryPage />
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
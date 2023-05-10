import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { HomePage } from "./home/homePage";
import { GeneratePage } from "./generate/generatePage";
import { TryPage } from "./try/tryPage";
import { HistoryPage } from "./history/historyPage";


const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/generate",
		element: <GeneratePage />
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
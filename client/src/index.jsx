import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

import "./index.css";

import { HomePage } from "./home/homePage";
import { GeneratePage } from "./generate/generatePage";
import { HistoryPage } from "./history/historyPage";


const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/generate/:fileId",
		element: <GeneratePage />
	},
	{
		path: "/history",
		element: <HistoryPage />
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<Toaster position="top-right" />
		<RouterProvider router={router} />
	</QueryClientProvider>
);
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Customer from "./customer";
import Config from "./Config";
import ChartPage from "./ChartPage";
import ConfigLabel from "./ConfigLabel";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "customers",
				element: <Customer />,
			},
			{
				path: "config",
				element: <Config />,
			},
			{
				path: "chart",
				element: <ChartPage />,
			},
			{
				path: "config-label",
				element: <ConfigLabel />,
			},
		],
	},
]);

export default router;

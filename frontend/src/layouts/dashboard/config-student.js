import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import RectangleStackIcon from "@heroicons/react/24/solid/RectangleStackIcon";
import { SvgIcon } from "@mui/material";

export const itemsStudent = [
	{
		title: "Dashboard",
		path: "/dashboard-student",
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		),
	},
	{
		title: "History",
		path: "/history-student",
		icon: (
			<SvgIcon fontSize="small">
				<RectangleStackIcon />
			</SvgIcon>
		),
	},
];

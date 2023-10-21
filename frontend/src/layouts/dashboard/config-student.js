import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import RectangleStackIcon from "@heroicons/react/24/solid/RectangleStackIcon";
import { SvgIcon } from "@mui/material";

export const itemsStudent = [
	{
		title: "Overview",
		path: "/",
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		),
	},
	{
		title: "Assignments",
		path: "/assignments-student",
		icon: (
			<SvgIcon fontSize="small">
				<RectangleStackIcon />
			</SvgIcon>
		),
	},
];

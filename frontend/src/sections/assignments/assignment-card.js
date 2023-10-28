import PropTypes from "prop-types";
import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Divider,
	Stack,
	SvgIcon,
	Typography,
	CardActions,
	Button,
} from "@mui/material";

export const AssignmentCard = (props) => {
	const { assignment } = props;

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<CardContent className="pb-3">
				<Typography align="left" gutterBottom variant="h6" className="mb-4">
					{assignment.title}
				</Typography>
				<Typography align="left" variant="body1">
					{assignment.description}
				</Typography>
			</CardContent>
			<CardActions className="px-6 mb-3">
				<Button variant="contained" size="small">
					View
				</Button>
				<Button variant="outlined" size="small">
					Edit
				</Button>
			</CardActions>
			<Box sx={{ flexGrow: 1 }} />
			<Divider />
			<Stack
				alignItems="center"
				direction="row"
				justifyContent="space-between"
				spacing={2}
				sx={{ p: 2 }}
			>
				<Stack alignItems="center" direction="row" spacing={1}>
					<SvgIcon color="action" fontSize="small">
						<ClockIcon />
					</SvgIcon>
					<Typography color="text.secondary" display="inline" variant="body2">
						{assignment.createdAt}
					</Typography>
				</Stack>
				<Stack alignItems="center" direction="row" spacing={1}>
					<SvgIcon color="action" fontSize="small">
						<UserGroupIcon />
					</SvgIcon>
					<Typography color="text.secondary" display="inline" variant="body2">
						{assignment.downloads} Students
					</Typography>
				</Stack>
			</Stack>
		</Card>
	);
};

AssignmentCard.propTypes = {
	assignment: PropTypes.object.isRequired,
};

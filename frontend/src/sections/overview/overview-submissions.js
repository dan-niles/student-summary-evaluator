import { format } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardHeader,
	Divider,
	SvgIcon,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { SeverityPill } from "src/components/severity-pill";
import dayjs from "dayjs";

const statusMap = {
	pending: "warning",
	submit: "success",
	error: "error",
};

export const OverviewLatestOrders = (props) => {
	const { submissions = [], sx } = props;

	return (
		<Card sx={sx}>
			<CardHeader title="Submissions" />
			<Scrollbar sx={{ flexGrow: 1 }}>
				<Box sx={{ minWidth: 800 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Question ID</TableCell>
								<TableCell>Student</TableCell>
								<TableCell sortDirection="desc">Submit Date</TableCell>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{submissions.map((submission) => {
								const submitAt = submission.submitAt
									? dayjs(submission.submitAt).format("DD/MM/YYYY")
									: "No Submission Yet";

								return (
									<TableRow hover key={submission.id}>
										<TableCell>{submission.ref}</TableCell>
										<TableCell>{submission.student.name}</TableCell>
										<TableCell>{submitAt}</TableCell>
										<TableCell>
											<SeverityPill color={statusMap[submission.status]}>
												{submission.status}
											</SeverityPill>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Box>
			</Scrollbar>
			<Divider />
			<CardActions sx={{ justifyContent: "flex-end" }}>
				<Button
					color="inherit"
					endIcon={
						<SvgIcon fontSize="small">
							<ArrowRightIcon />
						</SvgIcon>
					}
					size="small"
					variant="text"
				>
					View all
				</Button>
			</CardActions>
		</Card>
	);
};

OverviewLatestOrders.prototype = {
	orders: PropTypes.array,
	sx: PropTypes.object,
};

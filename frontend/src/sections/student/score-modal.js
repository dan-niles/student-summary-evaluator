import * as React from "react";
import {
	Box,
	Button,
	SvgIcon,
	Typography,
	Modal,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	CircularProgress,
	Divider,
} from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
};
import axios from "axios";

const normalize = (value, min, max) => {
	return ((value - min) / (max - min)) * 100;
};

export const ScoreAssignmentModal = (props) => {
	const handleClose = () => {
		props.setOpen(false);
	};

	return (
		<div>
			<Modal
				open={props.open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box>
					<Card sx={style}>
						<CardHeader
							title="Your Scores"
							// subheader="Please enter the details of the assignment."
							className="mb-0 pb-0"
						/>
						<CardContent className="mb-0 pb-0">
							{props.loading ? (
								<div className="justify-center items-center flex py-5">
									<CircularProgress />
								</div>
							) : (
								<>
									<div class="flex flex-row justify-center items-center py-5 mb-4">
										<div class="basis-1/2 justify-center items-center">
											<Typography variant="h5" className="mb-4 text-center">
												Content Score:
											</Typography>
											<Typography variant="body1" className="text-center">
												{normalize(props.contentScore, -2, 4).toFixed(2)}
											</Typography>
										</div>
										<div class="basis-1/2 justify-center items-center">
											<Typography variant="h5" className="mb-4 text-center">
												Wording Score:
											</Typography>
											<Typography variant="body1" className="text-center">
												{normalize(props.wordingScore, -2, 4).toFixed(2)}
											</Typography>
										</div>
									</div>
									<Divider />
									<div className="mt-4">
										{/* <Typography variant="h6">Remarks:</Typography> */}
									</div>
								</>
							)}
						</CardContent>
						<CardActions className="justify-end pr-6 pb-4">
							<Button size="small" onClick={handleClose}>
								Close
							</Button>
						</CardActions>
					</Card>
				</Box>
			</Modal>
		</div>
	);
};

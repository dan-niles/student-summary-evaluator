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
} from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
};
import axios from "axios";

export const DeleteAssignmentModal = (props) => {
	const handleClose = () => {
		props.setOpenDeleteModal(false);
	};

	const handleSubmit = async () => {
		try {
			const res = await axios.delete("/api/assignments", {
				data: {
					id: props.deleteID,
				},
			});
			if (res.status === 200) {
				props.getAssignments();
				handleClose();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Modal
				open={props.openDeleteModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box>
					<Card sx={style}>
						<CardHeader
							title="Delete Assignment"
							// subheader="Please enter the details of the assignment."
							className="mb-0 pb-0"
						/>
						<CardContent className="mb-0 pb-0">
							<Typography variant="body1" className="mb-4">
								Are you sure you want to delete this assignment?
							</Typography>
						</CardContent>
						<CardActions className="justify-end pr-6 pb-4">
							<Button size="small" onClick={handleClose}>
								Close
							</Button>
							<Button size="small" color="error" onClick={handleSubmit}>
								Confirm
							</Button>
						</CardActions>
					</Card>
				</Box>
			</Modal>
		</div>
	);
};

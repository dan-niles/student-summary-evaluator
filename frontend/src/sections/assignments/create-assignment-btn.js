"use client";
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
	TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
};

export const CreateAssignmentBtn = (props) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setTitle("");
		setQuestion("");
		setText("");
		setDeadline(dayjs());
	};

	const [title, setTitle] = React.useState("");
	const [question, setQuestion] = React.useState("");
	const [text, setText] = React.useState("");
	const [deadline, setDeadline] = React.useState(dayjs());

	const handleSubmit = async () => {
		try {
			const res = await axios.post("/api/assignments", {
				title,
				question,
				text,
				deadline: deadline.$d,
				user_id: "1",
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
			<Button
				onClick={handleOpen}
				startIcon={
					<SvgIcon fontSize="small">
						<PlusIcon />
					</SvgIcon>
				}
				variant="contained"
			>
				Create New
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box>
					<Card sx={style}>
						<CardHeader
							title="Create New Assignment"
							subheader="Please enter the details of the assignment."
							className="mb-0 pb-0"
						/>
						<CardContent>
							<TextField
								label="Title"
								variant="filled"
								className="mb-3"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<TextField
								label="Prompt Question"
								variant="filled"
								className="mb-3 w-full"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
							/>
							<ReactQuill
								theme="snow"
								value={text}
								onChange={setText}
								className="mb-12"
								style={{ height: "100px" }}
							/>
							<DateTimePicker
								className="mt-4"
								label="Deadline"
								renderInput={(inputProps) => (
									<TextField {...inputProps} variant="outlined" />
								)}
								value={deadline}
								onChange={(newValue) => setDeadline(newValue)}
							/>
						</CardContent>
						<CardActions className="justify-end pr-6 pb-4">
							<Button size="small" onClick={handleSubmit}>
								Create Assignment
							</Button>
						</CardActions>
					</Card>
				</Box>
			</Modal>
		</div>
	);
};

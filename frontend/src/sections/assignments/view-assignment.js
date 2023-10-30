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
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
};

export const ViewAssignmentModal = (props) => {
	const handleClose = () => {
		props.setOpenViewModal(false);
		setTitle("");
		setQuestion("");
		setText("");
		setDeadline(dayjs());
	};

	const [title, setTitle] = React.useState("");
	const [question, setQuestion] = React.useState("");
	const [text, setText] = React.useState("");
	const [deadline, setDeadline] = React.useState(dayjs());

	React.useEffect(() => {
		axios.get("/api/assignments/" + props.viewID).then((res) => {
			setTitle(res.data.assignments.eval_text.title);
			setQuestion(res.data.assignments.question);
			setText(res.data.assignments.eval_text.text);
			setDeadline(dayjs(res.data.deadline));
		});
	}, [props.viewID]);
	return (
		<div>
			<Modal
				open={props.openViewModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box>
					<Card sx={style}>
						<CardHeader
							title="View Assignment"
							// subheader="Please enter the details of the assignment."
							className="mb-0 pb-0"
						/>
						<CardContent>
							<TextField
								label="Title"
								variant="filled"
								className="mb-3"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								inputProps={{ readOnly: true }}
							/>
							<TextField
								label="Prompt Question"
								variant="filled"
								className="mb-3 w-full"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								inputProps={{ readOnly: true }}
							/>
							<TextField
								label="Prompt"
								variant="filled"
								className="mb-3 w-full"
								value={text}
								onChange={(e) => setText(e.target.value)}
								inputProps={{ readOnly: true }}
								multiline
								rows={4}
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

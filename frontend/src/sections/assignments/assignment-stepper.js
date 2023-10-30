import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Unstable_Grid2 as Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import { set } from "nprogress";
import { ScoreAssignmentModal } from "src/sections/student/score-modal";

const steps = [
	"Select an Assignment",
	"Provide Your Answer",
	"Review Your Answer",
];
function PaperComponent(props) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

export const AssignmentStepper = () => {
	const [open, setOpen] = React.useState(false);
	const [contentScore, setContentScore] = React.useState(0);
	const [wordingScore, setWordingScore] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [answer, setAnswer] = useState("");
	const [assignments, setAssignments] = useState([]);
	const [assignmentDetails, setAssignmentDetails] = useState({ text: "" });
	const [
		selectedAssignmentId,
		setSelectedAssignmentId,
		assignmentSelected = false,
	] = useState([0]);
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};
	const handleAssignmentClick = (assignmentId) => {
		setSelectedAssignmentId(assignmentId);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#11192F",
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
		":hover": {
			backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#11192F",
			// boxShadow: theme.shadows[38],
			transform: "translateY(-2px)",
			transition: "0.3s",
			color: theme.palette.primary.main,
		},
		cursor: "pointer",
		color: "white",
		fontSize: "1.1rem",
	}));

	const getAssignments = async () => {
		try {
			const res = await axios.get("/api/assignments");
			if (res.status === 200) {
				const mapped_assignments = res.data.assignments.map(
					(assignment, idx) => {
						return {
							id: assignment.id,
							createdAt: "31/10/2023",
							description: assignment.question,
							title: assignment.eval_text.title,
							downloads: "3",
						};
					}
				);
				console.log(mapped_assignments);
				setAssignments(mapped_assignments);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAssignments();
	}, []);

	// Reset the answer when selectedAssignmentId changes
	useEffect(() => {
		setAnswer("");
	}, [selectedAssignmentId]);
	const getAssignmentDetails = async (id) => {
		try {
			const res = await axios.get("/api/assignments/" + id);
			return res.data;
		} catch (error) {
			console.error("Error fetching assignment details:", error);
			return { text: "" };
		}
	};
	const handleAnswerChange = (event) => {
		setAnswer(event.target.value);
	};

	useEffect(() => {
		if (selectedAssignmentId) {
			getAssignmentDetails(selectedAssignmentId)
				.then((data) => {
					setAssignmentDetails(data.assignments);
				})
				.catch((error) => {
					console.error("Error getting assignment details:", error);
				});
		}
	}, [selectedAssignmentId]);

	return (
		<Box sx={{ width: "100%" }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					if (isStepSkipped(index)) {
						stepProps.completed = false;
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<div>
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 5, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						{activeStep === 0 ? (
							<Stack spacing={0.1} sx={{ mt: 2, mb: 1, py: 1, mr: 10, ml: 10 }}>
								{assignments.map((assignment) => (
									<Grid key={assignment.id}>
										<Item
											sx={{
												pt: 2,
												pb: 2,
												cursor: "pointer",
												backgroundColor:
													assignment.id === selectedAssignmentId
														? "blue"
														: "#11192F",
												fontWeight:
													assignment.id === selectedAssignmentId
														? "bold"
														: "normal",
											}}
											onClick={() => handleAssignmentClick(assignment.id)}
										>
											{assignment.title}
										</Item>
									</Grid>
								))}
							</Stack>
						) : activeStep === 1 ? (
							<form>
								<Stack spacing={2} sx={{ mt: 2, ml: 10 }}>
									<Typography variant="h6" gutterBottom>
										Title
									</Typography>
									<Typography variant="body1" gutterBottom>
										{assignments.find(
											(assignment) => assignment.id === selectedAssignmentId
										)?.title || ""}
									</Typography>
									<Typography variant="h6" gutterBottom>
										Question
									</Typography>
									<Typography variant="body1" gutterBottom>
										{assignments.find(
											(assignment) => assignment.id === selectedAssignmentId
										)?.description || ""}
									</Typography>
									<Typography variant="h6" gutterBottom>
										Text
									</Typography>
									<Typography variant="body1" gutterBottom>
										{assignmentDetails.eval_text.text}
									</Typography>
									<TextField
										label="Your Answer"
										fullWidth
										multiline
										rows={4}
										value={answer}
										onChange={handleAnswerChange}
									/>
								</Stack>
							</form>
						) : (
							<form>
								<Stack spacing={2} sx={{ mt: 2, ml: 10 }}>
									<Typography variant="h6" gutterBottom>
										Title
									</Typography>
									<Typography variant="body1" gutterBottom>
										{assignments.find(
											(assignment) => assignment.id === selectedAssignmentId
										)?.title || ""}
									</Typography>
									<Typography variant="h6" gutterBottom>
										Question
									</Typography>
									<Typography variant="body1" gutterBottom>
										{assignments.find(
											(assignment) => assignment.id === selectedAssignmentId
										)?.description || ""}
									</Typography>
									<Typography variant="h6" gutterBottom>
										Text
									</Typography>
									<Typography variant="body1" gutterBottom>
										{assignmentDetails.eval_text.text}
									</Typography>
									<Typography variant="h6" gutterBottom>
										Your Answer
									</Typography>
									<Typography variant="body1" gutterBottom>
										{answer}
									</Typography>
								</Stack>
							</form>
						)}
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button
								variant="outlined"
								onClick={async () => {
									if (activeStep === steps.length - 1) {
										// alert("Submitting your answer...");
										setLoading(true);
										handleOpen();

										const res = await axios.post(
											"http://localhost:8000/api/summaryview/",
											{
												text: 1,
												prompt_id: selectedAssignmentId,
												summary: answer,
											}
										);

										if (res.status === 200) {
											setContentScore(res.data[0]);
											setWordingScore(res.data[1]);
											setLoading(false);
										}
									} else {
										handleNext(); // For the "Next" button
									}
								}}
								disabled={
									selectedAssignmentId == 0 ||
									(activeStep === 1 && answer === "")
								}
							>
								{activeStep === steps.length - 1 ? "Submit" : "Next"}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</div>
			<ScoreAssignmentModal
				open={open}
				setOpen={setOpen}
				loading={loading}
				contentScore={contentScore}
				wordingScore={wordingScore}
			/>
		</Box>
	);
};

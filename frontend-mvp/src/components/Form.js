import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import Button from "@mui/material/Button";
import NavBar from "./NavBar";
import FormCard from "./FormCard";
import { Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import BasicModal from "./BasicModal";

function Form() {
	const [Text, setText] = useState([]);
	const [TitleID, setTitleID] = useState(0);
	const [Summary, setSummary] = useState("");
	const [contentScore, setContentScore] = useState(0);
	const [wordingScore, setWordingScore] = useState(0);
	const fetchText = () => {
		return new Promise(function(resolve, reject) {
		  fetch('http://localhost:8000/api/text').then(response => {
			resolve(response);
		  });
		});
	  };

	useEffect(() => {
		fetchText();
	}, []);

	const goToDetail = () => {
		alert("detail page");
	};

	const handleSelectChange = (event) => {
		const selectedValue = event.target.value;
		const selectedTitle = Text.find((text) => text.title === selectedValue);
		setTitleID(selectedTitle?.id);
		console.log(TitleID);
	};

	const addNewSummary = async () => {
		handleBackdropOpen();
		setTimeout(() => {
			handleBackdropClose();
			handleOpenModal();
		}, 2000);
		return;
		try {
			const response = await axios.post(
				"http://localhost:8000/api/summaries/",
				{
					text: TitleID,
					summary: Summary,
				}
			);

			console.log("New summary created:", response.data);
		} catch (error) {
			console.error("Error creating summary:", error);
		}
	};

	// For loading backdrop
	const [openBackdrop, setOpenBackdrop] = useState(false);
	const handleBackdropClose = () => {
		setOpenBackdrop(false);
	};
	const handleBackdropOpen = () => {
		setOpenBackdrop(true);
	};

	// For Score Modal
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	return (
		<>
			<NavBar />
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={openBackdrop}
				onClick={handleBackdropClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<BasicModal
				open={openModal}
				setOpen={setOpenModal}
				handleOpen={handleOpenModal}
				handleClose={handleCloseModal}
				content={contentScore}
				wording={wordingScore}
			/>
			<Container>
				<Grid container>
					<Grid item xs={12} sx={{ px: 10, py: 4 }}>
						<FormCard>
							<Grid container>
								<Grid item xs={12}>
									<forms>
										<div className="form-groups">
											{/* <label for="exampleFormControlInput1">ID</label>
									<input
										type="email"
										className="form-control"
										id="exampleFormControlInput1"
										placeholder="type your ID here"
									/> */}
											<TextField
												sx={{ mb: 2, width: "25ch" }}
												id="exampleFormControlInput1"
												label="Student ID"
												variant="outlined"
												placeholder="Type your ID here"
											/>
										</div>
										<div className="form-group">
											{/* <label for="exampleFormControlSelect1">Select Question</label>
									<select
										className="form-control"
										id="exampleFormControlSelect1"
									>
										{Text.map((text, index) => (
											<option>{text.question}</option>
										))}
									</select> */}
											<TextField
												sx={{ mb: 2 }}
												fullWidth
												id="exampleFormControlSelect1"
												select
												label="Question"
												helperText="Please select your question"
											>
												{Text.map((text, index) => (
													<MenuItem key={index} value={text.question}>
														{text.question}
													</MenuItem>
												))}
											</TextField>
										</div>
										<div className="form-group">
											{/* <label for="exampleFormControlSelect1">Select Title</label>
									<select
										className="form-control"
										id="exampleFormControlSelect1"
										onChange={handleSelectChange}
									>
										{Text.map((text, index) => (
											<option>{text.title}</option>
										))}
									</select> */}
											<TextField
												sx={{ mb: 2 }}
												fullWidth
												id="exampleFormControlSelect"
												select
												label="Title"
												helperText="Please select your title"
												onChange={handleSelectChange}
											>
												{Text.map((text, index) => (
													<MenuItem key={index} value={text.title}>
														{text.title}
													</MenuItem>
												))}
											</TextField>
										</div>

										<div className="form-group">
											{/* <label for="exampleFormControlTextarea1">Your Summary</label>
									<textarea
										className="form-control"
										id="exampleFormControlTextarea1"
										rows="5"
										name="summary"
										value={Summary}
										onChange={(e) => {
											setSummary(e.target.value);
											// console.log(Summary)
										}}
									></textarea> */}
											<TextField
												sx={{ mb: 2 }}
												fullWidth
												id="exampleFormControlTextarea1"
												label="Your Summary"
												multiline
												rows={5}
												variant="outlined"
												name="summary"
												value={Summary}
												onChange={(e) => {
													setSummary(e.target.value);
													// console.log(Summary)
												}}
											/>
										</div>
									</forms>
								</Grid>
							</Grid>
							<Button onClick={addNewSummary} variant="outlined">
								Evaluate
							</Button>
						</FormCard>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Form;

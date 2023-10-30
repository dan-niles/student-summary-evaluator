import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import {
	Box,
	Button,
	Container,
	Stack,
	SvgIcon,
	Typography,
	Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AssignmentCard } from "src/sections/assignments/assignment-card";
import { AssignmentsSearch } from "src/sections/assignments/assignments-search";
import { CreateAssignmentBtn } from "src/sections/assignments/create-assignment-btn";
import { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
	const [assignments, setAssignments] = useState([]);

	const getAssignments = async () => {
		try {
			const res = await axios.get("/api/assignments");
			if (res.status === 200) {
				const mapped_assignments = res.data.assignments.map(
					(assignment, idx) => {
						return {
							id: idx,
							createdAt: "31/10/2023",
							description: assignment.question.slice(0, 100) + "...",
							title: assignment.eval_text.title,
							downloads: "4",
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

	return (
		<>
			<Head>
				<title>Assignments | Summary Evaluation System</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<Stack direction="row" justifyContent="space-between" spacing={4}>
							<Stack spacing={1}>
								<Typography variant="h4">Assignments</Typography>
								<Stack alignItems="center" direction="row" spacing={1}>
									<Button
										color="inherit"
										startIcon={
											<SvgIcon fontSize="small">
												<ArrowUpOnSquareIcon />
											</SvgIcon>
										}
									>
										Import
									</Button>
									<Button
										color="inherit"
										startIcon={
											<SvgIcon fontSize="small">
												<ArrowDownOnSquareIcon />
											</SvgIcon>
										}
									>
										Export
									</Button>
								</Stack>
							</Stack>
							<div>
								<CreateAssignmentBtn getAssignments={getAssignments} />
							</div>
						</Stack>
						<AssignmentsSearch />
						<Grid container spacing={3}>
							{assignments.map((assignment) => (
								<Grid xs={12} md={6} lg={4} key={assignment.id}>
									<AssignmentCard assignment={assignment} />
								</Grid>
							))}
						</Grid>
					</Stack>
				</Container>
			</Box>
		</>
	);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

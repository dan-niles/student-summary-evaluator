import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
	Box,
	Button,
	Container,
	Pagination,
	Stack,
	SvgIcon,
	Typography,
	Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AssignmentCard } from "src/sections/assignments/assignment-card";
import { AssignmentsSearch } from "src/sections/assignments/assignments-search";
import { CreateAssignmentBtn } from "src/sections/assignments/create-assignment-btn";

const assignments = [
	{
		id: "2569ce0d517a7f06d3ea1f24",
		createdAt: "27/03/2019",
		description:
			"Summarize at least 3 elements of an ideal tragedy, as described by Aristotle.",
		logo: "/assets/logos/logo-dropbox.png",
		title: "On Tragedy",
		downloads: "4",
	},
	{
		id: "ed2b900870ceba72d203ec15",
		createdAt: "31/03/2019",
		description:
			"In complete sentences, summarize the structure of the ancient Egyptian system of government. How wer...",
		logo: "/assets/logos/logo-medium.png",
		title: "Egyptian Social Structure",
		downloads: "5",
	},
	{
		id: "a033e38768c82fca90df3db7",
		createdAt: "03/04/2019",
		description:
			"Summarize how the Third Wave developed over such a short period of time and why the experiment was e...",
		logo: "/assets/logos/logo-slack.png",
		title: "The Third Wave",
		downloads: "8",
	},
	{
		id: "1efecb2bf6a51def9869ab0f",
		createdAt: "04/04/2019",
		description:
			"Summarize the various ways the factory would use or cover up spoiled meat. Cite evidence in your ans...",
		logo: "/assets/logos/logo-lyft.png",
		title: "Excerpt from The Jungle",
		downloads: "4",
	},
];

const Page = () => (
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
							<CreateAssignmentBtn />
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

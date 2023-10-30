import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
	Box,
	Modal,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	TextField,
} from "@mui/material";

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

export function SelectAllTransferList() {
	const [checked, setChecked] = React.useState([]);
	const [left, setLeft] = React.useState([]);
	const [right, setRight] = React.useState([
		"Rowan Holmes",
		"Camilla Scott",
		"Jake Stokes",
	]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				sx={{ px: 2, py: 1 }}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={
							numberOfChecked(items) === items.length && items.length !== 0
						}
						indeterminate={
							numberOfChecked(items) !== items.length &&
							numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{
							"aria-label": "all items selected",
						}}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List
				sx={{
					width: 200,
					height: 230,
					bgcolor: "background.paper",
					overflow: "auto",
				}}
				dense
				component="div"
				role="list"
			>
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem
							key={value}
							role="listitem"
							button
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										"aria-labelledby": labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`${value}`} />
						</ListItem>
					);
				})}
			</List>
		</Card>
	);

	return (
		<Grid container spacing={2} justifyContent="center" alignItems="center">
			<Grid item>{customList("Choices", left)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label="move selected right"
					>
						&gt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList("Chosen", right)}</Grid>
		</Grid>
	);
}
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
};

export const AddStudentsModal = (props) => {
	const handleOpen = () => props.setOpenStudentsModal(true);
	const handleClose = () => {
		props.setOpenStudentsModal(false);
	};
	return (
		<Modal
			open={props.openStudentsModal}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box>
				<Card sx={style}>
					<CardHeader
						title="Add/Remove Students"
						subheader="Please add/remove students as needed from the list below."
						className="mb-0 pb-0"
					/>
					<CardContent>
						<SelectAllTransferList />
					</CardContent>
					<CardActions className="justify-end pr-6 pb-4">
						<Button size="small" onClick={handleClose}>
							Save
						</Button>
					</CardActions>
				</Card>
			</Box>
		</Modal>
	);
};

export default AddStudentsModal;

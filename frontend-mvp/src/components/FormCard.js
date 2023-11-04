import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
	<Box
		component="span"
		sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
	>
		•
	</Box>
);

export default function FormCard(props) {
	return (
		<Card>
			<CardContent sx={{ px: 10, py: 3 }}>
				<Typography
					sx={{ fontSize: 16, mb: 2, fontWeight: "bold" }}
					color="text.secondary"
					gutterBottom
				>
					Submit Summary
				</Typography>
				{props.children}
			</CardContent>
		</Card>
	);
}

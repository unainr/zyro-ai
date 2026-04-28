"use client";
import { useState } from "react";
import Link from "next/link";
import CreateBoardDialog from "../components/create-board-dialog";
import { Button } from "@/components/ui/button";


export default function DrawDashboard() {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setDialogOpen(true)} variant="primary">
				+ New Board
			</Button>

			<CreateBoardDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
			/>
		</>
	);
}

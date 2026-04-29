"use client";
import { useState } from "react";
import Link from "next/link";
import CreateBoardDialog from "./create-board-dialog";
import { Button } from "@/components/ui/button";

interface CreateBoardButtonProps {
className?:string
}

export default function CreateBoardButton({className}:CreateBoardButtonProps) {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setDialogOpen(true)} variant="primary" className={className}>
				+ New Board
			</Button>

			<CreateBoardDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
			/>
		</>
	);
}

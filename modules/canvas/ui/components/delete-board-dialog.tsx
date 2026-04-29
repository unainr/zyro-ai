"use client";

import { useState } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Trash2 } from "@hugeicons/core-free-icons";
import { useDeleteProject } from "../../hooks/use-canvas";
import { Spinner } from "@/components/ui/spinner";

interface DeleteProjectDialogProps {
	projectId: string;
}

const DeleteBoardDialog = ({ projectId }: DeleteProjectDialogProps) => {
	const { mutate, isPending } = useDeleteProject();
	const router = useRouter();

	const [open, setOpen] = useState(false);

	const handleDelete = () => {
		mutate(projectId, {
			onSuccess: () => {
				setOpen(false); // close dialog only after success
				router.refresh(); // refresh server component data
			},
		});
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="icon">
					<HugeiconsIcon icon={Trash2} strokeWidth={2} className="size-4" />
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this board?</AlertDialogTitle>

					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						board.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

					<Button
						onClick={handleDelete}
						disabled={isPending}
						className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5  disabled:opacity-50 transition ">
						{isPending ? (
							<>
								<Spinner /> Deleting
							</>
						) : (
							"Delete"
						)}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteBoardDialog;

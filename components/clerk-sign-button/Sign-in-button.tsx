"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export const SignInButtonClerk = () => {
	return (
		<>
			<Show when="signed-out">
				<SignInButton>
					<Button variant={'primary'} asChild >
						<Link href="/sign-in">Get Started</Link>
					</Button>
				</SignInButton>
			</Show>

			<Show when="signed-in">
				<UserButton />
				<Button variant={'primary'} className="rounded-none" asChild>
					<Link href="/dashboard/draw">Dashboard</Link>
				</Button>
			</Show>
		</>
	);
};

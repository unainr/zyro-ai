import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TypesLayout } from "@/types";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { SignInButtonClerk } from "@/components/clerk-sign-button/Sign-in-button";
import { ThemeSwitcher } from "@/components/theme/mode-toggle";
const Layout = async ({ children }: TypesLayout) => {


	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b">
					<div className="flex items-center gap-2 px-3">
						<SidebarTrigger />
						<Separator orientation="vertical" className="mr-2 h-4" />
					</div>
					<div className="flex w-full items-center justify-end gap-3">
						<SignInButtonClerk />
						<ThemeSwitcher />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Layout;

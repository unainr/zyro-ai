import Image from "next/image";
import Link from "next/link";
const Footer = () => {
	return (
		<>
			{/* FOOTER */}
			<footer className="border-t border-white/5 py-10">
				<div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-2.5">
						<Link href="/" className="flex items-center gap-2 pr-5">
							<Image
								src="/logo2.png"
								alt="CareInktake Logo"
								width={800}
								height={800}
								className="h-12 w-auto object-contain hidden dark:block"
							/>

							<Image
								src="/logo1.png"
								alt="CareInktake Logo"
								width={800}
								height={800}
								className="h-12 w-auto object-contain dark:hidden block"
							/>
						</Link>
					</div>
					<p className="font-body text-xs text-white/20">
						© {new Date().getFullYear()} CareIntake. Built for better care.
					</p>
					<div className="flex items-center gap-6 font-body text-xs text-white/25">
						<a href="#" className="hover:text-white/60 transition-colors">
							Privacy
						</a>
						<a href="#" className="hover:text-white/60 transition-colors">
							Terms
						</a>
						<a href="#" className="hover:text-white/60 transition-colors">
							Contact
						</a>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;

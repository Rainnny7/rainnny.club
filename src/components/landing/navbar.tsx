import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { HeartIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "../ui/button";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { SignalIcon } from "@heroicons/react/24/outline";

const Navbar = (): ReactElement => (
	<nav className="py-4 flex gap-14 justify-center items-center border-b">
		<Branding />
		<Links />
	</nav>
);

const Branding = (): ReactElement => (
	<Link
		className="flex gap-4 items-center hover:opacity-75 transition-all transform-gpu"
		href="/"
	>
		<Image
			className="rounded-full"
			src="/me.png"
			alt="My Selfie (:"
			width={40}
			height={40}
		/>
		<h1 className="text-xl font-bold">RainnnyCLUB</h1>
	</Link>
);

const Links = (): ReactElement => (
	<NavigationMenu>
		<NavigationMenuList>
			{/* Useful Links */}
			<NavigationMenuItem>
				<NavigationMenuTrigger>Useful Links</NavigationMenuTrigger>
				<NavigationMenuContent>
					<NavigationMenuLink>
						<UsefulLinksContent />
					</NavigationMenuLink>
				</NavigationMenuContent>
			</NavigationMenuItem>

			{/* Donate */}
			<NavigationMenuItem>
				<Link href="https://buymeacoffee.com/Rainnny7" legacyBehavior passHref>
					<NavigationMenuLink
						className={cn(navigationMenuTriggerStyle(), "gap-2")}
						target="_blank"
					>
						<span>Donate</span>
						<HeartIcon
							className="text-red-500 animate-pulse"
							width={20}
							height={20}
						/>
					</NavigationMenuLink>
				</Link>
			</NavigationMenuItem>

			{/* Theme Switcher */}
			<NavigationMenuItem>
				<ThemeSwitcher />
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);

const UsefulLinksContent = (): ReactElement => (
	<div className="p-3 flex gap-5">
		{/* Wiki */}
		<Link href="https://docs.rainnny.club" target="_blank">
			<Button className="gap-3" variant="ghost">
				<BookOpenIcon width={24} height={24} />
				<span>Wiki</span>
			</Button>
		</Link>

		{/* Status Page */}
		<Link href="https://status.rainnny.club" target="_blank">
			<Button className="gap-3" variant="ghost">
				<SignalIcon width={24} height={24} />
				<span>Service Status</span>
			</Button>
		</Link>
	</div>
);

export default Navbar;

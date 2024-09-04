import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { HeartIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "./theme-switcher";
import { Button } from "@/components/ui/button";
import {
    BookOpenIcon,
    CodeBracketIcon,
    SignalIcon,
} from "@heroicons/react/24/outline";
import BlurFade from "@/components/ui/blur-fade";

const Navbar = (): ReactElement => (
    <BlurFade className="pt-1 z-50" delay={1.35} inView>
        <nav className="px-3 xs:px-7 py-4 flex gap-3 xs:gap-10 sm:gap-14 justify-center items-center bg-background border-b transition-all transform-gpu">
            <Branding />
            <Links />
            <ThemeSwitcher />
        </nav>
    </BlurFade>
);

const Branding = (): ReactElement => (
    <Link
        className="flex gap-3 items-center hover:opacity-75 select-none transition-all transform-gpu"
        href="/"
    >
        <Image
            className="rounded-full"
            src="/me.png"
            alt="My Selfie (:"
            width={40}
            height={40}
        />
        <h1 className="hidden sm:flex text-xl font-bold">RainnnyCLUB</h1>
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
                <Link
                    href="https://buymeacoffee.com/Rainnny7"
                    legacyBehavior
                    passHref
                >
                    <NavigationMenuLink
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "gap-2 select-none"
                        )}
                        target="_blank"
                    >
                        <span className="hidden sm:flex">Buy me a Coffee</span>
                        <span className="sm:hidden">Donate</span>
                        <HeartIcon
                            className="text-red-500 animate-pulse"
                            width={20}
                            height={20}
                        />
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);

const UsefulLinksContent = (): ReactElement => (
    <div className="w-[15.5rem] p-3 flex flex-wrap gap-5">
        {/* Git */}
        <Link href="https://git.rainnny.club" target="_blank">
            <Button className="gap-3" variant="ghost">
                <CodeBracketIcon width={24} height={24} />
                <span>Gitea</span>
            </Button>
        </Link>

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
                <span>Status</span>
            </Button>
        </Link>
    </div>
);

export default Navbar;

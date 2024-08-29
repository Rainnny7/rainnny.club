"use client";

import { ReactElement } from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UseThemeProps } from "next-themes/dist/types";

const ThemeSwitcher = (): ReactElement => {
	const { theme, setTheme }: UseThemeProps = useTheme();
	const isLight = theme === "light";
	return (
		<Button
			className="mx-7 px-5 py-1.5 flex items-center relative hover:opacity-85"
			variant="ghost"
			onClick={() => setTheme(isLight ? "dark" : "light")}
		>
			<motion.div
				initial={{ rotate: 0, scale: 1 }}
				animate={{ rotate: isLight ? 0 : -90, scale: isLight ? 1 : 0 }}
				transition={{ duration: 0.5 }}
				className="absolute"
			>
				<Sun className="w-[1.2rem] h-[1.2rem]" />
			</motion.div>
			<motion.div
				initial={{ rotate: 90, scale: 0 }}
				animate={{ rotate: isLight ? 90 : 0, scale: isLight ? 0 : 1 }}
				transition={{ duration: 0.5 }}
				className="absolute"
			>
				<MoonStar className="w-[1.2rem] h-[1.2rem]" />
			</motion.div>
		</Button>
	);
};
export default ThemeSwitcher;

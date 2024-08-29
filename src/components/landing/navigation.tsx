"use client";

import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { WrenchIcon } from "@heroicons/react/24/outline";
import { ServerStackIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/ui/blur-fade";
import HomelabContent from "./nav-content/homelab";
import Skills from "./nav-content/skills";
import MyWork from "./nav-content/my-work";

type Item = {
	name: string;
	icon: ReactElement;
	content: ReactElement;
};

const items: Item[] = [
	{
		name: "My Work",
		icon: <BriefcaseIcon width={22} height={22} />,
		content: <MyWork />,
	},
	{
		name: "Skills",
		icon: <WrenchIcon width={22} height={22} />,
		content: <Skills />,
	},
	{
		name: "Homelab",
		icon: <ServerStackIcon width={22} height={22} />,
		content: <HomelabContent />,
	},
];

const Navigation = (): ReactElement => {
	const [selected, setSelected] = useState<Item | undefined>(undefined);
	return (
		<div className="flex flex-col">
			{/* Selection Buttons */}
			<div className="flex gap-5 justify-center">
				{items.map((item, index) => {
					const active: boolean = selected === item;
					return (
						<BlurFade key={index} delay={0.9 + 0.3 * index} inView>
							<Button
								className={cn(
									"py-6 gap-2 bg-white/75 dark:bg-zinc-800/75 cursor-default hover:opacity-75 transition-all transform-gpu",
									active && "opacity-70",
								)}
								variant="ghost"
								onClick={() =>
									active ? setSelected(undefined) : setSelected(item)
								}
							>
								{item.icon}
								{item.name}
							</Button>
						</BlurFade>
					);
				})}
			</div>

			{/* Selected Content */}
			{selected && (
				<BlurFade key={selected.name} delay={0.05} inView>
					<div className="mt-4 p-4 border rounded-xl">{selected.content}</div>
				</BlurFade>
			)}
		</div>
	);
};
export default Navigation;

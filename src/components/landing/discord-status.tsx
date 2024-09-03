"use client";

import { ReactElement } from "react";
import { Activity, Data, DiscordUser, useLanyardWS } from "use-lanyard";
import BlurFade from "@/components/ui/blur-fade";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PlayIcon } from "@heroicons/react/24/outline";

const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
};

const DiscordStatus = (): ReactElement => {
    const discordData: Data | undefined = useLanyardWS("504147739131641857");
    const discordUser: DiscordUser | undefined = discordData?.discord_user;
    return (
        <div className="absolute left-4 bottom-4">
            {discordData && discordUser && (
                <BlurFade
                    className="flex select-none pointer-events-none"
                    delay={1.65}
                    inView
                >
                    {/* Avatar & Status */}
                    <div className="relative z-50">
                        <Image
                            className="scale-110 rounded-full border"
                            src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`}
                            alt={`${discordUser.username}'s Discord Avatar`}
                            width={60}
                            height={60}
                        />
                        {discordData.discord_status !== "offline" && (
                            <div
                                className={cn(
                                    "absolute bottom-1.5 right-1 w-2.5 h-2.5 bg-red-500 rounded-full",
                                    statusColors[discordData.discord_status]
                                )}
                            />
                        )}
                    </div>

                    {/* Username & Basic Activity */}
                    <div className="-translate-x-7 p-2 pl-10 pr-6 flex flex-col justify-center bg-white/55 dark:bg-zinc-800/45 border rounded-r-3xl">
                        <div className="flex gap-1 items-center">
                            <h1 className="text-lg font-bold">
                                {discordUser.display_name}
                            </h1>
                            <h2 className="opacity-65">
                                {discordUser.username}
                            </h2>
                        </div>

                        {discordData.activities.length > 0 && (
                            <BasicActivityDisplay
                                activity={discordData.activities[0]}
                            />
                        )}
                    </div>
                </BlurFade>
            )}
        </div>
    );
};

const BasicActivityDisplay = ({
    activity,
}: {
    activity: Activity;
}): ReactElement => {
    const prefix =
        activity.type === 0
            ? "Playing"
            : activity.type === 1
              ? "Streaming"
              : "Listening to";

    return (
        <div className="flex gap-1.5 items-center text-sm">
            <span className="opacity-80">{prefix}</span> {activity.name}{" "}
            <PlayIcon className="text-blue-500" width={16} height={16} />
        </div>
    );
};

export default DiscordStatus;

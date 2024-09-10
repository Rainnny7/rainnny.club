"use client";

import { ReactElement, useEffect, useState } from "react";
import {
    DiscordUser,
    SpotifyActivity,
    UserBadge,
    useTetherWS,
} from "use-tether";
import Image from "next/image";
import { cn, truncateText } from "@/lib/utils";
import SimpleTooltip from "@/components/ui/simple-tooltip";
import Link from "next/link";
import moment from "moment";

const statusColors = {
    ONLINE: "bg-green-500",
    IDLE: "bg-yellow-500",
    DO_NOT_DISTURB: "bg-red-500",
    OFFLINE: "bg-zinc-500",
};

const DiscordStatus = (): ReactElement | undefined => {
    const discordUser: DiscordUser | undefined =
        useTetherWS("504147739131641857");
    if (!discordUser) {
        return undefined;
    }
    return (
        <div className="flex justify-center select-none">
            <div className="flex flex-col bg-zinc-300 dark:bg-zinc-900 rounded-xl">
                <BannerAvatar discordUser={discordUser} />

                <div className="px-3 pt-1.5 py-2.5 flex flex-col">
                    <div className="ml-[5.65rem] flex items-start">
                        {discordUser.bio && <Bio bio={discordUser.bio} />}
                        <Badges discordUser={discordUser} />
                    </div>
                    <div
                        className={cn(
                            discordUser.badges.length < 5 &&
                                (discordUser.banner ? "mt-3" : "mt-6")
                        )}
                    >
                        <Username discordUser={discordUser} />

                        {/* Activity */}
                        {discordUser.spotify && (
                            <div className="mt-2 p-2 bg-zinc-100 dark:bg-zinc-950/65 rounded-lg">
                                <SpotifyActivityContent
                                    spotify={discordUser.spotify}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BannerAvatar = ({
    discordUser,
}: {
    discordUser: DiscordUser;
}): ReactElement => {
    const bannerClasses =
        "border-2 border-zinc-300 dark:border-zinc-900 rounded-t-xl";
    return (
        <div className="relative pointer-events-none">
            {discordUser.banner ? (
                <Image
                    className={bannerClasses}
                    src={discordUser.banner.url}
                    alt={`${discordUser.username}'s Banner`}
                    width={300}
                    height={300}
                />
            ) : (
                <div
                    className={cn("w-[300px] h-[107px]", bannerClasses)}
                    style={{ background: discordUser.bannerColor }}
                />
            )}
            <div className="relative">
                <Image
                    className="absolute left-2 -bottom-12 border-[5px] border-zinc-300 dark:border-zinc-900 rounded-full"
                    src={discordUser.avatar.url}
                    alt={`${discordUser.username}'s Avatar`}
                    width={96}
                    height={96}
                />
                <div
                    className={cn(
                        "absolute left-[4.5rem] -bottom-12 w-7 h-7 border-[5px] border-zinc-300 dark:border-zinc-900 rounded-full",
                        statusColors[discordUser.onlineStatus]
                    )}
                />
            </div>
        </div>
    );
};

const Bio = ({ bio }: { bio: string }): ReactElement => (
    <SimpleTooltip content={bio}>
        <div className="p-2 bg-zinc-100 dark:bg-zinc-950/65 text-sm rounded-xl">
            {truncateText(bio, 15)}
        </div>
    </SimpleTooltip>
);

const Badges = ({
    discordUser,
}: {
    discordUser: DiscordUser;
}): ReactElement => (
    <div
        className={cn(
            "ml-auto flex flex-wrap gap-1 justify-end",
            discordUser.badges.length > 4 && "max-w-[6.5rem]"
        )}
    >
        {discordUser.badges.map((badge: UserBadge, index: number) => (
            <SimpleTooltip key={index} content={badge.description}>
                <Image
                    src={badge.icon.url}
                    alt="Discord Profile Badge"
                    width={22}
                    height={22}
                    draggable={false}
                />
            </SimpleTooltip>
        ))}
    </div>
);

const Username = ({
    discordUser,
}: {
    discordUser: DiscordUser;
}): ReactElement => (
    <div className="flex flex-col">
        <h1 className="text-lg font-bold leading-none">
            {discordUser.displayName}
        </h1>
        <h2 className="font-light opacity-70">{discordUser.username}</h2>
    </div>
);

const SpotifyActivityContent = ({
    spotify,
}: {
    spotify: SpotifyActivity;
}): ReactElement => {
    const trackArtist: string = spotify.artist.replace(";", ",");
    const startTimestamp: number = spotify.started;
    const endTimestamp: number = spotify.ends;
    const [trackProgress, setTrackProgress] = useState<string | undefined>();
    const trackDuration: number = endTimestamp - startTimestamp;

    // Update the track progress every second
    useEffect(() => {
        const interval = setInterval(() => {
            const trackProgress = Date.now() - startTimestamp;
            if (trackProgress > trackDuration) {
                return;
            }
            setTrackProgress(moment(trackProgress).format("m:ss"));
        }, 1000);
        return () => clearInterval(interval);
    }, [startTimestamp, trackDuration]);

    return (
        <div className="flex items-start">
            <div className="flex gap-2 items-center">
                {/* Artwork */}
                <Link href={spotify.trackUrl} target="_blank">
                    <Image
                        className="rounded-lg"
                        src={spotify.albumArtUrl}
                        alt={`Track artwork of ${spotify.song} by ${spotify.artist}`}
                        width={54}
                        height={54}
                    />
                </Link>

                {/* Track Info */}
                <div className="flex flex-col text-sm">
                    <Link href={spotify.trackUrl} target="_blank">
                        <SimpleTooltip content={spotify.song}>
                            <h1 className="font-bold leading-none">
                                {truncateText(spotify.song, 22)}
                            </h1>
                        </SimpleTooltip>
                        <SimpleTooltip content={trackArtist}>
                            <h2 className="font-light opacity-70">
                                {truncateText(trackArtist, 26)}
                            </h2>
                        </SimpleTooltip>
                    </Link>
                    <p className="text-xs font-light opacity-70">
                        {trackProgress} / {moment(trackDuration).format("m:ss")}
                    </p>
                </div>
            </div>

            {/* Spotify Logo */}
            <Image
                className="ml-auto pointer-events-none"
                src="https://cdn.rainnny.club/97JxTtnlhSun.png"
                alt="Spotify Logo"
                width={18}
                height={18}
            />
        </div>
    );
};

// const GameActivity = ({ activity }: { activity: Activity }): ReactElement => {
//     const startTimestamp: number = activity.timestamps?.start || Date.now();
//     const [activityProgress, setActivityProgress] = useState<
//         string | undefined
//     >();
//
//     // Update the activity progress every second
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setActivityProgress(
//                 moment(Date.now() - startTimestamp).format("h:m:ss")
//             );
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [startTimestamp]);
//
//     return (
//         <div className="relative flex items-start">
//             <div className="flex gap-2 items-center">
//                 {/* Artwork */}
//                 <Image
//                     className="rounded-lg pointer-events-none"
//                     src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image || activity.assets?.small_image}.png?size=1024`}
//                     alt={`Game artwork of ${activity.name}`}
//                     width={54}
//                     height={54}
//                 />
//
//                 {/* Activity Info */}
//                 <div className="flex flex-col text-sm">
//                     <h1 className="font-bold leading-none">{activity.name}</h1>
//                     <h2 className="font-light opacity-70">
//                         {activity.details}
//                     </h2>
//                     <p className="text-xs font-light opacity-70">
//                         {activity.state}
//                     </p>
//                 </div>
//             </div>
//
//             {/* Activity Progress & Logo */}
//             <div className="absolute top-0 right-0 flex gap-1 text-green-500/80">
//                 <p className="text-xs font-light">{activityProgress}</p>
//                 <PuzzlePieceIcon width={18} height={18} />
//             </div>
//         </div>
//     );
// };

export default DiscordStatus;

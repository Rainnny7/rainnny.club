"use client";

import { ReactElement, useEffect, useState } from "react";
import {
    Activity,
    Data,
    DiscordUser,
    Spotify,
    useLanyardWS,
} from "use-lanyard";
import DCDNUser from "@/types/dcdn";
import axios from "axios";
import Image from "next/image";
import { cn, truncateText } from "@/lib/utils";
import moment from "moment";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import SimpleTooltip from "@/components/ui/simple-tooltip";
import Link from "next/link";

const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-zinc-500",
};

const userBadges = {
    // Nitro
    "https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png":
        {
            name: "Nitro Subscriber",
            predicate: (dcdnUser: DCDNUser) => dcdnUser.premiumType,
        },

    // Early Supporter
    "https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png":
        {
            name: "Early Supporter",
            predicate: (dcdnUser: DCDNUser) =>
                (dcdnUser.flags & (1 << 9)) === 1 << 9,
        },

    // Active Developer
    "https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png":
        {
            name: "Active Developer",
            predicate: (dcdnUser: DCDNUser) =>
                (dcdnUser.flags & (1 << 22)) === 1 << 22,
        },
};

const DiscordStatus = (): ReactElement | undefined => {
    // Data from Lanyard
    const discordData: Data | undefined = useLanyardWS("504147739131641857");
    const discordUser: DiscordUser | undefined = discordData?.discord_user;

    // Some data isn't provided by Lanyard, use DCDN for more
    const [dcdnUser, setDCDNUser] = useState<DCDNUser | undefined>(undefined);

    // When the data changes, update the DCDN user
    useEffect(() => {
        if (!discordUser) {
            return;
        }
        axios
            .get(`https://dcdn.dstn.to/profile/${discordUser.id}`)
            .then((res) =>
                setDCDNUser({
                    premiumType: res.data.premium_type,
                    ...res.data.user,
                })
            );
    }, [discordData]);

    // Missing required data
    if (!discordData || !discordUser || !dcdnUser) {
        return undefined;
    }

    return (
        <div className="flex justify-center select-none">
            <div className="flex flex-col bg-zinc-300 dark:bg-zinc-900 rounded-xl">
                <BannerAvatar
                    discordData={discordData}
                    discordUser={discordUser}
                    dcdnUser={dcdnUser}
                />

                <div className="px-3 pt-1.5 py-2.5 flex flex-col">
                    <div className="ml-[5.65rem] flex items-start">
                        {dcdnUser.bio && <Bio bio={dcdnUser.bio} />}
                        <Badges dcdnUser={dcdnUser} />
                    </div>
                    <div className="mt-3">
                        <Username discordUser={discordUser} />

                        {/* Activity */}
                        {discordData.activities.length > 0 && (
                            <div className="mt-2 p-2 bg-zinc-100 dark:bg-zinc-950/65 rounded-lg">
                                {discordData.activities[0].name !==
                                "Spotify" ? (
                                    <GameActivity
                                        activity={discordData.activities[0]}
                                    />
                                ) : (
                                    discordData.spotify && (
                                        <SpotifyActivity
                                            spotify={discordData.spotify}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BannerAvatar = ({
    discordData,
    discordUser,
    dcdnUser,
}: {
    discordData: Data;
    discordUser: DiscordUser;
    dcdnUser: DCDNUser;
}): ReactElement => (
    <div className="relative pointer-events-none">
        <Image
            className="border-2 border-zinc-300 dark:border-zinc-900 rounded-t-xl"
            src={`https://cdn.discordapp.com/banners/${discordUser.id}/${dcdnUser.banner}.webp?size=1024`}
            alt={`${discordUser.username}'s Banner`}
            width={300}
            height={300}
        />
        <div className="relative">
            <Image
                className="absolute left-2 -bottom-12 border-[5px] border-zinc-300 dark:border-zinc-900 rounded-full"
                src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp?size=1024`}
                alt={`${discordUser.username}'s Avatar`}
                width={96}
                height={96}
            />
            <div
                className={cn(
                    "absolute left-[4.5rem] -bottom-12 w-7 h-7 border-[5px] border-zinc-300 dark:border-zinc-900 rounded-full",
                    statusColors[discordData.discord_status]
                )}
            />
        </div>
    </div>
);

const Bio = ({ bio }: { bio: string }): ReactElement => (
    <SimpleTooltip content={bio}>
        <div className="p-2 bg-zinc-100 dark:bg-zinc-950/65 text-sm rounded-xl">
            {truncateText(bio, 15)}
        </div>
    </SimpleTooltip>
);

const Badges = ({ dcdnUser }: { dcdnUser: DCDNUser }): ReactElement => (
    <div className="ml-auto flex gap-1">
        {Object.entries(userBadges)
            .filter(([_, badge]) => badge.predicate(dcdnUser))
            .map(([badgeIcon, badge], index) => (
                <SimpleTooltip key={index} content={badge.name}>
                    <Image
                        src={badgeIcon}
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
            {discordUser.global_name}
        </h1>
        <h2 className="font-light opacity-70">{discordUser.username}</h2>
    </div>
);

const SpotifyActivity = ({ spotify }: { spotify: Spotify }): ReactElement => {
    const trackUrl: string = `https://open.spotify.com/track/${spotify.track_id}`;
    const trackArtist: string = spotify.artist.replace(";", ",");
    const startTimestamp: number = spotify.timestamps.start;
    const endTimestamp: number = spotify.timestamps.end;
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
    }, [startTimestamp]);

    return (
        <div className="flex items-start">
            <div className="flex gap-2 items-center">
                {/* Artwork */}
                <Link href={trackUrl} target="_blank">
                    <Image
                        className="rounded-lg"
                        src={spotify.album_art_url as string}
                        alt={`Track artwork of ${spotify.song} by ${spotify.artist}`}
                        width={54}
                        height={54}
                    />
                </Link>

                {/* Track Info */}
                <div className="flex flex-col text-sm">
                    <Link href={trackUrl} target="_blank">
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

const GameActivity = ({ activity }: { activity: Activity }): ReactElement => {
    const startTimestamp: number = activity.timestamps?.start || Date.now();
    const [activityProgress, setActivityProgress] = useState<
        string | undefined
    >();

    // Update the activity progress every second
    useEffect(() => {
        const interval = setInterval(() => {
            setActivityProgress(
                moment(Date.now() - startTimestamp).format("h:m:ss")
            );
        }, 1000);
        return () => clearInterval(interval);
    }, [startTimestamp]);

    return (
        <div className="relative flex items-start">
            <div className="flex gap-2 items-center">
                {/* Artwork */}
                <Image
                    className="rounded-lg pointer-events-none"
                    src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image || activity.assets?.small_image}.png?size=1024`}
                    alt={`Game artwork of ${activity.name}`}
                    width={54}
                    height={54}
                />

                {/* Activity Info */}
                <div className="flex flex-col text-sm">
                    <h1 className="font-bold leading-none">{activity.name}</h1>
                    <h2 className="font-light opacity-70">
                        {activity.details}
                    </h2>
                    <p className="text-xs font-light opacity-70">
                        {activity.state}
                    </p>
                </div>
            </div>

            {/* Activity Progress & Logo */}
            <div className="absolute top-0 right-0 flex gap-1 text-green-500/80">
                <p className="text-xs font-light">{activityProgress}</p>
                <PuzzlePieceIcon width={18} height={18} />
            </div>
        </div>
    );
};

export default DiscordStatus;

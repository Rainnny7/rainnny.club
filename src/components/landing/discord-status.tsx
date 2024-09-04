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
import { cn } from "@/lib/utils";
import moment from "moment";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";

const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-zinc-500",
};

const userBadges = {
    // Nitro
    "https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png":
        (dcdnUser: DCDNUser) => dcdnUser.premiumType,

    // Early Supporter
    "https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png":
        (dcdnUser: DCDNUser) => (dcdnUser.flags & (1 << 9)) === 1 << 9,

    // Active Developer
    "https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png":
        (dcdnUser: DCDNUser) => (dcdnUser.flags & (1 << 22)) === 1 << 22,
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
            <div className="flex flex-col bg-zinc-900 rounded-xl">
                <BannerAvatar
                    discordData={discordData}
                    discordUser={discordUser}
                    dcdnUser={dcdnUser}
                />

                <div className="px-3.5 pt-1.5 py-2.5 flex flex-col">
                    <div className="ml-[5.65rem] flex items-start">
                        {dcdnUser.bio && <Bio dcdnUser={dcdnUser} />}
                        <Badges dcdnUser={dcdnUser} />
                    </div>
                    <div className="mt-3">
                        <Username discordUser={discordUser} />

                        {/* Activity */}
                        {discordData.activities.length > 0 && (
                            <div className="mt-2 p-2 bg-zinc-950/65 rounded-lg">
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
    <div className="relative">
        <Image
            className="border-2 border-zinc-900 rounded-t-xl"
            src={`https://cdn.discordapp.com/banners/${discordUser.id}/${dcdnUser.banner}.webp?size=1024`}
            alt={`${discordUser.username}'s Banner`}
            width={300}
            height={300}
        />
        <div className="relative">
            <Image
                className="absolute left-2 -bottom-12 border-[5px] border-zinc-900 rounded-full"
                src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp?size=1024`}
                alt={`${discordUser.username}'s Avatar`}
                width={96}
                height={96}
            />
            <div
                className={cn(
                    "absolute left-[4.5rem] -bottom-12 w-7 h-7 border-[5px] border-zinc-900 rounded-full",
                    statusColors[discordData.discord_status]
                )}
            />
        </div>
    </div>
);

const Bio = ({ dcdnUser }: { dcdnUser: DCDNUser }): ReactElement => (
    <div className="p-2 bg-zinc-950/65 text-sm rounded-xl">{dcdnUser.bio}</div>
);

const Badges = ({ dcdnUser }: { dcdnUser: DCDNUser }): ReactElement => (
    <div className="ml-auto flex gap-1">
        {Object.entries(userBadges)
            .filter(([_, predicate]) => predicate(dcdnUser))
            .map(([badge], index) => (
                <Image
                    key={index}
                    src={badge}
                    alt="Discord Profile Badge"
                    width={22}
                    height={22}
                />
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
    const startTimestamp: number = spotify.timestamps.start; // Example start timestamp
    const endTimestamp: number = spotify.timestamps.end; // Example end timestamp
    const [songProgress, setSongProgress] = useState<string | undefined>();
    const songDuration: string = moment(endTimestamp - startTimestamp).format(
        "m:ss"
    );

    // Update the song progress every second
    useEffect(() => {
        const interval = setInterval(() => {
            const songProgress: string = moment(
                Date.now() - startTimestamp
            ).format("m:ss");
            setSongProgress(songProgress);
        }, 1000);
        return () => clearInterval(interval);
    }, [startTimestamp]);

    return (
        <div className="flex items-start">
            <div className="flex gap-2 items-center">
                {/* Artwork */}
                <Image
                    className="rounded-lg"
                    src={spotify.album_art_url as string}
                    alt={`Track artwork of ${spotify.song} by ${spotify.artist}`}
                    width={54}
                    height={54}
                />

                {/* Track Info */}
                <div className="flex flex-col text-sm">
                    <h1 className="font-bold leading-none">{spotify.song}</h1>
                    <h2 className="font-light opacity-70">{spotify.artist}</h2>
                    <p className="text-xs font-light opacity-70">
                        {songProgress} / {songDuration}
                    </p>
                </div>
            </div>

            {/* Spotify Logo */}
            <Image
                className="ml-auto"
                src="https://cdn.rainnny.club/97JxTtnlhSun.png"
                alt="Spotify Logo"
                width={18}
                height={18}
            />
        </div>
    );
};

const GameActivity = ({ activity }: { activity: Activity }): ReactElement => (
    <div className="flex items-start">
        <div className="flex gap-2 items-center">
            {/* Artwork */}
            <Image
                className="rounded-lg"
                src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image || activity.assets?.small_image}.png?size=1024`}
                alt={`Game artwork of ${activity.name}`}
                width={54}
                height={54}
            />

            {/* Activity Info */}
            <div className="flex flex-col text-sm">
                <h1 className="font-bold leading-none">{activity.name}</h1>
                <h2 className="font-light opacity-70">{activity.details}</h2>
                <p className="text-xs font-light opacity-70">
                    {activity.state}
                </p>
            </div>
        </div>

        {/* Activity Logo */}
        <PuzzlePieceIcon className="ml-auto" width={18} height={18} />
    </div>
);

export default DiscordStatus;
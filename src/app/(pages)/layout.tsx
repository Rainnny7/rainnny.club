import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import { ReactElement, ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NextFont } from "next/dist/compiled/@next/font";

const inter: NextFont = Inter({ subsets: ["latin"] });

/**
 * The metadata for this app.
 */
export const metadata: Metadata = {
    title: "RainnnyCLUB",
    description:
        "My name is Braydon and I am a self-taught software engineer living in Canada.",
    openGraph: {
        images: [
            {
                url: "https://cdn.rainnny.club/rZVivaoYMhEs.png",
                width: 128,
                height: 128,
            },
        ],
    },
    twitter: {
        card: "summary",
    },
};
export const viewport: Viewport = {
    themeColor: "#5555FF",
};

/**
 * The primary layout for this app.
 */
const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode;
}>): ReactElement => (
    <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "antialiased")}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
        </body>
    </html>
);
export default RootLayout;

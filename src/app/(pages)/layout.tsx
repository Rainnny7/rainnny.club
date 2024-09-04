import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import { ReactElement } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

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
                url: "/me.png",
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
    children: React.ReactNode;
}>): ReactElement => (
    <html lang="en">
        <body className={inter.className}>
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

import {fileURLToPath, URL} from "url";

import {defineConfig} from "vite";
import stylelint from "vite-plugin-stylelint";
import {VitePWA} from "vite-plugin-pwa";
import eslint from "vite-plugin-eslint";

export default defineConfig({
    plugins: [
        eslint(),
        stylelint(),
        VitePWA({
            srcDir: "public",
            filename: "sw.js",
            registerType: "autoUpdate",
            strategies: "injectManifest",
            includeAssets: [
                "favicon.svg",
                "favicon.ico",
                "robots.txt",
                "apple-touch-icon.png",
            ],
            manifest: {
                name: "cards-game",
                short_name: "cards-game",
                start_url: "/",
                display: "fullscreen",
                background_color: "#ffffff",
                lang: "ru",
                scope: "/",
                description: "cards-game",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any"
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});

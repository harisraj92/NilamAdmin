/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "static/fonts/",
                    publicPath: "/_next/static/fonts/",
                },
            },
        });

        return config;
    },
};

export default nextConfig;

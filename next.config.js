/** @type {import('next').NextConfig} */
const nextConfig = {};

require('dotenv').config();

module.exports = {
	env: {
		LOGIN_ROUTE: process.env.LOGIN_ROUTE,
	},
};

module.exports = {
	development: {
		username: process.env.LOCAL_USER,
		password: process.env.LOCAL_PASSWORD,
		database: process.env.LOCAL_DATABASE,
		host: process.env.LOCAL_HOST,
		dialect: process.env.LOCAL_DIALECT,
		logging: false,
	},
	production: {
		username: process.env.PROD_USER,
		password: process.env.PROD_PASSWORD,
		database: process.env.PROD_DATABASE,
		host: process.env.PROD_HOST,
		dialect: process.env.PROD_DIALECT,
		port: process.env.PROD_PORT,
		logging: false,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
}

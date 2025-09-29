import '@/utils/compression-polyfill'
import { defineConfig } from 'drizzle-kit'
import { env } from '@/http/env'

export default defineConfig({
	dialect: 'postgresql',
	casing: 'snake_case',
	schema: './src/db/schema/**.ts',
	out: './src/db/migrations',
	verbose: false,
	dbCredentials: {
		url: env.DATABASE_URL,
	},
})

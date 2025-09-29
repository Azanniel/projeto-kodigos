import { AssertError, Value } from '@sinclair/typebox/value'
import { t } from 'elysia'

const envSchema = t.Object({
	PORT: t.Number({ default: 3000 }),
	JWT_SECRET_KEY: t.String({ minLength: 1 }),
	DATABASE_URL: t.String({ minLength: 1 }),
})

try {
	Value.Parse(envSchema, process.env)
} catch (error) {
	if (error instanceof AssertError) {
		console.error('❌ Invalid environment variables:')
		console.log(error.error)
	}

	process.exit(1)
}

export const env = Value.Parse(envSchema, process.env)

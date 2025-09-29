import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'
import { auth } from '../auth'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const signIn = new Elysia().use(auth).post(
	'/sign-in',
	async ({ body, signUser, set }) => {
		const { email, password } = body

		const [user] = await db
			.select({
				id: schema.users.id,
				password: schema.users.password,
			})
			.from(schema.users)
			.where(eq(schema.users.email, email))

		if (!user) {
			throw new UnauthorizedError('Invalid email or password')
		}

		const isPasswordValid = await Bun.password.verify(password, user.password)

		if (!isPasswordValid) {
			throw new UnauthorizedError('Invalid email or password')
		}

		await signUser({ sub: user.id })

		set.status = 201
	},
	{
		tags: ['Auth'],
		detail: {
			summary: 'Sign In',
			description:
				'Sign in with email and password. This will set cookie with JWT token.',
		},
		body: t.Object({
			email: t.String({ format: 'email' }),
			password: t.String({ minLength: 6 }),
		}),
		response: {
			201: t.Void(),
		},
	},
)

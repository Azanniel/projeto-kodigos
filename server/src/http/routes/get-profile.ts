import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'
import { auth } from '../auth'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const getProfile = new Elysia().use(auth).post(
	'/me',
	async ({ getCurrentUser }) => {
		const { userId } = await getCurrentUser()

		const [user] = await db
			.select({
				id: schema.users.id,
				name: schema.users.name,
				email: schema.users.email,
				role: schema.users.role,
			})
			.from(schema.users)
			.where(eq(schema.users.id, userId))

		if (!user) {
			throw new UnauthorizedError()
		}

		return { user }
	},
	{
		tags: ['Auth'],
		detail: {
			summary: 'Get current user profile',
			description:
				'Retrieve the profile information of the currently authenticated user.',
		},
		response: {
			200: t.Object({
				user: t.Object({
					id: t.String({ format: 'uuid' }),
					name: t.String({ examples: ['John Doe'] }),
					email: t.String({
						format: 'email',
						examples: ['john.doe@example.com'],
					}),
					role: t.String({ examples: ['technical', 'manager'] }),
				}),
			}),
		},
	},
)

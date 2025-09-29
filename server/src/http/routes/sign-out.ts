import Elysia, { t } from 'elysia'
import { auth } from '../auth'

export const signOut = new Elysia().use(auth).post(
	'/sign-out',
	({ signOut: internalSignOut, set }) => {
		internalSignOut()
		set.status = 204
	},
	{
		tags: ['Auth'],
		detail: {
			summary: 'Sign Out',
			description: 'Sign out and remove the JWT token from the cookie.',
		},
		response: {
			204: t.Void(),
		},
	},
)

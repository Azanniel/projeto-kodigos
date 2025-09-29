import jwt from '@elysiajs/jwt'
import Elysia, { type Static, t } from 'elysia'
import { env } from './env'
import { UnauthorizedError } from './errors/unauthorized-error'

const jwtPayload = t.Object({
	sub: t.String(),
})

export const auth = new Elysia()
	.use(
		jwt({
			secret: env.JWT_SECRET_KEY,
			schema: jwtPayload,
		}),
	)
	.derive({ as: 'scoped' }, ({ jwt, cookie }) => {
		return {
			signUser: async (payload: Static<typeof jwtPayload>) => {
				const token = await jwt.sign(payload)

				cookie.auth.set({
					value: token,
					maxAge: 60 * 60 * 24 * 7, // 1 week
					path: '/',
				})
			},

			signOut: () => {
				cookie.auth.remove()
			},

			getCurrentUser: async () => {
				const payload = await jwt.verify(cookie.auth.toString())

				if (!payload) {
					throw new UnauthorizedError()
				}

				return { userId: payload.sub }
			},
		}
	})

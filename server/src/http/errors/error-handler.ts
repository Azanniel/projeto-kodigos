import Elysia from 'elysia'
import { ConflictError } from './conflict-error'
import { UnauthorizedError } from './unauthorized-error'

export const errorHandler = new Elysia()
	.error({
		UNAUTHORIZED: UnauthorizedError,
		CONFLICT: ConflictError,
	})
	.onError({ as: 'global' }, ({ code, error, set }) => {
		switch (code) {
			case 'VALIDATION': {
				set.status = 400

				const message = {
					path: error.valueError?.path,
					message: error.valueError?.message,
				}

				return { code, message }
			}

			case 'NOT_FOUND':
				set.status = 404
				return { code, message: 'Resource not found' }

			case 'UNAUTHORIZED':
				set.status = 401
				return { code, message: error.message }

			case 'CONFLICT':
				set.status = 409
				return { code, message: error.message }

			default:
				console.error('Unhandled error:', error)
				set.status = 500
				return { code, message: 'Something went wrong' }
		}
	})

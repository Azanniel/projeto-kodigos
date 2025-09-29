import { eq } from 'drizzle-orm'
import Elysia, { NotFoundError, t } from 'elysia'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'
import { auth } from '../auth'
import { ConflictError } from '../errors/conflict-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const executeWorkOrder = new Elysia().use(auth).patch(
	'/work-orders/:id/execute',
	async ({ params, getCurrentUser, set }) => {
		const { userId } = await getCurrentUser()
		const { id } = params

		const [user] = await db
			.select()
			.from(schema.users)
			.where(eq(schema.users.id, userId))

		if (!user) {
			throw new UnauthorizedError()
		}

		const [workOrder] = await db
			.select()
			.from(schema.workOrders)
			.where(eq(schema.workOrders.id, id))

		if (!workOrder) {
			throw new NotFoundError()
		}

		if (user.role !== 'technical' && workOrder.assigneeId !== user.id) {
			throw new UnauthorizedError()
		}

		if (workOrder.status !== 'pending') {
			throw new ConflictError('Only pending work orders can be executed')
		}

		await db
			.update(schema.workOrders)
			.set({ status: 'in_progress', startedAt: new Date() })
			.where(eq(schema.workOrders.id, id))

		set.status = 204
	},
	{
		tags: ['Work Orders'],
		detail: {
			summary: 'Execute work order by ID',
			description:
				'Execute a specific work order by its ID and transition it to the "in_progress" status.',
		},
		params: t.Object({
			id: t.String({ format: 'uuid' }),
		}),
		response: {
			204: t.Void(),
		},
	},
)

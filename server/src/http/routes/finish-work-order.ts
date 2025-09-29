import { and, count, eq, isNull } from 'drizzle-orm'
import Elysia, { NotFoundError, t } from 'elysia'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'
import { auth } from '../auth'
import { ConflictError } from '../errors/conflict-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const finishWorkOrder = new Elysia().use(auth).patch(
	'/work-orders/:id/finish',
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

		if (workOrder.status !== 'in_progress') {
			throw new ConflictError('Only in_progress work orders can be finished')
		}

		if (workOrder.report === null) {
			throw new ConflictError(
				'Work order report is required to finish the work order',
			)
		}

		const [incompleteRequiredIssues] = await db
			.select({ count: count() })
			.from(schema.workOrderIssues)
			.where(
				and(
					eq(schema.workOrderIssues.workOrderId, workOrder.id),
					eq(schema.workOrderIssues.isRequired, true),
					isNull(schema.workOrderIssues.completedAt),
				),
			)

		if (incompleteRequiredIssues.count > 0) {
			throw new ConflictError(
				'All required issues must be completed to finish the work order',
			)
		}

		await db
			.update(schema.workOrders)
			.set({ status: 'completed', finishedAt: new Date() })
			.where(eq(schema.workOrders.id, id))

		set.status = 204
	},
	{
		tags: ['Work Orders'],
		detail: {
			summary: 'Complete work order by ID',
			description:
				'Complete a specific work order by its ID and transition it to the "completed" status.',
		},
		params: t.Object({
			id: t.String({ format: 'uuid' }),
		}),
		response: {
			204: t.Void(),
		},
	},
)

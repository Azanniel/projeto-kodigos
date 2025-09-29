import { and, eq } from 'drizzle-orm'
import Elysia, { NotFoundError, t } from 'elysia'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'
import { auth } from '../auth'
import { ConflictError } from '../errors/conflict-error'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const progressWorkOrder = new Elysia().use(auth).put(
	'/work-orders/:id/progress',
	async ({ params, body, getCurrentUser, set }) => {
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
			throw new ConflictError('Only in_progress work orders can be progressed')
		}

		const { report, issues } = body

		await db
			.update(schema.workOrders)
			.set({ report })
			.where(eq(schema.workOrders.id, workOrder.id))

		for (const issue of issues) {
			const { id: issueId, checked } = issue

			await db
				.update(schema.workOrderIssues)
				.set({ completedAt: checked ? new Date() : null })
				.where(
					and(
						eq(schema.workOrderIssues.id, issueId),
						eq(schema.workOrderIssues.workOrderId, workOrder.id),
					),
				)
		}

		set.status = 204
	},
	{
		tags: ['Work Orders'],
		detail: {
			summary: 'Progress work order by ID',
			description: 'Save the progress of a work order.',
		},
		params: t.Object({
			id: t.String({ format: 'uuid' }),
		}),
		body: t.Object({
			report: t.String({ default: '' }),
			issues: t.Array(
				t.Object({
					id: t.String({ format: 'uuid' }),
					checked: t.Boolean(),
				}),
				{ default: [] },
			),
		}),
		response: {
			204: t.Void(),
		},
	},
)

import { eq } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import Elysia, { NotFoundError, t } from 'elysia'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'
import { auth } from '../auth'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const getWorkOrder = new Elysia().use(auth).get(
	'/work-orders/:id',
	async ({ params, getCurrentUser }) => {
		const { userId } = await getCurrentUser()
		const { id } = params

		const [user] = await db
			.select()
			.from(schema.users)
			.where(eq(schema.users.id, userId))

		if (!user) {
			throw new UnauthorizedError()
		}

		const assignee = alias(schema.users, 'assignee')
		const requester = alias(schema.users, 'requester')
		const [workOrder] = await db
			.select({
				id: schema.workOrders.id,
				title: schema.workOrders.title,
				description: schema.workOrders.description,
				report: schema.workOrders.report,
				status: schema.workOrders.status,
				assignee: {
					id: assignee.id,
					name: assignee.name,
					role: assignee.role,
				},
				requester: {
					id: requester.id,
					name: requester.name,
					role: requester.role,
				},
				startedAt: schema.workOrders.startedAt,
				finishedAt: schema.workOrders.finishedAt,
				createdAt: schema.workOrders.createdAt,
			})
			.from(schema.workOrders)
			.where(eq(schema.workOrders.id, id))
			.innerJoin(assignee, eq(assignee.id, schema.workOrders.assigneeId))
			.innerJoin(requester, eq(requester.id, schema.workOrders.requesterId))

		if (!workOrder) {
			throw new NotFoundError()
		}

		if (user.role !== 'manager' && workOrder.assignee.id !== user.id) {
			throw new UnauthorizedError()
		}

		const workOrderIssues = await db
			.select({
				id: schema.workOrderIssues.id,
				description: schema.workOrderIssues.description,
				isRequired: schema.workOrderIssues.isRequired,
				completedAt: schema.workOrderIssues.completedAt,
			})
			.from(schema.workOrderIssues)
			.where(eq(schema.workOrderIssues.workOrderId, workOrder.id))

		return {
			workOrder: {
				...workOrder,
				issues: workOrderIssues,
			},
		}
	},
	{
		tags: ['Work Orders'],
		detail: {
			summary: 'Get work order by ID',
			description:
				'Retrieve detailed information about a specific work order by its ID.',
		},
		params: t.Object({
			id: t.String({ format: 'uuid' }),
		}),
		response: {
			200: t.Object({
				workOrder: t.Object({
					id: t.String({ format: 'uuid' }),
					title: t.String(),
					description: t.String(),
					report: t.Union([t.String(), t.Null()]),
					status: t.Union([
						t.Literal('pending'),
						t.Literal('in_progress'),
						t.Literal('completed'),
						t.Literal('canceled'),
					]),
					assignee: t.Object({
						id: t.String({ format: 'uuid' }),
						name: t.String({ examples: ['Jane Doe'] }),
						role: t.String({ examples: ['technical', 'manager'] }),
					}),
					requester: t.Object({
						id: t.String({ format: 'uuid' }),
						name: t.String({ examples: ['John Doe'] }),
						role: t.String({ examples: ['technical', 'manager'] }),
					}),
					startedAt: t.Union([t.Date(), t.Null()]),
					finishedAt: t.Union([t.Date(), t.Null()]),
					createdAt: t.Date(),
					issues: t.Array(
						t.Object({
							id: t.String({ format: 'uuid' }),
							description: t.String(),
							isRequired: t.Boolean(),
							completedAt: t.Union([t.Date(), t.Null()]),
						}),
					),
				}),
			}),
		},
	},
)

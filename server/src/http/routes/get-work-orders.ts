import { and, count, eq, isNotNull, sql } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { db } from '@/db/connection'
import { schema } from '@/db/schema'
import { auth } from '../auth'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const getWorkOrders = new Elysia().use(auth).get(
	'/work-orders',
	async ({ getCurrentUser }) => {
		const { userId } = await getCurrentUser()

		const [user] = await db
			.select()
			.from(schema.users)
			.where(eq(schema.users.id, userId))

		if (!user) {
			throw new UnauthorizedError()
		}

		const totalIssuesSubquery = db
			.select({ count: count() })
			.from(schema.workOrderIssues)
			.where(eq(schema.workOrderIssues.workOrderId, schema.workOrders.id))

		const completedIssuesSubquery = db
			.select({ count: count() })
			.from(schema.workOrderIssues)
			.where(
				and(
					eq(schema.workOrderIssues.workOrderId, schema.workOrders.id),
					isNotNull(schema.workOrderIssues.completedAt),
				),
			)

		const baseQuery = db
			.select({
				id: schema.workOrders.id,
				title: schema.workOrders.title,
				description: schema.workOrders.description,
				status: schema.workOrders.status,
				finishedAt: schema.workOrders.finishedAt,
				totalIssues: sql<number>`${totalIssuesSubquery}`
					.mapWith(Number)
					.as('total_issues'),
				completedIssues: sql<number>`${completedIssuesSubquery}`
					.mapWith(Number)
					.as('completed_issues'),
			})
			.from(schema.workOrders)

		const workOrders =
			user.role === 'technical'
				? await baseQuery.where(eq(schema.workOrders.assigneeId, userId))
				: await baseQuery

		return { workOrders }
	},
	{
		tags: ['Work Orders'],
		detail: {
			summary: 'Get work orders',
			description:
				'Retrieve a list of work orders. Technicians see only their assigned work orders, while managers see all work orders.',
		},
		response: {
			200: t.Object({
				workOrders: t.Array(
					t.Object({
						id: t.String({ format: 'uuid' }),
						title: t.String(),
						description: t.String(),
						status: t.Union([
							t.Literal('pending'),
							t.Literal('in_progress'),
							t.Literal('completed'),
							t.Literal('canceled'),
						]),
						finishedAt: t.Union([t.Date(), t.Null()]),
						totalIssues: t.Number(),
						completedIssues: t.Number(),
					}),
				),
			}),
		},
	},
)

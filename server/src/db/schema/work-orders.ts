import { randomUUIDv7 } from 'bun'
import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { workOrderIssues } from './work-order-issues'

export const workOrderStatusEnum = pgEnum('work_order_status', [
	'pending',
	'in_progress',
	'completed',
	'canceled',
])

export const workOrders = pgTable('work_orders', {
	id: text('id')
		.$defaultFn(() => randomUUIDv7())
		.primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	report: text('report'),
	status: workOrderStatusEnum('status').default('pending').notNull(),
	assigneeId: text('assignee_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	requesterId: text('requester_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	startedAt: timestamp('started_at'),
	finishedAt: timestamp('finished_at'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const workOrdersRelations = relations(workOrders, ({ one, many }) => {
	return {
		assignee: one(users, {
			fields: [workOrders.assigneeId],
			references: [users.id],
			relationName: 'work_order_assignee',
		}),
		requester: one(users, {
			fields: [workOrders.requesterId],
			references: [users.id],
			relationName: 'work_order_requester',
		}),
		workOrderIssues: many(workOrderIssues),
	}
})

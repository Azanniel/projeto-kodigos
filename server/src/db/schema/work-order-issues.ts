import { randomUUIDv7 } from 'bun'
import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { workOrders } from './work-orders'

export const workOrderIssues = pgTable('work_order_issues', {
	id: text('id')
		.$defaultFn(() => randomUUIDv7())
		.primaryKey(),
	description: text('description').notNull(),
	isRequired: boolean('is_required').notNull().default(false),
	completedAt: timestamp('completed_at'),
	workOrderId: text('work_order_id')
		.notNull()
		.references(() => workOrders.id, { onDelete: 'cascade' }),
})

export const workOrderIssuesRelations = relations(
	workOrderIssues,
	({ one }) => {
		return {
			workOrder: one(workOrders, {
				fields: [workOrderIssues.workOrderId],
				references: [workOrders.id],
				relationName: 'issue_on_work_order',
			}),
		}
	},
)

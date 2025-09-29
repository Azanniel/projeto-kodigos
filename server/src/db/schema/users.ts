import { randomUUIDv7 } from 'bun'
import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core'
import { workOrders } from './work-orders'

export const userRoleEnum = pgEnum('user_role', ['manager', 'technical'])

export const users = pgTable('users', {
	id: text('id')
		.$defaultFn(() => randomUUIDv7())
		.primaryKey(),
	name: text('name').notNull(),
	role: userRoleEnum('role').default('technical').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
	workOrdersAssigned: many(workOrders, {
		relationName: 'work_order_assignee',
	}),
	workOrdersRequested: many(workOrders, {
		relationName: 'work_order_requester',
	}),
}))

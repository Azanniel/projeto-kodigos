import { reset } from 'drizzle-seed'
import { connection, db } from './connection'
import { schema } from './schema'

await reset(db, schema)

// Users
const [technical, manager] = await db
	.insert(schema.users)
	.values([
		{
			name: 'João Silva',
			email: 'joao.silva@mail.com',
			password: Bun.password.hashSync('senha123456789'),
			role: 'technical',
		},
		{
			name: 'Maria Souza',
			email: 'maria.souza@mail.com',
			password: Bun.password.hashSync('senha123456789'),
			role: 'manager',
		},
	])
	.returning()

// Work Orders
const [workOrder] = await db
	.insert(schema.workOrders)
	.values([
		{
			title: 'Conserto de ar-condicionado',
			description:
				'O ar-condicionado do escritório não está funcionando. Deve ser trocado o filtro e verificado o sistema de refrigeração.',
			status: 'pending',
			requesterId: manager.id,
			assigneeId: technical.id,
		},
	])
	.returning()

// Work Order Issues
await db.insert(schema.workOrderIssues).values([
	{
		workOrderId: workOrder.id,
		description: 'Trocar o filtro do ar-condicionado.',
		isRequired: true,
	},
	{
		workOrderId: workOrder.id,
		description: 'Verificar o sistema de refrigeração.',
		isRequired: true,
	},
	{
		workOrderId: workOrder.id,
		description: 'Limpar as saídas de ar.',
		isRequired: false,
	},
])

await connection.end()

console.log('🌱 Database seeded.')

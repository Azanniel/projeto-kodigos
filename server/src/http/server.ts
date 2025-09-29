import { Elysia } from 'elysia'
import { docs } from './docs'
import { env } from './env'
import { errorHandler } from './errors/error-handler'
import { executeWorkOrder } from './routes/execute-work-order'
import { finishWorkOrder } from './routes/finish-work-order'
import { getProfile } from './routes/get-profile'
import { getWorkOrder } from './routes/get-work-order'
import { getWorkOrders } from './routes/get-work-orders'
import { progressWorkOrder } from './routes/progress-work-order'
import { signIn } from './routes/sign-in'
import { signOut } from './routes/sign-out'

const app = new Elysia()
	.use(docs)
	.use(errorHandler)
	.use(signIn)
	.use(signOut)
	.use(getProfile)
	.use(getWorkOrders)
	.use(getWorkOrder)
	.use(executeWorkOrder)
	.use(progressWorkOrder)
	.use(finishWorkOrder)
	.listen(env.PORT)

console.log(`🔥 Server is running: ${app.server?.url}`)

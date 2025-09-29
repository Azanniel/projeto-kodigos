import openapi from '@elysiajs/openapi'

export const docs = openapi({
	path: '/docs',
	documentation: {
		info: {
			title: 'Nodus API',
			description: 'Documentation endpoints for Nodus',
			version: '0.0.1',
		},
	},
})

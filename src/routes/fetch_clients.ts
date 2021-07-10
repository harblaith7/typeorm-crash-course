import express from 'express';
import { Banker } from '../entities/Banker';
import { createQueryBuilder } from 'typeorm';
import { Client } from '../entities/Client';

const router = express.Router();

router.get('/api/bankers', async (req, res) => {
	// const bankers = await createQueryBuilder(
	// 	'banker'
	// )
	// 	.where('id = :bankerId', { bankerId: 2 })
	// 	.getOne();

	// const clients = await createQueryBuilder(
	// 	'client'
	// )
	// 	.select('client')
	// 	.from(Client, 'client')
	// 	.leftJoinAndSelect(
	// 		'client.transactions',
	// 		'transaction'
	// 	)
	// 	.where('client.id = :clientId', {
	// 		clientId: 3,
	// 	})
	// 	.getOne();

	const clients = await createQueryBuilder(
		'client'
	)
		.select('client.first_name')
		.from(Client, 'client')
		.leftJoinAndSelect(
			'client.transactions',
			'transaction'
		)
		.where('client.id = :clientId', {
			clientId: 3,
		})
		.getOne();

	return res.json(clients);
});

export { router as fetchClientsRouter };

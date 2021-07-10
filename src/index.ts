import { createConnection } from 'typeorm';
import express from 'express';
import { Client } from './entities/Client';
import { Banker } from './entities/Banker';
import { Transaction } from './entities/Transaction';
import { createClientRouter } from './routes/create_client';
import { createBankerRouter } from './routes/create_banker';
import { connectBankerToClientRouter } from './routes/connect_banker_to_client';
import { createTransactionRouter } from './routes/create_transaction';
import { deleteClientRouter } from './routes/delete_client';
import { fetchClientsRouter } from './routes/fetch_clients';

const app = express();

const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'laithharb',
			password: undefined,
			database: 'typeorm',
			entities: [Client, Banker, Transaction],
			synchronize: true,
		});
		console.log('Connected to Postgres');

		app.use(express.json());

		app.use(createClientRouter);
		app.use(createBankerRouter);
		app.use(connectBankerToClientRouter);
		app.use(createTransactionRouter);
		app.use(deleteClientRouter);
		app.use(fetchClientsRouter);

		app.listen(8080, () => {
			console.log('Now running on port 8080');
		});
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();

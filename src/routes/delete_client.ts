import express from 'express';
import { Client } from '../entities/Client';

const router = express.Router();

router.delete(
	'/api/client/:clientId',
	async (req, res) => {
		const { clientId } = req.params;

		const response = await Client.delete(
			clientId
		);

		return res.json(response);
	}
);

export { router as deleteClientRouter };

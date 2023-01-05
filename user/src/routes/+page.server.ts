import type { Actions } from './$types';

type FormData = {
	payload: string;
};

type CreateTokenResponse = {
	tokens: string[];
};
export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData()) as unknown as FormData;

		const response = (await fetch('https://th-token.interlayer-soft.tech/tokens', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				payload: formData.payload
			})
		}).then((res) => res.json())) as CreateTokenResponse;

		return {
			tokens: response.tokens
		};
	}
};

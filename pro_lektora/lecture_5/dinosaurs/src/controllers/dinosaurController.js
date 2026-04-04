export function createDinosaurController({ dinosaurService }) {
	return {
		async list(request, response) {
			const dinosaurs = await dinosaurService.listDinosaurs();
			response.json(dinosaurs);
		},
	};
}

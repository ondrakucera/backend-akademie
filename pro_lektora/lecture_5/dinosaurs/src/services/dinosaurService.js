export function createDinosaurService({ dinosaurRepository }) {
	return {
		async listDinosaurs() {
			return dinosaurRepository.listDinosaurs();
		},
	};
}

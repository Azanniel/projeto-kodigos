/**
 * 2. Imagine que você tenha uma tela com duas entradas, uma com o texto e
 * outra com a string a ser encontrada. Monte um algoritmo para encontrar
 * a posição dessa string nesse texto. Caso não encontre, retornar -1.
 */

export function findStringPosition(text: string, search: string): number {
	for (let i = 0; i <= text.length - search.length; i++) {
		let found = true;

		for (let j = 0; j < search.length; j++) {
			if (text[i + j] !== search[j]) {
				found = false;
				break;
			}
		}

		if (found) return i;
	}

	return -1;
}

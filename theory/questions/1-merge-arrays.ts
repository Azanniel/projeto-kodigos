/** biome-ignore-all lint/style/noNonNullAssertion: using non-null assertion operator (!) */
/** biome-ignore-all lint/suspicious/noExtraNonNullAssertion: using non-null assertion operator (!) */

/**
 * 1. Sabendo que você tem dois arrays de números inteiros,
 * crie um terceiro array com a junção dos dois anteriores em ordem crescente.
 */

export function mergeArrays(array1: number[], array2: number[]): number[] {
	/** Aqui poderia ser usado spread operator (...) */
	const merged: number[] = [];

	/** Não seria necessário se usasse spread operator (...) */
	for (let i = 0; i < array1.length; i++) {
		merged.push(array1[i]!);
	}

	/** Não seria necessário se usasse spread operator (...) */
	for (let i = 0; i < array2.length; i++) {
		merged.push(array2[i]!);
	}

	/**
	 * Algoritmo de ordenação Bubble Sort. É mais eficiente para arrays pequenos.
	 * Poderia usar o algoritmo Merge Sort, mas ele usa mais memória.
	 */
	for (let i = 0; i < merged.length; i++) {
		for (let j = 0; j < merged.length - 1; j++) {
			if (merged[j]! > merged[j + 1]!) {
				const temp = merged[j]!;
				merged[j]! = merged[j + 1]!;
				merged[j + 1]! = temp;
			}
		}
	}

	return merged;
}

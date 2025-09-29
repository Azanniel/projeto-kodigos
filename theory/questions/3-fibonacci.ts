/** biome-ignore-all lint/style/noNonNullAssertion: the index always exists */
/**
 * 3. Dando um número N inteiro, escreva um algoritmo que descreva os N números
 * da sequencia de Fibonacci.
 */

// Poderia ser trabalhado também com recursão, mas não é tão eficiente
export function fibonacci(n: number): number[] {
	// Validação simples de casos bases
	if (!Number.isInteger(n) || n <= 0) return [];
	if (n === 1) return [0];
	if (n === 2) return [0, 1];

	const sequence = [0, 1];

	for (let i = 2; i < n; i++) {
		const next = sequence[i - 1]! + sequence[i - 2]!;
		sequence.push(next);
	}

	return sequence;
}

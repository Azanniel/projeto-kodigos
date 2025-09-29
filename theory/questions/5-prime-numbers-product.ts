/**
 * 5. Informando uma entrada numérica N, informe o total da multiplicação
 * de N números primos seguidos.
 */

function isPrime(num: number): boolean {
	if (num < 2) return false;

	const limit = Math.sqrt(num);
	for (let i = 2; i <= limit; i++) {
		if (num % i === 0) return false;
	}

	return true;
}

export function primeNumbersProduct(n: number): number {
	if (!Number.isInteger(n) || n <= 0) return 1;

	let primesFound = 0;
	let candidate = 2;
	let product = 1;

	while (primesFound < n) {
		if (isPrime(candidate)) {
			product *= candidate;
			primesFound++;
		}

		candidate++;
	}

	return product;
}

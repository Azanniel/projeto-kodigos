/**
 * 5. Informando uma entrada numérica N, informe o total da multiplicação
 * de N números primos seguidos.
 *
 * Esse é um arquivo de teste para assegurar que a função primeNumbersProduct está funcionando corretamente.
 *
 * Os testes foram escritos em português para facilitar o entendimento.
 */
import { describe, expect, it } from 'bun:test';
import { primeNumbersProduct } from './5-prime-numbers-product';

describe('Questão 5', () => {
	const sut = primeNumbersProduct;

	it('deve retornar o produto dos primeiros N números primos', () => {
		const n = 5;
		const expected = 2 * 3 * 5 * 7 * 11; // 2310
		const result = sut(n);
		expect(result).toBe(expected);
	});

	it('deve retornar 1 quando N for 0 (produto neutro)', () => {
		const n = 0;
		const result = sut(n);
		expect(result).toBe(1);
	});

	it('deve retornar 2 quando N for 1 (primeiro número primo)', () => {
		const n = 1;
		const result = sut(n);
		expect(result).toBe(2);
	});

	it('deve retornar 1 quando N for negativo (produto neutro)', () => {
		const n = -3;
		const result = sut(n);
		expect(result).toBe(1);
	});
});

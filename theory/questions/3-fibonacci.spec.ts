/**
 * 3. Dando um número N inteiro, escreva um algoritmo que descreva os N números
 * da sequencia de Fibonacci
 *
 * Esse é um arquivo de teste para assegurar que a função fibonacci está funcionando corretamente.
 *
 * Os testes foram escritos em português para facilitar o entendimento.
 */
import { describe, expect, it } from 'bun:test';
import { fibonacci } from './3-fibonacci';

describe('Questão 3', () => {
	const sut = fibonacci;

	it('deve retornar os primeiros N números da sequência de Fibonacci', () => {
		const n = 7;
		const result = sut(n);
		expect(result).toEqual([0, 1, 1, 2, 3, 5, 8]);
	});

	it('deve retornar um array vazio quando N for 0', () => {
		const n = 0;
		const result = sut(n);
		expect(result).toEqual([]);
	});

	it('deve retornar [0] quando N for 1', () => {
		const n = 1;
		const result = sut(n);
		expect(result).toEqual([0]);
	});

	it('deve retornar [0, 1] quando N for 2', () => {
		const n = 2;
		const result = sut(n);
		expect(result).toEqual([0, 1]);
	});

	it('deve retornar os primeiros N números da sequência de Fibonacci para N maior que 10', () => {
		const n = 12;
		const result = sut(n);
		expect(result).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]);
	});

	it('deve retornar um array vazio quando N for negativo', () => {
		const n = -5;
		const result = sut(n);
		expect(result).toEqual([]);
	});

	it('deve retornar um array vazio quando N não for um número inteiro', () => {
		const n = 5.5;
		const result = sut(n);
		expect(result).toEqual([]);
	});
});

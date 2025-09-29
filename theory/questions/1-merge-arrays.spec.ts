/**
 * 1. Sabendo que você tem dois arrays de números inteiros,
 * crie um terceiro array com a junção dos dois anteriores em ordem crescente.
 *
 * Esse é um arquivo de teste para assegurar que a função mergeArrays está funcionando corretamente.
 *
 * Os testes foram escritos em português para facilitar o entendimento.
 */

import { describe, expect, it } from 'bun:test';
import { mergeArrays } from './1-merge-arrays';

describe('Questão 1', () => {
	const sut = mergeArrays;

	it('deve mesclar dois arrays ordenados em um único array ordenado', () => {
		const array1 = [1, 3, 5];
		const array2 = [2, 4, 6];
		const result = sut(array1, array2);
		expect(result).toEqual([1, 2, 3, 4, 5, 6]);
	});

	it('deve lidar com arrays vazios', () => {
		const array1: number[] = [];
		const array2: number[] = [];
		const result = sut(array1, array2);
		expect(result).toEqual([]);
	});

	it('deve mesclar um array vazio com um array não vazio', () => {
		const array1: number[] = [];
		const array2 = [1, 2, 3];
		const result = sut(array1, array2);
		expect(result).toEqual([1, 2, 3]);
	});

	it('deve mesclar dois arrays com elementos iguais', () => {
		const array1 = [1, 2, 3];
		const array2 = [1, 2, 3];
		const result = sut(array1, array2);
		expect(result).toEqual([1, 1, 2, 2, 3, 3]);
	});

	it('deve mesclar dois arrays de tamanhos diferentes', () => {
		const array1 = [1, 4, 7, 10];
		const array2 = [2, 3, 5, 6, 8, 9];
		const result = sut(array1, array2);
		expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	});

	it('deve mesclar dois arrays não ordenados', () => {
		const array1 = [5, 1, 9];
		const array2 = [3, 7, 2];
		const result = sut(array1, array2);
		expect(result).toEqual([1, 2, 3, 5, 7, 9]);
	});
});

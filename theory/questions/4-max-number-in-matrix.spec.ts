/**
 * 4. Crie uma função ou procedimento que receba uma matriz AxB do tipo numérico e dois parâmetros que indicam o
 * tamanho da matriz A, B. Encontre o maior número dessa matriz
 *
 * Esse é um arquivo de teste para assegurar que a função findMaxInMatrix está funcionando corretamente.
 *
 * Os testes foram escritos em português para facilitar o entendimento.
 */
import { describe, expect, it } from 'bun:test';
import { findMaxInMatrix } from './4-max-number-in-matrix';

describe('Questão 4', () => {
	const sut = findMaxInMatrix;

	it('deve encontrar o maior número em uma matriz 3x3', () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];
		const rows = 3;
		const cols = 3;
		const result = sut(matrix, rows, cols);
		expect(result).toBe(9);
	});

	it('deve encontrar o maior número em uma matriz com números negativos', () => {
		const matrix = [
			[-10, -20, -30],
			[-5, -15, -25],
			[-1, -2, -3],
		];
		const rows = 3;
		const cols = 3;
		const result = sut(matrix, rows, cols);
		expect(result).toBe(-1);
	});

	it('deve retornar null para uma matriz vazia', () => {
		const matrix: number[][] = [];
		const rows = 0;
		const cols = 0;
		const result = sut(matrix, rows, cols);
		expect(result).toBeNull();
	});

	it('deve retornar null para parâmetro de tamanho inválido na coluna', () => {
		const matrix = [
			[1, 2],
			[3, 4],
		];
		const rows = 2;
		const cols = -2;
		const result = sut(matrix, rows, cols);
		expect(result).toBeNull();
	});

	it('deve retornar null para parâmetro de tamanho inválido na linha', () => {
		const matrix = [
			[1, 2],
			[3, 4],
		];
		const rows = -2;
		const cols = 2;
		const result = sut(matrix, rows, cols);
		expect(result).toBeNull();
	});

	it('deve encontrar o maior número em uma matriz 2x4', () => {
		const matrix = [
			[10, 20, 30, 40],
			[5, 15, 25, 35],
		];
		const rows = 2;
		const cols = 4;
		const result = sut(matrix, rows, cols);
		expect(result).toBe(40);
	});

	it('deve retornar nulo se parâmetros forem maiores que a matriz', () => {
		const matrix = [
			[1, 2],
			[3, 4],
		];
		const rows = 3;
		const cols = 3;
		const result = sut(matrix, rows, cols);
		expect(result).toBeNull();
	});

	it('deve retornar nulo se a matrix tiver linhas vazias', () => {
		const matrix = [[]];
		const rows = 1;
		const cols = 1;
		const result = sut(matrix, rows, cols);
		expect(result).toBeNull();
	});
});

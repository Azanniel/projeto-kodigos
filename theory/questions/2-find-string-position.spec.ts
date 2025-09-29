/**
 * 2. Imagine que você tenha uma tela com duas entradas, uma com o texto e
 * outra com a string a ser encontrada. Monte um algoritmo para encontrar
 * a posição dessa string nesse texto. Caso não encontre, retornar -1.
 *
 * Esse é um arquivo de teste para assegurar que a função findStringPosition está funcionando corretamente.
 *
 * Os testes foram escritos em português para facilitar o entendimento.
 */
import { describe, expect, it } from 'bun:test';
import { findStringPosition } from './2-find-string-position';

describe('Questão 2', () => {
	const sut = findStringPosition;

	it('deve encontrar a posição de uma letra em uma palavra', () => {
		const text = 'banana';
		const search = 'a';
		const result = sut(text, search);
		expect(result).toBe(1);
	});

	it('deve encontrar a posição de uma substring em uma palavra', () => {
		const text = 'banana';
		const search = 'nan';
		const result = sut(text, search);
		expect(result).toBe(2);
	});

	it('deve retornar -1 quando a substring não é encontrada', () => {
		const text = 'banana';
		const search = 'xyz';
		const result = sut(text, search);
		expect(result).toBe(-1);
	});

	it('deve encontrar a posição de uma substring no início do texto', () => {
		const text = 'hello world';
		const search = 'hello';
		const result = sut(text, search);
		expect(result).toBe(0);
	});

	it('deve encontrar a posição de uma substring no final do texto', () => {
		const text = 'hello world';
		const search = 'world';
		const result = sut(text, search);
		expect(result).toBe(6);
	});

	it('deve retornar a posição de uma substring no meio do texto', () => {
		const text = 'Welcome to the new world';
		const search = 'new';
		const result = sut(text, search);
		expect(result).toBe(15);
	});

	it('deve retornar -1 quando o texto está vazio e a substring não é encontrada', () => {
		const text = '';
		const search = 'whatever';
		const result = sut(text, search);
		expect(result).toBe(-1);
	});

	it('deve retornar 0 quando a substring está vazia', () => {
		const text = 'banana';
		const search = '';
		const result = sut(text, search);
		expect(result).toBe(0);
	});

	it('deve retornar 0 quando ambos texto e substring estão vazios', () => {
		const text = '';
		const search = '';
		const result = sut(text, search);
		expect(result).toBe(0);
	});

	it('deve retornar a posição de uma substring que é um espaço em branco', () => {
		const text = 'hello world';
		const search = ' ';
		const result = sut(text, search);
		expect(result).toBe(5);
	});

	it('deve encontrar a posição de uma substring que ocorre múltiplas vezes, retornando a primeira ocorrência', () => {
		const text = 'abracadabra';
		const search = 'abra';
		const result = sut(text, search);
		expect(result).toBe(0);
	});

	it('deve ser case-sensitive ao encontrar a substring', () => {
		const text = 'Hello World';
		const search = 'world';
		const result = sut(text, search);
		expect(result).toBe(-1);
	});

	it('deve encontrar a posição de uma substring que é igual ao texto completo', () => {
		const text = 'exactmatch';
		const search = 'exactmatch';
		const result = sut(text, search);
		expect(result).toBe(0);
	});

	it('deve retornar -1 quando a substring é maior que o texto', () => {
		const text = 'short';
		const search = 'longsubstring';
		const result = sut(text, search);
		expect(result).toBe(-1);
	});

	it('deve encontrar a posição de uma substring com caracteres especiais', () => {
		const text = 'hello @world!';
		const search = '@world';
		const result = sut(text, search);
		expect(result).toBe(6);
	});

	it('deve encontrar a posição de uma substring numérica dentro de um texto alfanumérico', () => {
		const text = 'abc123def';
		const search = '123';
		const result = sut(text, search);
		expect(result).toBe(3);
	});
});

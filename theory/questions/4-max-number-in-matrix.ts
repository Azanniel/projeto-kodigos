/** biome-ignore-all lint/style/noNonNullAssertion: the matrix is guaranteed to be non-null and have at least one element */

/**
 * 4. Crie uma função ou procedimento que receba uma matriz AxB do tipo numérico e dois parâmetros que indicam o
 * tamanho da matriz A, B. Encontre o maior número dessa matriz
 */

export function findMaxInMatrix(
	matrix: number[][],
	rows: number,
	cols: number,
): number | null {
	if (!matrix || rows <= 0 || cols <= 0) return null;

	const currentRows = matrix.length;
	if (rows > currentRows) return null;

	const currentCols = matrix[0]?.length || 0;
	if (cols > currentCols) return null;

	let max = matrix[0]![0]!;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (matrix[i]![j]! > max) {
				max = matrix[i]![j]!;
			}
		}
	}

	return max;
}

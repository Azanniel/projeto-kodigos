-- 5. Crie uma consulta que mostre os produtos sem armazém alocados.

SELECT 
  p.description AS "Produto",
  p.price AS "Preço",
  p.size_in_square_meters AS "Tamanho (m²)"
FROM products p
LEFT JOIN products_in_warehouses piw ON p.id = piw.product_id
WHERE piw.warehouse_id IS NULL;
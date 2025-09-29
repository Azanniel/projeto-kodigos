-- 4. Crie um relatório que mostre os produtos que estão em mais armazéns 
-- (em quantidade de armazéns e não em acumulado).

SELECT 
  p.description AS "Produto",
  COUNT(DISTINCT piw.warehouse_id) AS "Número de Armazéns",
  SUM(piw.quantity) AS "Quantidade Total"
FROM products p
INNER JOIN products_in_warehouses piw ON piw.product_id = p.id
GROUP BY p.description
HAVING COUNT(DISTINCT piw.warehouse_id) > 1
ORDER BY `Número de Armazéns` DESC;
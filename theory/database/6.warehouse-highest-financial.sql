-- 6. Crie um relatório que mostre a lista de armazém com maior valor 
-- financeiro para empresa em ordem decrescente.

SELECT 
  w.location AS "Armazém",
  ROUND(COALESCE(SUM(piw.quantity * p.price), 0), 2) AS "Valor Total"
FROM warehouses w
INNER JOIN products_in_warehouses piw ON piw.warehouse_id = w.id
INNER JOIN products p ON p.id = piw.product_id
GROUP BY w.location
ORDER BY `Valor Total` DESC;
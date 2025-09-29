-- 2. Crie uma consulta que informe todos os armazéns com o total ocupado.

SELECT 
  w.name AS "Armazém",
  ROUND(COALESCE(SUM(p.size_in_square_meters * piw.quantity), 0), 2) AS "Total Ocupado",
  w.available_space_in_square_meters AS "Total"
FROM warehouses w
LEFT JOIN products_in_warehouses piw ON w.id = piw.warehouse_id
LEFT JOIN products p ON p.id = piw.product_id
GROUP BY w.id, w.name, w.available_space_in_square_meters;
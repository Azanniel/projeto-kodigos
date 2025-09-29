-- 3. Crie uma procedure que dado um produto como parâmetro, 
-- informe os 5 armazéns com maior quantidade desse produto.

DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS get_top_warehouses_by_product(IN product_id INT)
BEGIN
  SELECT 
    w.name AS "Armazém",
    COALESCE(SUM(piw.quantity), 0) AS "Quantidade"
  FROM warehouses w
  LEFT JOIN products_in_warehouses piw ON w.id = piw.warehouse_id
  WHERE piw.product_id = product_id
  GROUP BY w.id, w.name
  ORDER BY "Quantidade" DESC
  LIMIT 5;
END $$

DELIMITER ;

-- Exemplo de chamada da procedure:
CALL get_top_warehouses_by_product(1); 
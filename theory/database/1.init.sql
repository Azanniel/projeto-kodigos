-- Para as questões de banco de dados, considere a seguinte estrutura de tabela.
-- Produto -> Id, descrição, unidade de medida, valor, tamanho em metros quadrados.
-- Armazém -> Id, nome, espaço disponível em metros quadrados.
-- ProdxArmazem -> IdProduto, IdArmazem, Qtd.

-- 1. Realize as criações das tabelas, definindo seus relacionamentos e chaves.

-- Schema
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(255) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL,
  size_in_square_meters FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS warehouses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  available_space_in_square_meters FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS products_in_warehouses (
  product_id INT,
  warehouse_id INT,
  quantity FLOAT NOT NULL,

  PRIMARY KEY (product_id, warehouse_id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

-- Seeds
-- Produtos
INSERT INTO products (description, unit, price, size_in_square_meters) VALUES
('Cimento Portland 50kg', 'saco', 35.90, 0.04),
('Tijolo Cerâmico 8 Furos', 'unidade', 1.20, 0.01),
('Areia Lavada 1m³', 'm3', 89.00, 1.00),
('Brita 1 1m³', 'm3', 120.00, 1.00),
('Telha Cerâmica', 'unidade', 2.50, 0.08),
('Madeira Pinus 3m', 'peça', 45.00, 0.30),
('Aço Vergalhão 10mm 12m', 'barra', 110.00, 0.12),
('Caixa D’Água 1000L', 'unidade', 450.00, 1.50),
('Piso Cerâmico 60x60cm', 'caixa', 75.00, 1.44),
('Rejunte 1kg', 'saco', 6.50, 0.003),
('Tinta Acrílica 18L', 'galão', 220.00, 0.05),
('Porta de Madeira 210x80cm', 'unidade', 310.00, 1.70),
('Janela de Alumínio 120x120cm', 'unidade', 280.00, 1.44),
('Lâmpada LED 9W', 'unidade', 12.90, 0.001),
('Interruptor Simples', 'unidade', 7.50, 0.001),
('Tomada 2P+T 10A', 'unidade', 8.90, 0.001),
('Fio Elétrico 2,5mm Rolo 100m', 'rolo', 320.00, 0.02),
('Chuveiro Elétrico 220V 6800W', 'unidade', 150.00, 0.01),
('Vaso Sanitário com Caixa Acoplada', 'unidade', 480.00, 0.70),
('Pia de Granito 1,20m', 'unidade', 650.00, 1.20),
('Bancada de Mármore 2,00m', 'unidade', 1200.00, 1.50),
('Cuba de Inox Simples', 'unidade', 300.00, 0.20),
('Fogão 4 Bocas', 'unidade', 850.00, 0.60),
('Geladeira Duplex 400L', 'unidade', 2200.00, 1.80),
('Micro-ondas 30L', 'unidade', 600.00, 0.40);

-- Armazéns
INSERT INTO warehouses (name, available_space_in_square_meters) VALUES
('Armazém Central - Parque 10 de Novembro', 500),
('Depósito Zona Norte - Cidade Nova', 250),
('Centro de Distribuição - Alvorada', 700),
('Armazém Regional - Centro', 400),
('Depósito Sul - Japiim', 300),
('Depósito Leste - Tancredo Neves', 200);

-- Produtos em Armazéns

-- Armazém 1: Central - Parque 10 de Novembro (capacidade: 500 m²)
INSERT INTO products_in_warehouses (product_id, warehouse_id, quantity) VALUES
(1, 1, 200), -- 200 * 0.04 = 8.00
(2, 1, 2000), -- 2000 * 0.01 = 20.00
(3, 1, 30), -- 30 * 1.00 = 30.00
(4, 1, 20), -- 20 * 1.00 = 20.00
(5, 1, 500), -- 500 * 0.08 = 40.00
(9, 1, 200), -- 200 * 1.44 = 288.00
(10, 1, 300), -- 300 * 0.003 = 0.90
(14, 1, 800); -- 800 * 0.001 = 0.80
-- TOTAL: 407.70 m²

-- Armazém 2: Depósito Zona Norte - Cidade Nova (capacidade: 250 m²)
INSERT INTO products_in_warehouses (product_id, warehouse_id, quantity) VALUES
(1, 2, 100), -- 100 * 0.04 = 4.00
(2, 2, 1200), -- 1200 * 0.01 = 12.00
(6, 2, 80), -- 80 * 0.30 = 24.00
(7, 2, 50), -- 50 * 0.12 = 6.00
(8, 2, 20), -- 20 * 1.50 = 30.00
(11, 2, 100), -- 100 * 0.05 = 5.00
(12, 2, 40), -- 40 * 1.70 = 68.00
(13, 2, 50), -- 50 * 1.44 = 72.00
(15, 2, 200); -- 200 * 0.001 = 0.20
-- TOTAL: 221.20 m²

-- Armazém 3: Centro de Distribuição - Alvorada (capacidade: 700 m²)
INSERT INTO products_in_warehouses (product_id, warehouse_id, quantity) VALUES
(9, 3, 300), -- 300 * 1.44 = 432.00
(10, 3, 600), -- 600 * 0.003 = 1.80
(11, 3, 200), -- 200 * 0.05 = 10.00
(12, 3, 50), -- 50 * 1.70 = 85.00
(13, 3, 50), -- 50 * 1.44 = 72.00
(17, 3, 200), -- 200 * 0.02 = 4.00
(18, 3, 300), -- 300 * 0.01 = 3.00
(19, 3, 40), -- 40 * 0.70 = 28.00
(20, 3, 5); -- 5 * 1.20 = 6.00
-- TOTAL: 641.80 m²

-- Armazém 4: Regional - Centro (capacidade: 400 m²)
INSERT INTO products_in_warehouses (product_id, warehouse_id, quantity) VALUES
(14, 4, 1500), -- 1500 * 0.001 = 1.50
(15, 4, 1000), -- 1000 * 0.001 = 1.00
(16, 4, 800), -- 800 * 0.001 = 0.80
(17, 4, 200), -- 200 * 0.02 = 4.00
(18, 4, 120), -- 120 * 0.01 = 1.20
(19, 4, 350), -- 350 * 0.70 = 245.00
(20, 4, 100); -- 100 * 1.20 = 120.00
-- TOTAL: 373.50 m²

-- Armazém 5: Depósito Sul - Japiim (capacidade: 300 m²)
INSERT INTO products_in_warehouses (product_id, warehouse_id, quantity) VALUES
(1, 5, 50), -- 50 * 0.04 = 2.00
(2, 5, 500), -- 500 * 0.01 = 5.00
(5, 5, 200), -- 200 * 0.08 = 16.00
(9, 5, 150), -- 150 * 1.44 = 216.00
(10, 5, 100), -- 100 * 0.003 = 0.30
(14, 5, 500), -- 500 * 0.001 = 0.50
(18, 5, 500), -- 500 * 0.01 = 5.00
(19, 5, 50), -- 50 * 0.70 = 35.00
(20, 5, 15); -- 15 * 1.20 = 18.00
-- TOTAL: 297.80 m²
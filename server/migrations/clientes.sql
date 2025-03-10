CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  tipo_documento INTEGER NOT NULL,
  documento VARCHAR(14) NOT NULL UNIQUE
);

INSERT INTO public.clientes
(id, nome, email, telefone, tipo_documento, documento)
VALUES(1, 'João Silva', 'joao@email.com', '11999999999', 1, '12345678901');
INSERT INTO public.clientes
(id, nome, email, telefone, tipo_documento, documento)
VALUES(5, 'bryan', 'bryanwrutter96@gmail.com', '47996581110', 1, '44715791854');
INSERT INTO public.clientes
(id, nome, email, telefone, tipo_documento, documento)
VALUES(22, 'Roberto', 'bryanwrutter@gmail.com', '47996581111', 1, '44715791855');
INSERT INTO public.clientes
(id, nome, email, telefone, tipo_documento, documento)
VALUES(24, 'Robertao', 'bryanrutter@hotail.com', '47558123332', 1, '44715991854');
INSERT INTO public.clientes
(id, nome, email, telefone, tipo_documento, documento)
VALUES(25, 'Jonas', 'bryaasasasa@gmali.com', '123333333', 1, '44715791859');
INSERT INTO public.clientes
(id, nome, email, telefone, tipo_documento, documento)
VALUES(27, 'Robertaoaasas', 'bryanrutter@hssotail.com', '47996581117', 1, '44715791254');
INSERT INTO public.clientes
(id, nome, email, telefone, tipo_documento, documento)
VALUES(28, 'Robertaoqweqweq', 'bryanrutter@hwotail.com', '47496581110', 1, '44815791854');
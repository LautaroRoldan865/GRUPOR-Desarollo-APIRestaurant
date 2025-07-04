-- SQLBook: Code
\c users;
-- Carga de datos


INSERT INTO roles (id,nombre,descripcion) VALUES 
    (default,'administrador', 'acceso limitado'), 
    (default,'gerente', 'acceso completo');

INSERT INTO users (rol,id,email,password) VALUES 
    ('gerente',default,'user1@gmail.com', '1234'), 
    ('administrador',default,'user2@gmail.com', '5678');

INSERT INTO permissions (id,nombre,descripcion) VALUES 
    (default,'create-users', 'crear un nuevo usuario'), 
    (default,'list-products', 'acceder lista de productos');

INSERT INTO "role_permission"("idRol", "idPermission") VALUES
    (1, 2),
    (2, 1),
    (2, 2);

--cat lmd.sql | docker compose exec -T db psql




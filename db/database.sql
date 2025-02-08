-- Coupons Table
CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    discount_percentage DECIMAL(5,2) NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
    expiration_date TIMESTAMP NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

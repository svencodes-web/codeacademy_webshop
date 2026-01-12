BEGIN;

DROP TYPE IF EXISTS user_role CASCADE;

CREATE TYPE user_role AS ENUM ('customer', 'admin');

DROP TYPE IF EXISTS cart_status CASCADE;

CREATE TYPE cart_status AS ENUM ('active', 'converted', 'abandoned');

DROP TYPE IF EXISTS order_status CASCADE;

CREATE TYPE order_status AS ENUM (
  'pending',
  'paid',
  'shipped',
  'cancelled',
  'refunded'
);

DROP TABLE IF EXISTS order_items,
orders,
cart_items,
carts,
products,
users CASCADE;

-- Users
CREATE TABLE
  users (
    id uuid PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    password_hash varchar(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    created_at timestamptz NOT NULL DEFAULT now ()
  );

-- Products (no variants)
CREATE TABLE
  products (
    id uuid PRIMARY KEY,
    name varchar(200) NOT NULL,
    description text,
    price_cents int NOT NULL,
    image_url varchar(500),
    stock_count int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now ()
  );

-- Carts
CREATE TABLE
  carts (
    id uuid PRIMARY KEY,
    user_id uuid,
    status cart_status NOT NULL DEFAULT 'active',
    created_at timestamptz NOT NULL DEFAULT now ()
  );

CREATE TABLE
  cart_items (
    id uuid PRIMARY KEY,
    cart_id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity int NOT NULL DEFAULT 1,
    added_at timestamptz NOT NULL DEFAULT now ()
  );

ALTER TABLE carts ADD CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE cart_items ADD CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts (id) ON DELETE CASCADE;

ALTER TABLE cart_items ADD CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

-- Orders (simple, shipping/billing stored as JSON snapshot)
CREATE TABLE
  orders (
    id uuid PRIMARY KEY,
    user_id uuid,
    total_cents int NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    placed_at timestamptz NOT NULL DEFAULT now (),
    address jsonb
  );

CREATE TABLE
  order_items (
    id uuid PRIMARY KEY,
    order_id uuid NOT NULL,
    product_id uuid,
    quantity int NOT NULL,
    unit_price_cents int NOT NULL,
    line_total_cents int NOT NULL
  );

ALTER TABLE orders ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;

ALTER TABLE order_items ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE;

ALTER TABLE order_items ADD CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE SET NULL;

COMMIT;
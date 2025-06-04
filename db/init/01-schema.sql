DROP TABLE IF EXISTS transaction_items CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    -- Reason for using UUID rather than SERIAL INTEGER:
    -- If you use SERIAL INTEGER IDs, and those serial IDs
    -- are reflected in your routes, then competitors
    -- are able to enumerate over your records and scrape
    -- your database, at least the parts that are exposed.
    cid  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE menu_items (
    iid           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name          VARCHAR(64) NOT NULL,
    price         DECIMAL(10, 2) NOT NULL,
    cost          DECIMAL(10, 2) NOT NULL,
    tax_rate      DECIMAL(10, 2) NOT NULL DEFAULT 0.25,
    discount_rate DECIMAL(10, 2) NOT NULL DEFAULT 0.0,

    cid           UUID NOT NULL,
    FOREIGN KEY (cid) REFERENCES categories(cid),
    UNIQUE (name, cid)
);

CREATE TABLE transactions (
    tid     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date    TIMESTAMP NOT NULL,
    bill_no VARCHAR(16) NOT NULL UNIQUE
);

CREATE TABLE transaction_items (
    tid UUID NOT NULL,
    line_no  INTEGER NOT NULL,
    iid UUID NOT NULL,
    quantity INTEGER NOT NULL,
    rate     DECIMAL(10, 2) NOT NULL,
    tax      DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    total    DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (tid, line_no),
    FOREIGN KEY (tid) REFERENCES transactions(tid) ON DELETE CASCADE,
    FOREIGN KEY (iid) REFERENCES menu_items(iid)
);
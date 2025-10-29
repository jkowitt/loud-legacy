import styles from "./CatalogList.module.css";
import type { CatalogItem } from "../lib/api";

type CatalogListProps = {
  items: CatalogItem[];
};

export function CatalogList({ items }: CatalogListProps) {
  return (
    <section className="surface">
      <h2>Offers</h2>
      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.product_id} className={styles.card}>
            <span className="badge">{item.type}</span>
            <h3>{item.name}</h3>
            <p className={styles.price}>{formatPrice(item.price_cents, item.currency)}</p>
            <pre className={styles.jsonBlock}>{JSON.stringify(item.rules, null, 2)}</pre>
            <button className={styles.buyButton}>Buy</button>
          </article>
        ))}
      </div>
      {!items.length && <p className={styles.empty}>Catalog not loaded yet.</p>}
    </section>
  );
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(cents / 100);
}

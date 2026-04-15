import { motion } from "framer-motion";
import { PRODUCT_DB } from "@/lib/products";

const popularProducts = PRODUCT_DB.slice(0, 8);

const ddokTagStyles: Record<string, string> = {
  D: "bg-indigo-100 text-indigo-800",
  O: "bg-emerald-100 text-emerald-800",
  K: "bg-amber-100 text-amber-800",
  T: "bg-pink-100 text-pink-800",
};

const PopularProducts = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
            🔥 인기 추천 아이템
          </h2>
          <p className="text-muted-foreground">가장 많은 부모님이 찾는 육아용품이에요</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {popularProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card border-2 border-border rounded-2xl p-4 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-3xl mb-3">{product.icon}</div>
              <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">{product.price}</p>
              <div className="flex flex-wrap gap-1">
                {product.ddok.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ddokTagStyles[tag] || ""}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;

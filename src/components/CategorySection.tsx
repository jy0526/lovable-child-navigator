import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CATEGORY_META, ALL_CATEGORIES } from "@/lib/products";

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
            카테고리별 육아용품
          </h2>
          <p className="text-muted-foreground">필요한 카테고리를 선택해보세요</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {ALL_CATEGORIES.map((cat, i) => {
            const meta = CATEGORY_META[cat];
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className={`block bg-gradient-to-br ${meta.color} border-2 border-border rounded-2xl p-6 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="text-4xl mb-3">{meta.icon}</div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">{cat}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{meta.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

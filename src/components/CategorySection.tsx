import { motion } from "framer-motion";
import { categories } from "@/lib/products";

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
            4가지 카테고리
          </h2>
          <p className="text-muted-foreground">발달 단계별로 필요한 모든 것을 담았어요</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`bg-gradient-to-br ${cat.color} border-2 border-border rounded-2xl p-6 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

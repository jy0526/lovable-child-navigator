import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import TheorySection from "@/components/TheorySection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getChildMonths } from "@/lib/childStore";
import { getRelevantProducts, formatPrice, getStageLabel, PRODUCT_DB } from "@/lib/products";
import { getProductImage } from "@/lib/productImages";

const popularProducts = [...PRODUCT_DB].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);

const ddokTagStyles: Record<string, string> = {
  D: "bg-indigo-100 text-indigo-800",
  O: "bg-emerald-100 text-emerald-800",
  K: "bg-amber-100 text-amber-800",
  T: "bg-pink-100 text-pink-800",
};

const Index = () => {
  const childMonths = getChildMonths();

  const monthlyPicks = childMonths !== null ? getRelevantProducts(childMonths).slice(0, 6) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />

        {/* Monthly picks (if child registered) */}
        {childMonths !== null && monthlyPicks.length > 0 && (
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                  <Sparkles className="w-4 h-4" /> {childMonths}개월 · {getStageLabel(childMonths)}
                </div>
                <h2 className="text-3xl font-display text-foreground mb-2">이번 달 추천</h2>
                <p className="text-muted-foreground">지금 우리 아이에게 필요한 아이템이에요</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {monthlyPicks.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/product/${p.id}`} className="block bg-card border-2 border-border rounded-2xl p-4 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
                      <div className="text-3xl mb-2">{p.icon}</div>
                      <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{p.brand}</p>
                      <p className="font-bold text-foreground text-sm">{formatPrice(p.price)}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/recommend" className="text-primary text-sm font-medium hover:underline">전체 추천 보기 →</Link>
              </div>
            </div>
          </section>
        )}

        {/* Popular products */}
        <section className={`py-16 md:py-20 ${childMonths !== null ? "" : "bg-muted/30"}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display text-foreground mb-2">🔥 인기 아이템</h2>
              <p className="text-muted-foreground">가장 많은 부모님이 찾는 육아용품이에요</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {popularProducts.map((p, i) => {
                const img = getProductImage(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/product/${p.id}`} className="block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
                      <div className="aspect-square bg-muted/40 overflow-hidden flex items-center justify-center">
                        {img ? (
                          <img
                            src={img}
                            alt={p.title}
                            loading="lazy"
                            width={512}
                            height={512}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="text-5xl">{p.icon}</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">{p.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{p.brand}</p>
                        <div className="flex items-baseline gap-1.5 mb-2">
                          <span className="font-bold text-foreground text-sm">{formatPrice(p.price)}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {p.ddok.map(tag => (
                            <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ddokTagStyles[tag]}`}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link to="/products" className="text-primary text-sm font-medium hover:underline">전체 상품 보기 →</Link>
            </div>
          </div>
        </section>

        <CategorySection />
        <TheorySection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Baby, Calendar, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import TheorySection from "@/components/TheorySection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getChildMonths, storeBirthday, getStoredBirthday } from "@/lib/childStore";
import { getRelevantProducts, formatPrice, getStageLabel, PRODUCT_DB } from "@/lib/products";

const popularProducts = [...PRODUCT_DB].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);

const ddokTagStyles: Record<string, string> = {
  D: "bg-indigo-100 text-indigo-800",
  O: "bg-emerald-100 text-emerald-800",
  K: "bg-amber-100 text-amber-800",
  T: "bg-pink-100 text-pink-800",
};

const Index = () => {
  const navigate = useNavigate();
  const [birthday, setBirthday] = useState(getStoredBirthday() || "");
  const childMonths = getChildMonths();

  const handleQuickStart = () => {
    if (!birthday) return;
    storeBirthday(birthday);
    navigate("/recommend");
  };

  const monthlyPicks = childMonths !== null ? getRelevantProducts(childMonths).slice(0, 6) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />

        {/* Quick start */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border-2 border-border rounded-3xl p-8 shadow-card"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-elegant mb-5">
                <Baby className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-display text-foreground mb-2">빠른 추천 시작</h2>
              <p className="text-sm text-muted-foreground mb-6">생년월일만 입력하면 맞춤 추천이 시작돼요</p>
              <div className="space-y-3">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-border rounded-xl bg-background text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={handleQuickStart}
                  disabled={!birthday}
                  className="w-full py-3.5 gradient-primary text-primary-foreground rounded-full font-semibold shadow-elegant hover:shadow-lg transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  추천 받기 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

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
              {popularProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/product/${p.id}`} className="block bg-card border-2 border-border rounded-2xl p-4 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
                    <div className="text-3xl mb-2">{p.icon}</div>
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
                  </Link>
                </motion.div>
              ))}
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

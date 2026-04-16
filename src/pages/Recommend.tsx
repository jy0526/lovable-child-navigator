import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Baby, Calendar, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getChildMonths, storeBirthday, getStoredBirthday } from "@/lib/childStore";
import { getRelevantProducts, getStageLabel, formatPrice, type Product } from "@/lib/products";
import { addToCart, isInCart } from "@/lib/cartStore";
import { useToast } from "@/hooks/use-toast";

const ddokTagStyles: Record<string, string> = {
  D: "bg-indigo-100 text-indigo-800",
  O: "bg-emerald-100 text-emerald-800",
  K: "bg-amber-100 text-amber-800",
  T: "bg-pink-100 text-pink-800",
};

const Recommend = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [birthday, setBirthday] = useState(getStoredBirthday() || "");
  const [childMonths, setChildMonths] = useState<number | null>(getChildMonths());
  const [products, setProducts] = useState<Product[]>([]);
  const [, tick] = useState(0);

  useEffect(() => {
    if (childMonths !== null) {
      setProducts(getRelevantProducts(childMonths));
    }
  }, [childMonths]);

  const handleStart = () => {
    if (!birthday) return;
    storeBirthday(birthday);
    const months = Math.floor((Date.now() - new Date(birthday).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    if (months < 0 || months > 84) return;
    setChildMonths(months);
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    tick(n => n + 1);
    toast({ title: "장바구니에 담았어요 🛒" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {childMonths === null ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl gradient-primary flex items-center justify-center shadow-elegant mb-6">
              <Baby className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display text-foreground mb-3">아이 정보 입력</h1>
            <p className="text-muted-foreground mb-8">생년월일을 입력하면 발달 단계에 맞는<br />맞춤 추천을 받을 수 있어요.</p>
            <div className="space-y-4">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border-2 border-border rounded-xl bg-card text-foreground text-sm focus:border-primary focus:outline-none transition-colors" />
              </div>
              <button onClick={handleStart} disabled={!birthday}
                className="w-full py-3.5 gradient-primary text-primary-foreground rounded-full font-semibold shadow-elegant hover:shadow-lg transition-all disabled:opacity-40 flex items-center justify-center gap-2">
                추천 받기 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <div>
            <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> 홈으로
            </button>

            {/* Child info + stage analysis */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="gradient-card border-2 border-border rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
              <div className="text-3xl mb-2">👶</div>
              <h2 className="text-2xl font-display text-foreground mb-1">우리 아이 {childMonths}개월</h2>
              <p className="text-primary font-semibold text-lg">{getStageLabel(childMonths)}</p>
              <p className="text-sm text-muted-foreground mt-2">총 {products.length}개의 추천 아이템</p>
            </motion.div>

            {/* Action links */}
            <div className="flex gap-3 max-w-2xl mx-auto mb-10">
              <Link to="/checklist" className="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-semibold text-sm text-center hover:bg-primary/5 transition-colors">
                ⭐ 체크리스트
              </Link>
              <Link to="/cart" className="flex-1 py-3 border-2 border-border text-muted-foreground rounded-xl font-semibold text-sm text-center hover:border-primary hover:text-primary transition-colors">
                🛒 장바구니
              </Link>
            </div>

            {/* Products */}
            <h2 className="text-2xl font-display text-foreground mb-6 text-center">🔥 지금 필요한 아이템</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {products.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="bg-card border-2 border-border rounded-2xl p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <Link to={`/product/${p.id}`} className="w-12 h-12 rounded-xl bg-purple-light flex items-center justify-center text-2xl shrink-0">
                        {p.icon}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${p.id}`} className="font-semibold text-foreground text-sm mb-1 hover:text-primary transition-colors block truncate">{p.title}</Link>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                        <p className="font-bold text-foreground text-sm mt-1">{formatPrice(p.price)}</p>
                        <p className="text-xs text-primary/80 leading-relaxed mt-1">{p.reason}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.ddok.map(tag => (
                            <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ddokTagStyles[tag]}`}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleAddToCart(p.id)}
                        className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors ${
                          isInCart(p.id) ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        {isInCart(p.id) ? "담김 ✓" : "담기"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Recommend;

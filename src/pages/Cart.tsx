import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingCart, ExternalLink, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getCart, removeFromCart, updateCartQty, clearCart, type CartItem } from "@/lib/cartStore";
import { getProductById, formatPrice } from "@/lib/products";
import { setChecklistStatus } from "@/lib/checklistStore";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { toast } = useToast();
  const [, tick] = useState(0);
  const refresh = () => tick(n => n + 1);

  const cartItems = useMemo(() => {
    const raw = getCart();
    return raw.map(c => ({ ...c, product: getProductById(c.productId) })).filter(c => c.product);
  }, [tick]);

  const totalPrice = cartItems.reduce((sum, c) => sum + (c.product!.price * c.quantity), 0);

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    refresh();
  };

  const handleQty = (productId: string, delta: number) => {
    const item = cartItems.find(c => c.productId === productId);
    if (item) {
      updateCartQty(productId, item.quantity + delta);
      refresh();
    }
  };

  const handleClear = () => {
    clearCart();
    refresh();
    toast({ title: "장바구니를 비웠어요" });
  };

  const handleReflectChecklist = () => {
    cartItems.forEach(c => {
      setChecklistStatus(c.productId, "구매완료");
    });
    toast({ title: "체크리스트에 구매완료로 반영했어요 ✓" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-display text-foreground">🛒 장바구니</h1>
          {cartItems.length > 0 && (
            <button onClick={handleClear} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
              전체 삭제
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">장바구니가 비어있어요</p>
            <Link to="/products" className="gradient-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold inline-block shadow-elegant hover:shadow-lg transition-all">
              상품 둘러보기
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {cartItems.map((c, i) => {
                const p = c.product!;
                return (
                  <motion.div
                    key={c.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border-2 border-border rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Link to={`/product/${p.id}`} className="w-14 h-14 rounded-xl bg-purple-light flex items-center justify-center text-3xl shrink-0">
                        {p.icon}
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${p.id}`} className="font-semibold text-foreground text-sm hover:text-primary transition-colors line-clamp-1">
                          {p.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                        <p className="font-bold text-foreground text-sm mt-1">{formatPrice(p.price * c.quantity)}</p>
                      </div>
                      <button onClick={() => handleRemove(c.productId)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-3 justify-end">
                      <button onClick={() => handleQty(c.productId, -1)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{c.quantity}</span>
                      <button onClick={() => handleQty(c.productId, 1)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-card border-2 border-border rounded-2xl p-6 sticky bottom-20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">총 {cartItems.length}개 상품</span>
                <span className="text-2xl font-display text-foreground">{formatPrice(totalPrice)}</span>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleReflectChecklist}
                  className="w-full py-3.5 border-2 border-primary text-primary rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> 체크리스트 반영
                </button>
                <button className="w-full py-3.5 gradient-primary text-primary-foreground rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-elegant hover:shadow-lg transition-all">
                  <ExternalLink className="w-4 h-4" /> 구매하기 (외부 링크)
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Cart;

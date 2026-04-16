import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Zap, Star, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getProductById, formatPrice, getStageLabel } from "@/lib/products";
import { addToCart, isInCart } from "@/lib/cartStore";
import { getChecklistStatus, setChecklistStatus, type ChecklistStatus } from "@/lib/checklistStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ddokInfo: Record<string, { label: string; desc: string; color: string }> = {
  D: { label: "D · 몸으로 하기", desc: "대근육·소근육·자조 능력 발달", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  O: { label: "O · 세상 열기", desc: "언어·인지·탐색·감각 발달", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  K: { label: "K · 나를 알기", desc: "자아·감정·사회성 발달", color: "bg-amber-100 text-amber-800 border-amber-200" },
  T: { label: "T · 지금 이 순간", desc: "건강검진·안전·환경 타이밍", color: "bg-pink-100 text-pink-800 border-pink-200" },
};

const statusOptions: { value: ChecklistStatus; label: string; color: string }[] = [
  { value: "미체크", label: "미체크", color: "bg-muted text-muted-foreground" },
  { value: "구매완료", label: "구매완료", color: "bg-green-100 text-green-800" },
  { value: "보류", label: "보류", color: "bg-amber-100 text-amber-800" },
  { value: "생략", label: "생략", color: "bg-red-100 text-red-800" },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = getProductById(id || "");
  const [checkStatus, setCheckStatus] = useState<ChecklistStatus>(getChecklistStatus(id || ""));
  const [inCart, setInCart] = useState(isInCart(id || ""));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">상품을 찾을 수 없어요.</p>
          <Link to="/products" className="text-primary underline mt-4 inline-block">전체 상품으로</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    setInCart(true);
    toast({ title: "장바구니에 담았어요 🛒" });
  };

  const handleStatusChange = (status: ChecklistStatus) => {
    setChecklistStatus(product.id, status);
    setCheckStatus(status);
    toast({ title: `체크리스트: ${status}` });
  };

  const monthRange = product.maxMonths
    ? `${product.minMonths}~${product.maxMonths}개월`
    : `${product.minMonths}개월~`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 뒤로
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Product header */}
          <div className="bg-card border-2 border-border rounded-3xl p-6 md:p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-purple-light flex items-center justify-center text-5xl shrink-0">
                {product.icon}
              </div>
              <div className="flex-1">
                <span className="text-xs text-primary font-medium">{product.category} · {product.subCategory}</span>
                <h1 className="text-2xl font-display text-foreground mt-1">{product.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
              <span className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm font-bold text-destructive">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount}개 리뷰)</span>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  inCart ? "bg-muted text-muted-foreground" : "gradient-primary text-primary-foreground shadow-elegant hover:shadow-lg"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {inCart ? "담김 ✓" : "장바구니 담기"}
              </button>
              {product.productUrl && (
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 border-2 border-primary text-primary rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> 바로 구매
                </a>
              )}
            </div>
          </div>

          {/* Recommendation reason */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 mb-6">
            <h2 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> 추천 이유
            </h2>
            <p className="text-foreground leading-relaxed mb-4">{product.reason}</p>
            <div className="text-sm text-muted-foreground">
              추천 월령: <span className="font-medium text-foreground">{monthRange}</span>
            </div>
          </div>

          {/* DDOK Tags */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 mb-6">
            <h2 className="font-display text-lg text-foreground mb-4">발달 연관성 (DDOK)</h2>
            <div className="space-y-3">
              {product.ddok.map(tag => {
                const info = ddokInfo[tag];
                return (
                  <div key={tag} className={`border rounded-xl p-4 ${info.color}`}>
                    <div className="font-bold text-sm mb-1">{info.label}</div>
                    <div className="text-xs opacity-80">{info.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 mb-6">
            <h2 className="font-display text-lg text-foreground mb-4">주요 특징</h2>
            <div className="flex flex-wrap gap-2">
              {product.features.map(f => (
                <span key={f} className="text-sm bg-muted text-foreground px-3 py-1.5 rounded-full">{f}</span>
              ))}
            </div>
          </div>

          {/* Checklist status */}
          <div className="bg-card border-2 border-border rounded-2xl p-6 mb-6">
            <h2 className="font-display text-lg text-foreground mb-4">체크리스트 상태</h2>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleStatusChange(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    checkStatus === opt.value ? opt.color + " ring-2 ring-primary/30 scale-105" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ProductDetail;

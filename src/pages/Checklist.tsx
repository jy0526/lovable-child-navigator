import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, XCircle, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getRelevantProducts, formatPrice, type Product } from "@/lib/products";
import { getChildMonths } from "@/lib/childStore";
import { getChecklistStatus, setChecklistStatus, getChecklistStats, initChecklistForProducts, type ChecklistStatus } from "@/lib/checklistStore";
import { addToCart } from "@/lib/cartStore";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

type FilterStatus = "전체" | ChecklistStatus;

const statusConfig: Record<ChecklistStatus, { icon: typeof Circle; color: string; bg: string }> = {
  "미체크":  { icon: Circle, color: "text-muted-foreground", bg: "bg-muted" },
  "구매완료": { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
  "보류":    { icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
  "생략":    { icon: XCircle, color: "text-red-500", bg: "bg-red-100" },
};

const Checklist = () => {
  const { toast } = useToast();
  const childMonths = getChildMonths();
  const [filter, setFilter] = useState<FilterStatus>("전체");
  const [, tick] = useState(0);

  const products = useMemo(() => getRelevantProducts(childMonths), [childMonths]);

  useEffect(() => {
    initChecklistForProducts(products.map(p => p.id));
  }, [products]);

  const stats = useMemo(() => getChecklistStats(products.map(p => p.id)), [products, tick]);

  const filtered = useMemo(() => {
    if (filter === "전체") return products;
    return products.filter(p => getChecklistStatus(p.id) === filter);
  }, [products, filter, tick]);

  const handleStatus = (productId: string, status: ChecklistStatus) => {
    setChecklistStatus(productId, status);
    tick(n => n + 1);
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    toast({ title: "장바구니에 담았어요 🛒" });
  };

  const filters: { value: FilterStatus; label: string; count: number }[] = [
    { value: "전체", label: "전체", count: stats.total },
    { value: "미체크", label: "미체크", count: stats.pending },
    { value: "구매완료", label: "구매완료", count: stats.done },
    { value: "보류", label: "보류", count: stats.hold },
    { value: "생략", label: "생략", count: stats.skip },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-display text-foreground mb-2">⭐ 체크리스트</h1>
        <p className="text-muted-foreground mb-6">
          {childMonths !== null ? `${childMonths}개월 기준 필요한 아이템 ${stats.total}개` : "생년월일을 입력하면 맞춤 체크리스트를 볼 수 있어요"}
        </p>

        {/* Progress */}
        <div className="bg-card border-2 border-border rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">완료율</span>
            <span className="text-2xl font-display text-primary">{stats.completionRate}%</span>
          </div>
          <Progress value={stats.completionRate} className="h-3" />
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>구매완료 {stats.done}</span>
            <span>보류 {stats.hold}</span>
            <span>생략 {stats.skip}</span>
            <span>미체크 {stats.pending}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.value ? "gradient-primary text-primary-foreground shadow-elegant" : "bg-card border-2 border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-3">
          {filtered.map((p, i) => {
            const status = getChecklistStatus(p.id);
            const config = statusConfig[status];
            const Icon = config.icon;

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border-2 border-border rounded-2xl p-4"
              >
                <div className="flex items-start gap-3">
                  <Link to={`/product/${p.id}`} className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-purple-light flex items-center justify-center text-2xl shrink-0">
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-sm truncate hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-xs text-muted-foreground">{p.brand} · {formatPrice(p.price)}</p>
                    </div>
                  </Link>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${config.bg} ${config.color}`}>
                    <Icon className="w-3 h-3" />
                    {status}
                  </div>
                </div>

                {/* Status buttons */}
                <div className="flex items-center gap-2 mt-3 pl-15">
                  {(["미체크", "구매완료", "보류", "생략"] as ChecklistStatus[]).map(s => {
                    const sc = statusConfig[s];
                    return (
                      <button
                        key={s}
                        onClick={() => handleStatus(p.id, s)}
                        className={`text-[11px] px-2.5 py-1 rounded-full transition-all ${
                          status === s ? `${sc.bg} ${sc.color} font-bold` : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleAddToCart(p.id)}
                    className="ml-auto text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" /> 담기
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            {childMonths === null ? (
              <div>
                <p className="mb-4">아이 생년월일을 먼저 입력해주세요</p>
                <Link to="/recommend" className="text-primary underline">추천받기 →</Link>
              </div>
            ) : (
              <p>해당 조건의 아이템이 없어요</p>
            )}
          </div>
        )}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Checklist;

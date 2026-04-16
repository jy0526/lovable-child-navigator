import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { PRODUCT_DB, ALL_CATEGORIES, CATEGORY_META, formatPrice, type ProductCategory } from "@/lib/products";
import { addToCart, isInCart } from "@/lib/cartStore";
import { useToast } from "@/hooks/use-toast";

type SortKey = "popular" | "price-asc" | "price-desc" | "recommend";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("category") as ProductCategory | null;
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "전체">(initialCat || "전체");
  const [sort, setSort] = useState<SortKey>("popular");
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [, forceUpdate] = useState(0);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCT_DB];
    if (selectedCategory !== "전체") list = list.filter(p => p.category === selectedCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q));
    }
    switch (sort) {
      case "popular": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "recommend": list.sort((a, b) => b.ddok.length - a.ddok.length || b.rating - a.rating); break;
    }
    return list;
  }, [selectedCategory, sort, search]);

  const handleAddToCart = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(productId);
    forceUpdate(n => n + 1);
    toast({ title: "장바구니에 담았어요 🛒" });
  };

  const handleCategoryChange = (cat: ProductCategory | "전체") => {
    setSelectedCategory(cat);
    if (cat === "전체") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display text-foreground mb-6">전체 상품</h1>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="상품명, 브랜드 검색..."
            className="w-full pl-10 pr-4 py-3 border-2 border-border rounded-xl bg-card text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          <button
            onClick={() => handleCategoryChange("전체")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === "전체" ? "gradient-primary text-primary-foreground shadow-elegant" : "bg-card border-2 border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            전체
          </button>
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat ? "gradient-primary text-primary-foreground shadow-elegant" : "bg-card border-2 border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {CATEGORY_META[cat].icon} {cat}
            </button>
          ))}
        </div>

        {/* Sort + count */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">{filteredProducts.length}개 상품</span>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:border-primary"
            >
              <option value="popular">인기순</option>
              <option value="price-asc">가격 낮은순</option>
              <option value="price-desc">가격 높은순</option>
              <option value="recommend">추천순</option>
            </select>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/product/${p.id}`}
                className="block bg-card border-2 border-border rounded-2xl p-4 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl">{p.icon}</div>
                  <button
                    onClick={(e) => handleAddToCart(p.id, e)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isInCart(p.id) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">{p.brand}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-bold text-foreground text-sm">{formatPrice(p.price)}</span>
                  {p.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">{formatPrice(p.originalPrice)}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs text-amber-500">★ {p.rating}</span>
                  <span className="text-xs text-muted-foreground">({p.reviewCount})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.ddok.map(tag => (
                    <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tag === "D" ? "bg-indigo-100 text-indigo-800" :
                      tag === "O" ? "bg-emerald-100 text-emerald-800" :
                      tag === "K" ? "bg-amber-100 text-amber-800" :
                      "bg-pink-100 text-pink-800"
                    }`}>{tag}</span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Products;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Baby, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getStoredBirthday, storeBirthday, clearBirthday, getChildMonths } from "@/lib/childStore";
import { getStageLabel } from "@/lib/products";

const MyPage = () => {
  const [birthday, setBirthday] = useState(getStoredBirthday() || "");
  const [months, setMonths] = useState<number | null>(getChildMonths());

  useEffect(() => {
    if (birthday) {
      storeBirthday(birthday);
      const m = Math.floor((Date.now() - new Date(birthday).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
      setMonths(m >= 0 && m <= 84 ? m : null);
    }
  }, [birthday]);

  const handleClear = () => {
    clearBirthday();
    setBirthday("");
    setMonths(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-md">
        <h1 className="text-3xl font-display text-foreground mb-8 text-center">마이페이지</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border-2 border-border rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-elegant">
              <Baby className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">아이 정보</h2>
              <p className="text-xs text-muted-foreground">기기에만 저장됩니다</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">생년월일</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full px-4 py-3 border-2 border-border rounded-xl bg-card text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {months !== null && (
              <div className="gradient-card border border-border rounded-xl p-4 text-center">
                <div className="text-2xl font-display text-primary mb-1">{months}개월</div>
                <div className="text-sm text-muted-foreground">{getStageLabel(months)}</div>
              </div>
            )}

            {birthday && (
              <button
                onClick={handleClear}
                className="w-full py-2.5 border border-destructive/30 text-destructive rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> 아이 정보 삭제
              </button>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MyPage;

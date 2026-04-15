import { motion } from "framer-motion";

const theories = [
  { icon: "🧒", name: "피아제", desc: "감각운동기 → 전조작기 인지 발달 단계" },
  { icon: "🤝", name: "볼비", desc: "애착 이론 — 안전 기지 형성의 중요성" },
  { icon: "💪", name: "에릭슨", desc: "신뢰 vs 불신, 자율성 vs 수치심" },
  { icon: "📐", name: "비고츠키", desc: "근접발달영역 — 놀이를 통한 인지 성장" },
  { icon: "🌍", name: "WHO", desc: "세계보건기구 영유아 발달 가이드라인" },
  { icon: "🏥", name: "AAP", desc: "미국소아과학회 표준 발달 지표" },
  { icon: "📋", name: "K-DST", desc: "한국형 영유아 발달선별 검사 도구" },
  { icon: "🧭", name: "DDOK", desc: "D·O·K·T 통합 발달 나침반 프레임워크" },
];

const TheorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
            🧭 DDOK 발달 나침반
          </h2>
          <p className="text-muted-foreground">8가지 발달 이론을 통합한 추천 프레임워크</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {theories.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-card transition-shadow"
            >
              <div className="text-2xl mb-2">{t.icon}</div>
              <div className="font-semibold text-sm text-foreground mb-1">{t.name}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{t.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* DDOK Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            { key: "D", label: "Doing — 몸으로 하기", cls: "bg-indigo-100 text-indigo-800 border-indigo-200" },
            { key: "O", label: "Opening — 세상 열기", cls: "bg-emerald-100 text-emerald-800 border-emerald-200" },
            { key: "K", label: "Knowing — 나를 알기", cls: "bg-amber-100 text-amber-800 border-amber-200" },
            { key: "T", label: "Timing — 지금 이 순간", cls: "bg-pink-100 text-pink-800 border-pink-200" },
          ].map((tag) => (
            <span
              key={tag.key}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border ${tag.cls}`}
            >
              <span className="font-bold">{tag.key}</span> {tag.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheorySection;

import { motion } from "framer-motion";
import piaget from "@/assets/theorist-piaget.jpg";
import bowlby from "@/assets/theorist-bowlby.jpg";
import erikson from "@/assets/theorist-erikson.jpg";
import vygotsky from "@/assets/theorist-vygotsky.jpg";
import whoLogo from "@/assets/org-who.png";
import aapLogo from "@/assets/org-aap.png";
import kdstLogo from "@/assets/org-kdst.png";
import ddokLogo from "@/assets/org-ddok.png";

const theorists = [
  { img: piaget, name: "장 피아제", role: "발달심리학자 · 1896–1980", desc: "감각운동기 → 전조작기 인지 발달 단계 이론" },
  { img: bowlby, name: "존 볼비", role: "정신의학자 · 1907–1990", desc: "애착 이론 — 안전 기지 형성의 중요성" },
  { img: erikson, name: "에릭 에릭슨", role: "발달심리학자 · 1902–1994", desc: "신뢰 vs 불신, 자율성 vs 수치심" },
  { img: vygotsky, name: "레프 비고츠키", role: "심리학자 · 1896–1934", desc: "근접발달영역 — 놀이를 통한 인지 성장" },
];

const organizations = [
  { img: whoLogo, name: "WHO", full: "World Health Organization", desc: "세계보건기구 영유아 발달 가이드라인" },
  { img: aapLogo, name: "AAP", full: "American Academy of Pediatrics", desc: "미국소아과학회 표준 발달 지표" },
  { img: kdstLogo, name: "K-DST", full: "한국형 영유아 발달선별검사", desc: "보건복지부 공식 발달 검사 도구" },
  { img: ddokLogo, name: "DDOK", full: "Developmental Compass Framework", desc: "D·O·K·T 통합 발달 나침반" },
];

const ddokTags = [
  { key: "D", label: "Doing — 몸으로 하기", cls: "bg-indigo-50 text-indigo-900 border-indigo-200" },
  { key: "O", label: "Opening — 세상 열기", cls: "bg-emerald-50 text-emerald-900 border-emerald-200" },
  { key: "K", label: "Knowing — 나를 알기", cls: "bg-amber-50 text-amber-900 border-amber-200" },
  { key: "T", label: "Timing — 지금 이 순간", cls: "bg-pink-50 text-pink-900 border-pink-200" },
];

const TheorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
            EVIDENCE-BASED
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
            검증된 발달 이론에 근거합니다
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            세계적인 발달심리학자와 공인 기관의 가이드라인을 통합해 추천에 적용해요.
          </p>
        </div>

        {/* Theorists */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 text-center">
            Founding Theorists
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {theorists.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-5 text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary/10 ring-offset-2 ring-offset-card">
                  <img
                    src={t.img}
                    alt={`${t.name} 초상`}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <figcaption>
                  <div className="font-semibold text-foreground text-sm mb-0.5">{t.name}</div>
                  <div className="text-[10px] text-muted-foreground/80 mb-2 tracking-wide">{t.role}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Organizations */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 text-center">
            Reference Institutions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {organizations.map((o, i) => (
              <motion.div
                key={o.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-muted/40 rounded-xl">
                  <img
                    src={o.img}
                    alt={`${o.full} 로고`}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div className="font-display text-lg text-foreground mb-1">{o.name}</div>
                <div className="text-[10px] text-muted-foreground/80 mb-2 tracking-wide">{o.full}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DDOK Tags */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
            DDOK Framework
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {ddokTags.map((tag) => (
              <span
                key={tag.key}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${tag.cls}`}
              >
                <span className="font-bold">{tag.key}</span>
                <span className="opacity-80">{tag.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheorySection;

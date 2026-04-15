import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const stages = [
  { range: "0~3개월", title: "감각 깨어남기", theory: "피아제 감각운동기 1단계", desc: "흑백 대비에 반응하고, 청각에 민감해요. 모로 반사가 강하며 수유·수면 리듬을 잡아가는 시기예요.", items: ["흑백 모빌", "속싸개", "신생아 젖병"] },
  { range: "3~6개월", title: "사회 반응기", theory: "볼비 초기 애착 형성", desc: "사회적 미소가 나타나고 뒤집기를 시작해요. 손으로 물건을 잡으려 하고 옹알이가 활발해져요.", items: ["딸랑이", "헝겊책", "치발기"] },
  { range: "6~12개월", title: "탐색·애착기", theory: "대상영속성 획득", desc: "기고, 서고, 이유식을 시작해요. 낯가림이 나타나고 까꿍 놀이를 이해해요.", items: ["하이체어", "안전문", "소프트 블록"] },
  { range: "12~18개월", title: "첫 걸음·첫 말", theory: "에릭슨 자율성 시작", desc: "첫 걸음을 떼고 의미 있는 첫 단어를 말해요. 독립심이 싹트기 시작해요.", items: ["끼우기 퍼즐", "사운드북", "빨대컵"] },
  { range: "18~24개월", title: "언어 폭발기", theory: "비고츠키 근접발달영역", desc: "어휘가 급격히 늘고 두 단어 조합이 시작돼요. 자아 주장이 강해져요.", items: ["크레용 세트", "그림책", "역할 놀이 세트"] },
  { range: "24~36개월", title: "자아 주장기", theory: "에릭슨 자율성 vs 수치심", desc: "역할 놀이를 즐기고 감정 표현이 풍부해져요. 규칙을 이해하기 시작해요.", items: ["퍼즐", "블록 세트", "주니어 카시트"] },
];

const Guide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display text-foreground mb-3">📖 발달 가이드</h1>
          <p className="text-muted-foreground">각 단계별 발달 특징과 필요한 아이템을 알아보세요</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.range}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border-2 border-border rounded-2xl p-6 hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">{stage.range}</span>
                <h3 className="font-display text-lg text-foreground">{stage.title}</h3>
              </div>
              <p className="text-xs text-primary/70 font-medium mb-2">{stage.theory}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{stage.desc}</p>
              <div className="flex flex-wrap gap-2">
                {stage.items.map(item => (
                  <span key={item} className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Guide;

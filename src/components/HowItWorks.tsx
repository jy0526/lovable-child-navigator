import { motion } from "framer-motion";
import { Calendar, Target, CheckCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Calendar,
    title: "생년월일 입력",
    desc: "아이 생년월일만 입력하면 개월 수를 자동으로 계산해요. 회원가입 없이 바로 시작!",
  },
  {
    num: "02",
    icon: Target,
    title: "맞춤 추천 확인",
    desc: "지금 필요 / 곧 필요 / 아직 이른 것으로 나눠 타이밍에 맞는 추천을 보여줘요.",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "구매 & 체크",
    desc: "체크리스트로 구매 현황을 관리하세요. 완료·보류·생략으로 상태를 기록할 수 있어요.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
            어떻게 사용하나요?
          </h2>
          <p className="text-muted-foreground">30초 안에 우리 아이 맞춤 추천을 받아보세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="text-sm font-display text-primary/50 mb-4">{step.num}</div>
              <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-elegant mb-5 group-hover:scale-110 transition-transform">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

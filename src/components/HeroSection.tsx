import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-illustration.jpg";

const HeroSection = () => {
  const [birthday, setBirthday] = useState("");

  const handleSubmit = () => {
    if (birthday) {
      localStorage.setItem("ddok_child_birthday", birthday);
      window.location.href = "/recommend";
    }
  };

  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              WHO·AAP·K-DST 발달 이론 기반
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight text-foreground">
              지금 우리 아이에게
              <br />
              <span className="text-primary">딱 필요한 것만</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              아이 생년월일 하나로 발달 단계에 맞는 육아용품을 즉시 추천해드려요.
              수십 개의 SNS와 카페를 돌아다닐 필요 없어요.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm focus:border-primary focus:outline-none transition-colors w-full sm:w-auto"
              />
              <button
                onClick={handleSubmit}
                className="gradient-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-elegant hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                추천 받기 <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              생년월일은 이 기기에만 저장됩니다. 서버로 전송되지 않아요.
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { num: "72개", label: "추천 아이템" },
                { num: "6단계", label: "발달 구간" },
                { num: "8가지", label: "이론 근거" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-display text-primary">{stat.num}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            <img
              src={heroImg}
              alt="엄마와 아기 일러스트"
              className="w-full max-w-md rounded-3xl"
              width={800}
              height={800}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

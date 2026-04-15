export interface Product {
  id: string;
  icon: string;
  title: string;
  price: string;
  categoryMain: string;
  categorySub: string;
  ddok: string[];
  reason: string;
  minMonths: number;
  maxMonths: number | null;
}

export const PRODUCT_DB: Product[] = [
  { id:'p001', icon:'🎡', title:'흑백 모빌', price:'2~8만원', categoryMain:'자기·위생', categorySub:'장난감·완구', ddok:['O'], reason:'신생아 시각 발달 — 흑백 대비 자극', minMonths:0, maxMonths:4 },
  { id:'p002', icon:'👶', title:'속싸개 스와들업', price:'2~6만원', categoryMain:'자기·위생', categorySub:'속싸개·스와들', ddok:['K','T'], reason:'모로 반사 억제 — 수면의 질 향상', minMonths:0, maxMonths:4 },
  { id:'p003', icon:'💤', title:'수면 조명 자장가 기기', price:'3~10만원', categoryMain:'자기·위생', categorySub:'수면조명·자장가', ddok:['K'], reason:'수면 환경 조성 — 36개월까지 도움', minMonths:0, maxMonths:36 },
  { id:'p004', icon:'🦷', title:'아기 무불소 치약 칫솔 세트', price:'1~3만원', categoryMain:'자기·위생', categorySub:'베이비케어', ddok:['T'], reason:'첫 치아 맹출 전부터 구강 습관 형성', minMonths:0, maxMonths:6 },
  { id:'p005', icon:'🛁', title:'아기 목욕 의자', price:'2~8만원', categoryMain:'자기·위생', categorySub:'베이비케어', ddok:['T'], reason:'안전한 목욕 자세 유지', minMonths:0, maxMonths:null },
  { id:'p006', icon:'🧴', title:'아기 선크림', price:'1~3만원', categoryMain:'자기·위생', categorySub:'스킨케어', ddok:['T'], reason:'AAP 기준 6개월 이후 자외선 차단 권장', minMonths:6, maxMonths:null },
  { id:'p007', icon:'🛏️', title:'신생아 바구니 침대', price:'5~20만원', categoryMain:'자기·위생', categorySub:'신생아침대·범퍼침대', ddok:['T'], reason:'신생아 안전 수면 환경 구성', minMonths:0, maxMonths:6 },
  { id:'p008', icon:'🛡️', title:'범퍼 침대', price:'3~15만원', categoryMain:'자기·위생', categorySub:'신생아침대·범퍼침대', ddok:['T'], reason:'뒤집기 시작 후 낙상 방지', minMonths:0, maxMonths:24 },
  { id:'p009', icon:'🍼', title:'신생아 젖병 세트', price:'2~8만원', categoryMain:'먹기', categorySub:'수유용품', ddok:['T'], reason:'수유 시작부터 18개월까지 기본 식기', minMonths:0, maxMonths:18 },
  { id:'p010', icon:'🤱', title:'전동 유축기', price:'10~30만원', categoryMain:'먹기', categorySub:'수유용품', ddok:['T'], reason:'모유 수유 지속을 위한 핵심 도구', minMonths:0, maxMonths:12 },
  { id:'p011', icon:'🥣', title:'이유식기 이유식통 세트', price:'2~6만원', categoryMain:'먹기', categorySub:'이유식·식기', ddok:['D','T'], reason:'이유식 시작(4~6개월) 필수 준비물', minMonths:4, maxMonths:null },
  { id:'p012', icon:'🥄', title:'흡착식판 아기 식판', price:'1~4만원', categoryMain:'먹기', categorySub:'이유식·식기', ddok:['D'], reason:'자기 주도 이유식 — 소근육 발달 촉진', minMonths:6, maxMonths:null },
  { id:'p013', icon:'🍼', title:'이유식 마스터기', price:'5~20만원', categoryMain:'먹기', categorySub:'이유식·식기', ddok:['T'], reason:'이유식 시작 시기 필수 조리도구', minMonths:4, maxMonths:null },
  { id:'p014', icon:'🛏️', title:'다기능 하이체어', price:'15~40만원', categoryMain:'먹기', categorySub:'이유식·식기', ddok:['D','T'], reason:'앉기 근육 발달 + 이유식 타이밍', minMonths:6, maxMonths:null },
  { id:'p015', icon:'🥤', title:'빨대컵 스파우트컵', price:'1~3만원', categoryMain:'먹기', categorySub:'이유식·식기', ddok:['D','O'], reason:'입술·혀 근육 발달 + 독립 식사 연습', minMonths:6, maxMonths:24 },
  { id:'p016', icon:'🎀', title:'딸랑이 래틀 장난감', price:'1~3만원', categoryMain:'놀기·배우기', categorySub:'장난감·완구', ddok:['O'], reason:'청각·소근육 발달 — 볼비 애착 자극', minMonths:0, maxMonths:6 },
  { id:'p017', icon:'🧸', title:'소프트 블록 세트', price:'3~10만원', categoryMain:'놀기·배우기', categorySub:'장난감·완구', ddok:['D','O'], reason:'공간 인지·소근육 — 쌓기+무너뜨리기', minMonths:6, maxMonths:36 },
  { id:'p018', icon:'📖', title:'초점책 흑백 그림책', price:'1~3만원', categoryMain:'놀기·배우기', categorySub:'도서·교구', ddok:['O'], reason:'시각 발달 — 흑백 대비 20cm 초점 거리', minMonths:0, maxMonths:3 },
  { id:'p019', icon:'📚', title:'헝겊책 촉감책', price:'1~4만원', categoryMain:'놀기·배우기', categorySub:'도서·교구', ddok:['O','K'], reason:'촉각·시각 통합 탐색 — 안전한 입 탐색', minMonths:3, maxMonths:12 },
  { id:'p020', icon:'🎵', title:'사운드북', price:'1~3만원', categoryMain:'놀기·배우기', categorySub:'도서·교구', ddok:['O'], reason:'청각 자극 + 인과관계 학습', minMonths:6, maxMonths:24 },
  { id:'p021', icon:'🧩', title:'끼우기 퍼즐', price:'2~5만원', categoryMain:'놀기·배우기', categorySub:'장난감·완구', ddok:['D','O'], reason:'형태 인지·소근육 — 전조작기 사고 전환', minMonths:12, maxMonths:null },
  { id:'p022', icon:'🖍️', title:'크레용 물감 세트', price:'1~3만원', categoryMain:'놀기·배우기', categorySub:'장난감·완구', ddok:['D','O','K'], reason:'창의 표현 — 소근육+자기 인식 발달', minMonths:18, maxMonths:null },
  { id:'p023', icon:'🚗', title:'카시트 (신생아)', price:'15~50만원', categoryMain:'외출·안전', categorySub:'카시트', ddok:['T'], reason:'출생 직후부터 법적 의무 — 안전 필수', minMonths:0, maxMonths:15 },
  { id:'p024', icon:'👶', title:'아기띠 캐리어', price:'5~20만원', categoryMain:'외출·안전', categorySub:'아기띠·캐리어', ddok:['K','T'], reason:'볼비 애착 — 피부 접촉 + 안전 이동', minMonths:0, maxMonths:24 },
  { id:'p025', icon:'🚶', title:'유모차', price:'20~80만원', categoryMain:'외출·안전', categorySub:'유모차', ddok:['T'], reason:'외출 필수 — 연령별 적합 유모차 선택', minMonths:0, maxMonths:null },
  { id:'p026', icon:'🚪', title:'안전문 (계단·주방)', price:'5~15만원', categoryMain:'외출·안전', categorySub:'안전용품', ddok:['D','T'], reason:'기기·걸음마 시작 후 낙상·화상 방지', minMonths:6, maxMonths:36 },
];

export function getStageLabel(months: number): string {
  if (months < 3)  return "감각 깨어남기";
  if (months < 6)  return "사회 반응기";
  if (months < 12) return "탐색·애착기";
  if (months < 18) return "첫 걸음·첫 말";
  if (months < 24) return "언어 폭발기";
  if (months < 36) return "자아 주장기";
  return "사회성 발달기";
}

export function calculateMonths(birthDate: Date): number {
  return Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
}

export function getRelevantProducts(months: number | null): Product[] {
  if (months === null) return PRODUCT_DB;
  return PRODUCT_DB.filter(p => {
    if (months < p.minMonths) return false;
    if (p.maxMonths !== null && months >= p.maxMonths) return false;
    return true;
  });
}

export const categories = [
  { icon: "🛏️", name: "자기·위생", desc: "수면, 목욕, 스킨케어, 위생용품", color: "from-violet-500/10 to-purple-500/10" },
  { icon: "🍼", name: "먹기", desc: "수유, 이유식, 식기, 간식", color: "from-pink-500/10 to-rose-500/10" },
  { icon: "🧸", name: "놀기·배우기", desc: "장난감, 도서, 교구, 매트", color: "from-amber-500/10 to-orange-500/10" },
  { icon: "🚗", name: "외출·안전", desc: "유모차, 카시트, 안전용품", color: "from-emerald-500/10 to-teal-500/10" },
];

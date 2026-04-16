export interface Product {
  id: string;
  icon: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  priceLabel: string;
  category: ProductCategory;
  subCategory: string;
  ddok: string[];
  reason: string;
  features: string[];
  minMonths: number;
  maxMonths: number | null;
  rating: number;
  reviewCount: number;
  productUrl?: string;
  imageUrl?: string;
}

export type ProductCategory = "수유" | "수면" | "위생" | "외출" | "놀이/발달" | "의류";

export const CATEGORY_META: Record<ProductCategory, { icon: string; color: string; desc: string }> = {
  "수유":      { icon: "🍼", color: "from-pink-500/10 to-rose-500/10",    desc: "젖병, 유축기, 이유식, 식기" },
  "수면":      { icon: "🛏️", color: "from-indigo-500/10 to-violet-500/10", desc: "침대, 수면등, 속싸개, 이불" },
  "위생":      { icon: "🛁", color: "from-cyan-500/10 to-teal-500/10",     desc: "목욕, 스킨케어, 구강, 기저귀" },
  "외출":      { icon: "🚗", color: "from-emerald-500/10 to-green-500/10", desc: "유모차, 카시트, 아기띠, 안전" },
  "놀이/발달": { icon: "🧸", color: "from-amber-500/10 to-orange-500/10",  desc: "장난감, 교구, 도서, 매트" },
  "의류":      { icon: "👕", color: "from-purple-500/10 to-fuchsia-500/10", desc: "배냇저고리, 외출복, 신발" },
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_META) as ProductCategory[];

export const PRODUCT_DB: Product[] = [
  // ── 수유 ──
  { id:"p001", icon:"🍼", title:"신생아 젖병 세트", brand:"닥터브라운", price:35000, originalPrice:45000, priceLabel:"3.5만원", category:"수유", subCategory:"젖병", ddok:["T"], reason:"수유 시작부터 18개월까지 기본 식기", features:["BPA-free","내열유리","역류방지"], minMonths:0, maxMonths:18, rating:4.7, reviewCount:320 },
  { id:"p002", icon:"🤱", title:"전동 유축기", brand:"메델라", price:180000, originalPrice:250000, priceLabel:"18만원", category:"수유", subCategory:"유축기", ddok:["T"], reason:"모유 수유 지속을 위한 핵심 도구", features:["조용한 모터","2단계 리듬","휴대용"], minMonths:0, maxMonths:12, rating:4.8, reviewCount:215 },
  { id:"p003", icon:"🥣", title:"이유식기 세트", brand:"옥소토트", price:28000, priceLabel:"2.8만원", category:"수유", subCategory:"이유식 식기", ddok:["D","T"], reason:"이유식 시작(4~6개월) 필수 준비물", features:["BPA-free","전자레인지 가능","흡착 바닥"], minMonths:4, maxMonths:null, rating:4.5, reviewCount:180 },
  { id:"p004", icon:"🥄", title:"흡착식판", brand:"이지피지", price:22000, priceLabel:"2.2만원", category:"수유", subCategory:"이유식 식기", ddok:["D"], reason:"자기 주도 이유식 — 소근육 발달 촉진", features:["실리콘 흡착","식기세척기 가능","나눔칸"], minMonths:6, maxMonths:null, rating:4.6, reviewCount:290 },
  { id:"p005", icon:"🍼", title:"이유식 마스터기", brand:"베이비무브", price:120000, originalPrice:150000, priceLabel:"12만원", category:"수유", subCategory:"이유식 조리", ddok:["T"], reason:"이유식 시작 시기 필수 조리도구", features:["찜+블렌딩","타이머","해동 기능"], minMonths:4, maxMonths:null, rating:4.4, reviewCount:155 },
  { id:"p006", icon:"🪑", title:"다기능 하이체어", brand:"스토게", price:350000, originalPrice:420000, priceLabel:"35만원", category:"수유", subCategory:"하이체어", ddok:["D","T"], reason:"앉기 근육 발달 + 이유식 타이밍", features:["성장형","5점식 안전벨트","쉬운 세척"], minMonths:6, maxMonths:null, rating:4.7, reviewCount:410 },
  { id:"p007", icon:"🥤", title:"빨대컵 스파우트컵", brand:"누비", price:12000, priceLabel:"1.2만원", category:"수유", subCategory:"컵", ddok:["D","O"], reason:"입술·혀 근육 발달 + 독립 식사 연습", features:["누출 방지","양손 손잡이","단계별"], minMonths:6, maxMonths:24, rating:4.3, reviewCount:200 },
  { id:"p008", icon:"🧊", title:"모유 저장팩", brand:"란시노", price:15000, priceLabel:"1.5만원", category:"수유", subCategory:"수유용품", ddok:["T"], reason:"모유 보관 및 냉동 필수", features:["이중지퍼","눈금표시","BPA-free"], minMonths:0, maxMonths:12, rating:4.5, reviewCount:340 },
  { id:"p009", icon:"🫗", title:"분유포트", brand:"브레짜", price:85000, originalPrice:110000, priceLabel:"8.5만원", category:"수유", subCategory:"수유용품", ddok:["T"], reason:"정확한 온도로 빠른 분유 조유", features:["자동 온도조절","야간수유 편리","원터치"], minMonths:0, maxMonths:12, rating:4.6, reviewCount:175 },
  { id:"p010", icon:"🫙", title:"이유식 소분 용기", brand:"글라스락", price:18000, priceLabel:"1.8만원", category:"수유", subCategory:"이유식 보관", ddok:["T"], reason:"이유식 냉동 보관 필수", features:["내열유리","밀폐뚜껑","전자레인지OK"], minMonths:4, maxMonths:24, rating:4.4, reviewCount:260 },
  { id:"p011", icon:"🥛", title:"젖병 소독기", brand:"필립스아벤트", price:65000, originalPrice:85000, priceLabel:"6.5만원", category:"수유", subCategory:"소독", ddok:["T"], reason:"수유용품 위생 관리 필수", features:["UV살균","건조기능","대용량"], minMonths:0, maxMonths:24, rating:4.7, reviewCount:380 },
  { id:"p012", icon:"🍪", title:"아기 간식 세트", brand:"베베쿡", price:25000, priceLabel:"2.5만원", category:"수유", subCategory:"간식", ddok:["D","T"], reason:"자기 주도 간식으로 소근육 연습", features:["무첨가","유기농","개별포장"], minMonths:6, maxMonths:null, rating:4.3, reviewCount:520 },

  // ── 수면 ──
  { id:"p013", icon:"🛏️", title:"신생아 바구니 침대", brand:"도나바이에스", price:120000, originalPrice:150000, priceLabel:"12만원", category:"수면", subCategory:"침대", ddok:["T"], reason:"신생아 안전 수면 환경 구성", features:["통기성 매트","이동식","각도조절"], minMonths:0, maxMonths:6, rating:4.6, reviewCount:190 },
  { id:"p014", icon:"🛡️", title:"범퍼 침대", brand:"도노도노", price:89000, priceLabel:"8.9만원", category:"수면", subCategory:"침대", ddok:["T"], reason:"뒤집기 시작 후 낙상 방지", features:["360도 보호","세탁가능","접이식"], minMonths:0, maxMonths:24, rating:4.5, reviewCount:310 },
  { id:"p015", icon:"👶", title:"속싸개 스와들업", brand:"러브투드림", price:32000, priceLabel:"3.2만원", category:"수면", subCategory:"속싸개", ddok:["K","T"], reason:"모로 반사 억제 — 수면의 질 향상", features:["양방향 지퍼","유기농면","단계별"], minMonths:0, maxMonths:4, rating:4.8, reviewCount:450 },
  { id:"p016", icon:"💤", title:"수면 조명 자장가 기기", brand:"해치베이비", price:55000, priceLabel:"5.5만원", category:"수면", subCategory:"수면등", ddok:["K"], reason:"수면 환경 조성 — 36개월까지 도움", features:["앱 연동","백색소음","밝기조절"], minMonths:0, maxMonths:36, rating:4.7, reviewCount:280 },
  { id:"p017", icon:"🌙", title:"아기 이불 세트", brand:"에르고포우치", price:68000, originalPrice:85000, priceLabel:"6.8만원", category:"수면", subCategory:"이불", ddok:["T"], reason:"계절별 적정 온도 유지", features:["TOG 기준","오가닉면","통기성"], minMonths:0, maxMonths:36, rating:4.5, reviewCount:220 },
  { id:"p018", icon:"🧸", title:"수면 인형", brand:"클라우드비", price:35000, priceLabel:"3.5만원", category:"수면", subCategory:"수면보조", ddok:["K"], reason:"애착 형성 도우미 — 안정된 수면", features:["심장소리","자동꺼짐","세탁가능"], minMonths:3, maxMonths:36, rating:4.4, reviewCount:165 },
  { id:"p019", icon:"🛌", title:"아기 매트리스", brand:"쁘레베베", price:95000, priceLabel:"9.5만원", category:"수면", subCategory:"침대", ddok:["T"], reason:"척추 발달에 맞는 적정 경도", features:["항균코팅","통기성","방수커버"], minMonths:0, maxMonths:36, rating:4.6, reviewCount:175 },

  // ── 위생 ──
  { id:"p020", icon:"🛁", title:"아기 목욕 의자", brand:"스토게", price:45000, priceLabel:"4.5만원", category:"위생", subCategory:"목욕", ddok:["T"], reason:"안전한 목욕 자세 유지", features:["미끄럼방지","접이식","배수구"], minMonths:0, maxMonths:null, rating:4.5, reviewCount:245 },
  { id:"p021", icon:"🦷", title:"무불소 치약 칫솔 세트", brand:"조르단", price:12000, priceLabel:"1.2만원", category:"위생", subCategory:"구강", ddok:["T"], reason:"첫 치아 맹출 전부터 구강 습관 형성", features:["무불소","부드러운 모","삼킴 안전"], minMonths:0, maxMonths:6, rating:4.3, reviewCount:310 },
  { id:"p022", icon:"🧴", title:"아기 선크림", brand:"이글립스베이비", price:18000, priceLabel:"1.8만원", category:"위생", subCategory:"스킨케어", ddok:["T"], reason:"AAP 기준 6개월 이후 자외선 차단 권장", features:["물리적차단","무향","SPF50+"], minMonths:6, maxMonths:null, rating:4.4, reviewCount:280 },
  { id:"p023", icon:"🧷", title:"기저귀 세트", brand:"하기스", price:25000, priceLabel:"2.5만원", category:"위생", subCategory:"기저귀", ddok:["T"], reason:"생후 바로 필요한 위생 필수품", features:["통기성","누출방지","피부보호"], minMonths:0, maxMonths:36, rating:4.6, reviewCount:890 },
  { id:"p024", icon:"🧹", title:"젖병 세척 세트", brand:"닥터브라운", price:15000, priceLabel:"1.5만원", category:"위생", subCategory:"세정", ddok:["T"], reason:"수유용품 위생 관리", features:["실리콘브러시","전용세정제","꼭지브러시"], minMonths:0, maxMonths:24, rating:4.5, reviewCount:210 },
  { id:"p025", icon:"🌡️", title:"비접촉 체온계", brand:"브라운", price:45000, originalPrice:55000, priceLabel:"4.5만원", category:"위생", subCategory:"건강", ddok:["T"], reason:"아이 건강 모니터링 필수품", features:["1초측정","비접촉","메모리"], minMonths:0, maxMonths:null, rating:4.7, reviewCount:430 },
  { id:"p026", icon:"💧", title:"아기 로션 세트", brand:"아토팜", price:28000, priceLabel:"2.8만원", category:"위생", subCategory:"스킨케어", ddok:["T"], reason:"신생아 피부 보습 관리", features:["무향","MLE크림","알러지테스트"], minMonths:0, maxMonths:null, rating:4.8, reviewCount:650 },
  { id:"p027", icon:"💨", title:"코 흡입기", brand:"노즈프리다", price:22000, priceLabel:"2.2만원", category:"위생", subCategory:"건강", ddok:["T"], reason:"영유아 비강 관리 필수", features:["의료기기인증","위생필터","간편세척"], minMonths:0, maxMonths:36, rating:4.4, reviewCount:340 },
  { id:"p028", icon:"🧼", title:"아기 세탁세제", brand:"유한킴벌리", price:15000, priceLabel:"1.5만원", category:"위생", subCategory:"세정", ddok:["T"], reason:"아기 옷 전용 저자극 세탁", features:["천연성분","무형광","섬유유연"], minMonths:0, maxMonths:null, rating:4.5, reviewCount:470 },

  // ── 외출 ──
  { id:"p029", icon:"🚗", title:"카시트 (신생아)", brand:"맥시코시", price:350000, originalPrice:450000, priceLabel:"35만원", category:"외출", subCategory:"카시트", ddok:["T"], reason:"출생 직후부터 법적 의무 — 안전 필수", features:["ISOFIX","신생아인서트","360회전"], minMonths:0, maxMonths:15, rating:4.8, reviewCount:310 },
  { id:"p030", icon:"👶", title:"아기띠 캐리어", brand:"에르고베이비", price:160000, originalPrice:200000, priceLabel:"16만원", category:"외출", subCategory:"아기띠", ddok:["K","T"], reason:"볼비 애착 — 피부 접촉 + 안전 이동", features:["요추서포트","신생아부터","4가지포지션"], minMonths:0, maxMonths:24, rating:4.7, reviewCount:520 },
  { id:"p031", icon:"🚶", title:"유모차", brand:"부가부", price:650000, originalPrice:800000, priceLabel:"65만원", category:"외출", subCategory:"유모차", ddok:["T"], reason:"외출 필수 — 연령별 적합 유모차 선택", features:["양대면","원핸드폴딩","서스펜션"], minMonths:0, maxMonths:null, rating:4.6, reviewCount:380 },
  { id:"p032", icon:"🚪", title:"안전문 (계단·주방)", brand:"에버랜드", price:55000, priceLabel:"5.5만원", category:"외출", subCategory:"안전용품", ddok:["D","T"], reason:"기기·걸음마 시작 후 낙상·화상 방지", features:["양방향개폐","자동잠금","확장가능"], minMonths:6, maxMonths:36, rating:4.5, reviewCount:290 },
  { id:"p033", icon:"🎒", title:"기저귀 가방", brand:"스킵합", price:65000, priceLabel:"6.5만원", category:"외출", subCategory:"외출용품", ddok:["T"], reason:"외출 시 육아용품 수납 필수", features:["방수","보온포켓","유모차걸이"], minMonths:0, maxMonths:36, rating:4.4, reviewCount:240 },
  { id:"p034", icon:"☀️", title:"유모차 햇빛 가리개", brand:"맨하탄토이", price:25000, priceLabel:"2.5만원", category:"외출", subCategory:"외출용품", ddok:["T"], reason:"자외선으로부터 아이 보호", features:["UV차단","통풍","유니버설핏"], minMonths:0, maxMonths:36, rating:4.3, reviewCount:170 },
  { id:"p035", icon:"🧳", title:"접이식 휴대 욕조", brand:"스토게", price:35000, priceLabel:"3.5만원", category:"외출", subCategory:"외출용품", ddok:["T"], reason:"여행·외출 시 아기 목욕 해결", features:["접이식","배수마개","미끄럼방지"], minMonths:0, maxMonths:24, rating:4.2, reviewCount:130 },
  { id:"p036", icon:"🦺", title:"보행기 안전조끼", brand:"졸리점퍼", price:28000, priceLabel:"2.8만원", category:"외출", subCategory:"안전용품", ddok:["D","T"], reason:"첫 걸음마 안전 보조", features:["탈착식끈","통기성","사이즈조절"], minMonths:9, maxMonths:18, rating:4.3, reviewCount:95 },

  // ── 놀이/발달 ──
  { id:"p037", icon:"🎡", title:"흑백 모빌", brand:"타이니러브", price:35000, priceLabel:"3.5만원", category:"놀이/발달", subCategory:"모빌", ddok:["O"], reason:"신생아 시각 발달 — 흑백 대비 자극", features:["자동회전","음악","흑백+컬러"], minMonths:0, maxMonths:4, rating:4.6, reviewCount:280 },
  { id:"p038", icon:"🎀", title:"딸랑이 래틀", brand:"사시", price:12000, priceLabel:"1.2만원", category:"놀이/발달", subCategory:"장난감", ddok:["O"], reason:"청각·소근육 발달 — 볼비 애착 자극", features:["안전소재","소리자극","잡기연습"], minMonths:0, maxMonths:6, rating:4.4, reviewCount:350 },
  { id:"p039", icon:"📖", title:"초점책 흑백 그림책", brand:"보림출판", price:15000, priceLabel:"1.5만원", category:"놀이/발달", subCategory:"도서", ddok:["O"], reason:"시각 발달 — 흑백 대비 20cm 초점 거리", features:["병풍형","세워두기","고대비"], minMonths:0, maxMonths:3, rating:4.5, reviewCount:420 },
  { id:"p040", icon:"📚", title:"헝겊책 촉감책", brand:"퍼니키즈", price:18000, priceLabel:"1.8만원", category:"놀이/발달", subCategory:"도서", ddok:["O","K"], reason:"촉각·시각 통합 탐색 — 안전한 입 탐색", features:["다양한질감","바스락소리","세탁가능"], minMonths:3, maxMonths:12, rating:4.3, reviewCount:190 },
  { id:"p041", icon:"🎵", title:"사운드북", brand:"블루래빗", price:15000, priceLabel:"1.5만원", category:"놀이/발달", subCategory:"도서", ddok:["O"], reason:"청각 자극 + 인과관계 학습", features:["버튼식","동요수록","그림연동"], minMonths:6, maxMonths:24, rating:4.4, reviewCount:530 },
  { id:"p042", icon:"🧸", title:"소프트 블록 세트", brand:"비키즈", price:35000, priceLabel:"3.5만원", category:"놀이/발달", subCategory:"장난감", ddok:["D","O"], reason:"공간 인지·소근육 — 쌓기+무너뜨리기", features:["안전EVA","숫자인쇄","12조각"], minMonths:6, maxMonths:36, rating:4.5, reviewCount:275 },
  { id:"p043", icon:"🧩", title:"끼우기 퍼즐", brand:"멜리사앤더그", price:25000, priceLabel:"2.5만원", category:"놀이/발달", subCategory:"교구", ddok:["D","O"], reason:"형태 인지·소근육 — 전조작기 사고 전환", features:["원목","큰조각","손잡이"], minMonths:12, maxMonths:null, rating:4.6, reviewCount:310 },
  { id:"p044", icon:"🖍️", title:"크레용 물감 세트", brand:"짐보리", price:18000, priceLabel:"1.8만원", category:"놀이/발달", subCategory:"미술", ddok:["D","O","K"], reason:"창의 표현 — 소근육+자기 인식 발달", features:["무독성","세척가능","두꺼운그립"], minMonths:18, maxMonths:null, rating:4.3, reviewCount:180 },
  { id:"p045", icon:"🏊", title:"플레이 매트", brand:"알집", price:150000, originalPrice:190000, priceLabel:"15만원", category:"놀이/발달", subCategory:"매트", ddok:["D","T"], reason:"안전한 놀이 공간 + 층간소음 방지", features:["PVC무독성","두꺼움4cm","양면디자인"], minMonths:0, maxMonths:null, rating:4.7, reviewCount:680 },
  { id:"p046", icon:"🎹", title:"아기 피아노 짐", brand:"피셔프라이스", price:45000, priceLabel:"4.5만원", category:"놀이/발달", subCategory:"장난감", ddok:["D","O"], reason:"대근육+청각 자극 복합 놀이", features:["4가지모드","세탁가능매트","거울포함"], minMonths:0, maxMonths:12, rating:4.7, reviewCount:520 },
  { id:"p047", icon:"🎨", title:"물감 놀이 세트", brand:"크레욜라", price:22000, priceLabel:"2.2만원", category:"놀이/발달", subCategory:"미술", ddok:["D","O","K"], reason:"감각 통합 놀이 — 창의력 발달", features:["핑거페인트","무독성","6색"], minMonths:18, maxMonths:null, rating:4.2, reviewCount:140 },
  { id:"p048", icon:"🔢", title:"숫자 자석 보드", brand:"멜리사앤더그", price:28000, priceLabel:"2.8만원", category:"놀이/발달", subCategory:"교구", ddok:["O"], reason:"수 개념 학습 — 인지 발달 촉진", features:["자석부착","양면보드","수납함"], minMonths:24, maxMonths:null, rating:4.4, reviewCount:165 },

  // ── 의류 ──
  { id:"p049", icon:"👕", title:"배냇저고리 세트", brand:"모모래빗", price:25000, priceLabel:"2.5만원", category:"의류", subCategory:"신생아복", ddok:["T"], reason:"신생아 체온 조절 + 피부 보호", features:["오가닉면","무봉제","리본끈"], minMonths:0, maxMonths:3, rating:4.7, reviewCount:380 },
  { id:"p050", icon:"🧦", title:"아기 양말 세트", brand:"해피프라이스", price:12000, priceLabel:"1.2만원", category:"의류", subCategory:"양말/모자", ddok:["T"], reason:"체온 유지 필수 아이템", features:["미끄럼방지","면100%","5켤레"], minMonths:0, maxMonths:24, rating:4.3, reviewCount:290 },
  { id:"p051", icon:"🧤", title:"손싸개 발싸개 세트", brand:"앙뚜아네뜨", price:10000, priceLabel:"1만원", category:"의류", subCategory:"신생아복", ddok:["T"], reason:"신생아 얼굴 긁힘 방지", features:["순면","통기성","탄력밴드"], minMonths:0, maxMonths:3, rating:4.4, reviewCount:210 },
  { id:"p052", icon:"🧥", title:"아기 외출복 세트", brand:"카터스", price:35000, priceLabel:"3.5만원", category:"의류", subCategory:"외출복", ddok:["T"], reason:"외출 시 적정 체온 유지", features:["사계절","입히기편한","스냅단추"], minMonths:3, maxMonths:24, rating:4.5, reviewCount:340 },
  { id:"p053", icon:"🩱", title:"아기 수영복", brand:"스플래시어바웃", price:28000, priceLabel:"2.8만원", category:"의류", subCategory:"수영복", ddok:["D","T"], reason:"수중 놀이 — 대근육 발달 촉진", features:["UV차단","기저귀내장","속건"], minMonths:6, maxMonths:36, rating:4.3, reviewCount:120 },
  { id:"p054", icon:"👟", title:"아기 첫 걸음마 신발", brand:"뉴발란스키즈", price:42000, priceLabel:"4.2만원", category:"의류", subCategory:"신발", ddok:["D"], reason:"첫 걸음마 시기 발 발달 보호", features:["발볼넓음","미끄럼방지","유연한바닥"], minMonths:9, maxMonths:24, rating:4.6, reviewCount:410 },
  { id:"p055", icon:"🎩", title:"아기 모자 세트", brand:"가비", price:15000, priceLabel:"1.5만원", category:"의류", subCategory:"양말/모자", ddok:["T"], reason:"자외선 차단 + 체온 조절", features:["UV차단","턱끈","통기성"], minMonths:0, maxMonths:36, rating:4.4, reviewCount:250 },
  { id:"p056", icon:"🧸", title:"우주복 바디수트", brand:"H&M베이비", price:18000, priceLabel:"1.8만원", category:"의류", subCategory:"실내복", ddok:["T"], reason:"실내 활동복 — 기저귀 교체 편리", features:["스냅단추","면100%","3장세트"], minMonths:0, maxMonths:12, rating:4.5, reviewCount:560 },
  { id:"p057", icon:"🧣", title:"겨울 방한 세트", brand:"노스페이스키즈", price:55000, originalPrice:70000, priceLabel:"5.5만원", category:"의류", subCategory:"방한", ddok:["T"], reason:"겨울철 외출 시 보온 필수", features:["패딩소재","모자+장갑+목도리","방풍"], minMonths:6, maxMonths:36, rating:4.5, reviewCount:185 },

  // Additional products to reach ~72
  { id:"p058", icon:"🪥", title:"실리콘 칫솔 세트", brand:"닥터에스", price:15000, priceLabel:"1.5만원", category:"위생", subCategory:"구강", ddok:["D","T"], reason:"이가 나기 시작할 때 구강 관리", features:["실리콘모","손가락형","케이스"], minMonths:4, maxMonths:24, rating:4.4, reviewCount:220 },
  { id:"p059", icon:"🚿", title:"아기 샤워기 헤드", brand:"바스맘", price:25000, priceLabel:"2.5만원", category:"위생", subCategory:"목욕", ddok:["T"], reason:"부드러운 수압으로 안전한 목욕", features:["수압조절","필터내장","원터치"], minMonths:0, maxMonths:null, rating:4.3, reviewCount:150 },
  { id:"p060", icon:"🏋️", title:"러닝바이크", brand:"스트라이더", price:95000, priceLabel:"9.5만원", category:"놀이/발달", subCategory:"탈것", ddok:["D"], reason:"균형감각 + 대근육 발달", features:["가벼움","높이조절","페달없음"], minMonths:18, maxMonths:null, rating:4.7, reviewCount:340 },
  { id:"p061", icon:"🎠", title:"점프루 활동센터", brand:"피셔프라이스", price:85000, originalPrice:110000, priceLabel:"8.5만원", category:"놀이/발달", subCategory:"장난감", ddok:["D","O"], reason:"360도 회전 놀이 — 대근육 강화", features:["높이조절","장난감부착","안전시트"], minMonths:4, maxMonths:12, rating:4.5, reviewCount:230 },
  { id:"p062", icon:"📷", title:"베이비 모니터", brand:"유핏", price:120000, originalPrice:150000, priceLabel:"12만원", category:"수면", subCategory:"모니터", ddok:["T"], reason:"수면 중 안전 모니터링", features:["야간카메라","양방향음성","온도감지"], minMonths:0, maxMonths:36, rating:4.6, reviewCount:290 },
  { id:"p063", icon:"🧴", title:"아기 바디워시", brand:"아베노", price:18000, priceLabel:"1.8만원", category:"위생", subCategory:"스킨케어", ddok:["T"], reason:"민감한 아기 피부 전용 세정", features:["무향","저자극pH","오트밀성분"], minMonths:0, maxMonths:null, rating:4.6, reviewCount:480 },
  { id:"p064", icon:"🪑", title:"부스터 시트", brand:"치코", price:45000, priceLabel:"4.5만원", category:"수유", subCategory:"하이체어", ddok:["D","T"], reason:"의자에 부착하는 간편 식사 시트", features:["접이식","3점벨트","식판포함"], minMonths:6, maxMonths:36, rating:4.4, reviewCount:185 },
  { id:"p065", icon:"🧊", title:"치발기 세트", brand:"소피지라프", price:22000, priceLabel:"2.2만원", category:"놀이/발달", subCategory:"장난감", ddok:["O","T"], reason:"이앓이 완화 + 구강 감각 발달", features:["천연고무","냉장보관","BPA-free"], minMonths:3, maxMonths:12, rating:4.7, reviewCount:620 },
  { id:"p066", icon:"🎪", title:"볼풀 텐트", brand:"이케아", price:35000, priceLabel:"3.5만원", category:"놀이/발달", subCategory:"놀이공간", ddok:["D","O"], reason:"공간 인지 + 전신 운동 놀이", features:["볼100개포함","접이식","메쉬창"], minMonths:12, maxMonths:null, rating:4.3, reviewCount:290 },
  { id:"p067", icon:"🧲", title:"자석 블록 세트", brand:"마그포머스", price:65000, originalPrice:80000, priceLabel:"6.5만원", category:"놀이/발달", subCategory:"교구", ddok:["D","O"], reason:"3D 공간 사고력 + 창의력 발달", features:["자석연결","다양한형태","수납박스"], minMonths:18, maxMonths:null, rating:4.8, reviewCount:450 },
  { id:"p068", icon:"🧷", title:"턱받이 세트", brand:"아덴아나이스", price:18000, priceLabel:"1.8만원", category:"의류", subCategory:"턱받이", ddok:["T"], reason:"침흘림·이유식 시기 위생 관리", features:["방수코팅","스냅단추","4장세트"], minMonths:0, maxMonths:24, rating:4.5, reviewCount:380 },
  { id:"p069", icon:"🛒", title:"유모차 정리함", brand:"스킵합", price:20000, priceLabel:"2만원", category:"외출", subCategory:"외출용품", ddok:["T"], reason:"외출 시 소지품 정리 필수", features:["유니버설핏","보온포켓","컵홀더"], minMonths:0, maxMonths:null, rating:4.2, reviewCount:160 },
  { id:"p070", icon:"🏠", title:"아기 안전 코너 가드", brand:"세이프티퍼스트", price:12000, priceLabel:"1.2만원", category:"외출", subCategory:"안전용품", ddok:["T"], reason:"가구 모서리 충돌 방지", features:["투명","양면테이프","12개입"], minMonths:6, maxMonths:null, rating:4.3, reviewCount:340 },
  { id:"p071", icon:"🔌", title:"콘센트 안전 커버", brand:"세이프티퍼스트", price:8000, priceLabel:"0.8만원", category:"외출", subCategory:"안전용품", ddok:["T"], reason:"감전 사고 예방 필수", features:["끼움식","12개입","투명"], minMonths:6, maxMonths:null, rating:4.5, reviewCount:410 },
  { id:"p072", icon:"📱", title:"아기 발달 놀이 앱카드", brand:"핑크퐁", price:15000, priceLabel:"1.5만원", category:"놀이/발달", subCategory:"교구", ddok:["O"], reason:"디지털 시대 스마트 학습 보조", features:["AR카드","동물사운드","50장"], minMonths:12, maxMonths:null, rating:4.1, reviewCount:95 },
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

export function getProductById(id: string): Product | undefined {
  return PRODUCT_DB.find(p => p.id === id);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR") + "원";
}

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, RotateCcw, Send, Settings } from "lucide-react";
import { getChildMonths } from "@/lib/childStore";
import { PRODUCT_DB, getStageLabel, getRelevantProducts, type Product } from "@/lib/products";

interface Message {
  role: "user" | "assistant";
  content: string;
  tags?: Record<string, boolean> | null;
  productIds?: string[];
  isError?: boolean;
}

// API providers config
const API_PROVIDERS: Record<string, { name: string; model: string; endpoint: string; format: string; keyPrefix: string; guideUrl: string; guideName: string; guideDesc: string; isFree: boolean }> = {
  groq: { name: "Groq", model: "llama-3.3-70b-versatile", endpoint: "https://api.groq.com/openai/v1/chat/completions", format: "openai", keyPrefix: "gsk_", guideUrl: "https://console.groq.com", guideName: "console.groq.com", guideDesc: "회원가입 후 API Keys 메뉴에서 무료 발급", isFree: true },
  openrouter: { name: "OpenRouter", model: "meta-llama/llama-3.1-8b-instruct:free", endpoint: "https://openrouter.ai/api/v1/chat/completions", format: "openai", keyPrefix: "sk-or-", guideUrl: "https://openrouter.ai/keys", guideName: "openrouter.ai/keys", guideDesc: "무료 모델 다수 제공", isFree: true },
  openai: { name: "OpenAI", model: "gpt-4o-mini", endpoint: "https://api.openai.com/v1/chat/completions", format: "openai", keyPrefix: "sk-", guideUrl: "https://platform.openai.com/api-keys", guideName: "platform.openai.com", guideDesc: "유료 (gpt-4o-mini 기준 매우 저렴)", isFree: false },
  google: { name: "Google Gemini", model: "gemini-1.5-flash", endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", format: "google", keyPrefix: "AIza", guideUrl: "https://aistudio.google.com/app/apikey", guideName: "aistudio.google.com", guideDesc: "Google AI Studio에서 무료 발급", isFree: true },
};

function buildSystemPrompt(months: number | null) {
  const stage = months !== null ? getStageLabel(months) : "미확인";
  const relevantProducts = getRelevantProducts(months);
  const productList = relevantProducts.map(p => {
    const maxStr = p.maxMonths === null ? "상한없음" : `${p.maxMonths}개월 미만`;
    return `- [${p.id}] ${p.title} | ${p.price} | ${p.categorySub}(${p.categoryMain}) | 추천월령:${p.minMonths}~${maxStr} | 근거:${p.reason}`;
  }).join("\n");

  const childContext = months !== null
    ? `현재 상담 중인 아이는 ${months}개월(${stage})이에요.`
    : `아이 개월 수 미확인. 대화 중 자연스럽게 파악하세요.`;

  return `당신은 "똑봇"입니다. '똑똑한 엄마' 서비스의 AI 상담 챗봇이에요.

## 핵심 역할
1. 서비스 이용 안내
2. 발달 이론 기반 육아용품 추천 해설
3. 육아 불안 해소 — 공감 + 발달 이론 근거
4. 상품 추천

## 아이 정보
${childContext}

## DDOK 발달 나침반
- D: 대근육·소근육·자조 능력
- O: 언어·인지·탐색·감각
- K: 자아·감정·사회성
- T: 건강검진·안전·환경 타이밍

## 상품 DB (월령 필터 적용)
${productList || "(맞는 상품 없음)"}

## 형식
상품 추천 시: <products>["p001","p002"]</products> (최대 3개)
발달 태그: <tags>{"d":true,"o":false,"k":false,"t":true}</tags>

## 금지
- 의료 조언 금지 — "소아과 전문의와 상담하세요"로만 안내
- 없는 정보 제공 금지

## 말투
- 친근하고 따뜻, 존댓말, 이모지 1~2개, 150자 내외`;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [onboarding, setOnboarding] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [obBday, setObBday] = useState("");
  const [childMonths, setChildMonths] = useState<number | null>(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("ddok_api_key") || "");
  const [currentProvider, setCurrentProvider] = useState(() => localStorage.getItem("ddok_api_provider") || "groq");
  const [modalProvider, setModalProvider] = useState("groq");
  const [modalKey, setModalKey] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const stored = getChildMonths();
    if (stored !== null) setChildMonths(stored);
  }, [open]);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, isLoading]);

  const startChat = useCallback((withAge: boolean) => {
    let months = childMonths;
    if (withAge && obBday) {
      months = Math.floor((Date.now() - new Date(obBday).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
      if (months < 0 || months > 84) return;
      setChildMonths(months);
      localStorage.setItem("ddok_child_birthday", obBday);
    }
    setOnboarding(false);
    const greeting = months !== null
      ? `안녕하세요! 똑봇이에요 🧭\n\n${months}개월 아이를 키우고 계시군요!\n발달 궁금증, 육아용품, 뭐든 물어보세요.`
      : `안녕하세요! 똑봇이에요 🧭\n\n육아 궁금증이나 서비스 이용법, 편하게 물어보세요!`;
    setMessages([{ role: "assistant", content: greeting }]);
  }, [childMonths, obBday]);

  const callApi = async (history: { role: string; content: string }[]) => {
    const provider = API_PROVIDERS[currentProvider];
    const systemPrompt = buildSystemPrompt(childMonths);

    if (provider.format === "openai") {
      const res = await fetch(provider.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          ...(currentProvider === "openrouter" && { "HTTP-Referer": window.location.origin, "X-Title": "똑똑한 엄마 챗봇" }),
        },
        body: JSON.stringify({ model: provider.model, max_tokens: 1024, messages: [{ role: "system", content: systemPrompt }, ...history] }),
      });
      if (!res.ok) throw new Error(`API 오류 (${res.status})`);
      const data = await res.json();
      return data.choices[0].message.content;
    }

    if (provider.format === "google") {
      const endpoint = `${provider.endpoint}?key=${apiKey}`;
      const contents = history.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system_instruction: { parts: [{ text: systemPrompt }] }, contents, generationConfig: { maxOutputTokens: 1024 } }),
      });
      if (!res.ok) throw new Error(`API 오류 (${res.status})`);
      const data = await res.json();
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error("지원하지 않는 API");
  };

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;
    if (!apiKey) { setShowModal(true); return; }

    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const history = newMessages.map(m => ({ role: m.role, content: m.content }));
      let fullText = await callApi(history);

      // Parse tags
      let tags = null;
      const tagsMatch = fullText.match(/<tags>([\s\S]*?)<\/tags>/);
      if (tagsMatch) { try { tags = JSON.parse(tagsMatch[1]); } catch {} fullText = fullText.replace(/<tags>[\s\S]*?<\/tags>/, "").trim(); }

      // Parse products
      let productIds: string[] = [];
      const prodsMatch = fullText.match(/<products>([\s\S]*?)<\/products>/);
      if (prodsMatch) { try { productIds = JSON.parse(prodsMatch[1]); } catch {} fullText = fullText.replace(/<products>[\s\S]*?<\/products>/, "").trim(); }

      setMessages([...newMessages, { role: "assistant", content: fullText, tags, productIds }]);
    } catch (err: any) {
      setMessages([...newMessages, { role: "assistant", content: `앗, 문제가 생겼어요.\n${err.message}`, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiSettings = () => {
    if (!modalKey.trim()) return;
    setApiKey(modalKey.trim());
    setCurrentProvider(modalProvider);
    localStorage.setItem("ddok_api_key", modalKey.trim());
    localStorage.setItem("ddok_api_provider", modalProvider);
    setShowModal(false);
  };

  const resetChat = () => {
    setMessages([]);
    setOnboarding(true);
  };

  const ddokTagMap: Record<string, [string, string]> = {
    d: ["D·몸으로 하기", "bg-indigo-100 text-indigo-800"],
    o: ["O·세상 열기", "bg-emerald-100 text-emerald-800"],
    k: ["K·나를 알기", "bg-amber-100 text-amber-800"],
    t: ["T·지금 이 순간", "bg-pink-100 text-pink-800"],
  };

  const quickChips = ["서비스 어떻게 써요?", "지금 뭐 사야 해요?", "발달이 걱정돼요", "추천 이유 알려줘"];

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-7 right-6 z-[1000] w-14 h-14 rounded-full gradient-primary shadow-elegant hover:scale-110 transition-all flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </button>

      {/* Chat Panel */}
      <div className={`fixed bottom-24 right-6 z-[999] w-[min(400px,calc(100vw-32px))] h-[min(600px,calc(100dvh-120px))] bg-card rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${open ? "scale-100 opacity-100 pointer-events-auto" : "scale-[0.85] opacity-0 pointer-events-none translate-y-5"}`}>
        {/* Header */}
        <div className="gradient-primary p-4 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center text-lg">🧠</div>
          <div className="flex-1">
            <div className="font-display text-sm text-primary-foreground">똑봇</div>
            <div className="text-xs text-primary-foreground/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse-dot" />
              발달 상담 · 서비스 안내
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="w-8 h-8 rounded-lg bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/25 transition-colors">
            <Settings className="w-4 h-4 text-primary-foreground" />
          </button>
          <button onClick={resetChat} className="w-8 h-8 rounded-lg bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/25 transition-colors">
            <RotateCcw className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Child banner */}
        {childMonths !== null && !onboarding && (
          <div className="bg-purple-light px-4 py-2 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold text-purple-dark">{childMonths}개월 · {getStageLabel(childMonths)}</span>
          </div>
        )}

        {/* Onboarding */}
        {onboarding ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4 bg-muted/50 overflow-y-auto">
            <div className="text-4xl">🧭</div>
            <div className="font-display text-base">안녕하세요!<br />저는 똑봇이에요</div>
            <p className="text-sm text-muted-foreground">육아용품 추천, 발달 궁금증,<br />서비스 이용법까지 뭐든 물어보세요.</p>
            <div className="w-full">
              <label className="text-xs text-muted-foreground text-left block mb-1">아이 생년월일 (선택)</label>
              <input
                type="date"
                value={obBday}
                onChange={(e) => setObBday(e.target.value)}
                className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-card text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <button onClick={() => startChat(true)} className="w-full py-3 gradient-primary text-primary-foreground rounded-xl font-semibold text-sm shadow-elegant hover:shadow-lg transition-all">
              상담 시작하기 →
            </button>
            <button onClick={() => startChat(false)} className="text-xs text-muted-foreground underline">아이 정보 없이 시작</button>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div ref={messagesRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 bg-muted/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""} animate-fade-up`}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs shrink-0">🧠</div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground rounded-br-sm"
                      : `bg-card border border-border rounded-bl-sm ${msg.isError ? "border-red-300 bg-red-50" : ""}`
                  }`}>
                    {msg.content.split("\n").map((line, j) => (
                      <span key={j}>{line}<br /></span>
                    ))}
                    {/* Tags */}
                    {msg.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {Object.entries(msg.tags).filter(([, v]) => v).map(([k]) => (
                          <span key={k} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ddokTagMap[k]?.[1] || ""}`}>
                            {ddokTagMap[k]?.[0]}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Products */}
                    {msg.productIds && msg.productIds.length > 0 && (
                      <div className="flex flex-col gap-2 mt-2">
                        {msg.productIds.map(id => {
                          const p = PRODUCT_DB.find(x => x.id === id);
                          if (!p) return null;
                          return (
                            <div key={id} className="bg-muted/50 border border-border rounded-xl p-2.5 flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-lg bg-purple-light flex items-center justify-center text-lg shrink-0">{p.icon}</div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-foreground truncate">{p.title}</div>
                                <div className="text-[11px] text-muted-foreground">{p.price}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 animate-fade-up">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs shrink-0">🧠</div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-purple-mid rounded-full animate-typing" />
                    <span className="w-1.5 h-1.5 bg-purple-mid rounded-full animate-typing [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-purple-mid rounded-full animate-typing [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick chips */}
            <div className="flex gap-1.5 px-3 py-2 overflow-x-auto shrink-0">
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="text-xs font-medium px-3 py-1.5 border border-border rounded-full bg-card text-muted-foreground whitespace-nowrap hover:border-primary hover:text-primary hover:bg-purple-light transition-colors shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-card shrink-0">
              <div className="flex gap-2 items-end bg-muted/50 border border-border rounded-xl px-3 py-2 focus-within:border-primary transition-colors">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px"; }}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="자유롭게 물어보세요..."
                  rows={1}
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-foreground resize-none max-h-20 leading-relaxed placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0 disabled:opacity-40 hover:shadow-elegant transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-primary-foreground" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* API Settings Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/40 z-[2000] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg mb-4">🔑 API 설정</h3>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(API_PROVIDERS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setModalProvider(key)}
                  className={`border rounded-xl p-3 text-center transition-all text-sm ${modalProvider === key ? "border-primary bg-purple-light shadow-card" : "border-border bg-muted/30 hover:border-primary/50"}`}
                >
                  <div className="font-semibold text-foreground">{p.name}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${p.isFree ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                    {p.isFree ? "무료" : "유료"}
                  </span>
                </button>
              ))}
            </div>

            {modalProvider && (
              <div className="bg-muted/50 border border-border rounded-xl p-3 mb-4 text-sm">
                <div className="font-semibold text-purple-dark mb-1">{API_PROVIDERS[modalProvider].name}</div>
                <p className="text-muted-foreground text-xs">{API_PROVIDERS[modalProvider].guideDesc}</p>
                <a href={API_PROVIDERS[modalProvider].guideUrl} target="_blank" rel="noopener" className="text-primary text-xs font-medium mt-1 inline-block hover:underline">
                  {API_PROVIDERS[modalProvider].guideName} →
                </a>
              </div>
            )}

            <input
              type="password"
              value={modalKey}
              onChange={(e) => setModalKey(e.target.value)}
              placeholder="API 키를 입력하세요"
              className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-card text-foreground focus:border-primary focus:outline-none transition-colors mb-4"
            />

            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors">취소</button>
              <button onClick={saveApiSettings} className="flex-[2] py-2.5 gradient-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-elegant hover:shadow-lg transition-all">저장하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

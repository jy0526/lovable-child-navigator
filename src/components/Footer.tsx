import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <span className="font-display text-lg text-primary">똑똑한 엄마</span>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              WHO·AAP·K-DST 발달 이론 기반<br />
              육아용품 맞춤 추천 서비스
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">서비스</h4>
            <div className="flex flex-col gap-2">
              <Link to="/recommend" className="text-sm text-muted-foreground hover:text-primary transition-colors">맞춤 추천</Link>
              <Link to="/guide" className="text-sm text-muted-foreground hover:text-primary transition-colors">발달 가이드</Link>
              <Link to="/mypage" className="text-sm text-muted-foreground hover:text-primary transition-colors">마이페이지</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">안내</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              생년월일 정보는 사용자 기기에만 저장되며<br />서버로 전송되지 않습니다.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 똑똑한 엄마. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

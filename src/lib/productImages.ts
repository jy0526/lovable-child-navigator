// Real product images mapped by product id.
// Falls back to icon emoji when not present.
import diapers from "@/assets/products/diapers.jpg";
import lotion from "@/assets/products/lotion.jpg";
import snacks from "@/assets/products/snacks.jpg";
import carrier from "@/assets/products/carrier.jpg";
import swaddle from "@/assets/products/swaddle.jpg";
import thermometer from "@/assets/products/thermometer.jpg";
import sterilizer from "@/assets/products/sterilizer.jpg";
import stroller from "@/assets/products/stroller.jpg";

export const PRODUCT_IMAGES: Record<string, string> = {
  p011: sterilizer,   // 젖병 소독기
  p012: snacks,       // 아기 간식 세트
  p015: swaddle,      // 속싸개 스와들업
  p023: diapers,      // 기저귀 세트
  p025: thermometer,  // 비접촉 체온계
  p026: lotion,       // 아기 로션 세트
  p030: carrier,      // 아기띠 캐리어
  p031: stroller,     // 유모차
};

export function getProductImage(id: string): string | undefined {
  return PRODUCT_IMAGES[id];
}

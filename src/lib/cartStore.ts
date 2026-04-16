const CART_KEY = "ddok_cart";

export interface CartItem {
  productId: string;
  quantity: number;
}

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(productId: string, qty = 1) {
  const cart = getCart();
  const existing = cart.find(c => c.productId === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ productId, quantity: qty });
  }
  saveCart(cart);
}

export function removeFromCart(productId: string) {
  saveCart(getCart().filter(c => c.productId !== productId));
}

export function updateCartQty(productId: string, qty: number) {
  const cart = getCart();
  const item = cart.find(c => c.productId === productId);
  if (item) {
    item.quantity = Math.max(1, qty);
    saveCart(cart);
  }
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount(): number {
  return getCart().reduce((sum, c) => sum + c.quantity, 0);
}

export function isInCart(productId: string): boolean {
  return getCart().some(c => c.productId === productId);
}

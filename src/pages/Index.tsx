import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import CategorySection from "@/components/CategorySection";
import PopularProducts from "@/components/PopularProducts";
import TheorySection from "@/components/TheorySection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <CategorySection />
        <PopularProducts />
        <TheorySection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;

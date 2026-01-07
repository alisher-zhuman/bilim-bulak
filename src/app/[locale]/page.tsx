"use client";
import { Header } from "@/widgets/layout/header";
import { Intro } from "@/widgets/landing/intro";
import { Steps } from "@/widgets/landing/steps";
import { Footer } from "@/widgets/layout/footer";
import { useScrollRestorer } from "@/shared/lib/hooks/useScrollRestorer";

const Home = () => {
  useScrollRestorer();

  return (
    <>
      <Header />
      <Intro />
      <Steps />
      <Footer />
    </>
  );
};

export default Home;

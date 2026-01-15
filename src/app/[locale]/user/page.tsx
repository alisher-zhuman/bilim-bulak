"use client";
import { Header } from "@/widgets/layout/header";
import { Welcome } from "@/widgets/landing/welcome";
import { Footer } from "@/widgets/layout/footer";
import { useRequireAuth } from "@/shared/lib/hooks/useRequireAuth";

const User = () => {
  const { ready, isAuthed } = useRequireAuth();

  if (!ready) return null;
  if (!isAuthed) return null;

  return (
    <>
      <Header />
      <Welcome />
      <Footer />
    </>
  );
};

export default User;

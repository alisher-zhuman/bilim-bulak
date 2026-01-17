"use client";
import { TestSection } from "@/features/user/tests/ui/test-section";
import { useRequireAuth } from "@/shared/lib/hooks/useRequireAuth";

const Test = () => {
  const { ready, isAuthed } = useRequireAuth();

  if (!ready) return null;
  if (!isAuthed) return null;

  return (
    <section className="animate-fade-in">
      <TestSection />
    </section>
  );
};

export default Test;

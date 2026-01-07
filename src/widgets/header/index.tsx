import { LangSwitcher } from "@/shared/ui/lang-switcher";
import { Logo } from "@/shared/ui/logo";

export const Header = () => {
  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="max-w-400 m-auto p-5 flex justify-between items-center">
        <Logo />

        <div>
          <LangSwitcher />
        </div>
      </div>
    </header>
  );
};

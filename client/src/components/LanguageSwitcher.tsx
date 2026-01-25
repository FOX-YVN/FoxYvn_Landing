import type { Language } from "@/App";

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const languages: { code: Language; label: string }[] = [
  { code: "hy", label: "Հայ" },
  { code: "en", label: "Eng" },
  { code: "ru", label: "Рус" },
];

export default function LanguageSwitcher({
  language,
  onLanguageChange,
}: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {languages.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`lang-item lang-button text-xs sm:text-sm font-medium ${
              isActive ? "active" : ""
            }`}
            aria-label={`Switch to ${lang.label}`}
            aria-pressed={isActive}
            type="button"
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}

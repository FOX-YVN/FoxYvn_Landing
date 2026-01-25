import { useEffect, useMemo, useState } from "react";
import type { Language } from "@/App";

interface HomeProps {
  language: Language;
}

const descriptions: Record<
  Language,
  {
    titlePrefix: string;
    titleQuality: string;
    titleMiddle: string;
    titleReliability: string;
    titleSuffix: string;
  }
> = {
  hy: {
    titlePrefix: "Տարիներ շարունակ մենք ապահովում ենք ",
    titleQuality: "որակ",
    titleMiddle: " և ",
    titleReliability: "հուսալիություն",
    titleSuffix: " մեր հաճախորդների համար։",
  },
  en: {
    titlePrefix: "Providing our customers with ",
    titleQuality: "quality",
    titleMiddle: " and ",
    titleReliability: "reliability",
    titleSuffix: " for many years.",
  },
  ru: {
    titlePrefix: "На протяжении многих лет мы обеспечиваем нашим клиентам ",
    titleQuality: "качество",
    titleMiddle: " и ",
    titleReliability: "надёжность",
    titleSuffix: ".",
  },
};

export default function Home({ language }: HomeProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const letterStaggerMs = 22;

  const trackButtonClick = (buttonName: string) => {
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("button_click", { button: buttonName });
    }
  };

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShouldAnimate(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  const animate = (classes: string) => (shouldAnimate ? classes : "");

  const animatedDescription = useMemo(() => {
    const copy = descriptions[language];
    const segments = [
      { text: copy.titlePrefix, highlight: false },
      { text: copy.titleQuality, highlight: true },
      { text: copy.titleMiddle, highlight: false },
      { text: copy.titleReliability, highlight: true },
      { text: copy.titleSuffix, highlight: false },
    ];

    let index = 0;
    const nodes: React.ReactNode[] = [];

    const buildLetters = (
      text: string,
      highlight: boolean,
      segmentKey: string
    ) => {
      const words = text.split(" ");
      const wordNodes: React.ReactNode[] = [];

      words.forEach((word, wordIndex) => {
        if (word.length === 0) {
          wordNodes.push(" ");
          return;
        }

        const letterNodes = Array.from(word).map((char, charIndex) => {
          const delayMs = index * letterStaggerMs;
          index += 1;

          return (
            <span
              key={`${segmentKey}-${wordIndex}-${charIndex}`}
              className="lang-letter"
              style={{ animationDelay: `${delayMs}ms` }}
            >
              {char}
            </span>
          );
        });

        wordNodes.push(
          <span
            key={`${segmentKey}-word-${wordIndex}`}
            className={`lang-word${highlight ? " highlight-word" : ""}`}
          >
            {letterNodes}
          </span>
        );

        if (wordIndex < words.length - 1) {
          wordNodes.push(" ");
        }
      });

      return wordNodes;
    };

    segments.forEach((segment, segmentIndex) => {
      const segmentKey = `${segmentIndex}-${language}`;
      const chunk = buildLetters(segment.text, segment.highlight, segmentKey);
      nodes.push(...chunk);
    });

    return nodes;
  }, [language]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 grid place-content-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="container mx-auto max-w-2xl text-center flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <div
              className={`flex justify-center py-10 px-10 overflow-visible ${animate(
                "animate-fade-in animation-delay-200"
              )}`}
            >
              <picture className="block overflow-visible">
                <source srcSet="/fox-logo-256.webp" type="image/webp" />
                <img
                  src="/fox-logo.png"
                  alt="FoxYvn Logo"
                  width="224"
                  height="224"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="block w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain hero-logo-glow"
                />
              </picture>
            </div>

            {/* Title */}
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider hero-title-shadow-strong text-foreground ${animate(
                "animate-fade-in-up animation-delay-400"
              )}`}
            >
              FOX YVN
            </h1>

            {/* Description */}
            <p
              key={language}
              className={`text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed ${animate(
                "animate-fade-in-up animation-delay-600"
              )} ${language === "en" ? "lang-en-one-line" : ""}`}
            >
              {animatedDescription}
            </p>
          </div>

          {/* Buttons */}
          <div
            className={`flex flex-col gap-4 max-w-md mx-auto ${animate(
              "animate-fade-in-up animation-delay-800"
            )}`}
          >
            {/* Primary Button - Shop */}
            <a
              href="https://t.me/FOXIOPERATOR"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("shop")}
              aria-label="Contact us on Telegram @FOXIOPERATOR"
              className="w-full inline-flex items-center justify-center py-4 px-8 text-base sm:text-lg font-medium rounded-xl hero-button-primary hero-button-base premium-button hero-button-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              @FOXIOPERATOR
            </a>

            {/* Secondary Button - Operator */}
            <a
              href="https://t.me/FOXYVN_CHANNEL"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("operator")}
              aria-label="Join our Telegram channel @FOXYVN_CHANNEL"
              className="w-full inline-flex items-center justify-center py-4 px-8 text-base sm:text-lg font-medium rounded-xl hero-button-secondary hero-button-base premium-button hero-button-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              @FOXYVN_CHANNEL
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

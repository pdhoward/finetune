import NextLink from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import useAuthentication from "./account/useAuthentication";

const navigation = [
  { completions: "/completions/" },
  { classifications: "/classifications/" },
  { search: "/search/" },
];

export default function PageLayout({
  children,
  fullPage,
}: {
  children: React.ReactNode;
  fullPage?: boolean;
}) {
  const { signOut } = useAuthentication();
  const { ready } = useTranslation();
  if (!ready) return null;

  return (
    <div className={"container p-4 mx-auto"}>
      {fullPage ? null : <PageHeader signOut={signOut} />}
      {children}
    </div>
  );
}

function PageHeader({ signOut }: { signOut: () => void }) {
  const { t } = useTranslation();

  return (
    <header className="flex flex-wrap gap-4 justify-between items-center mb-8 text-xl">
      <NextLink href="/">
        <a className="flex gap-2 text-black whitespace-nowrap">
          <span className="flex flex-nowrap gap-2 font-bold">
            <span>{t("app.emoji")}</span>
            <span>{t("app.name")}</span>
          </span>
          <span className="font-light">{t("app.subtitle")}</span>
        </a>
      </NextLink>
      <nav className="space-x-4 whitespace-nowrap">
        {navigation.map((object) =>
          Object.entries(object).map(([key, href]) => (
            <NextLink href={href} key={href}>
              <a>{t(`pages.${key}`)}</a>
            </NextLink>
          ))
        )}
      </nav>
      <button onClick={signOut} className="text-base">
        Sign Out
      </button>
    </header>
  );
}

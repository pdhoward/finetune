import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import NextLink from "next/link";
import packageJSON from "package.json";
import screenshot from "public/images/screenshot.png";
import buyMeCofee from "public/images/yellow-button.png";
import React from "react";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import SigninForm from "./account/SignInForm";
import useAuthentication from "./account/useAuthentication";

export default function HomePage() {
  const { isSignedIn } = useAuthentication();

  return (
    <>
      <NextSeo title={"Hello"} />
      <div className="mx-auto max-w-6xl">
        <Header />
        <div className="flex flex-col lg:flex-row gap-x-20 gap-y-8 my-10">
          <div className="lg:my-20 lg:w-1/3 shrink-0">
            {isSignedIn ? <WelcomeBack /> : <SigninForm />}
          </div>
          <div className="lg:w-2/3">
            <Promo />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

function Header() {
  const { t } = useTranslation();

  return (
    <header className="my-4">
      <h1 className="flex flex-wrap gap-4 text-4xl lg:text-5xl">
        <span className="flex flex-nowrap gap-4 font-bold">
          <span>{t("app.emoji")}</span>
          <span>{t("app.name")}</span>
        </span>
        <span className="font-light">{t("app.subtitle")}</span>
      </h1>
    </header>
  );
}

function WelcomeBack() {
  return (
    <div className="mx-auto space-y-4 w-fit">
      <h2 className="text-2xl font-bold">Welcome back!</h2>
      <NextLink href="/completions">
        <Button
          auto
          iconRight={<FontAwesomeIcon icon={faChevronRight} />}
          size="large"
        >
          <span className="uppercase">Enter this way</span>
        </Button>
      </NextLink>

      <div className="pt-20">
        <p>Like this project?</p>
        <a href="https://buymeacoffee.com/assaf" className="block w-40 ">
          <Image {...buyMeCofee} unoptimized />
        </a>
      </div>
    </div>
  );
}

function Promo() {
  const { data } = useSWR("advice", () =>
    fetch("https://api.adviceslip.com/advice").then((res) => res.json())
  );

  return (
    <section>
      <div className="p-1 rounded-lg border shadow-sm">
        <Image {...screenshot} />
      </div>
      <ul className="mt-8 text-xl list-disc">
        <li>Go beyond the playground</li>
        <li>
          <b>Fine tune</b> your completion model by uploading training and
          validation files
        </li>
        <li>
          Upload <b>classification</b> and <b>search</b> files
        </li>
        <li>CSV, Excel spreadsheets, and of course JSONL</li>
        <li>Play around and see the API requests</li>
        {data && <li>{data.slip.advice.replace(/\.$/, "")}</li>}
      </ul>
    </section>
  );
}

function Footer() {
  const githubURL = packageJSON.repository.replace(
    /github:(.*).git/,
    "https://github.com/$1"
  );

  return (
    <footer>
      <p>
        For usage limits, terms and conditions, billing and charges, etc check
        your OpenAI account. Use responsibly.
      </p>
      <p>
        Created by{" "}
        <a href="https://labnotes.org" target="_blank" rel="noreferrer">
          Assaf Arkin
        </a>{" "}
        {" ❤️ "} ️
        <a href={githubURL} target="_blank" rel="noreferrer">
          Source Code
        </a>
      </p>
    </footer>
  );
}

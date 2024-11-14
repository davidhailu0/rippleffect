"use client";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  callToActionTitle: string;
  callToActionHref: string;
};

const DisplayMessage = ({
  title,
  description,
  callToActionTitle,
  callToActionHref,
}: Props) => {
  return (
    <div className="flex flex-col items-center pt-10  justify-center text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-300">{description}</p>
      <Link
        href={callToActionHref}
        className="px-6 py-3 bg-pink-400 text-white hover:bg-pink-600  rounded-[50px] shadow-xl font-bold mt-8 col-span-2 w-[260px] mx-auto text-center box-border pt-3"
      >
        {callToActionTitle}
      </Link>
    </div>
  );
};

export default DisplayMessage;

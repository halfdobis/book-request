"use client";
import React, { useState } from "react";
import books from "./book.json";
import Image from "next/image";
import Link from "next/link";

export interface Book {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

export default function Home() {
  const getRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  };

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomBook = async () => {
    setLoading(true);
    const randomBook = getRandomBook();
    if (Math.random() < 0.8) {
      // Adjust probability as needed
      setBook(randomBook);
    } else {
      setBook(null);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <span className="uppercase text-xl">Book Request App</span>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Adaobi
          </a>
        </div>
      </div>
      <main className="flex mx-auto items-center justify-center p-12 lg:p-24">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 space-y-8 lg:space-y-0">
          <div className="rounded-lg border border-transparent px-5 py-4 flex-1">
            <h2 className="mb-3 text-2xl font-semibold">Request for Books</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Find in-depth information about real life and fiction with us.
            </p>
            <button
              className="bg-white text-black py-2 px-4 mt-3 rounded-lg hover:bg-white/90"
              onClick={fetchRandomBook}
              disabled={loading}
            >
              {loading ? "Loading..." : "Request Random Book"}
            </button>
          </div>
          <div className="flex-1">
            {book && (
              <div>
                <h2 className="text-lg mb-3 font-semibold">
                  Here is a recommended book for you
                </h2>
                <div className="border-2 border-gray-700 rounded-lg p-6 min-w-[300px] lg:min-w-[500px] text-center">
                  <div className="relative mb-6" style={{ paddingTop: "50%" }}>
                    <Image
                      src={book.imageLink}
                      alt="image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="text-left">
                    <h2 className="text-lg font-semibold">{book.title}</h2>
                    <p className="mb-2">Author: {book.author}</p>
                    <div className="flex justify-between mb-2">
                      <p>{book.pages} pages</p>
                      <p>Year: {book.year}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Country: {book.country}</p>
                      <p>Language: {book.language}</p>
                    </div>
                    <Link
                      href={book.link}
                      className="bg-white text-black py-2 px-4 mt-3 rounded-lg hover:bg-white/90 inline-block"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {!book && !loading && (
              <div className="border border-gray-300 p-6 text-center">
                <p className="text-xl">No book recommended for you</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </main>
  );
}

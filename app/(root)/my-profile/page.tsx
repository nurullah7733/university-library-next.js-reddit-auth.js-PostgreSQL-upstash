import React from "react";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  const BorrowedBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      description: books.description,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      videoUrl: books.videoUrl,
      summary: books.summary,
      createdAt: books.createdAt,
    })
    .from(borrowRecords)
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.status, "BORROWED"));
  console.log(BorrowedBooks, "BorrowedBooks");
  return (
    <>
      <BookList title="Borrowed Books" books={BorrowedBooks} />
    </>
  );
};
export default Page;

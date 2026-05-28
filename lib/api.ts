export type BookStatus = "selected" | "recommended" | "suggested";

export type Book = {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: BookStatus;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
};

const BOOKS_API_URL =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks";

export async function getBooksByStatus(status: BookStatus): Promise<Book[]> {
  const response = await fetch(
    `${BOOKS_API_URL}?status=${encodeURIComponent(status)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${status} books.`);
  }

  const books = (await response.json()) as Book[];

  if (!Array.isArray(books)) {
    throw new Error(`Invalid ${status} books response.`);
  }

  return books;
}

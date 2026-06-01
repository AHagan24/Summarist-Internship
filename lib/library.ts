import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Timestamp,
} from "firebase/firestore";
import type { Book } from "@/lib/api";
import { db } from "@/lib/firebase";

export type SavedBook = Pick<
  Book,
  | "id"
  | "title"
  | "author"
  | "imageLink"
  | "subTitle"
  | "averageRating"
  | "totalRating"
  | "subscriptionRequired"
> & {
  savedAt?: Timestamp | null;
};

export type LibraryBook = Omit<SavedBook, "savedAt">;

export type FinishedBook = LibraryBook & {
  finishedAt?: Timestamp | null;
};

export type SaveBookResult = "added" | "exists";

function userLibraryCollection(uid: string) {
  return collection(db, "users", uid, "library");
}

function userLibraryBookDoc(uid: string, bookId: string) {
  return doc(db, "users", uid, "library", bookId);
}

function userFinishedCollection(uid: string) {
  return collection(db, "users", uid, "finished");
}

function userFinishedBookDoc(uid: string, bookId: string) {
  return doc(db, "users", uid, "finished", bookId);
}

export async function saveBookToLibrary(
  uid: string,
  book: LibraryBook,
): Promise<SaveBookResult> {
  const bookRef = userLibraryBookDoc(uid, book.id);
  const existingBook = await getDoc(bookRef);

  if (existingBook.exists()) {
    return "exists";
  }

  await setDoc(bookRef, {
    id: book.id,
    title: book.title,
    author: book.author,
    imageLink: book.imageLink,
    subTitle: book.subTitle,
    averageRating: book.averageRating,
    totalRating: book.totalRating,
    subscriptionRequired: book.subscriptionRequired,
    savedAt: serverTimestamp(),
  });

  return "added";
}

export async function isBookInLibrary(uid: string, bookId: string) {
  const bookRef = userLibraryBookDoc(uid, bookId);
  const existingBook = await getDoc(bookRef);

  return existingBook.exists();
}

export async function removeBookFromLibrary(uid: string, bookId: string) {
  await deleteDoc(userLibraryBookDoc(uid, bookId));
}

export async function getSavedBooks(uid: string): Promise<SavedBook[]> {
  const savedBooksQuery = query(
    userLibraryCollection(uid),
    orderBy("savedAt", "desc"),
  );
  const snapshot = await getDocs(savedBooksQuery);

  return snapshot.docs.map((savedBookDoc) => {
    const savedBook = savedBookDoc.data() as SavedBook;

    return {
      ...savedBook,
      id: savedBook.id || savedBookDoc.id,
    };
  });
}

export async function saveFinishedBook(
  uid: string,
  book: LibraryBook,
): Promise<SaveBookResult> {
  const bookRef = userFinishedBookDoc(uid, book.id);
  const existingBook = await getDoc(bookRef);

  if (existingBook.exists()) {
    return "exists";
  }

  await setDoc(bookRef, {
    id: book.id,
    title: book.title,
    author: book.author,
    imageLink: book.imageLink,
    subTitle: book.subTitle,
    averageRating: book.averageRating,
    totalRating: book.totalRating,
    subscriptionRequired: book.subscriptionRequired,
    finishedAt: serverTimestamp(),
  });

  return "added";
}

export async function getFinishedBooks(uid: string): Promise<FinishedBook[]> {
  const finishedBooksQuery = query(
    userFinishedCollection(uid),
    orderBy("finishedAt", "desc"),
  );
  const snapshot = await getDocs(finishedBooksQuery);

  return snapshot.docs.map((finishedBookDoc) => {
    const finishedBook = finishedBookDoc.data() as FinishedBook;

    return {
      ...finishedBook,
      id: finishedBook.id || finishedBookDoc.id,
    };
  });
}

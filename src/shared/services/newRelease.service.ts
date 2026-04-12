import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import type { CarouselItem } from "@shared/ui/ui.types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const COLLECTION_NAME = "newReleaseList";

export const uploadThumbnail = async (file: File) => {
  const storageRef = ref(storage, `thumbnails/${Date.now()}-${file.name}`);

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
};

// CREATE
export const createNewRelease = async (data: Omit<CarouselItem, "id">) => {
  return await addDoc(collection(db, COLLECTION_NAME), data);
};

// READ
export const getNewReleaseList = async (): Promise<CarouselItem[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CarouselItem[];
};

// UPDATE
export const updateNewRelease = async (id: string, data: Partial<CarouselItem>) => {
  const ref = doc(db, COLLECTION_NAME, id);
  return await updateDoc(ref, data);
};

// DELETE
export const deleteNewRelease = async (id: string) => {
  const ref = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(ref);
};
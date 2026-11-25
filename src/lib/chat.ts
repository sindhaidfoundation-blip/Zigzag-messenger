import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe
} from "firebase/firestore";
import { firestore } from "./firebase";

export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  createdAt: unknown;
  kind: "text";
};

export type Conversation = {
  id: string;
  memberIds: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
  lastMessage?: string;
};

function requireFirestore() {
  if (!firestore) {
    throw new Error("Firebase is not configured. Add the EXPO_PUBLIC_FIREBASE_* values before using chat.");
  }
  return firestore;
}

export async function createOrOpenConversation(memberIds: string[]) {
  const db = requireFirestore();
  const uniqueMembers = [...new Set(memberIds)].sort();
  if (uniqueMembers.length < 2) throw new Error("A conversation needs at least two members.");

  // Stable ID avoids creating duplicate one-to-one conversations.
  const conversationId = uniqueMembers.join("_");
  const conversationRef = doc(db, "conversations", conversationId);
  await setDoc(conversationRef, {
    memberIds: uniqueMembers,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });
  return conversationId;
}

export function subscribeToMyConversations(
  userId: string,
  onChange: (items: Conversation[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const db = requireFirestore();
  const q = query(
    collection(db, "conversations"),
    where("memberIds", "array-contains", userId),
    orderBy("updatedAt", "desc")
  );
  return onSnapshot(q, snapshot => {
    onChange(snapshot.docs.map(item => ({ id: item.id, ...item.data() } as Conversation)));
  }, error => onError?.(error));
}

export function subscribeToMessages(
  conversationId: string,
  onChange: (items: ChatMessage[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const db = requireFirestore();
  const q = query(
    collection(db, "conversations", conversationId, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, snapshot => {
    onChange(snapshot.docs.map(item => ({ id: item.id, ...item.data() } as ChatMessage)));
  }, error => onError?.(error));
}

export async function sendTextMessage(conversationId: string, senderId: string, text: string) {
  const db = requireFirestore();
  const cleanText = text.trim();
  if (!cleanText) return;
  if (cleanText.length > 10000) throw new Error("Message is too long.");

  await addDoc(collection(db, "conversations", conversationId, "messages"), {
    senderId,
    text: cleanText,
    kind: "text",
    createdAt: serverTimestamp()
  });
  await updateDoc(doc(db, "conversations", conversationId), {
    lastMessage: cleanText,
    updatedAt: serverTimestamp()
  });
}

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

type Unsubscribe = () => void;

export async function createOrOpenConversation(memberIds: string[]) {
  const uniqueMembers = [...new Set(memberIds)].sort();
  if (uniqueMembers.length < 2) throw new Error("A conversation needs at least two members.");

  const conversationId = uniqueMembers.join("_");
  const conversationRef = firestore().collection("conversations").doc(conversationId);
  const existing = await conversationRef.get();

  if (!existing.exists) {
    await conversationRef.set({
      memberIds: uniqueMembers,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp()
    });
  } else {
    const currentMembers = [...((existing.data()?.memberIds ?? []) as string[])].sort();
    if (JSON.stringify(currentMembers) !== JSON.stringify(uniqueMembers)) {
      throw new Error("Conversation ID collision. Choose a different conversation ID strategy.");
    }
  }
  return conversationId;
}

export function subscribeToMyConversations(
  userId: string,
  onChange: (items: Conversation[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return firestore()
    .collection("conversations")
    .where("memberIds", "array-contains", userId)
    .orderBy("updatedAt", "desc")
    .onSnapshot(
      snapshot => onChange(snapshot.docs.map(item => ({ id: item.id, ...item.data() } as Conversation))),
      error => onError?.(error)
    );
}

export function subscribeToMessages(
  conversationId: string,
  onChange: (items: ChatMessage[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return firestore()
    .collection("conversations")
    .doc(conversationId)
    .collection("messages")
    .orderBy("createdAt", "asc")
    .onSnapshot(
      snapshot => onChange(snapshot.docs.map(item => ({ id: item.id, ...item.data() } as ChatMessage))),
      error => onError?.(error)
    );
}

export async function sendTextMessage(conversationId: string, senderId: string, text: string) {
  const cleanText = text.trim();
  if (!cleanText) return;
  if (cleanText.length > 10000) throw new Error("Message is too long.");

  const conversationRef = firestore().collection("conversations").doc(conversationId);
  await conversationRef.collection("messages").add({
    senderId,
    text: cleanText,
    kind: "text",
    createdAt: firestore.FieldValue.serverTimestamp()
  });
  await conversationRef.update({
    lastMessage: cleanText,
    updatedAt: firestore.FieldValue.serverTimestamp()
  });
}

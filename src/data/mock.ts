export type Chat = {
  id: string; name: string; message: string; time: string;
  unread?: number; online?: boolean; color: string; initials: string;
};

export const chats: Chat[] = [
  { id: "1", name: "Ayesha Khan", message: "Voice note • 0:18", time: "9:42", unread: 2, online: true, color: "#F8B4CC", initials: "AK" },
  { id: "2", name: "Design Crew", message: "Hamza: New mockups are ready ✨", time: "9:18", unread: 5, color: "#B9AEFF", initials: "DC" },
  { id: "3", name: "Usman Ali", message: "See you tomorrow!", time: "Yesterday", online: true, color: "#A8DCCB", initials: "UA" },
  { id: "4", name: "Family ❤️", message: "Ammi: Take care beta", time: "Yesterday", color: "#FFD39B", initials: "F" },
  { id: "5", name: "Sara Ahmed", message: "That sounds amazing 😍", time: "Mon", color: "#B9D8F7", initials: "SA" },
  { id: "6", name: "Bilal", message: "Photo", time: "Sun", color: "#E9B7F3", initials: "B" }
];

export const messages = [
  { id: "m1", text: "Hey! How are you doing?", mine: false, time: "9:35" },
  { id: "m2", text: "I'm great! Just checking out Zigzag 😄", mine: true, time: "9:37" },
  { id: "m3", text: "The new design looks so cool!", mine: false, time: "9:39" },
  { id: "m4", text: "Right? Love the colours 💜", mine: true, time: "9:40" },
  { id: "m5", text: "Voice note • 0:18", mine: false, time: "9:42" }
];

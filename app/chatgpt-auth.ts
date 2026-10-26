import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type ChatGPTUser = { userId: string; displayName: string; email: string; fullName: string | null };

function safeReturnTo(returnTo: string) {
  return returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/';
}

export function chatGPTSignInPath(returnTo = '/') {
  return `/signin-with-chatgpt?return_to=${encodeURIComponent(safeReturnTo(returnTo))}`;
}

export function chatGPTSignOutPath(returnTo = '/') {
  return `/signout-with-chatgpt?return_to=${encodeURIComponent(safeReturnTo(returnTo))}`;
}

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const requestHeaders = await headers();
  const userId = requestHeaders.get('oai-authenticated-user-id');
  const email = requestHeaders.get('oai-authenticated-user-email');
  if (!userId || !email) return null;
  const encodedName = requestHeaders.get('oai-authenticated-user-full-name');
  let fullName: string | null = null;
  if (encodedName && requestHeaders.get('oai-authenticated-user-full-name-encoding') === 'percent-encoded-utf-8') {
    try { fullName = decodeURIComponent(encodedName); } catch { fullName = null; }
  }
  return { userId, email, fullName, displayName: fullName ?? email };
}

export async function requireChatGPTUser(returnTo: string) {
  const user = await getChatGPTUser();
  if (user) return user;
  redirect(chatGPTSignInPath(returnTo));
}

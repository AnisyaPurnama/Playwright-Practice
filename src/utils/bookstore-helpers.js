export function extractUserId(responseBody) {
  return responseBody.userID || responseBody.userId || responseBody.id;
}

export function normalizeAuthorized(value) {
  if (value === true || value === 'true') return true;
  return false;
}

export function extractBooks(body) {
  return Array.isArray(body?.books) ? body.books : [];
}

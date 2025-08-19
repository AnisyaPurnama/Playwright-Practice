import { test, expect } from '@playwright/test';
import {
  normalizeAuthorized,
  extractBooks,
  extractUserId,
} from '../../src/utils/bookstore-helpers';

const ACCOUNT = 'Account/v1';
const BOOKSTORE = 'BookStore/v1';

test.describe.serial('BookStore API E2E', () => {
  let userName, password, userId, token, isbn;

  test.beforeAll(async ({ request, baseURL }) => {
    userName = `pw_user_${Date.now()}`;
    password = 'P@ssw0rd123!';

    await test.step('Create user', async () => {
      const createRes = await request.post(`${baseURL}/${ACCOUNT}/User`, {
        headers: { 'Content-Type': 'application/json' },
        data: { userName, password },
      });

      const status = createRes.status();
      const bodyText = await createRes.text();

      console.log('Create User Status:', status);
      console.log('Create User Body:', bodyText);

      expect(status).toBeLessThan(300); // More explicit than .ok()

      const createBody = await createRes.json();

      userId = extractUserId(createBody);
      expect(userId).toBeTruthy();
    });

    await test.step('Generate token', async () => {
      const tokenRes = await request.post(`${baseURL}/${ACCOUNT}/GenerateToken`, {
        headers: { 'Content-Type': 'application/json' },
        data: { userName, password },
      });

      expect(tokenRes.ok()).toBeTruthy();

      const tokenBody = await tokenRes.json();
      token = tokenBody.token;
      expect(token).toBeTruthy();
    });

    await test.step('Get books', async () => {
      const booksRes = await request.get(`${baseURL}/${BOOKSTORE}/Books`);
      expect(booksRes.ok()).toBeTruthy();

      const books = await booksRes.json();
      expect(books.books.length).toBeGreaterThan(0);
      isbn = books.books[0].isbn;
    });
  });

  test('Authorized returns true for valid creds', async ({ request, baseURL }) => {
    const res = await request.post(`${baseURL}/${ACCOUNT}/Authorized`, {
      headers: { 'Content-Type': 'application/json' },
      data: { userName, password },
    });

    const status = res.status();
    const bodyText = await res.text();

    console.log('Authorized Status:', status);
    console.log('Authorized Body:', bodyText);

    expect(status).toBeLessThan(300);

    let authorized;
    try {
      authorized = JSON.parse(bodyText);
    } catch (err) {
      throw new Error(`Failed to parse JSON from Authorized response:\n${bodyText}`);
    }

    const isAuthorized = normalizeAuthorized(authorized);
    expect(isAuthorized).toBe(true);
  });

  test('Add a book to user collection', async ({ request, baseURL }) => {
    const res = await request.post(`${baseURL}/${BOOKSTORE}/Books`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        collectionOfIsbns: [{ isbn }],
      },
    });

    expect(res.status()).toBe(201);
  });

  test('Get user and verify book exists', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/${ACCOUNT}/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    const books = extractBooks(body);
    expect(books.some((b) => b.isbn === isbn)).toBe(true);
  });

  test('Delete book from collection', async ({ request, baseURL }) => {
    const res = await request.delete(`${baseURL}/${BOOKSTORE}/Book`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: { userId, isbn },
    });

    expect(res.status()).toBe(204);
  });

  test('Verify book removed', async ({ request, baseURL }) => {
    const res = await request.get(`${baseURL}/${ACCOUNT}/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    const books = extractBooks(body);
    expect(books.some((b) => b.isbn === isbn)).toBe(false);
  });

  test.afterAll(async ({ request, baseURL }) => {
    const res = await request.delete(`${baseURL}/${ACCOUNT}/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(res.ok()).toBeTruthy();
  });
});

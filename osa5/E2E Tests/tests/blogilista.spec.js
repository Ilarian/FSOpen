const { test, expect, beforeEach, describe, beforeAll } = require('@playwright/test')
const {login, addBlog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Tero Testaaja',
        username: 'tero',
        password: 'testaaja'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const text = page.getByText(/log in/i)
    expect(text).toContainText('Log in to application')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, true)

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, false)

      await expect(page.getByText(/invalid username or password/)).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page}) => {
      await login(page, true)
      await addBlog(page)
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create blog' }).click()
      await page.getByRole('textbox', { name: 'title' }).fill('Testaamisen ilot')
      await page.getByRole('textbox', { name: 'author' }).fill('Tero Testaaja')
      await page.getByRole('textbox', { name: 'url' }).fill("testi.com")
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText(/Testaamisen ilot/i)).toContainText('Testaamisen ilot')

    })

    test('blogs can be liked', async ({page}) => {
      await page.getByRole('button', { name: 'info' }).first().click()

      await page.getByRole('button', { name: 'like' }).click()
      let likeAmmount = page.getByText(/Likes: /i)
      await expect(likeAmmount).toContainText('1')

      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      likeAmmount = page.getByText(/Likes: /i)
      await expect(likeAmmount).toContainText('3')
    })

    test('blogs can be removed by the user that added them', async ({page}) => {
      await expect(page.getByText(/static/i)).toContainText('Static T. S. Atic info')

      await page.getByRole('button', { name: 'info' }).first().click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText(/static/i)).toHaveCount(0)
    })

    test('User only sees remove button in owned blogs', async ({page}) => {
      await page.getByRole('button', { name: 'logout' }).click()

      await page.getByRole('textbox', { name: 'Username' }).fill('tero')
      await page.getByRole('textbox', { name: 'password' }).fill('testaaja')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'info' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })

  })
})
const login = async (page, correct) => {
    if(correct){
        await page.getByRole('textbox', { name: 'Username' }).fill('mluukkai')
        await page.getByRole('textbox', { name: 'password' }).fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
    }else{
        await page.getByRole('textbox', { name: 'Username' }).fill('bvcxasf')
        await page.getByRole('textbox', { name: 'password' }).fill('1afdgyqasd')
        await page.getByRole('button', { name: 'login' }).click()
    }
}

const addBlog = async (page) => {
    await page.getByRole('button', { name: 'create blog' }).click()
    await page.getByRole('textbox', { name: 'title' }).fill('Static')
    await page.getByRole('textbox', { name: 'author' }).fill('T. S. Atic')
    await page.getByRole('textbox', { name: 'url' }).fill("testi.com")
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'create blog' }).click()
    await page.getByRole('textbox', { name: 'title' }).fill('Ordering by N')
    await page.getByRole('textbox', { name: 'author' }).fill('Einstein')
    await page.getByRole('textbox', { name: 'url' }).fill("testi.com")
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'create blog' }).click()
    await page.getByRole('textbox', { name: 'title' }).fill('Likeness')
    await page.getByRole('textbox', { name: 'author' }).fill('Tester')
    await page.getByRole('textbox', { name: 'url' }).fill("testi.com")
    await page.getByRole('button', { name: 'create' }).click()

}

export {login, addBlog}
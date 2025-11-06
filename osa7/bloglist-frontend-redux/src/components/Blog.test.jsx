import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const testBlog = {
    title: 'test title',
    author: 'test author',
    likes: 5,
    url: 'test.com',
    user: {
        username: 'testaaja',
        blogs: [],
        name: 'Tero Testaaja',
        id: '68de638106c4517fb720e1ad',
    },
};

test('renders only title and author', async () => {
    render(<Blog blog={testBlog}></Blog>);

    const title = screen.getByText(/test title/);
    const author = screen.getByText(/test author/);

    const likes = screen.queryByText(5);
    const url = screen.queryByText('test.com');
    const user = screen.queryByText('Tero Testaaja');

    expect(title).toBeDefined();
    expect(author).toBeDefined();

    expect(likes).toBeNull();
    expect(url).toBeNull();
    expect(user).toBeNull();
});

test('renders url, likes and user when info button is pressed', async () => {
    render(<Blog blog={testBlog} user={testBlog.user} />);

    let likes = screen.queryByText(/likes:/i);
    let url = screen.queryByText('test.com');
    let userRealName = screen.queryByText('Tero Testaaja');

    expect(likes).toBeNull();
    expect(url).toBeNull();
    expect(userRealName).toBeNull();

    const user = userEvent.setup();
    const infoBtn = screen.getByText('info');
    await user.click(infoBtn);

    likes = screen.getByText(/likes:/i);
    url = screen.getByText('test.com');
    userRealName = screen.getByText('Tero Testaaja');

    expect(likes).toBeDefined();
    expect(url).toBeDefined();
    expect(userRealName).toBeDefined();
});

test('When like button is pressed twice, listener is called twice', async () => {
    const mockLike = vi.fn();
    render(<Blog blog={testBlog} likeBlog={mockLike} user={testBlog.user} />);

    const user = userEvent.setup();
    const infoBtn = screen.getByText('info');
    await user.click(infoBtn);

    const likeBtn = screen.getByText('like');
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockLike.mock.calls).toHaveLength(2);
});

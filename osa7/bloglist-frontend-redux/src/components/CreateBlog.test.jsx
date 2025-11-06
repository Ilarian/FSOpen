import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBlog from './CreateBlog';

test('Creating a new blog calls the createBlog function with right inputs', async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();

    render(<CreateBlog addBlog={mockHandler} />);

    const inputs = screen.getAllByRole('textbox');
    const sendButton = screen.getByText('create');

    await user.type(inputs[0], '1test1');
    await user.type(inputs[1], '2test2');
    await user.type(inputs[2], '3test3');
    await user.click(sendButton);

    console.log(mockHandler.mock.calls);
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0].title).toBe('1test1');
    expect(mockHandler.mock.calls[0][0].author).toBe('2test2');
    expect(mockHandler.mock.calls[0][0].url).toBe('3test3');
});

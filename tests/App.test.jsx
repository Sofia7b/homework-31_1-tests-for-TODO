import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App.jsx';

it('renders page title TODO', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /todo/i })).toBeInTheDocument();
});

it('input accepts letters and numbers', async () => {
  render(<App />);
  const input = screen.getByLabelText(/нове завдання/i);
  await userEvent.type(input, 'abc123');
  expect(input).toHaveValue('abc123');
});

it('shows error when adding empty task', async () => {
  render(<App />);
  await userEvent.click(screen.getByRole('button', { name: /додати/i }));
  expect(screen.getByRole('alert')).toHaveTextContent('Поле не може бути порожнім');
});

it('adds new item with correct text', async () => {
  render(<App />);
  const input = screen.getByLabelText(/нове завдання/i);
  await userEvent.type(input, 'купити молоко');
  await userEvent.click(screen.getByRole('button', { name: /додати/i }));
  expect(screen.getByRole('listitem')).toHaveTextContent('купити молоко');
});

it('clears input after adding', async () => {
  render(<App />);
  const input = screen.getByLabelText(/нове завдання/i);
  await userEvent.type(input, 'завдання');
  await userEvent.click(screen.getByRole('button', { name: /додати/i }));
  expect(input).toHaveValue('');
});

it('toggles item as completed', async () => {
  render(<App />);
  const input = screen.getByLabelText(/нове завдання/i);
  await userEvent.type(input, 'пробіжка');
  await userEvent.click(screen.getByRole('button', { name: /додати/i }));

  const checkbox = screen.getByRole('checkbox', { name: /позначити виконаним: пробіжка/i });
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

it('deletes an item from the list', async () => {
  render(<App />);
  const input = screen.getByLabelText(/нове завдання/i);
  await userEvent.type(input, 'почитати книгу');
  await userEvent.click(screen.getByRole('button', { name: /додати/i }));

  const deleteBtn = screen.getByRole('button', { name: /видалити: почитати книгу/i });
  await userEvent.click(deleteBtn);
  expect(screen.queryByText('почитати книгу')).not.toBeInTheDocument();
});

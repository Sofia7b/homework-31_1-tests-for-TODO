import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../src/components/TodoItem.jsx';

it('applies line-through style when completed', async () => {
  const todo = { id: '1', text: 'прибрати кімнату', completed: false };
  const Wrapper = () => (
    <ul>
      <TodoItem todo={todo} onToggle={() => { todo.completed = !todo.completed; }} onDelete={() => {}} />
    </ul>
  );
  render(<Wrapper />);
  const checkbox = screen.getByRole('checkbox', { name: /позначити виконаним/i });
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

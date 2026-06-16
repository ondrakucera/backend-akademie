import { Link } from 'react-router';
import { Message } from '../components/Message';

export function NotFoundPage() {
  return (
    <Message title="Tahle pěšina nikam nevede" tone="error">
      <Link to="/" className="font-bold text-meadow-800 underline">
        Vrátit se mezi dinosaury.
      </Link>
    </Message>
  );
}

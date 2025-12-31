import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <div>
        <h4>Resources</h4>
        <ul>
          {
            // Removed GitHub link
          }
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><Link href="mailto:support@example.com">Email</Link></li>
        </ul>
      </div>
    </footer>
  );
};
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | NBackpackers',
  description: 'Learn how NBackpackers collects, protects, and handles your personal information, travel records, and operational data.',
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

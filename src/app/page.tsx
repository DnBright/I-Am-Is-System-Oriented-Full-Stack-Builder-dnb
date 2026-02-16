import { redirect } from '@/navigation';

export default function RootPage() {
    redirect({ href: '/', locale: 'en' });
}

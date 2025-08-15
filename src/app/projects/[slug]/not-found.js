import Link from 'next/link';
import Header from '@/components/Header';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function NotFound() {
    return (
        <div className="bg-background-dark font-dm-sans text-dark-grey-text min-h-screen">
            <Header />
            <MaxWidthWrapper>
                <div className="pt-20 pb-20 text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <h2 className="text-2xl mb-8">Project Not Found</h2>
                    <p className="text-lg mb-8">
                        The project you're looking for doesn't exist or may have been moved.
                    </p>
                    <Link 
                        href="/"
                        className="inline-block bg-custom-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
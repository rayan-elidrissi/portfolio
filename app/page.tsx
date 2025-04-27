import Header from './components/Header';
import Hero from './components/Hero';
import HomeResearchGrid from './components/HomeResearchGrid';
import Footer from './components/Footer';
import XAIDemo from './components/XAIDemo';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col">
        <Hero />
        <div className="bg-white dark:bg-gray-900 flex-grow relative z-20 mt-[-5vh] rounded-t-[40px] shadow-xl">
          <div className="pt-16 md:pt-20 px-4 md:px-6 relative z-10">
            {/* <XAIDemo /> */}
            <HomeResearchGrid />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

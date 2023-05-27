import Link from 'next/link';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
<footer className={`bg-transparent text-white py-4 bottom-0 left-0 w-full ${className}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/about" passHref>
          <button className="font-bold focus:outline-none">About</button>
        </Link>
        <div>
          <a href="https://twitter.com/astrostox" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src="./images/twitter-icon.svg" alt="Twitter" className="h-6 w-6 inline" />
          </a>
          <a href="https://www.tiktok.com/@your_tiktok_username" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src="./images/tiktok-icon.svg" alt="TikTok" className="h-6 w-6 inline" />
          </a>
          <a href="https://www.instagram.com/your_instagram_username" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src="./images/instagram-icon.svg" alt="Instagram" className="h-6 w-6 inline" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

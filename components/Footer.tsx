import Link from 'next/link';
import Image from 'next/image'

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`bg-transparent text-white py-4 bottom-0 left-0 w-full ${className}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div>
          <Link href="/about" passHref>
            <button className="font-bold focus:outline-none">About</button>
          </Link>
          <span className="mx-2">|</span>
          <Link href="/contact" passHref>
            <button className="font-bold focus:outline-none">Contact</button>
          </Link>
        </div>
        <div className="flex items-center">
          <a href="https://twitter.com/mindmapapp" target="_blank" rel="noopener noreferrer" className="mx-2">
            <Image src="/images/twitter-icon.svg" alt="Twitter" width={24} height={24} />
          </a>
          <a href="https://www.tiktok.com/@mindmap.app" target="_blank" rel="noopener noreferrer" className="mx-2">
            <Image src="/images/tiktok-icon.svg" alt="TikTok" width={24} height={24} />
          </a>
          <a href="https://www.instagram.com/mindmap.app" target="_blank" rel="noopener noreferrer" className="mx-2">
            <Image src="/images/instagram-icon.svg" alt="Instagram" width={24} height={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}


export default Footer;

import { BookOpenIcon } from '@heroicons/react/24/outline';
import { playfair_display } from './font';  


export default function BookLogo() {
  return (
    <div
      className={`${playfair_display.className} flex flex-row items-center leading-none text-white`}
    >
      <BookOpenIcon className="h-12 w-12 rotate-15" />
      <p className="text-[44px]">BookStore</p>
    </div>
  );
} 

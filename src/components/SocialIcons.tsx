import { FaFacebookF, FaInstagram } from "react-icons/fa";

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/kushtriminm", Icon: FaInstagram },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61558633936209", Icon: FaFacebookF },
];

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-gray-300 transition hover:border-red-500 hover:text-red-500"
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}
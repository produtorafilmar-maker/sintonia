
import React from 'react';
import { WhatsappIcon, MailIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from './Icons';

const contactItems = [
  {
    Icon: WhatsappIcon,
    label: 'WhatsApp',
    value: '(38) 99175-9175',
    href: 'https://wa.me/5538991759175',
  },
  {
    Icon: MailIcon,
    label: 'Email',
    value: 'webtvparaca@gmail.com',
    href: 'mailto:webtvparaca@gmail.com',
  },
];

const socialItems = [
    {
        Icon: InstagramIcon,
        handle: '@webtvparacatuoficial',
        href: 'https://www.instagram.com/webtvparacatuoficial/',
    },
    {
        Icon: FacebookIcon,
        handle: '@webtvparacatu',
        href: 'https://www.facebook.com/webtvparacatu/',
    },
    {
        Icon: YoutubeIcon,
        handle: '@webtvparacatuoficial',
        href: 'https://www.youtube.com/@webtvparacatuoficial',
    }
];

const ContactsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Fale Conosco</h1>
        <p className="text-gray-400 mt-2">Entre em contato e siga-nos nas redes sociais.</p>
      </div>

      <div className="space-y-6">
        {contactItems.map(({ Icon, label, value, href }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-[#1F1433] rounded-lg hover:bg-purple-900/50 transition-colors"
          >
            <Icon className="w-7 h-7 text-purple-400" />
            <div className="ml-4">
              <p className="font-semibold text-white">{label}</p>
              <p className="text-gray-300">{value}</p>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-10 space-y-4">
         {socialItems.map(({ Icon, handle, href }, index) => (
            <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-[#1F1433] rounded-lg hover:bg-purple-900/50 transition-colors"
            >
                <Icon className="w-8 h-8 text-white" />
                <p className="ml-4 font-semibold flex-grow text-gray-200">{handle}</p>
                <span className="text-sm font-bold bg-purple-600 px-4 py-1 rounded-full text-white">Seguir</span>
            </a>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
import { Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
                <a
                    href="https://github.com/AnisHerdev/ppf-projection-calculator-react"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                    <Github size={20} />
                    <span>View on GitHub</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;

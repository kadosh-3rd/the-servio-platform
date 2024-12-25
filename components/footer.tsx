import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Link href="/">
              <span className="font-bold">Servio</span>
            </Link>
            <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-400 md:text-left">
              © 2025 Servio. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

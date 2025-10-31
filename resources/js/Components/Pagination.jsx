import { Link } from "@inertiajs/react";

// 'links' adalah array yang dikirim dari objek paginator Laravel
export default function Pagination({ links, className = "" }) {
    return (
        links.length > 3 && (
            <div className={`flex flex-wrap -mb-1 ${className}`}>
                {links.map((link, key) =>
                    link.url === null ? (
                        // Link non-aktif (misal '...')
                        <div
                            key={key}
                            className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                        >
                            {/* Ganti &laquo; dan &raquo; menjadi teks */}
                            {link.label
                                .replace(/(&laquo;|&raquo;)/g, "")
                                .trim()}
                        </div>
                    ) : (
                        // Link aktif
                        <Link
                            key={key}
                            className={
                                `mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ` +
                                (link.active
                                    ? "bg-blue-500 text-white"
                                    : "bg-white")
                            }
                            href={link.url}
                        >
                            {/* Ganti &laquo; dan &raquo; menjadi teks */}
                            {link.label
                                .replace(/(&laquo;|&raquo;)/g, "")
                                .trim()}
                        </Link>
                    )
                )}
            </div>
        )
    );
}

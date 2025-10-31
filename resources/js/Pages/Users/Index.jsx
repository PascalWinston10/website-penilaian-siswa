import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

// Terima 'filters' sebagai prop baru
export default function Index({ auth, users, filters }) {
    const { flash = {} } = usePage().props;
    const loggedInUserId = auth.user.id;

    // Fungsi untuk styling link filter yang aktif
    const getFilterLinkClass = (role) => {
        let baseClass = "text-sm font-medium px-3 py-1 rounded-md";

        // Cek apakah filter 'role' aktif dan sama dengan 'role' saat ini
        if (filters.role === role) {
            return `${baseClass} bg-blue-600 text-white`;
        }
        // Cek untuk link "Semua" (filter.role tidak ada/kosong)
        if (!role && !filters.role) {
            return `${baseClass} bg-blue-600 text-white`;
        }

        return `${baseClass} text-gray-700 hover:bg-gray-200`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen Pengguna
                </h2>
            }
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Notifikasi (masih sama) */}
                            {flash.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {flash.success}
                                </div>
                            )}
                            {flash.error && (
                                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                    {flash.error}
                                </div>
                            )}

                            {/* Tombol Tambah Pengguna (masih sama) */}
                            <Link
                                href={route("users.create")}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 mb-4"
                            >
                                Tampilkan Pengguna Baru
                            </Link>

                            {/* --- FILTER LINKS (BARU) --- */}
                            <div className="mb-4 flex items-center space-x-2">
                                <span className="font-medium">Filter:</span>
                                <Link
                                    href={route("users.index")} // Link "Semua" tidak punya parameter
                                    className={getFilterLinkClass(undefined)}
                                    preserveState
                                >
                                    Semua
                                </Link>
                                <Link
                                    href={route("users.index", {
                                        role: "guru",
                                    })}
                                    className={getFilterLinkClass("guru")}
                                    preserveState
                                >
                                    Guru
                                </Link>
                                <Link
                                    href={route("users.index", {
                                        role: "siswa",
                                    })}
                                    className={getFilterLinkClass("siswa")}
                                    preserveState
                                >
                                    Siswa
                                </Link>
                            </div>
                            {/* --------------------------- */}

                            {/* Tabel Pengguna (masih sama) */}
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* ... (thead dan tbody masih sama persis) ... */}
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route(
                                                        "users.edit",
                                                        user.id
                                                    )}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </Link>
                                                {user.id !== loggedInUserId && (
                                                    <Link
                                                        href={route(
                                                            "users.destroy",
                                                            user.id
                                                        )}
                                                        method="delete"
                                                        as="button"
                                                        className="ml-4 text-red-600 hover:text-red-900"
                                                        onBefore={() =>
                                                            confirm(
                                                                "Apakah Anda yakin ingin menghapus pengguna ini?"
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {users.data.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                                            >
                                                Belum ada data pengguna.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination Links (masih sama) */}
                            <Pagination links={users.links} className="mt-6" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

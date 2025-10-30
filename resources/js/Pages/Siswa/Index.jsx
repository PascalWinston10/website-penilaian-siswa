import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// --- IMPORT 'Link' dan 'usePage' ---
import { Head, Link, usePage } from "@inertiajs/react";

export default function Index({ auth, siswas }) {
    // 'siswas' masih data utama kita

    // Dapatkan 'flash message' (jika ada) dari props
    const { flash = {} } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Siswa
                </h2>
            }
        >
            <Head title="Daftar Siswa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* --- TAMPILKAN NOTIFIKASI SUKSES (JIKA ADA) --- */}
                            {flash.success && (
                                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                    {flash.success}
                                </div>
                            )}

                            {/* --- TOMBOL LINK KE HALAMAN CREATE --- */}
                            <Link
                                href={route("siswa.create")}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150 mb-4"
                            >
                                Tambah Siswa Baru
                            </Link>

                            {/* Tabel Siswa (Kode ini masih sama seperti sebelumnya) */}
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Lengkap
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            NIS
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kelas
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {siswas.map((siswa) => (
                                        <tr key={siswa.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {siswa.nama_lengkap}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {siswa.nis}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {siswa.kelas}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route(
                                                        "siswa.edit",
                                                        siswa.id
                                                    )}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "siswa.destroy",
                                                        siswa.id
                                                    )}
                                                    method="delete" // <-- 1. Beri tahu Inertia untuk menggunakan method DELETE
                                                    as="button" // <-- 2. Render sebagai <button>, bukan <a> (baik untuk semantik)
                                                    className="ml-4 text-red-600 hover:text-red-900" // <-- 3. Beri jarak & warna merah
                                                    // 4. Konfirmasi sebelum mengirim request
                                                    onBefore={() =>
                                                        confirm(
                                                            "Apakah Anda yakin ingin menghapus data ini?"
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {siswas.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                                            >
                                                Belum ada data siswa.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

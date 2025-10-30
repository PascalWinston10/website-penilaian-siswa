import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Create({ auth }) {
    // 1. Setup 'useForm' hook
    // 'data' akan menyimpan nilai inputan form
    // 'setData' adalah fungsi untuk mengubah nilainya
    // 'post' adalah fungsi untuk men-submit form ke rute 'siswa.store'
    // 'processing' adalah status (true/false) saat form sedang disubmit (untuk disable tombol)
    // 'errors' akan berisi error validasi dari Laravel (jika ada)
    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: "",
        nis: "",
        kelas: "",
    });

    // 2. Fungsi yang dijalankan saat form disubmit
    const submit = (e) => {
        e.preventDefault(); // Mencegah reload halaman

        // Kirim data form ke rute 'siswa.store' yang kita buat di Langkah 1
        post(route("siswa.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Siswa Baru
                </h2>
            }
        >
            <Head title="Tambah Siswa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Kita arahkan 'onSubmit' ke fungsi 'submit' kita.
                              Ini adalah form HTML standar.
                            */}
                            <form onSubmit={submit}>
                                {/* Input Nama Lengkap */}
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="nama_lengkap"
                                        value="Nama Lengkap"
                                    />
                                    <TextInput
                                        id="nama_lengkap"
                                        name="nama_lengkap"
                                        value={data.nama_lengkap}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "nama_lengkap",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {/* Menampilkan error validasi 'nama_lengkap' */}
                                    <InputError
                                        message={errors.nama_lengkap}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Input NIS */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="nis" value="NIS" />
                                    <TextInput
                                        id="nis"
                                        name="nis"
                                        value={data.nis}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("nis", e.target.value)
                                        }
                                    />
                                    {/* Menampilkan error validasi 'nis' */}
                                    <InputError
                                        message={errors.nis}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Input Kelas */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="kelas" value="Kelas" />
                                    <TextInput
                                        id="kelas"
                                        name="kelas"
                                        value={data.kelas}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("kelas", e.target.value)
                                        }
                                    />
                                    {/* Menampilkan error validasi 'kelas' */}
                                    <InputError
                                        message={errors.kelas}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tombol Submit */}
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        Simpan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

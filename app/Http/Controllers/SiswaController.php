<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request; // <-- IMPORT INI
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect; // <-- IMPORT INI
use Illuminate\Validation\Rule;

class SiswaController extends Controller
{
    /**
     * Menampilkan halaman daftar siswa.
     */
    public function index()
    {
       // Ambil semua data siswa, diurutkan berdasarkan 'nama_lengkap' (A-Z)
        $siswas = Siswa::orderBy('nama_lengkap')->get();
        return Inertia::render('Siswa/Index', [
            'siswas' => $siswas
        ]);
    }

    /**
     * Menampilkan halaman form tambah siswa baru.
     */
    public function create()
    {
        // Kita hanya perlu merender halaman React-nya
        return Inertia::render('Siswa/Create');
    }

    /**
     * Menyimpan data siswa baru ke database.
     */
    public function store(Request $request)
    {
        // 1. Validasi data yang masuk
        // Ini adalah langkah keamanan yang SANGAT PENTING.
        $validatedData = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nis' => 'required|string|max:20|unique:siswas', // 'unique' berarti NIS tidak boleh sama
            'kelas' => 'required|string|max:50',
        ]);

        // 2. Jika validasi lolos, buat data baru
        // Kita bisa lakukan ini karena kita sudah mengatur $fillable di Model Siswa
        Siswa::create($validatedData);

        // 3. Kembalikan pengguna ke halaman daftar siswa
        // Kita juga kirim 'flash message' untuk notifikasi sukses
        return Redirect::route('siswa.index')->with('success', 'Siswa berhasil ditambahkan.');
    }
    public function edit(Siswa $siswa)
    {
        // $siswa adalah data yang otomatis diambil Laravel dari ID di URL
        return Inertia::render('Siswa/Edit', [
            'siswa' => $siswa
        ]);
    }

    /**
     * Menyimpan perubahan data siswa ke database.
     */
    public function update(Request $request, Siswa $siswa)
    {
        // 1. Validasi
        $validatedData = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            // PENTING: Rule::unique
            // Kita beritahu Laravel untuk mengabaikan NIS milik siswa ini sendiri
            'nis' => [
                'required',
                'string',
                'max:20',
                Rule::unique('siswas')->ignore($siswa->id),
            ],
            'kelas' => 'required|string|max:50',
        ]);

        // 2. Jika validasi lolos, update data
        $siswa->update($validatedData);

        // 3. Kembalikan ke halaman index dengan pesan sukses
        return Redirect::route('siswa.index')->with('success', 'Data siswa berhasil diupdate.');
    }
    public function destroy(Siswa $siswa)
    {
        // $siswa adalah data yang otomatis diambil Laravel dari ID di URL
        
        // 1. Hapus data dari database
        $siswa->delete();

        // 2. Kembalikan ke halaman index dengan pesan sukses
        return Redirect::route('siswa.index')->with('success', 'Data siswa berhasil dihapus.');
    }
}
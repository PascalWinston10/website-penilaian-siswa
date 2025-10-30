<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Ini adalah format 'anonymous migration' yang baru
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Ini adalah kode untuk menambahkan kolom 'role'
            $table->string('role')->after('email')->default('siswa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Ini adalah kode untuk menghapus kolom 'role' jika di-rollback
            $table->dropColumn('role');
        });
    }
};
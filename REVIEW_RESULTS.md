# Dicoding Elit Reviewer

**Project name:** OpenMusic API - Backend Submission

## Project Summary

Proyek OpenMusic adalah sebuah RESTful API untuk aplikasi musik yang dibangun menggunakan Node.js dengan framework Hapi.js dan PostgreSQL sebagai database. Aplikasi ini menyediakan fitur untuk mengelola album dan lagu dengan operasi CRUD lengkap.

**Teknologi yang digunakan:**
- Node.js dengan Hapi.js framework
- PostgreSQL untuk database
- Joi untuk validasi input
- ESLint untuk code style checking
- node-pg-migrate untuk database migration

## Error Notes

Pada project yang diperiksa terjadi beberapa error/masalah dan saya mengatasinya dengan cara:

1. **Missing .env file**: Proyek tidak menyertakan file .env yang diperlukan untuk konfigurasi database dan server. Saya mengatasi ini dengan membuat file .env dengan konfigurasi standar (HOST=localhost, PORT=5000, dan konfigurasi PostgreSQL).

2. **PowerShell Execution Policy**: Ada masalah dengan execution policy di PowerShell yang mencegah npm script berjalan. Ini diatasi dengan menjalankan server langsung menggunakan `node src/server.js`.

3. **Security Vulnerabilities**: Ditemukan 4 vulnerabilities (1 low, 1 moderate, 2 high) yang perlu diperbaiki dengan `npm audit fix`.

## Code Review

### 1. **Typo dalam Nama File Exception**

```javascript
// File: src/exceptions/InvarianError.js
// Seharusnya: InvariantError.js
const InvariantError = require('../../exceptions/InvarianError');
```

**Feedback:** Nama file `InvarianError.js` salah ketik, seharusnya `InvariantError.js`. Begitu juga dengan `NoteFoundError.js` seharusnya `NotFoundError.js`. Ini bisa menyebabkan confusion dan tidak konsisten dengan naming convention.

### 2. **Typo dalam Nama Variabel di routes.js**

```javascript
// File: src/api/albums/routes.js
const routs = (handler) => [
```

**Feedback:** Variabel `routs` seharusnya `routes` untuk konsistensi penamaan dan menghindari typo.

### 3. **Konsistensi Error Message**

```javascript
// File: src/services/postgres/song_service.js
throw new NotFoundError('Catatan tidak ditemukan');
```

**Feedback:** Error message "Catatan tidak ditemukan" tidak konsisten dengan konteks. Seharusnya "Lagu tidak ditemukan" karena ini adalah service untuk songs, bukan notes.

### 4. **Mapping Function Issue**

```javascript
// File: src/utils/albums/index.js & src/utils/songs/index.js
const mapDBToModel = ({
  id,
  name,
  year,
  songs,
  createdAt,
  updateAt, // Typo: seharusnya updatedAt
}) => ({
  id,
  name,
  year,
  songs,
  createdAt,
  updateAt, // Typo: seharusnya updatedAt
});
```

**Feedback:** Ada typo `updateAt` seharusnya `updatedAt` di kedua file mapping utils. Ini bisa menyebabkan data yang dikembalikan tidak sesuai dengan ekspektasi.

### 5. **Database Column Inconsistency**

```javascript
// File: migrations/1694005739122_create-table-songs.js
title: {
  type: 'VARCHAR(50)', // Terlalu pendek untuk judul lagu
  notNull: true,
},
performer: {
  type: 'VARCHAR(35)', // Terlalu pendek untuk nama performer
  notNull: true,
},
genre: {
  type: 'VARCHAR(12)', // Terlalu pendek untuk genre
  notNull: true,
},
```

**Feedback:** Batasan karakter untuk title (50), performer (35), dan genre (12) terlalu kecil. Judul lagu bisa lebih dari 50 karakter, begitu juga dengan nama performer.

## Saran Perbaikan

### 1. **Keterbacaan Kode**

- **Tambahkan komentar JSDoc** pada setiap method di service dan handler untuk dokumentasi yang lebih baik
- **Konsistenkan penamaan variabel** dan perbaiki typo yang ada
- **Gunakan const assertion** untuk route definitions agar lebih type-safe
- **Tambahkan logging** yang lebih komprehensif untuk debugging

```javascript
/**
 * Menambahkan album baru ke database
 * @param {Object} albumData - Data album yang akan ditambahkan
 * @param {string} albumData.name - Nama album
 * @param {number} albumData.year - Tahun rilis album
 * @returns {Promise<string>} ID album yang baru ditambahkan
 */
async addAlbum({ name, year }) {
  // implementation
}
```

### 2. **Arsitektur Proyek**

Arsitektur proyek sudah cukup baik dengan menggunakan pattern plugin-based architecture dari Hapi.js. Namun ada beberapa saran:

- **Tambahkan middleware** untuk error handling global
- **Implementasikan rate limiting** untuk mencegah abuse API
- **Tambahkan response helper** untuk konsistensi format response
- **Pisahkan database configuration** ke file terpisah
- **Implementasikan connection pooling** yang lebih optimal

```javascript
// Contoh response helper
const createResponse = (h, statusCode, status, message, data = null) => {
  const response = h.response({
    status,
    message,
    ...(data && { data })
  });
  response.code(statusCode);
  return response;
};
```

### 3. **Efektivitas Penggunaan Library dan Framework**

**Library yang sudah efektif:**
- **Hapi.js**: Pilihan yang tepat untuk RESTful API dengan plugin architecture
- **Joi**: Sangat baik untuk validasi input
- **nanoid**: Efisien untuk generating unique ID
- **node-pg-migrate**: Bagus untuk database migration management

**Saran perbaikan:**
- **Update dependencies**: Beberapa package memiliki vulnerabilities yang perlu diperbaiki
- **Tambahkan helmet**: Untuk security headers
- **Implementasikan compression**: Untuk response compression
- **Tambahkan cors configuration** yang lebih spesifik daripada wildcard

```javascript
// Saran konfigurasi CORS yang lebih aman
routes: {
  cors: {
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    credentials: true
  },
}
```

### 4. **Database Optimization**

- **Tambahkan indexes** pada kolom yang sering diquery
- **Implementasikan soft delete** daripada hard delete
- **Tambahkan timestamps** dengan timezone
- **Gunakan transactions** untuk operasi yang kompleks

### 5. **Testing dan Quality Assurance**

- **Implementasikan unit tests** untuk service layer
- **Tambahkan integration tests** untuk API endpoints
- **Setup CI/CD pipeline** dengan automated testing
- **Implementasikan code coverage** reporting

### 6. **Security Improvements**

- **Implementasikan authentication/authorization**
- **Tambahkan input sanitization**
- **Implementasikan request validation** yang lebih ketat
- **Tambahkan API versioning**

### 7. **Performance Optimization**

- **Implementasikan caching** untuk query yang sering diakses
- **Optimize database queries** dengan proper indexing
- **Implementasikan pagination** untuk endpoint yang mengembalikan list data
- **Tambahkan connection pooling configuration**

## Kesimpulan

Proyek ini memiliki foundation yang solid dengan architecture yang baik. Namun ada beberapa issues kecil yang perlu diperbaiki terutama terkait typo, konsistensi naming, dan security vulnerabilities. Dengan perbaikan-perbaikan yang disarankan, proyek ini bisa menjadi RESTful API yang production-ready dengan performa dan security yang optimal.

**Score: 8/10** - Proyek sudah sangat baik dengan beberapa area perbaikan minor.

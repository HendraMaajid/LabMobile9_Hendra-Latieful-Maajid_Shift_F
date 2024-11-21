# Alur Autentikasi Google: Dari Login Hingga Mendapatkan Profil
Hendra Latieful Maajid
H1D022018
## Proses Autentikasi Step by Step

### 1. Inisialisasi Google Auth
- Pengguna menekan tombol "Sign In with Google"
- Aplikasi memanggil metode `GoogleAuth.initialize()` dengan konfigurasi:
  ```typescript
  await GoogleAuth.initialize({
    clientId: 'ID_CLIENT_GOOGLE',
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
  });
  ```
<img src="login1.png" alt="Login Screenshot" width="300"/>
### 2. Proses Login Google
- Muncul popup pilih akun Google
- Pengguna memilih akun yang ingin digunakan
- Google mengembalikan data autentikasi, termasuk:
  - ID Token
  - Email
  - Nama Pengguna
  - Foto Profil
<img src="login2.png" alt="Login Screenshot" width="300"/>
<img src="login3.png" alt="Login Screenshot" width="300"/>
### 3. Pembuatan Kredensial Firebase
- Membuat kredensial Firebase menggunakan ID Token
  ```typescript
  const credential = GoogleAuthProvider.credential(idToken);
  ```

### 4. Proses Autentikasi Firebase
- Melakukan sign-in dengan kredensial ke Firebase
  ```typescript
  const result = await signInWithCredential(auth, credential);
  ```
- Firebase mengembalikan objek user dengan informasi:
  - `displayName`: Nama lengkap
  - `email`: Alamat email
  - `photoURL`: URL foto profil
  - `uid`: Identifikasi unik pengguna

### 5. Penyimpanan Informasi Pengguna
- Menyimpan objek user ke dalam state manajemen (Pinia)
  ```typescript
  user.value = result.user;
  ```

### 6. Redirect ke Halaman Home
- Setelah autentikasi berhasil, aplikasi langsung pindah ke halaman home
  ```typescript
  router.push("/home");
  ```
  <img src="home.png" alt="Login Screenshot" width="200"/>

### 7. Menampilkan informasi user di profile
- mengambil data informasi user seperti nama user, email user, dan foto profile.
```typescript
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
```
- menampilkan data user
```html
<ion-avatar>
    <img alt="Avatar" :src="userPhoto" @error="handleImageError" @load="() => console.log('Image loaded successfully', userPhoto)"/>
</ion-avatar>

<ion-list>
    <ion-item>
        <ion-input label="Nama" :value="user?.displayName" :readonly="true"></ion-input>
    </ion-item>

    <ion-item>
        <ion-input label="Email" :value="user?.email" :readonly="true"></ion-input>
    </ion-item>
</ion-list>
```
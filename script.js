
// Menyimpan daftar tugas
let tugas = [];

// Fungsi menambahkan tugas
function tambahTugas() {

    // Mengambil nama tugas
    let nama = document.getElementById("nama").value;

    // Mengambil tanggal deadline
    let tanggal = document.getElementById("tanggal").value;

    // Memeriksa apakah data sudah diisi
    if (nama === "" || tanggal === "") {
        alert("Silakan isi nama tugas dan tanggal deadline!");
        return;
    }

    // Memasukkan tugas ke dalam daftar
    tugas.push({
        nama: nama,
        tanggal: tanggal
    });

    // Mengosongkan kolom input
    document.getElementById("nama").value = "";
    document.getElementById("tanggal").value = "";

    // Menampilkan daftar tugas
    tampilkanTugas();
}


// Fungsi menampilkan tugas
function tampilkanTugas() {

    let daftar = document.getElementById("daftar");

    // Mengosongkan tampilan sebelumnya
    daftar.innerHTML = "";

    // Mengulang setiap tugas
    tugas.forEach((item, index) => {

        // Mengambil tanggal hari ini
        let sekarang = new Date();
        sekarang.setHours(0, 0, 0, 0);

        // Mengambil tanggal deadline
        let deadline = new Date(item.tanggal + "T00:00:00");

        // Menghitung sisa hari
        let selisih = Math.ceil(
            (deadline - sekarang) / (1000 * 60 * 60 * 24)
        );

        let warna;
        let status;

        // Menentukan warna traffic light
        if (selisih < 0) {

            warna = "merah";
            status = "Deadline sudah lewat";

        } else if (selisih <= 3) {

            warna = "kuning";
            status = "Deadline sudah dekat";

        } else {

            warna = "hijau";
            status = "Deadline masih lama";

        }

        // Menampilkan tugas
        daftar.innerHTML += `
            <div class="task">

                <h3>${item.nama}</h3>

                <p>Tanggal deadline: ${item.tanggal}</p>

                <p>
                    <span class="lamp ${warna}"></span>
                    ${status}
                </p>

                <p>Sisa waktu: ${
                    selisih < 0
                    ? "Lewat " + Math.abs(selisih) + " hari"
                    : selisih + " hari"
                }</p>

                <button onclick="hapusTugas(${index})">
                    Hapus Tugas
                </button>

            </div>
        `;

    });

}


// Fungsi menghapus tugas
function hapusTugas(index) {

    tugas.splice(index, 1);

    tampilkanTugas();

}

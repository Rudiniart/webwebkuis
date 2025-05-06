let dataSoal = [];
let indexSoal = 0;
let skor = 0;
let waktu = 10;
let timer;

fetch("data_soal.json")
  .then(res => res.json())
  .then(data => {
    dataSoal = data;
    tampilkanSoal();
    mulaiTimer();
  });

function mulaiTimer() {
  waktu = 10;
  document.getElementById("time").innerText = waktu;
  clearInterval(timer);
  timer = setInterval(() => {
    waktu--;
    document.getElementById("time").innerText = waktu;
    if (waktu === 0) {
      clearInterval(timer);
      autoLanjut();
    }
  }, 1000);
}

function tampilkanSoal() {
  const soal = dataSoal[indexSoal];
  document.getElementById("soal").textContent = soal.Soal;
  const pilihanContainer = document.getElementById("pilihan");
  pilihanContainer.innerHTML = "";

  soal.Pilihan.forEach(pilihan => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary option-btn";
    btn.textContent = pilihan;
    btn.onclick = () => pilihJawaban(btn, soal.Jawaban);
    pilihanContainer.appendChild(btn);
  });

  document.getElementById("status-soal").textContent = `${indexSoal + 1} of ${dataSoal.length} Questions`;
}

function pilihJawaban(button, jawabanBenar) {
  const semuaTombol = document.querySelectorAll(".option-btn");
  semuaTombol.forEach(btn => {
    btn.classList.add("disabled");
    if (btn.textContent === jawabanBenar) {
      btn.classList.add("correct");
    } else if (btn === button && btn.textContent !== jawabanBenar) {
      btn.classList.add("wrong");
    }
  });

  if (button.textContent === jawabanBenar) {
    skor++;
  }

  clearInterval(timer);
}

function autoLanjut() {
  const semuaTombol = document.querySelectorAll(".option-btn");
  semuaTombol.forEach(btn => {
    btn.classList.add("disabled");
    if (btn.textContent === dataSoal[indexSoal].Jawaban) {
      btn.classList.add("correct");
    }
  });
}

document.getElementById("btn-next").addEventListener("click", () => {
  indexSoal++;
  if (indexSoal >= dataSoal.length) {
    document.getElementById("quiz-content").style.display = "none";
    document.getElementById("hasil").classList.remove("d-none");
    document.getElementById("hasil").textContent = `Kuis selesai! Skor Anda: ${skor} dari ${dataSoal.length}`;
    clearInterval(timer);
    return;
  }
  tampilkanSoal();
  mulaiTimer();
});
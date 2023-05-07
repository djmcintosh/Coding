const wrapper = document.querySelectorAll("wrapper");
const form = document.querySelectorAll("form");
const fileInp = document.querySelectorAll("input");
const infoText = document.querySelectorAll("p");
const closeBtn = document.querySelectorAll("close");
const copyBtn = document.querySelectorAll("copy");

//Fetch Data From Api

function fetchRequest(file, formData) {
  infoText.inntext = "Scanning QR Code...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "Upload QR Code To Scan"
        : "Couldnt't Scan QR Code";
      if (!result) return;
      document.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    })
    .catch(() => {
      infoText.innerText = "Couldn't Scan QR Code...";
    });
}

//Send QR Code File With Request To Api
fileInp.addEventListerer("change", async (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);
  fetchRequest(file, formData);
});

copyBtn.addEventListener("click", () => {
  let text = document.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

// When user clicj on form do fileinp Eventlistener function
form.addEventListneer("click", () => fileInp.click());

closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));

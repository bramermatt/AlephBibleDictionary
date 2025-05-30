  const greekAlphabet = [
      { letter: "Α", name: "Alpha", transliteration: "A", pronunciation: "AL-fah" },
      { letter: "Β", name: "Beta", transliteration: "B", pronunciation: "BAY-tah" },
      { letter: "Γ", name: "Gamma", transliteration: "G", pronunciation: "GAM-ah" },
      { letter: "Δ", name: "Delta", transliteration: "D", pronunciation: "DEL-tah" },
      { letter: "Ε", name: "Epsilon", transliteration: "E", pronunciation: "EP-si-lon" },
      { letter: "Ζ", name: "Zeta", transliteration: "Z", pronunciation: "ZAY-tah" },
      { letter: "Η", name: "Eta", transliteration: "Ē", pronunciation: "AY-tah" },
      { letter: "Θ", name: "Theta", transliteration: "Th", pronunciation: "THAY-tah" },
      { letter: "Ι", name: "Iota", transliteration: "I", pronunciation: "eye-OH-tah" },
      { letter: "Κ", name: "Kappa", transliteration: "K", pronunciation: "KAP-ah" },
      { letter: "Λ", name: "Lambda", transliteration: "L", pronunciation: "LAM-dah" },
      { letter: "Μ", name: "Mu", transliteration: "M", pronunciation: "myoo" },
      { letter: "Ν", name: "Nu", transliteration: "N", pronunciation: "noo" },
      { letter: "Ξ", name: "Xi", transliteration: "X", pronunciation: "ksee" },
      { letter: "Ο", name: "Omicron", transliteration: "O", pronunciation: "OH-mi-kron" },
      { letter: "Π", name: "Pi", transliteration: "P", pronunciation: "pie" },
      { letter: "Ρ", name: "Rho", transliteration: "R", pronunciation: "row" },
      { letter: "Σ", name: "Sigma", transliteration: "S", pronunciation: "SIG-mah" },
      { letter: "Τ", name: "Tau", transliteration: "T", pronunciation: "tow" },
      { letter: "Υ", name: "Upsilon", transliteration: "U", pronunciation: "OOP-si-lon" },
      { letter: "Φ", name: "Phi", transliteration: "Ph", pronunciation: "fie" },
      { letter: "Χ", name: "Chi", transliteration: "Ch", pronunciation: "kie" },
      { letter: "Ψ", name: "Psi", transliteration: "Ps", pronunciation: "psee" },
      { letter: "Ω", name: "Omega", transliteration: "Ō", pronunciation: "oh-MAY-gah" },
    ];

    const hebrewAlphabet = [
      { letter: "א", name: "Aleph", transliteration: "ʾ", pronunciation: "AH-lef" },
      { letter: "ב", name: "Bet", transliteration: "B", pronunciation: "bayt" },
      { letter: "ג", name: "Gimel", transliteration: "G", pronunciation: "GEE-mel" },
      { letter: "ד", name: "Dalet", transliteration: "D", pronunciation: "DAH-let" },
      { letter: "ה", name: "He", transliteration: "H", pronunciation: "hay" },
      { letter: "ו", name: "Vav", transliteration: "V", pronunciation: "vahv" },
      { letter: "ז", name: "Zayin", transliteration: "Z", pronunciation: "ZAH-yin" },
      { letter: "ח", name: "Chet", transliteration: "Ḥ", pronunciation: "khet" },
      { letter: "ט", name: "Tet", transliteration: "Ṭ", pronunciation: "tayt" },
      { letter: "י", name: "Yod", transliteration: "Y", pronunciation: "yohd" },
      { letter: "כ", name: "Kaf", transliteration: "K", pronunciation: "kahf" },
      { letter: "ל", name: "Lamed", transliteration: "L", pronunciation: "LAH-med" },
      { letter: "מ", name: "Mem", transliteration: "M", pronunciation: "mem" },
      { letter: "נ", name: "Nun", transliteration: "N", pronunciation: "noon" },
      { letter: "ס", name: "Samekh", transliteration: "S", pronunciation: "SAH-mekh" },
      { letter: "ע", name: "Ayin", transliteration: "ʿ", pronunciation: "AH-yin" },
      { letter: "פ", name: "Pe", transliteration: "P", pronunciation: "pay" },
      { letter: "צ", name: "Tsade", transliteration: "Ṣ", pronunciation: "TSAH-day" },
      { letter: "ק", name: "Qof", transliteration: "Q", pronunciation: "kohf" },
      { letter: "ר", name: "Resh", transliteration: "R", pronunciation: "raysh" },
      { letter: "ש", name: "Shin", transliteration: "Sh/S", pronunciation: "sheen" },
      { letter: "ת", name: "Tav", transliteration: "T", pronunciation: "tahv" },
    ];

function renderAlphabet(list, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  list.forEach(({ letter, name, transliteration, pronunciation }) => {
    const card = document.createElement("div");
    card.className =
      "card bg-white rounded-xl shadow-lg p-2 text-center hover:shadow-amber-400 border-t-4 border-orange-300";
    card.innerHTML = `
      <div class="text-4xl font-bold text-orange-600 mb-2">${letter}</div>
      <div class="text-m font-semibold">${name}</div>
      <div class="text-m text-gray-500 italic">(${transliteration})</div>
      <div class="text-sm text-gray-400 pronunciation" style="line-height:1.3em;">${pronunciation}</div>
        `;
    container.appendChild(card);
  });
}

renderAlphabet(greekAlphabet, "greek-list");
renderAlphabet(hebrewAlphabet, "hebrew-list");

// Fetch verse from Scripture API
async function searchVerse() {
  const input = document.getElementById("verseInput").value.trim();
  const verseResult = document.getElementById("verseResult");

  // Clear previous results
  verseResult.classList.add('hidden');
  document.getElementById("originalText").textContent = "Loading...";
  document.getElementById("translitText").textContent = "";
  document.getElementById("englishText").textContent = "";

  try {
    // production API endpoint
    const response = await fetch(`https://scripture.api.bible/v1/bibles/de4e12af7f28f599-01/verses/${input}`, {
      headers: {
        'Authorization': 'Bearer 7d420ad76b568d7edbe97c98b256e4a8'
      }
    });
    const data = await response.json();

    if (data && data.data) {
      const verse = data.data;

      // Extract Greek/Hebrew, Transliteration, and English Text
      const originalText = verse.content; // Greek/Hebrew text
      const transliteration = verse.transliteration || "No transliteration available";
      const englishText = verse.content; // English translation

      // Display the result
      document.getElementById("originalText").textContent = originalText;
      document.getElementById("translitText").textContent = transliteration;
      document.getElementById("englishText").textContent = englishText;

      verseResult.classList.remove('hidden');
    } else {
      throw new Error("Verse not found.");
    }
  } catch (error) {
    document.getElementById("originalText").textContent = "Error: Could not find the verse.";
    document.getElementById("translitText").textContent = "";
    document.getElementById("englishText").textContent = "";
  }
}

document.getElementById("searchButton").addEventListener("click", searchVerse);

document.getElementById("verseInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchVerse();
  }
});

document.getElementById("verseInput").addEventListener("input", function () {
  const input = this.value.trim();
  const button = document.getElementById("searchButton");
  button.disabled = !input;
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("verseInput");
  input.focus();
  input.select();
});

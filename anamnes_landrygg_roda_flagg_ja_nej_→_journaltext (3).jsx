<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Anamnes – Ländrygg Röda flagg</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f8fafc;
    color: #0f172a;
    margin: 0;
    padding: 2rem;
    display: flex;
    justify-content: center;
  }
  .container {
    max-width: 700px;
    width: 100%;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  p {
    color: #475569;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
  .question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  .question span {
    flex: 1;
  }
  button {
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;
  }
  .yes {
    background: #10b981;
    color: white;
  }
  .yes:hover { background: #059669; }
  .no {
    background: #ef4444;
    color: white;
  }
  .no:hover { background: #dc2626; }
  .reset {
    background: #94a3b8;
    color: white;
  }
  .reset:hover { background: #64748b; }
  textarea {
    width: 100%;
    height: 200px;
    margin-top: 1rem;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    padding: 0.75rem;
    font-family: monospace;
    font-size: 0.9rem;
    resize: none;
    background: #f8fafc;
  }
</style>
</head>
<body>
<div class="container">
  <h1>Anamnes – Ländrygg: Röda flagg</h1>
  <p>Kryssa i <strong>Ja</strong> eller <strong>Nej</strong> för varje fråga. Journaltexten skapas automatiskt med en rad per fråga.</p>
  <div id="questions"></div>
  <div style="margin-top:1rem; display:flex; gap:0.5rem;">
    <button class="reset" onclick="resetAll()">Rensa alla</button>
    <button onclick="copyText()">Kopiera journaltext</button>
  </div>
  <textarea id="journal" readonly></textarea>
</div>
<script>
  const QUESTIONS = [
    "Problem med att kontrollera blåsa eller tarm?",
    "Nedsatt känsel underliv?",
    "Tidigare cancer?",
    "Episoder av feber eller sjukdomskänsla senaste 6 månaderna?",
    "Nattlig värk?",
    "Ofrivillig viktnedgång senaste året?",
    "Nytillkommen buksmärta?",
    "Nytillkommen andfåddhet?"
  ];

  const answers = {};
  const questionsDiv = document.getElementById('questions');
  const journal = document.getElementById('journal');

  function renderQuestions() {
    questionsDiv.innerHTML = '';
    QUESTIONS.forEach(q => {
      const row = document.createElement('div');
      row.className = 'question';
      const label = document.createElement('span');
      label.textContent = q;
      const yesBtn = document.createElement('button');
      yesBtn.textContent = 'Ja';
      yesBtn.className = 'yes';
      yesBtn.onclick = () => setAnswer(q, 'Ja');
      const noBtn = document.createElement('button');
      noBtn.textContent = 'Nej';
      noBtn.className = 'no';
      noBtn.onclick = () => setAnswer(q, 'Nej');
      row.appendChild(label);
      row.appendChild(yesBtn);
      row.appendChild(noBtn);
      questionsDiv.appendChild(row);
    });
  }

  function setAnswer(question, answer) {
    answers[question] = answer;
    updateJournal();
  }

  function updateJournal() {
    let text = '**Ländrygg – Röda flagg**\n';
    QUESTIONS.forEach(q => {
      text += `${q} ${answers[q] || 'Ej angivet'}\n`;
    });
    journal.value = text;
  }

  function resetAll() {
    for (let q of QUESTIONS) answers[q] = '';
    updateJournal();
  }

  function copyText() {
    navigator.clipboard.writeText(journal.value);
  }

  renderQuestions();
  updateJournal();
</script>
</body>
</html>

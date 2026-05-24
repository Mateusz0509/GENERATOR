const els = id => document.getElementById(id);
function fmtDate(v){ if(!v) return ''; const d = new Date(v+'T00:00:00'); return d.toLocaleDateString('pl-PL'); }
function money(v){ return Number(v || 0).toFixed(2) + ' zł'; }
function setSection(docType){ ['invoiceSection','contractSection','demandSection','letterSection'].forEach(id => els(id).classList.add('hidden')); const map = { invoice:'invoiceSection', contract:'contractSection', demand:'demandSection', letter:'letterSection' }; els(map[docType]).classList.remove('hidden'); }
function update(){
  const docType = els('docType').value;
  const amount = Number(els('amount').value || 0);
  const titleMap = { invoice:'Faktura', contract:'Umowa', demand:'Wezwanie do zapłaty', letter:'Pismo firmowe' };
  els('previewTitle').textContent = titleMap[docType] || els('title').value;
  setSection(docType);
  els('previewSenderName').textContent = els('senderName').value;
  els('previewSenderAddress').innerHTML = (els('senderAddress').value || '').replace(/
/g,'<br>');
  els('previewSenderBlock').innerHTML = `<strong>${els('senderName').value}</strong><br>NIP: ${els('senderNip').value || '-'}<br>${(els('senderAddress').value||'').replace(/
/g,'<br>')}`;
  els('previewClientBlock').innerHTML = `<strong>${els('clientName').value}</strong><br>NIP: ${els('clientNip').value || '-'}<br>${(els('clientAddress').value||'').replace(/
/g,'<br>')}`;
  els('previewDocNumber').textContent = els('docNumber').value;
  els('previewIssueDate').textContent = fmtDate(els('issueDate').value);
  els('previewPlace').textContent = els('place').value;
  els('previewAmountCell').textContent = money(amount);
  els('previewAmountTotal').textContent = money(amount);
  els('contractAmount').textContent = money(amount);
  els('contractDeadline').textContent = fmtDate(els('dueDate').value);
  els('previewDemandAmount').textContent = money(amount);
  els('previewDueDate').textContent = fmtDate(els('dueDate').value);
  els('previewIban').textContent = els('iban').value;
  els('previewTransferTitle').textContent = els('transferTitle').value;
  els('previewDescription').textContent = els('description').value;
  els('previewNotes').textContent = els('notes').value;
  els('previewLetterText').textContent = els('description').value;
}
['docType','docNumber','issueDate','place','dueDate','senderName','senderNip','senderAddress','clientName','clientNip','clientAddress','title','description','amount','iban','transferTitle','notes'].forEach(id => els(id).addEventListener('input', update));
els('printBtn').addEventListener('click', () => window.print());
els('resetBtn').addEventListener('click', () => location.reload());
const today = new Date();
els('issueDate').value = today.toISOString().slice(0,10);
const due = new Date(today); due.setDate(due.getDate()+14); els('dueDate').value = due.toISOString().slice(0,10);
update();
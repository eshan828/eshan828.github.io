var nfc = {
  // (A) INIT
  hTxt : null, // html data to write
  hWrite : null, // html write button
  hRead : null, // html read button
  hMsg : null, // html "console messages"
  init : () => {
    // (A1) GET HTML ELEMENTS
    nfc.hTxt = document.getElementById("demoT"),
    nfc.hWrite = document.getElementById("demoW"),
    nfc.hRead = document.getElementById("demoR"),
    nfc.hMsg = document.getElementById("demoMSG");

    // (A2) FEATURE CHECK + GET PERMISSION
    if ("NDEFReader" in window) {
      nfc.logger("Ready");
      nfc.hWrite.disabled = false;
      nfc.hRead.disabled = false;
      nfc.hReadOnly.disabled = false;
    } else { nfc.logger("Web NFC is not supported on this browser."); }
  },

  // (B) HELPER - DISPLAY LOG MESSAGE
  logger : msg => {
    let row = document.createElement("div");
    row.innerHTML = msg;
    nfc.hMsg.appendChild(row);
  },

  // (C) WRITE NFC TAG
  write : () => {
    nfc.logger("Approach NFC Tag");
    const ndef = new NDEFReader();
    ndef.write(nfc.hTxt.value)
    .then(() => nfc.logger("Write OK"))
    .catch(err => nfc.logger("ERROR - " + err.message));
  },

  // (D) READ NFC TAG
  read : () => {
    nfc.logger("Approach NFC Tag");
    const ndef = new NDEFReader();
    ndef.scan()
    .then(() => {
      ndef.onreadingerror = err => nfc.logger("Read failed");
      ndef.onreading = evt => {
         nfc.logger(evt);
         nfc.logger("Serial Number " + evt.serialNumber);
        const decoder = new TextDecoder();
        for (let record of evt.message.records) {
          nfc.logger("Record type: " + record.recordType);
          nfc.logger("Record encoding: " + record.encoding);
          nfc.logger("Record data: " + decoder.decode(record.data));
        }
      };
    })
    .catch(err => nfc.logger("Read error - " + err.message));
  }
};
window.onload = nfc.init;

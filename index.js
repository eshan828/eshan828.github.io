scanButton.addEventListener("click", async () => {
  console.log("User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    document.getElementById("output").innerText="> Scan started";
   

    ndef.addEventListener("readingerror", () => {
      document.getElementById("output").innerText="Argh! Cannot read data from the NFC tag. Try another one?";
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
        var text=document.getElementById("output").innerText;
      text=text+`> Serial Number: ${serialNumber}`;
      text=text+`> Records: (${message})`;
       text=text+ JSON.stringify(message);
        document.getElementById("output").innerText=text;

      // log(`> Serial Number: ${serialNumber}`);
      // log(`> Records: (${message.records.length})`);
     var rec="";
        for (const rec of message.records) {
            record+=`Record type:  ${record.recordType}`+ "\n" + `MIME type:    ${record.mediaType}` + "\n" + `Record id:    ${record.id}`;
//     console.log(`Record type:  ${record.recordType}`);
//     console.log(`MIME type:    ${record.mediaType}`);
//     console.log(`Record id:    ${record.id}`);
  switch (record.recordType) {
    case "text":
      // TODO: Read text record with record data, lang, and encoding.
      break;
    case "url":
      // TODO: Read URL record with record data.
      break;
    default:
    // TODO: Handle other records with record data.
  }
           
}
         document.getElementById("output2").innerText=rec;
    });
  } catch (error) {
    console.log("Argh! " + error);
        document.getElementById("output").innerText=`Argh!  + ${error}`;
  }
});

//   writeButton.addEventListener("click", async () => {
//     console.log("User clicked write button");

//     try {
//       const ndef = new NDEFReader();
//       await ndef.write("Hello world!");
//       console.log("> Message written");
//     } catch (error) {
//       console.log("Argh! " + error);
//     }
//   });

makeReadOnlyButton.addEventListener("click", async () => {
  console.log("User clicked make read-only button");

  try {
    const ndef = new NDEFReader();
    await ndef.makeReadOnly();
    console.log("> NFC tag has been made permanently read-only");
  } catch (error) {
    console.log("Argh! " + error);
  }
});

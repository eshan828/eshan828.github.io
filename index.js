scanButton.addEventListener("click", async () => {
  document.write("<p>User clicked scan button<p>");

  try {
  //   const ndef = new NDEFReader();
  //   await ndef.scan();
  //   document.write("> Scan started");

  //   ndef.addEventListener("readingerror", () => {
  //     document.write("Argh! Cannot read data from the NFC tag. Try another one?");
  //   });

  //   ndef.addEventListener("reading", ({ message, serialNumber }) => {
  //     document.write(`> Serial Number: ${serialNumber}`);
  //     document.write(`> Records: (${message.records.length})`);
  //      document.write(`> record type: (${message.records[0].recordType})`);
  //      document.write(`> data: (${message.records[0].data})`);
  //     document.write(`> data: (${message.records[0]})`);
  //     readTextRecord(message.records[0])
  // const textDecoder = new TextDecoder(message.records[0].encoding);
  // document.write(`Text: ${textDecoder.decode(message.records[0].data)} (${message.records[0].lang})`);
     
  //   });
//   const ndef = new NDEFReader();
// await ndef.scan();
// ndef.onreading = (event) => {
//   const decoder = new TextDecoder();
//   for (const record of event.message.records) {
//     document.write(`${record}`);
//     if (record.mediaType === "application/json") {
//       const json = JSON.parse(decoder.decode(record.data));
//       const article = /^[aeio]/i.test(json.title) ? "an" : "a";
//       document.write(`${json.name} is ${article} ${json.title}`);
//     }
//   }
const ndefReader = new NDEFReader();
await ndefReader.scan();
ndefReader.onreading = (event) => {
  const externalRecord = event.message;
document.write(`Records ${event.message.records.length}`)
  document.write(`Record type ${event.message.records.recordType}`)
  document.write(`data ${NDEFRecord.toRecords(event.message.records.data)}`)
    document.write(`id ${event.message.records.id}`)
  document.write(`encoding ${event.message.records.encoding}`)
  let  text;

  for (const record of externalRecord.toRecords()) {
   
      const decoder = new TextDecoder(record.encoding);
      text = decoder.decode(record.data);
      document.write(`${text}`)
  
  }


};

    
  } catch (error) {
    document.write("Argh! " + error);
  }
});
function readTextRecord(record) {
 
  const textDecoder = new TextDecoder(record.encoding);
  document.write(`Text: ${textDecoder.decode(record.data)} (${record.lang})`);
}

writeButton.addEventListener("click", async () => {
  log("User clicked write button");

  try {
    const ndef = new NDEFReader();
    await ndef.write("Hello world!");
    log("> Message written");
  } catch (error) {
    log("Argh! " + error);
  }
});

makeReadOnlyButton.addEventListener("click", async () => {
  log("User clicked make read-only button");

  try {
    const ndef = new NDEFReader();
    await ndef.makeReadOnly();
    log("> NFC tag has been made permanently read-only");
  } catch (error) {
    log("Argh! " + error);
  }
});

async function check() {
  const res = await fetch("http://localhost:3000");
  const html = await res.text();
  console.log("HTML length:", html.length);
  // Find numbers followed by SPECIMENS or ARCHIVED
  const matches = html.match(/.{0,30}(?:SPECIMEN|ARCHIVE|ENTRIES|RESOURCES).{0,30}/gi) || [];
  console.log("Matches:", matches);
}
check();

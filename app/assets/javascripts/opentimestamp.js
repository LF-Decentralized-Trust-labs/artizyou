const fs = require("fs");
const OpenTimestamps = require("opentimestamps");

function stamp() {
  const file = fs.readFileSync(__dirname + "/data/test.txt");
  console.log(file);
  // const file = Buffer.from('salut mathieu','utf');
  const detached = OpenTimestamps.DetachedTimestampFile.fromBytes(
    new OpenTimestamps.Ops.OpSHA256(),
    file
  );
  OpenTimestamps.stamp(detached).then(() => {
    fs.writeFileSync(
      `${__dirname}/data/${new Date().toISOString()}_ver_test.txt.ots`,
      detached.serializeToBytes()
    );
    console.log(fileOts);
  });
}

function info() {
  const fileOts = fs.readFileSync(__dirname + "/data/2020-12-10T09:48:50.263Z_ver.ots");
  const detached = OpenTimestamps.DetachedTimestampFile.deserialize(fileOts);
  const infoResult = OpenTimestamps.info(detached);
  console.log(infoResult);
}
function verify() {
  const file = fs.readFileSync(__dirname + "/data/test.txt");
  const fileOts = fs.readFileSync(__dirname + "/data/2020-12-10T09:48:50.263Z_ver.ots");
  const detached = OpenTimestamps.DetachedTimestampFile.fromBytes(new OpenTimestamps.Ops.OpSHA256(), file);
  const detachedOts = OpenTimestamps.DetachedTimestampFile.deserialize(fileOts);
  let options = {};
  // options.ignoreBitcoinNode - Ignore verification with bitcoin node 
  options.ignoreBitcoinNode = true;
  // options.timeout - Adjust the request timeout (default: 1000) 
  options.timeout = 5000;
  OpenTimestamps.verify(detachedOts,detached,options).then(verifyResult => {
    // return an object containing timestamp and height for every attestation if verified, undefined otherwise.
    console.log(verifyResult);
    // prints:
    // { bitcoin: { timestamp: 1521545768, height: 514371 },
    //   litecoin: { timestamp: 1521540398, height: 1388467 } }

  });
}
info()
verify()

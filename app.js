const express = require("express");
var fs = require("fs");
const NodeRSA = require("node-rsa");

// const key = new NodeRSA({ b: 4096 }); //key public & private

let app = new express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  // let masuk = fs.readFileSync("./file.pdf", { encoding: "utf8" });
  let masuk = fs.readFileSync("./file.pdf");

  // console.log("tes" + masuk);

  // Use key from key =new Node({b: ... });
  const text = masuk;
  // console.log(text);

  // const encrypted = key.encrypt(text, "base64");

  // console.log("encrypted: ", encrypted);

  // const decrypted = key.decrypt(encrypted, "utf8");
  // console.log("decrypted: ", decrypted);

  // get key public and private
  // var key_public = key.exportKey("public");
  // var key_private = key.exportKey("private");

  // use key 4096 bit
  public_key =
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEArVQDIzaWPeg184RgueC7\n" +
    "YmL1Y3z8T1e3jDNa6g8XGvxQQkPQaf9WM9alCAND0Gw104hv4LIUpuKdy66BMpFu\n" +
    "r5UKSG25ZZObNUrAFfPo7MxxMWwo0pysk34sZqyJR+X0BXkBzSB3yYwFOY6mkvFf\n" +
    "5gfSM/JPsivEYXBzcRYO7lYt0Vce8AvUellaubuAwySnyiDh15ZELTIklJ87FL1y\n" +
    "YT9D22DHhYLM3BPP5sohayrX1+YILgrNr/oU0/YHa9i3QjcbP63dKhu7z4fW/M2+\n" +
    "F37yhwPDiu2mI1j5qA7HjqEADNFwfcW36nv4ofMU23rdT5r22aLGclL/LD8W/Ers\n" +
    "hcfNLTb6FVNYl6jQFrk4bXs4XTYGgjQm5xHN7vfTAU4rP2TVE409DOddcqRrrWk3\n" +
    "uVFr0+rbkjyRkKQHH0NQJX380a0SoWIxC/fv9JAsvJlf5H3qWW6Yck4Dg98APUQ2\n" +
    "NOqPgy6sprx9OKR6AdJFyXtYAx2YVSWhcBiWuiKnIN4VDpZfWe8JlPBTmzUm81lJ\n" +
    "D2A+lY0QOQ4K7bJSB+uHZWjzflaFWNfPlaAc2BnZ2hR91Ra0bc9uzsZ6NQKX+pgi\n" +
    "Xh3NsP7T+DVWChc1rDskQGDaFRYTQAKs1b/AioIaMPemMoHgiyAs11kKu3VndBtk\n" +
    "tZ2Flr+GXK+mbGRraxo4DgcCAwEAAQ==\n" +
    "-----END PUBLIC KEY-----";

  private_key =
    "-----BEGIN RSA PRIVATE KEY----- \n" +
    "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\n" +
    "-----END RSA PRIVATE KEY-----";

  let key_public = new NodeRSA(public_key);
  let key_private = new NodeRSA(private_key);

  console.log(key_private + "\n" + key_public);

  const encrypted = key_public.encrypt(text, "base64");

  console.log("encrypted: ", encrypted);

  const decrypted = key_private.decrypt(encrypted, "utf8");
  console.log("decrypted: ", decrypted);

  res.render("tampil", {
    text: text,
    encrypted: encrypted,
    decrypted: decrypted
  });
});

let port = 8888;
app.listen(port, function() {
  console.log("Server Start" + port);
});

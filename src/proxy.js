import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;
const RPC_URL = "http://34.141.88.80:8545";

app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "10gb" }));
app.use(bodyParser.urlencoded({limit: "10gb", extended: true, parameterLimit:1000000}));

app.post("/", async (req, res) => {
  try {
    // Forward the incoming request to the RPC server
    const rpcResponse = await axios.post(RPC_URL, req.body);

    // Send back the RPC server's response
    res.json(rpcResponse.data);
  } catch (error) {
    console.error("Error forwarding RPC request:", error.message);
    res.status(500).json({ error: "Failed to forward RPC request" });
  }
});

app.listen(PORT, () => {
  console.log(`[⚡️] server running at port: ${PORT}`);
});

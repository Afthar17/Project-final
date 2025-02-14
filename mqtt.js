import mqtt from "mqtt";

const mqtt_host = "6d506308d505411e9ef1e1593cd72c1c.s1.eu.hivemq.cloud";
const mqtt_port = "8883";
const mqtt_user = "afthar";
const mqtt_password = "Afthar123";

const client = mqtt.connect(`mqtts://${mqtt_host}:${mqtt_port}`, {
  username: mqtt_user,
  password: mqtt_password,
  rejectUnauthorized: false,
  connectTimeout: 5000, // Timeout in 5 seconds
  clientId: `backend_${Math.random().toString(16).slice(2)}`,
});

client.on("connect", () => {
  console.log("Connected to MQTT Broker!");
});

client.on("error", (error) => {
  console.error("❌ MQTT Connection Error:", error);
});

export default client;

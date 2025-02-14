import mqtt from "mqtt";

const mqtt_host = "9bc2c4af80f44ddb8728a6f05ad0a398.s1.eu.hivemq.cloud";
const mqtt_port = "8883";
const mqtt_user = "silsil";
const mqtt_password = "silsil@123";

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

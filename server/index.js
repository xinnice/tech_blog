const express = require("express");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");
const cors = require("cors");

dotenv.config();

const app = express();

// 添加CORS支持
app.use(cors());
app.use(express.json());

// 配置OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1", // DeepSeek的API地址
});

// 健康检查接口
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 处理聊天请求
app.post("/api/chat", async (req, res) => {
  try {
    const { message, model = "deepseek-chat" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "消息不能为空" });
    }

    console.log("Received message:", message);
    console.log("Using model:", model);
    const completionStream = await openai.chat.completions.create({
      model:
        model === "deepseek-reasoner" ? "deepseek-reasoner" : "deepseek-chat",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      temperature: model === "deepseek-reasoner" ? 0.3 : 0.7, // R1模型使用较低的temperature以获得更精确的回答
      max_tokens: 5000,
      stream: true,
    });

    // 流式发送数据
    for await (const chunk of completionStream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(content);
      }
    }
    // console.log("AI reply:", content);

    res.end()
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "服务器错误",
      message: error.message,
    });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "服务器错误",
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useEventListener } from "@vueuse/core";
import axios from "axios";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const messages = ref([]);
const inputMessage = ref("");
const chatContainer = ref(null);
const isLoading = ref(false);
const selectedModel = ref("deepseek-chat");
const showModelSelector = ref(false);
const controller = ref(null);
const hasReceivedData = ref(false);
const isMobile = ref(false);

// 检测是否为移动端
const checkIsMobile = () => {
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const models = [
  { id: "deepseek-chat", name: "联网搜索", icon: "💬" },
  { id: "deepseek-reasoner", name: "深度思考 (R1)", icon: "🧠" },
];

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
});

onMounted(() => {
  checkIsMobile();
  document.body.style.overflow = "hidden";
  
  // 移动端适配：监听键盘弹出/收起
  if (isMobile.value) {
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
  if (controller.value) {
    controller.value.abort();
  }
  
  // 清理事件监听器
  if (isMobile.value) {
    window.removeEventListener('resize', handleResize);
  }
});

// 处理移动端键盘弹出/收起
const handleResize = () => {
  // 延迟执行以确保窗口尺寸已经更新
  setTimeout(() => {
    scrollToBottom();
  }, 100);
};

async function sendMessage() {
  if (!inputMessage.value.trim() || isLoading.value) return;
  nextTick(scrollToBottom);
  // 添加用户消息
  messages.value.push({
    role: "user",
    content: inputMessage.value,
  });

  const userMessage = inputMessage.value;
  inputMessage.value = "";
  isLoading.value = true;
  showModelSelector.value = false;
  hasReceivedData.value = false;

  try {
    // 创建AbortController用于取消请求
    controller.value = new AbortController();

    // 发起流式请求
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
        model: selectedModel.value,
      }),
      signal: controller.value.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let accumulatedContent = "";

    // 实时更新助手消息
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        // 标记已接收到数据
        if (!hasReceivedData.value) {
          hasReceivedData.value = true;
          // 添加助手消息占位符
          messages.value.push({
            role: "assistant",
            content: accumulatedContent,
          });
        } else {
          // 更新最后一条消息（助手消息）
          const lastMessage = messages.value[messages.value.length - 1];
          if (lastMessage.role === "assistant") {
            lastMessage.content = accumulatedContent;
          }
        }
        
        await nextTick();
        scrollToBottom();
      }
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error:", error);
      // 如果还没有接收过数据，则添加错误消息
      if (!hasReceivedData.value) {
        messages.value.push({
          role: "assistant",
          content: "抱歉，发生了一些错误，请稍后再试。",
        });
      } else {
        // 更新最后一条消息为错误信息
        const lastMessage = messages.value[messages.value.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.content = "抱歉，发生了一些错误，请稍后再试。";
        }
      }
    }
  } finally {
    isLoading.value = false;
    controller.value = null;
    hasReceivedData.value = false;
    scrollToBottom();
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}

useEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function renderMarkdown(content) {
  return marked(content);
}

function setModel(model) {
  selectedModel.value = model;
  showModelSelector.value = false;
}

function cancelRequest() {
  if (controller.value) {
    controller.value.abort();
    isLoading.value = false;
    hasReceivedData.value = false;
  }
}

useEventListener("click", (e) => {
  const selector = document.querySelector(".model-selector");
  if (selector && !selector.contains(e.target)) {
    showModelSelector.value = false;
  }
});

// 文本域自动调整高度
const adjustTextareaHeight = (event) => {
  const textarea = event.target;
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
};
</script>

<template>
  <div class="chat-page">
    <div class="chat-container" ref="chatContainer">
      <div class="messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.role]"
        >
          <div
            class="message-content"
            v-html="renderMarkdown(msg.content || '')"
          ></div>
        </div>
        
        <!-- 加载效果 -->
        <div v-if="isLoading && !hasReceivedData" class="message assistant">
          <div class="message-content">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="input-area" :class="{ 'mobile-input-area': isMobile }">
      <div class="input-container">
        <div
          class="model-selector"
          @click.stop="showModelSelector = !showModelSelector"
        >
          <span class="model-icon">{{
            models.find((m) => m.id === selectedModel)?.icon
          }}</span>
          <span class="model-name">{{ models.find((m) => m.id === selectedModel)?.name }}</span>
          <span class="dropdown-icon">▼</span>

          <div v-if="showModelSelector" class="model-dropdown">
            <div
              v-for="model in models"
              :key="model.id"
              :class="['model-option', { active: model.id === selectedModel }]"
              @click.stop="setModel(model.id)"
            >
              <span class="model-icon">{{ model.icon }}</span>
              {{ model.name }}
            </div>
          </div>
        </div>
        <textarea
          v-model="inputMessage"
          placeholder="给 DeepSeek 发送消息"
          rows="1"
          ref="textarea"
          @input="adjustTextareaHeight"
          class="message-input"
        ></textarea>
        <div class="button-group">
          <button v-if="isLoading" @click="cancelRequest" class="cancel-button">
            取消
          </button>
          <button
            v-else
            @click="sendMessage"
            :disabled="isLoading || !inputMessage.trim()"
          >
            <svg viewBox="0 0 24 24" class="send-icon">
              <path
                fill="currentColor"
                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--vp-nav-height));
  margin: -24px -48px;
  padding: 0;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  -webkit-overflow-scrolling: touch; /* iOS滚动优化 */
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  width: 100%;
}

.message {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.message.user {
  align-items: flex-end;
}

.message.assistant {
  align-items: flex-start;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sender-name {
  font-weight: 500;
  color: #202124;
  font-size: 14px;
}

.message-content {
  padding: 16px;
  border-radius: 12px;
  color: #202124;
  line-height: 1.6;
  max-width: 80%;
  width: 100%;
  word-wrap: break-word;
  word-break: break-word;
}

.user .message-content {
  background: #eff6ff;
}

.user .message-content :deep(pre),
.user .message-content :deep(code) {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.message-content :deep(pre) {
  margin: 16px 0;
  padding: 16px;
  border-radius: 8px;
  background: #282c34;
  overflow-x: auto;
}

.message-content :deep(code) {
  font-family: "SF Mono", Monaco, Menlo, Consolas, monospace;
}

.message-content :deep(p) {
  margin: 8px 0;
}

/* 加载动画样式 */
.loading-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

.loading-dots span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #1a73e8;
  margin: 0 4px;
  animation: bounce 1.4s infinite ease-in-out;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.input-area {
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 16px;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

/* 移动端输入区域样式 */
.mobile-input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.input-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 12px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  padding: 8px 16px;
  align-items: flex-end;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.model-selector {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 16px;
  background: #f8f9fa;
  cursor: pointer;
  font-size: 14px;
  color: #5f6368;
  transition: background-color 0.2s;
  user-select: none;
  min-width: 120px;
  flex-shrink: 0;
}

.model-name {
  display: none;
}

/* 在较宽屏幕上显示完整模型名称 */
@media (min-width: 768px) {
  .model-name {
    display: inline;
  }
}

.model-selector:hover {
  background: #e8eaed;
}

.dropdown-icon {
  font-size: 10px;
  margin-left: 4px;
  color: #5f6368;
}

.model-dropdown {
  position: absolute;
  top: -26px;
  left: 0;
  margin-top: 8px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  z-index: 1000;
}

.model-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.model-option:first-child {
  border-radius: 8px 8px 0 0;
}

.model-option:last-child {
  border-radius: 0 0 8px 8px;
}

.model-option:hover {
  background: #f8f9fa;
}

.model-option.active {
  background: #e8f0fe;
  color: #1a73e8;
}

.model-icon {
  font-size: 16px;
}

.message-input {
  flex: 1;
  padding: 8px 0;
  border: none;
  background: transparent;
  resize: none;
  font-family: inherit;
  font-size: 16px;
  color: #202124;
  line-height: 1.5;
  min-height: 24px;
  max-height: 120px;
  outline: none;
  width: 100%;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a73e8;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.cancel-button {
  width: auto;
  padding: 0 16px;
  border-radius: 16px;
  background: #f8f9fa;
  color: #5f6368;
  font-size: 14px;
  height: 40px;
}

button:hover:not(:disabled) {
  background: #1557b0;
}

.cancel-button:hover:not(:disabled) {
  background: #e8eaed;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-icon {
  width: 24px;
  height: 24px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .chat-page {
    height: 100vh;
    margin: 0;
  }
  
  .messages {
    padding: 16px;
    gap: 16px;
  }
  
  .message {
    padding: 0 16px;
  }
  
  .message-content {
    padding: 12px 16px;
    max-width: 90%;
    font-size: 16px; /* 防止iOS缩放 */
  }
  
  .input-area {
    padding: 12px;
  }
  
  .mobile-input-area {
    padding: 8px 12px;
  }
  
  .input-container {
    padding: 6px 12px;
    gap: 8px;
  }
  
  .model-selector {
    padding: 4px 8px;
    min-width: auto;
    font-size: 12px;
  }
  
  .model-icon {
    font-size: 14px;
  }
  
  .message-input {
    font-size: 16px; /* 防止iOS自动放大 */
    padding: 4px 0;
  }
  
  button, .cancel-button {
    width: 36px;
    height: 36px;
  }
  
  .cancel-button {
    padding: 0 12px;
    font-size: 12px;
  }
}

/* 小屏幕进一步优化 */
@media (max-width: 480px) {
  .model-selector .model-name {
    display: none;
  }
  
  .model-selector {
    padding: 4px 6px;
  }
  
  .message-content {
    max-width: 85%;
  }
}
</style>
'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "您好！我是BS STORE的AI客服小助手，很高兴为您服务！请问有什么可以帮助您的吗？",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 模拟AI回复
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('价格') || lowerMessage.includes('多少钱')) {
      return "您可以在商品详情页查看具体价格，我们的商品价格都很优惠哦！如果您有特定商品的价格问题，请告诉我商品名称。"
    }
    
    if (lowerMessage.includes('购买') || lowerMessage.includes('下单')) {
      return "购买很简单！您可以：\n1. 在首页浏览商品\n2. 点击商品查看详情\n3. 点击'立即购买'按钮\n4. 填写手机号和收货地址\n5. 完成购买！"
    }
    
    if (lowerMessage.includes('物流') || lowerMessage.includes('快递') || lowerMessage.includes('配送')) {
      return "关于物流信息：\n• 我们支持全国配送\n• 一般3-7个工作日送达\n• 您可以在'物流'页面查看订单状态\n• 如有物流问题，请提供订单号"
    }
    
    if (lowerMessage.includes('退换货') || lowerMessage.includes('退款')) {
      return "退换货政策：\n• 7天无理由退换货\n• 商品需保持原包装\n• 请联系客服申请退换货\n• 退款将在3-5个工作日内到账"
    }
    
    if (lowerMessage.includes('购物车')) {
      return "购物车功能：\n• 点击'加入购物车'添加商品\n• 在购物车页面可以批量结算\n• 可以修改商品数量或删除商品\n• 支持一键清空购物车"
    }
    
    if (lowerMessage.includes('账户') || lowerMessage.includes('登录') || lowerMessage.includes('注册')) {
      return "账户相关：\n• 点击导航栏的用户图标可以登录\n• 登录后可以查看订单历史\n• 支持手机号快速登录\n• 如有账户问题请联系人工客服"
    }
    
    if (lowerMessage.includes('优惠') || lowerMessage.includes('活动') || lowerMessage.includes('折扣')) {
      return "优惠活动：\n• 新用户享受首单优惠\n• 定期推出限时折扣活动\n• 关注我们获取最新优惠信息\n• VIP用户享受专属折扣"
    }
    
    if (lowerMessage.includes('联系') || lowerMessage.includes('人工') || lowerMessage.includes('客服')) {
      return "联系我们：\n• 在线客服：24小时为您服务\n• 客服热线：400-888-8888\n• 邮箱：service@bsstore.com\n• 工作时间：9:00-18:00"
    }
    
    if (lowerMessage.includes('你好') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "您好！很高兴为您服务！请问有什么可以帮助您的吗？您可以询问关于商品、购买、物流、退换货等任何问题。"
    }
    
    if (lowerMessage.includes('谢谢') || lowerMessage.includes('感谢')) {
      return "不客气！很高兴能帮助到您！如果还有其他问题，随时可以咨询我哦～"
    }
    
    // 默认回复
    return "感谢您的咨询！我是BS STORE的AI客服助手。您可以询问我关于：\n• 商品信息和价格\n• 购买流程\n• 物流配送\n• 退换货政策\n• 账户问题\n• 优惠活动\n\n如需人工客服，请说'转人工客服'。"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // 模拟AI思考时间
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // 1-3秒随机延迟
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 导航栏 */}
      <div className='flex flex-row border-b-2 sticky top-0 z-50 bg-white shadow-sm'>
        <div className='flex-1 flex justify-start items-center ml-7'>
          <Link href="/home" className="flex items-center hover:text-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            返回首页
          </Link>
        </div>
        <div className='flex-1'>
          <div className='flex justify-center items-center py-4'>
            <h1 className='text-3xl font-thin italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'>
              AI客服助手
            </h1>
          </div>
        </div>
        <div className='flex-1'></div>
      </div>

      {/* 聊天区域 */}
      <div className='max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col'>
        {/* 消息列表 */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[70%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* 头像 */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-600'
                }`}>
                  {message.isUser ? 'U' : 'AI'}
                </div>
                
                {/* 消息气泡 */}
                <div className={`rounded-lg p-3 shadow-sm ${
                  message.isUser 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className='whitespace-pre-wrap text-sm leading-relaxed'>
                    {message.text}
                  </div>
                  <div className={`text-xs mt-1 ${
                    message.isUser ? 'text-pink-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* AI正在输入提示 */}
          {isTyping && (
            <div className='flex justify-start'>
              <div className='flex items-start space-x-2 max-w-[70%]'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold'>
                  AI
                </div>
                <div className='bg-white border border-gray-200 rounded-lg p-3 shadow-sm'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.1s'}}></div>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className='border-t bg-white p-4'>
          <div className='flex space-x-2'>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='请输入您的问题...'
              className='flex-1 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent'
              rows={1}
              style={{minHeight: '44px', maxHeight: '120px'}}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className='bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
            >
              发送
            </button>
          </div>
          
          {/* 快捷问题 */}
          <div className='mt-3 flex flex-wrap gap-2'>
            {[
              '如何购买商品？',
              '查看物流信息',
              '退换货政策',
              '优惠活动',
              '联系人工客服'
            ].map((question) => (
              <button
                key={question}
                onClick={() => setInputText(question)}
                className='text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200'
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiChat
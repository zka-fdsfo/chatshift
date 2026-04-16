import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  createTheme,
  useTheme,
} from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
//icons2
// Icons
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { conversation, getChatHistory } from '@/api/functions/chat.api';

// Types (defined before usage)
interface ShiftDto {
  id?: number;
  startDate?: number[];
  startTime?: number[];
  endTime?: number[];
  breakTimeInMins?: number;
  shiftHours?: number;
  address?: string;
  apartmentNumber?: string;
  clientIds?: number[];
  employeeIds?: number[];
  isOpenShift?: boolean;
  isPickupJob?: boolean;
  isRepeated?: boolean;
  recurrance?: string;
  shiftType?: string;
  company?: string;
}

interface Question {
  field: string;
  question: string;
  example: string;
  options?: string[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  proposedShift?: ShiftDto;
  followUpQuestions?: Question[];
  needsMoreInfo?: boolean;
  missingFields?: string[];
}

interface ChatbotResponse {
  message: string;
  sessionId: string;
  needsMoreInfo: boolean;
  missingFields?: string[];
  proposedShift?: ShiftDto;
  followUpQuestions?: Question[];
  conversationState?: string;
}

interface ChatHistory {
  id: string;
  title: string;
  sessionId: string;
  createdAt: Date;
}

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.05); }
`;

const floatDelayedAnimation = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-20px, 20px) scale(1.05); }
`;

const floatSlowAnimation = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, -10px) scale(1.02); }
`;

const slideInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

// Styled Components
const AnimatedBox = styled(Box)(({ theme }) => ({
  '& .animate-float': {
    animation: `${floatAnimation} 8s ease-in-out infinite`,
  },
  '& .animate-float-delayed': {
    animation: `${floatDelayedAnimation} 10s ease-in-out infinite`,
  },
  '& .animate-float-slow': {
    animation: `${floatSlowAnimation} 12s ease-in-out infinite`,
  },
}));

const MessageBubble = styled(Paper)<{ $isUser: boolean }>(({ $isUser, theme }) => ({
  padding: theme.spacing(1.5, 2),
  maxWidth: '85%',
  borderRadius: 20,
  background: $isUser
    ? 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)'
    : alpha(theme.palette.common.white, 0.6),
  backdropFilter: 'blur(10px)',
  color: $isUser ? theme.palette.common.white : theme.palette.text.primary,
  animation: `${slideInAnimation} 0.3s ease-out forwards`,
  opacity: 0,
  animationFillMode: 'forwards',
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  '& span': {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    animation: `${bounceAnimation} 0.6s ease-in-out infinite`,
  },
}));

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Helper functions
const getAuthToken = (): string => localStorage.getItem('authToken') || '';
const generateSessionId = (): string =>
  `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

// Light theme only
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#9c27b0' },
    secondary: { main: '#2196f3' },
    background: {
      default: '#f5f5f5',
      paper: 'rgba(255, 255, 255, 0.6)',
    },
  },
  customShadows: undefined as any,
});

// Sidebar Content Component (defined before Chat)
interface SidebarContentProps {
  chatSessions: ChatHistory[];
  sessionId: string;
  onNewConversation: () => void;
  onLoadConversation: (chat: ChatHistory) => void;
  onDeleteConversation: (id: string, e: React.MouseEvent) => void;
  onClose: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  chatSessions,
  sessionId,
  onNewConversation,
  onLoadConversation,
  onDeleteConversation,
  onClose,
}) => (
  <>
    <Box
      sx={{
        p: 3,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Shift AI
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Shift Creation Assistant
        </Typography>
      </Box>
      <IconButton onClick={onClose} sx={{ display: { lg: 'none' } }}>
        <CloseIcon />
      </IconButton>
    </Box>

    <Box sx={{ p: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onNewConversation}
        sx={{ borderRadius: 2, color: `#1d2a33`, borderBlockColor: `#1d2a33` }}
      >
        New Conversation
      </Button>
    </Box>

    <Typography variant="caption" sx={{ px: 2, pb: 1, color: 'text.secondary' }}>
      Recent Conversations
    </Typography>

    <List sx={{ flex: 1, overflowY: 'auto', px: 1 }}>
      {chatSessions.map((chat) => (
        <ListItem key={chat.id} disablePadding sx={{ position: 'relative', '&:hover .delete-btn': { opacity: 1 } }}>
          <ListItemButton
            selected={chat.sessionId === sessionId}
            onClick={() => onLoadConversation(chat)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon>
              <HistoryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={chat.title} primaryTypographyProps={{ variant: 'body2', noWrap: true }} />
          </ListItemButton>
          <IconButton
            className="delete-btn"
            size="small"
            onClick={(e) => onDeleteConversation(chat.id, e)}
            sx={{ position: 'absolute', right: 8, opacity: { xs: 1, sm: 0 }, transition: 'opacity 0.2s' }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </ListItem>
      ))}
      {chatSessions.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No conversations yet
        </Typography>
      )}
    </List>

    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
      {/* <Button fullWidth startIcon={<SettingsIcon />} sx={{ justifyContent: 'flex-start', borderRadius: 2 }}>
        Settings
      </Button> */}
    </Box>
  </>
);

// Main Chat Component
const Chat: React.FC = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hello! I'm your Shift Creation Assistant.\n\nI can help you create shifts using natural language. Try saying something like:\n\n📝 **Examples:**\n• Create shift for client Jane Doe on 2026-06-15 from 9:00 AM to 5:00 PM with employee John\n• Jane khan Doe on 2026-06-15 starting time 9:00 AM ending time 5:00 PM with fareed\n• Create pickup job for client Mary on tomorrow from 10 AM to 2 PM",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>(generateSessionId);
  const [chatSessions, setChatSessions] = useState<ChatHistory[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatSessions');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  // Start new conversation
  const startNewConversation = useCallback(() => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setMessages([
      {
        id: Date.now().toString(),
        text: "👋 Hello! I'm your Shift Creation Assistant.\n\nI can help you create shifts using natural language. Try saying something like:\n\n📝 **Examples:**\n• Create shift for client Jane Doe on 2026-06-15 from 9:00 AM to 5:00 PM with employee John\n• Jane khan Doe on 2026-06-15 starting time 9:00 AM ending time 5:00 PM with fareed\n• Create pickup job for client Mary on tomorrow from 10 AM to 2 PM",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);

    const newHistory: ChatHistory = {
      id: newSessionId,
      title: `Chat ${chatSessions.length + 1}`,
      sessionId: newSessionId,
      createdAt: new Date(),
    };
    setChatSessions((prev) => [newHistory, ...prev]);
  }, [chatSessions.length]);
  // console.log("chatsessions lenght",chatSessions.length);
  
  // Load conversation
  const loadConversation = useCallback((history: ChatHistory) => {
    setSessionId(history.sessionId);
    setMessages([
      {
        id: Date.now().toString(),
        text: `Loading conversation: ${history.title}\n\nHow can I help you with shifts today?`,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setIsSidebarOpen(false);
  }, []);

  // Delete conversation
  const deleteConversation = useCallback(
    (historyId: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setChatSessions((prev) => prev.filter((h) => h.id !== historyId));
      if (sessionId === historyId) {
        startNewConversation();
      }
    },
    [sessionId, startNewConversation]
  );

  const scrollToBottom = useCallback((): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Confirm shift API call
  const confirmShift = async (action: 'CONFIRM' | 'EDIT' ): Promise<any> => {
    const token = getAuthToken();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_BASE_URL}/api/chatbot/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sessionId, action }),
    });

    if (response.status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  // Conversation mutation
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: conversation,
    onSuccess: (response: ChatbotResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['conversations'],
      });
      console.log('------------- Response of the Conversation API:------------', response);

      const botMsgObj: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'bot',
        timestamp: new Date(),
        proposedShift: response.proposedShift,
        followUpQuestions: response.followUpQuestions,
        needsMoreInfo: response.needsMoreInfo,
        missingFields: response.missingFields,
      };

      setMessages((prev) => [...prev, botMsgObj]);

      if (response.sessionId && response.sessionId !== sessionId) {
        setSessionId(response.sessionId);
      }

      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error('------------- Conversation API Error:------------', error);

      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: `❌ ${error.message || 'Sorry, I encountered an error. Please try again.'}`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsLoading(false);
    },
  });

  const handleSend = async (): Promise<void> => {
    if (input.trim() === '' || isLoading || isPending) return;

    const userMessage = input.trim();
    const userMsgObj: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsgObj]);
    setInput('');
    setIsLoading(true);

    mutate({
      message: userMessage,
      sessionId: sessionId,
    });
  };

  const handleConfirmShift = (action: 'CONFIRM' | 'EDIT' | 'CANCEL') => {
    // Send the action as a message to the chatbot
    mutate({
      message: action,
      sessionId: sessionId,
    });
  };
  // const handleConfirmShift = async (action: 'CONFIRM' | 'EDIT' | 'CANCEL') => {
  //   setIsLoading(true);

  //   try {
  //     const response = await confirmShift(action);

  //     let botMessage = '';
  //     if (action === 'CONFIRM' && response.success) {
  //       botMessage = `✅ ${response.message}\n\nShift ID: ${response.shifts?.[0]?.id || 'N/A'}\n\nYou can continue creating more shifts or start a new conversation.`;
  //     } else if (action === 'CONFIRM' && !response.success) {
  //       botMessage = `❌ ${response.message}`;
  //     } else if (action === 'EDIT') {
  //       botMessage = "✏️ Please tell me what you'd like to change (e.g., 'change time to 2 PM' or 'change client to John')";
  //     } else {
  //       botMessage = '❌ Shift creation cancelled. How can I help you with another shift?';
  //     }

  //     const botMsgObj: Message = {
  //       id: (Date.now() + 1).toString(),
  //       text: botMessage,
  //       sender: 'bot',
  //       timestamp: new Date(),
  //     };

  //     setMessages((prev) => [...prev, botMsgObj]);

  //     if (action === 'CONFIRM' && response.success) {
  //       setTimeout(() => startNewConversation(), 2000);
  //     }
  //   } catch (error) {
  //     console.error('Error confirming shift:', error);
  //     const errorMsg: Message = {
  //       id: (Date.now() + 1).toString(),
  //       text: `❌ ${error instanceof Error ? error.message : 'Sorry, there was an error.'}`,
  //       sender: 'bot',
  //       timestamp: new Date(),
  //     };
  //     setMessages((prev) => [...prev, errorMsg]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatShiftTime = (timeArray?: number[]): string => {
    if (!timeArray || timeArray.length < 2) return '--:--';
    return `${timeArray[0].toString().padStart(2, '0')}:${timeArray[1].toString().padStart(2, '0')}`;
  };

  const formatShiftDate = (dateArray?: number[]): string => {
    if (!dateArray || dateArray.length < 3) return 'YYYY-MM-DD';
    return `${dateArray[0]}-${dateArray[1].toString().padStart(2, '0')}-${dateArray[2].toString().padStart(2, '0')}`;
  };

  const quickActions = [
    { label: '📝 New Shift', message: 'Create shift for client ' },
    { label: '🔓 Open Shift', message: 'Create open shift for client ' },
    { label: '📦 Pickup Job', message: 'Create pickup job for client ' },
    { label: '❓ Help', message: 'Help' },
  ];

  // No-op function for desktop sidebar close button (unused)
  const noop = () => { '' };

  // let sessionIdd='1';
  const { data, isLoading:isLoadinghistory } = useQuery({
  queryKey: ["chat-history", sessionId],
  queryFn: () => getChatHistory(sessionId as string)
});

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AnimatedBox sx={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        {/* Animated Background - Light theme only */}
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', transition: 'all 0.7s' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              left: 10,
              width: 300,
              height: 300,
              bgcolor: '#2196f3',
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.2,
              className: 'animate-float',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              right: 10,
              width: 400,
              height: 400,
              bgcolor: '#f48fb1',
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.2,
              className: 'animate-float-delayed',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 350,
              height: 350,
              bgcolor: '#ffcc80',
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.15,
              className: 'animate-float-slow',
            }}
          />
        </Box>

        {/* Main Container */}
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            backdropFilter: 'blur(20px)',
            bgcolor: 'rgba(255,255,255,0.5)',
          }}
        >
          {/* Sidebar Drawer for Mobile */}
          <Hidden lgUp>
            <Drawer
              anchor="left"
              open={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              PaperProps={{
                sx: {
                  width: 320,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              <SidebarContent
                chatSessions={chatSessions}
                sessionId={sessionId}
                onNewConversation={startNewConversation}
                onLoadConversation={loadConversation}
                onDeleteConversation={deleteConversation}
                onClose={() => setIsSidebarOpen(false)}
              />
            </Drawer>
          </Hidden>

          {/* Sidebar for Desktop */}
          <Hidden lgDown>
            <Box
              sx={{
                width: 320,
                height: '100%',
                borderRight: 1,
                borderColor: 'divider',
                bgcolor: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SidebarContent
                chatSessions={chatSessions}
                sessionId={sessionId}
                onNewConversation={startNewConversation}
                onLoadConversation={loadConversation}
                onDeleteConversation={deleteConversation}
                onClose={noop}
              />
            </Box>
          </Hidden>

          {/* Main Chat Area */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <AppBar
              position="static"
              elevation={0}
              sx={{ bgcolor: 'transparent', borderBottom: 1, borderColor: 'divider', backdropFilter: 'blur(10px)' }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  onClick={() => setIsSidebarOpen(true)}
                  sx={{ display: { xs: 'inline-flex', lg: 'none' }, mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" color="#2196f3" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    Shift Creation Assistant
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Session: {sessionId.slice(-8)}
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>

            {/* Quick Actions */}
            <Box
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                gap: 1,
                overflowX: 'auto',
              }}
            >
              {quickActions.map((action, idx) => (
                <Chip
                  key={idx}
                  label={action.label}
                  onClick={() => setInput(action.message)}
                  sx={{ cursor: 'pointer' }}
                  variant="outlined"
                />
              ))}
            </Box>

            {/* Messages Area */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, lg: 3 } }}>
              <Box sx={{ maxWidth: '900px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {messages.map((msg, index) => (
                  <Box
                    key={msg.id}
                    sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <MessageBubble $isUser={msg.sender === 'user'}>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {msg.text}
                      </Typography>

                      {/* Follow-up Questions */}
                      {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {msg.followUpQuestions.map((q, idx) => (
                            <Paper
                              key={idx}
                              sx={{ p: 1.5, bgcolor: alpha(theme.palette.common.white, 0.1), borderRadius: 2 }}
                            >
                              <Typography variant="body2" fontWeight="bold">
                                {q.question}
                              </Typography>
                              {q.example && (
                                <Typography variant="caption" color="text.secondary">
                                  💡 Example: {q.example}
                                </Typography>
                              )}
                              {q.options && q.options.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                  {q.options.slice(0, 5).map((opt, optIdx) => (
                                    <Chip
                                      key={optIdx}
                                      label={opt}
                                      size="small"
                                      onClick={() => setInput(opt)}
                                      sx={{ cursor: 'pointer' }}
                                    />
                                  ))}
                                </Box>
                              )}
                            </Paper>
                          ))}
                        </Box>
                      )}

                      {/* Shift Confirmation Card */}
                      {msg.proposedShift && (
                        <Card sx={{ mt: 2, bgcolor: alpha(theme.palette.common.white, 0.1), borderRadius: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <WorkOutlineIcon color="primary" fontSize="small" />
                              <Typography variant="subtitle2" fontWeight="bold">
                                Shift Details
                              </Typography>
                            </Box>
                            <Stack spacing={0.5}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonOutlineIcon fontSize="small" color="action" />
                                <Typography variant="caption">
                                  Client ID: {msg.proposedShift.clientIds?.[0] || 'N/A'}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonOutlineIcon fontSize="small" color="action" />
                                <Typography variant="caption">
                                  Employee ID: {msg.proposedShift.employeeIds?.[0] || 'N/A'}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarTodayIcon fontSize="small" color="action" />
                                <Typography variant="caption">
                                  Date: {formatShiftDate(msg.proposedShift.startDate)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTimeIcon fontSize="small" color="action" />
                                <Typography variant="caption">
                                  Time: {formatShiftTime(msg.proposedShift.startTime)} -{' '}
                                  {formatShiftTime(msg.proposedShift.endTime)}
                                </Typography>
                              </Box>
                              {msg.proposedShift.shiftHours && msg.proposedShift.shiftHours > 0 && (
                                <Typography variant="caption">⏱️ Hours: {msg.proposedShift.shiftHours}</Typography>
                              )}
                              {msg.proposedShift.isPickupJob && (
                                <Chip label="Pickup Job" size="small" color="warning" sx={{ mt: 0.5 }} />
                              )}
                              {msg.proposedShift.isOpenShift && (
                                <Chip label="Open Shift" size="small" color="info" sx={{ mt: 0.5 }} />
                              )}
                            </Stack>
                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleIcon />}
                                onClick={() => handleConfirmShift('CONFIRM')}
                                fullWidth
                                disabled={isPending}
                              >
                                Confirm
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="warning"
                                startIcon={<EditIcon />}
                                onClick={() => handleConfirmShift('EDIT')}
                                fullWidth
                                disabled={isPending}
                              >
                                Edit
                              </Button>
                         
                              {/* <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleIcon />}
                                onClick={() => handleConfirmShift('CONFIRM')}
                                fullWidth
                              >
                                Confirm
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="warning"
                                startIcon={<EditIcon />}
                                onClick={() => handleConfirmShift('EDIT')}
                                fullWidth
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="error"
                                startIcon={<CancelIcon />}
                                onClick={() => handleConfirmShift('CANCEL')}
                                fullWidth
                              >
                                Cancel
                              </Button> */}
                            </Box>
                          </CardContent>
                        </Card>
                      )}

                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.6 }}>
                        {formatTime(msg.timestamp)}
                      </Typography>
                    </MessageBubble>
                  </Box>
                ))}

                {(isLoading || isPending) && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Paper sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.6)' }}>
                      <TypingIndicator>
                        <span />
                        <span />
                        <span />
                      </TypingIndicator>
                    </Paper>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Box>
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', backdropFilter: 'blur(10px)' }}>
              <Box sx={{ display: 'flex', gap: 1, maxWidth: '900px', mx: 'auto' }}>
                <TextField
                  inputRef={inputRef}
                  fullWidth
                  size="small"
                  placeholder="Type your shift request... (e.g., 'Create shift for client Jane on 2026-06-15 from 9 AM to 5 PM with employee John')"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading || isPending}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 28,
                      bgcolor: 'rgba(255,255,255,0.6)',
                    },
                  }}
                />
                <IconButton
                  onClick={handleSend}
                  disabled={isLoading || isPending || !input.trim()}
                  sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                >
                  <SendOutlinedIcon />
                </IconButton>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                💡 Try: &quot;Jane khan Doe on 2026-06-15 starting time 9:00 AM ending time 5:00 PM with fareed&quot;
              </Typography>
            </Box>
          </Box>
        </Box>
      </AnimatedBox>
    </ThemeProvider>
  );
};

export default Chat;
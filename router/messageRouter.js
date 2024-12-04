import express from 'express'
import { sendMessage, getAllMessages, deleteMessage } from '../controllers/messageContoller.js';
import { isAdminAuthenticated } from '../middlewares/auth.js';
const router = express.Router();
router.post('/send', sendMessage)
router.get('/getall', isAdminAuthenticated, getAllMessages)
router.delete('/deletemessage/:id', isAdminAuthenticated, deleteMessage)
export default router;
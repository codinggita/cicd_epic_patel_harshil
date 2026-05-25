// src/routes/knowledge.routes.js
import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getStats
} from '../controllers/knowledge.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { createKnowledgeValidation, updateKnowledgeValidation } from '../validations/knowledge.validation.js';

const router = express.Router();

// Aggregation route MUST be defined before /:id route
router.get('/stats/overview', getStats);

// Public read routes
router.get('/', getAllItems);
router.get('/:id', getItemById);

// Protected write routes (Admin only)
router.post(
  '/',
  authMiddleware,
  authorizeRoles('admin'),
  createKnowledgeValidation,
  createItem
);

router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  updateKnowledgeValidation,
  updateItem
);

router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('admin'),
  deleteItem
);

export default router;

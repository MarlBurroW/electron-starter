import { z } from 'zod'

/**
 * Schémas de validation Zod pour l'application
 */

// Schémas pour les données utilisateur
export const UserProfileSchema = z.object({
  username: z.string().min(1, 'Username is required').max(50, 'Username too long'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  avatar: z.string().url('Invalid avatar URL').optional(),
})

// Schémas pour les paramètres
export const SettingsSchema = z.object({
  notifications: z.boolean(),
  autoSave: z.boolean(),
  language: z.enum(['en', 'fr']),
  theme: z.enum(['light', 'dark', 'system']),
  windowSize: z.object({
    width: z.number().min(800),
    height: z.number().min(600),
  }),
  sidebarCollapsed: z.boolean(),
})

// Schémas pour les opérations IPC
export const FileOperationSchema = z.object({
  path: z.string().min(1, 'File path is required'),
  content: z.string().optional(),
})

export const SystemInfoSchema = z.object({
  platform: z.string(),
  arch: z.string(),
  nodeVersion: z.string(),
  electronVersion: z.string(),
  appVersion: z.string(),
  osVersion: z.string().optional(),
  totalMemory: z.number().optional(),
  freeMemory: z.number().optional(),
  uptime: z.number().optional(),
})

// Schémas pour les requêtes API
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  timestamp: z.number(),
})

// Types dérivés des schémas
export type UserProfile = z.infer<typeof UserProfileSchema>
export type Settings = z.infer<typeof SettingsSchema>
export type FileOperation = z.infer<typeof FileOperationSchema>
export type SystemInfo = z.infer<typeof SystemInfoSchema>
export type ApiResponse = z.infer<typeof ApiResponseSchema>

// Utilitaires de validation
export const validateUserProfile = (data: unknown): UserProfile => {
  return UserProfileSchema.parse(data)
}

export const validateSettings = (data: unknown): Settings => {
  return SettingsSchema.parse(data)
}

export const validateFileOperation = (data: unknown): FileOperation => {
  return FileOperationSchema.parse(data)
}

export const validateSystemInfo = (data: unknown): SystemInfo => {
  return SystemInfoSchema.parse(data)
}
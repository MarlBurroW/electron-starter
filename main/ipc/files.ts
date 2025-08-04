import { ipcMain, dialog } from 'electron'
import { promises as fs } from 'fs'
import { z } from 'zod'
import log from 'electron-log'
import * as path from 'path'

// Validation schemas
const ReadFileSchema = z.string().min(1)
const WriteFileSchema = z.object({
  path: z.string().min(1),
  content: z.string()
})

// File operations with security restrictions
ipcMain.handle('app/read-file', async (event, filePath: string) => {
  try {
    // Validate input
    const validatedPath = ReadFileSchema.parse(filePath)
    
    // Security: Restrict to app data directory and user documents
    const userDataPath = require('electron').app.getPath('userData')
    const documentsPath = require('electron').app.getPath('documents')
    const resolvedPath = path.resolve(validatedPath)
    
    if (!resolvedPath.startsWith(userDataPath) && 
        !resolvedPath.startsWith(documentsPath) && 
        !resolvedPath.startsWith(process.cwd())) {
      throw new Error('Access denied: Path not allowed')
    }
    
    const content = await fs.readFile(resolvedPath, 'utf-8')
    log.info(`File read successfully: ${resolvedPath}`)
    return content
  } catch (error) {
    log.error('Error reading file:', error)
    throw new Error(`Failed to read file: ${error}`)
  }
})

ipcMain.handle('app/write-file', async (event, filePath: string, content: string) => {
  try {
    // Validate input
    const validated = WriteFileSchema.parse({ path: filePath, content })
    
    // Security: Restrict to app data directory and user documents
    const userDataPath = require('electron').app.getPath('userData')
    const documentsPath = require('electron').app.getPath('documents')
    const resolvedPath = path.resolve(validated.path)
    
    if (!resolvedPath.startsWith(userDataPath) && 
        !resolvedPath.startsWith(documentsPath)) {
      throw new Error('Access denied: Path not allowed')
    }
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(resolvedPath), { recursive: true })
    
    await fs.writeFile(resolvedPath, validated.content, 'utf-8')
    log.info(`File written successfully: ${resolvedPath}`)
  } catch (error) {
    log.error('Error writing file:', error)
    throw new Error(`Failed to write file: ${error}`)
  }
})

// File dialog operations
ipcMain.handle('app/show-open-dialog', async (event, options: Electron.OpenDialogOptions) => {
  try {
    const result = await dialog.showOpenDialog(options)
    return result
  } catch (error) {
    log.error('Error showing open dialog:', error)
    throw error
  }
})

ipcMain.handle('app/show-save-dialog', async (event, options: Electron.SaveDialogOptions) => {
  try {
    const result = await dialog.showSaveDialog(options)
    return result
  } catch (error) {
    log.error('Error showing save dialog:', error)
    throw error
  }
})
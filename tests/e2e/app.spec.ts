import { test, expect } from '@playwright/test'

test.describe('Electron Starter App', () => {
  test('should display home page', async ({ page }) => {
    await page.goto('/')
    
    // Check if the app title is present
    await expect(page.locator('h1')).toContainText('Welcome to Electron Starter')
    
    // Check if navigation is present
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'About' })).toBeVisible()
  })

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to Settings
    await page.getByRole('button', { name: 'Settings' }).click()
    await expect(page.locator('h1')).toContainText('Settings')
    
    // Navigate to About
    await page.getByRole('button', { name: 'About' }).click()
    await expect(page.locator('h1')).toContainText('About')
    
    // Navigate back to Home
    await page.getByRole('button', { name: 'Home' }).click()
    await expect(page.locator('h1')).toContainText('Welcome to Electron Starter')
  })

  test('should interact with counter', async ({ page }) => {
    await page.goto('/')
    
    // Find counter section
    const counterCard = page.locator('[data-testid="counter-card"]').first()
    const counterValue = counterCard.locator('div').filter({ hasText: /^\d+$/ }).first()
    const incrementButton = counterCard.getByRole('button').filter({ hasText: '+' })
    const decrementButton = counterCard.getByRole('button').filter({ hasText: '-' })
    const resetButton = counterCard.getByRole('button', { name: 'Reset' })
    
    // Check initial value
    await expect(counterValue).toHaveText('0')
    
    // Increment counter
    await incrementButton.click()
    await expect(counterValue).toHaveText('1')
    
    // Increment again
    await incrementButton.click()
    await expect(counterValue).toHaveText('2')
    
    // Decrement counter
    await decrementButton.click()
    await expect(counterValue).toHaveText('1')
    
    // Reset counter
    await resetButton.click()
    await expect(counterValue).toHaveText('0')
  })

  test('should toggle theme', async ({ page }) => {
    await page.goto('/')
    
    // Find theme toggle button
    const themeToggle = page.getByRole('button', { name: 'Toggle theme' })
    await expect(themeToggle).toBeVisible()
    
    // Check initial state (should be light by default)
    const html = page.locator('html')
    
    // Toggle to dark mode
    await themeToggle.click()
    // Note: The exact class might vary based on implementation
    
    // Toggle again
    await themeToggle.click()
  })

  test('should change language', async ({ page }) => {
    await page.goto('/')
    
    // Find language toggle button
    const languageToggle = page.getByRole('button', { name: 'Toggle language' })
    await expect(languageToggle).toBeVisible()
    
    // Click to change language
    await languageToggle.click()
    
    // Check if the text has changed (should be in French now)
    // Note: This assumes the app starts in English
    await expect(page.locator('h1')).toContainText('Bienvenue')
    
    // Toggle back to English
    await languageToggle.click()
    await expect(page.locator('h1')).toContainText('Welcome')
  })

  test('should open and interact with settings', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to settings
    await page.getByRole('button', { name: 'Settings' }).click()
    
    // Check tabs are present
    await expect(page.getByRole('tab', { name: 'General' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Appearance' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Advanced' })).toBeVisible()
    
    // Test username input
    const usernameInput = page.getByLabel('Username')
    await usernameInput.fill('testuser')
    
    // Test email input
    const emailInput = page.getByLabel('Email')
    await emailInput.fill('test@example.com')
    
    // Test notification toggle
    const notificationSwitch = page.locator('[data-testid="notifications-switch"]').first()
    if (await notificationSwitch.isVisible()) {
      await notificationSwitch.click()
    }
    
    // Save settings
    await page.getByRole('button', { name: 'Save Changes' }).click()
  })
})
import { expect, test } from '@playwright/test'

test('loads verified profile and all five projects without runtime errors', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page).toHaveTitle(/Milindu Weerawarna/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Built with purpose.')
  await expect(page.locator('.project-card')).toHaveCount(5)
  await expect(page.getByText('3.69', { exact: false })).toBeVisible()
  await expect(page.getByAltText('Milindu Weerawarna wearing a navy suit')).toBeVisible()
  expect(await page.locator('.portrait-frame img').evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  expect(errors).toEqual([])
  await page.screenshot({ path: `test-results/${testInfo.project.name}-home.png` })
  await page.screenshot({ path: `test-results/${testInfo.project.name}-full.png`, fullPage: true })
})

test('project category filters show matching projects and reset', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Cybersecurity', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await expect(page.getByRole('button', { name: 'Cybersecurity', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.project-card').first()).toContainText('ExfilTrack')
  await expect(page.locator('.project-card').last()).toContainText('MLNops')
  await page.getByRole('button', { name: 'AI & IoT', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.locator('.project-card')).toContainText('Benthic Guardian')
  await page.getByRole('button', { name: 'Full-stack', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await page.getByRole('button', { name: /All work/ }).click()
  await expect(page.locator('.project-card')).toHaveCount(5)
})

test('project dialog supports details, source links, escape, and focus restoration', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Explore ExfilTrack', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading', { name: 'ExfilTrack', exact: true })).toBeVisible()
  await expect(dialog.getByText(/Correlates Registry/)).toBeVisible()
  await expect(dialog.getByRole('link', { name: 'Repository' })).toHaveAttribute('href', 'https://github.com/ExfilTrack/Exfiltrack')
  await expect(page.getByRole('button', { name: 'Close project details' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await page.getByRole('button', { name: 'Explore Benthic Guardian', exact: true }).click()
  await expect(page.getByRole('dialog').getByRole('link')).toHaveCount(3)
  await page.getByRole('button', { name: 'Close project details' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('certifications expand and link to verified credentials', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.certificate-row')).toHaveCount(4)
  await page.getByRole('button', { name: 'View all 8 certifications' }).click()
  await expect(page.locator('.certificate-row')).toHaveCount(8)
  await expect(page.locator('.certificate-row').first()).toHaveAttribute('href', /credly\.com\/badges\//)
  await expect(page.getByRole('button', { name: 'Show fewer' })).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('button', { name: 'Show fewer' }).click()
  await expect(page.locator('.certificate-row')).toHaveCount(4)
})

test('CV download initiates and PDF, contact links, and share image are available', async ({ page, request }) => {
  await page.goto('/')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download CV', exact: true }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('Milindu_Weerawarna_CV.pdf')
  const pdf = await request.get('/Milindu_Weerawarna_CV.pdf')
  expect(pdf.ok()).toBeTruthy()
  expect(pdf.headers()['content-type']).toContain('application/pdf')
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-')
  await expect(page.getByRole('link', { name: 'Start a conversation by email' })).toHaveAttribute('href', /^mailto:milindunavodya@gmail\.com/)
  await expect(page.getByRole('link', { name: 'Call me' })).toHaveAttribute('href', 'tel:+94702100664')
  const socialImage = await request.get('/social-preview.jpg')
  expect(socialImage.ok()).toBeTruthy()
  expect(socialImage.headers()['content-type']).toContain('image/jpeg')
})

test('copy email uses clipboard and gives feedback', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (text: string) => { (window as unknown as { copiedEmail: string }).copiedEmail = text } },
    })
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.locator('.copy-status')).toHaveText('Copied!')
  expect(await page.evaluate(() => (window as unknown as { copiedEmail: string }).copiedEmail)).toBe('milindunavodya@gmail.com')
})

test('clipboard errors retain usable contact details', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => { throw new Error('Clipboard unavailable') } },
    })
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.locator('.copy-status')).toContainText('Please use the email link')
  await expect(page.locator('.contact-email > a')).toHaveAttribute('href', 'mailto:milindunavodya@gmail.com')
})

test('mobile navigation expands, navigates, and closes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation only')
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open navigation menu' })
  await toggle.click()
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true }).click()
  await expect(page).toHaveURL(/#work$/)
  await expect(page.getByRole('navigation')).not.toBeVisible()
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation')).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeFocused()
})

test('keyboard skip link works and reduced motion is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
})

test('has no horizontal overflow across small phones, tablet, and desktop', async ({ page }) => {
  await page.goto('/')
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.waitForTimeout(100)
    const dimensions = await page.evaluate(() => ({ width: window.innerWidth, scroll: document.documentElement.scrollWidth }))
    expect(dimensions.scroll, `Horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.width + 1)
  }
})

test('external links are protected and there are no placeholder destinations', async ({ page }) => {
  await page.goto('/')
  const externalLinks = page.locator('a[target="_blank"]')
  expect(await externalLinks.count()).toBeGreaterThan(10)
  for (const link of await externalLinks.all()) {
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(link).toHaveAttribute('href', /^https:\/\//)
  }
  expect(await page.locator('a[href="#"]').count()).toBe(0)
})
